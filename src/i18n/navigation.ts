import { createNavigation } from 'next-intl/navigation';
import { locales, pathnames, localePrefix } from './routing';

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales, pathnames, localePrefix });