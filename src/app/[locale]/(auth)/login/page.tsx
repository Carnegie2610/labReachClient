import { LoginForm } from '@/components/molecules/LoginForm';

export default function LoginPage() {
  // The layout file handles the main background and centering.
  // This page component's only job is to provide the form.
  // We use flexbox here again to ensure the form itself is centered within the main container.
  return (
    <div className="flex w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}