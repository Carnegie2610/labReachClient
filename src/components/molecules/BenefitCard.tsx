import Image from 'next/image';

// Define the props the component will accept
type BenefitCardProps = {
  imageSrc: string;
  imageAlt: string;
  paragraph: string;
  listItems: string[];
  imagePosition?: 'left' | 'right'; // Optional prop for layout control
};

export function BenefitCard({
  imageSrc,
  imageAlt,
  paragraph,
  listItems,
  imagePosition = 'left', // Default to image on the left
}: BenefitCardProps) {

  const imageOrderClass = imagePosition === 'left' ? 'md:order-first' : 'md:order-last';

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
      
      {/* Image Column */}
      <div className={`flex items-center justify-center ${imageOrderClass}`}>
        {/* This container creates the unique, rounded border effect */}
        <div className="rounded-3xl  border-card p-2 shadow-xl shadow-primary/10">
          <Image
            src={imageSrc}
            width={400}
            height={400}
            alt={imageAlt}
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* Text Content Column */}
      <div className="flex flex-col justify-center space-y-6">
        <p className="text-lg text-muted-foreground">{paragraph}</p>
        
        <ul className="space-y-4">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {/* 
                  ASSET: The checkmark/chevron icon.
                  Path: /public/images/home/svg/chevron.svg
                */}
                <Image
                  src="/images/home/svg/chevron.svg"
                  width={24}
                  height={24}
                  alt="Checkmark icon"
                />
              </div>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}