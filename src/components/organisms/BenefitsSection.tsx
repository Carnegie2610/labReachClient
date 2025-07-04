import { getTranslations } from 'next-intl/server';
import { BenefitCard } from '@/components/molecules/BenefitCard';

// Define a type for the card data we expect from our translation file
type BenefitCardData = {
  paragraph: string;
  list_items: string[];
  image: {
    src: string;
    alt: string;
  };
};

export async function BenefitsSection() {
  const t = await getTranslations('home.Benefits');
  
  // Use t.raw() to get the array of objects from the JSON file
  const benefitsData: BenefitCardData[] = t.raw('cards');

  return (
    <section className="py-16 sm:py-24">
      <div className="container space-y-16">
        
        <h2 className="text-center text-4xl font-extrabold tracking-tight">
          {t('main_heading')}
        </h2>

        {/* 
          Here, we map over our data and render a reusable BenefitCard for each item.
          This is where the power of component-based architecture shines.
        */}
        {benefitsData.map((card, index) => (
          <BenefitCard
            key={index}
            imageSrc={card.image.src}
            imageAlt={card.image.alt}
            paragraph={card.paragraph}
            listItems={card.list_items}
            // This logic automatically alternates the layout
            imagePosition={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}

      </div>
    </section>
  );
}