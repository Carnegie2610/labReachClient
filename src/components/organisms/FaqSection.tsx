import { getTranslations } from 'next-intl/server';
import { FaqItem } from '@/components/molecules/FaqItem';

type FaqItemData = {
  question: string;
  answer: string;
};

export async function FaqSection() {
  const t = await getTranslations('home.Faqs');
  const faqs: FaqItemData[] = t.raw('items');

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-4xl font-extrabold tracking-tight">
            {t('main_heading')}
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}