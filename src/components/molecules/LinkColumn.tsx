// src/components/molecules/LinkColumn.tsx
import { FooterTitle } from '@/components/atoms/FooterTitle';
import { FooterLink } from '@/components/atoms/footerlink';

type LinkItem = {
  href: string;
  label: string;
};

type LinkColumnProps = {
  title: string;
  links: LinkItem[];
};

export function LinkColumn({ title, links }: LinkColumnProps) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <div className="mt-4 flex flex-col space-y-3">
        {links.map((link) => (
          <FooterLink key={link.href} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}