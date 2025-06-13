// src/components/atoms/Logo.tsx
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="text-xl font-bold tracking-tight text-gray-800">
      LabReachLogo
    </Link>
  );
}