// src/components/molecules/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export  default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPathname);
  };

  return (
    <div className="relative">
      <select
        onChange={handleLocaleChange}
        defaultValue={locale}
        className="h-full appearance-none bg-transparent py-1 pl-2 pr-8 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 focus:outline-none"
        aria-label="Change language"
      >
        <option value="en">en</option>
        <option value="fr">fr</option>
        {/* Add other supported locales here */}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600"
        aria-hidden="true"
      />
    </div>
  );
}