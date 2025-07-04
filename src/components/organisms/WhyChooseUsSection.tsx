import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function WhyChooseUsSection() {
  const t = await getTranslations('home.WhyChooseUs');

  return (
    // The section uses the 'card' background color from your theme to stand out
    <section className="bg-card py-16 text-card-foreground sm:py-24">
      <div className="container">
        
        {/* Main Heading */}
        <h2 className="mb-12 text-center text-4xl font-extrabold tracking-tight">
          {t('main_heading')}
        </h2>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <h3 className="text-2xl font-bold">{t('left_subheading')}</h3>
            <p className="max-w-md text-lg text-muted-foreground">
              {t('left_body')}
            </p>
            <div className="pt-4">
              {/* 
                ASSET: Left Image
                Path: /public/images/home/image_left.png
              */}
              <Image
                src="/images/home/image_left.png"
                width={500}
                height={500}
                alt="A male and a female professional collaborating over a tablet device"
                className="h-auto w-full max-w-sm rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <h3 className="text-2xl font-bold">{t('right_subheading')}</h3>
            <p className="max-w-md text-lg text-muted-foreground">
              {t('right_body')}
            </p>
            <div className="pt-4">
              {/* 
                ASSET: Right Image
                Path: /public/images/home/image_right.png
              */}
              <Image
                src="/images/home/image_right.png"
                width={500}
                height={500}
                alt="3D illustration of a character happily working at a computer desk with electronics"
                className="h-auto w-full max-w-sm rounded-lg object-contain"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}