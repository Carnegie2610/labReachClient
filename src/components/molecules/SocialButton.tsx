import { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button'; // Assuming you have a standard Button atom

interface SocialButtonProps {
  providerName: string;
  icon: ReactNode;
  onClick: () => void;
}

export function SocialButton({ providerName, icon, onClick }: SocialButtonProps) {
  return (
    <Button
      variant="ghost" // Assuming an 'outline' variant in your Button atom
      onClick={onClick}
      className="w-full"
    >
      <span className="mr-3">{icon}</span>
      {providerName}
    </Button>
  );
}