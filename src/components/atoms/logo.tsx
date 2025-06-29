// src/components/atoms/Logo.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="text-xl font-bold tracking-tight text-gray-800">
     <Image src="/images/lab/LOGOWHITE.png" width={50} height={50} alt="LabReach Logo" />
    </Link>
  );
}