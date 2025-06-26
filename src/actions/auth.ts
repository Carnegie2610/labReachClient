'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server'; // We'll need to create this helper
import { z } from 'zod';

// Define a schema for input validation using Zod
const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  role: z.enum(['student', 'instructor', 'technician']),
});
const supabase = createSupabaseServerClient();
export async function registerUser(formData: {
  email: string;
  password: string;
  fullName: string;
  role: 'student' | 'instructor' | 'technician';
}) {
  const validation = RegisterSchema.safeParse(formData);

  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const { email, password, fullName, role } = validation.data;

  // 1. Sign up the user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // You can add user metadata here if you want
      data: {
        full_name: fullName,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }
  if (!authData.user) {
    return { error: 'User registration failed, please try again.' };
  }

  // 2. Insert the role into your public 'users' table
  const supabaseClient = await supabase;
  const { error: profileError } = await supabaseClient
    .from('users')
    .insert({ id: authData.user.id, full_name: fullName, role });

  if (profileError) {
    // This is a critical issue, might indicate DB policy problems
    console.error('Error creating user profile:', profileError);
    // You might want to delete the auth user here to allow a retry
    await supabaseClient.auth.admin.deleteUser(authData.user.id);
    return { error: 'Could not create user profile. Please contact support.' };
  }

  // On success, Supabase sends a confirmation email by default.
  return { success: 'Confirmation email sent! Please check your inbox to verify your account.' };
}