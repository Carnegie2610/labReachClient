import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

// This page handles the root route and redirects to the English version
export default async function RootPage() {
  redirect('/en');
}
