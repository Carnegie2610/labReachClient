import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { Button } from '@/components/atoms/Button'; // Assuming your Button atom

export async function HeroSection() {
  const t = await getTranslations('home.Hero');
  const locale = await getLocale();

  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Column: Content */}
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            {t('heading_part1')}{' '}
            {/* Highlighted text uses the primary action color from your theme */}
            <span className="text-primary">{t('heading_highlight')}</span>
            <br />
            {t('heading_part2')}
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
            {t('subheading')}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={`/${locale}/register`}>
              {/* This button should use your "outline" or "secondary" variant */}
              <Button variant="secondary" size="lg">
                {t('register_button')}
              </Button>
            </Link>
            <Link href={`/${locale}/login`}>
              {/* This is the primary call-to-action button */}
              <Button variant="primary" size="lg">
                {t('get_started_button')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex items-center justify-center">
          {/* 
            ASSET: The hero image.
            The local path you provided is translated to a public web path.
            '/home/milkovic/.../public/images/home/hero1.png' becomes '/images/home/hero1.png'
          */}
          <Image
            src="/images/home/hero1.png"
            width={600}
            height={600}
            alt="An enthusiastic student holding books, ready for electronics exploration"
            className="h-auto w-full max-w-md rounded-lg object-contain"
            // The 'priority' prop is a crucial performance optimization for LCP images.
            priority 
          />
        </div>
      </div>
    </section>
  );
}