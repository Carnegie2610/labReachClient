import { HeroSection } from '@/components/organisms/HeroSection';
import { WhyChooseUsSection } from '@/components/organisms/WhyChooseUsSection';
import { BenefitsSection } from '@/components/organisms/BenefitsSection';
import { FaqSection } from '@/components/organisms/FaqSection';
export default function HomePage() {
return (
<div>
<HeroSection />
<WhyChooseUsSection />
<BenefitsSection />
<FaqSection />
{/* Add other sections here */}
</div>
);
}