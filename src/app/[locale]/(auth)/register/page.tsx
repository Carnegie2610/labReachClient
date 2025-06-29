import { AuthHeader } from '@/components/organisms/AuthHeader';
import { RegistrationForm } from '@/components/organisms/RegistrationForm';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    // This div represents the entire page structure for the register screen.
    <div className="flex w-full flex-col">
      {/* 
        This page explicitly asks for the 'register' variant.
        The header will now correctly show the "Sign In" button.
      */}
      <AuthHeader variant="register" />

      <main className="flex flex-grow items-center justify-center p-4">
        {/* The two-column layout for the registration form */}
        <div className="grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2">
          <div className="relative hidden items-center justify-center rounded-l-lg bg-secondary/10 p-12 lg:flex">
            <Image
              src="/images/lab/loginImage.png"
              width={500}
              height={500}
              alt="Illustration of a person working at a desk with electronics"
              className="h-auto w-full"
            />
          </div>
          <div className="flex w-full items-center justify-center bg-background p-8 lg:p-12">
            <RegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
}