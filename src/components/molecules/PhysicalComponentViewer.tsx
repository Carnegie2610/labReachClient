'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

type PhysicalComponentViewerProps = {
  imageSrc: string;
  altText: string;
  componentName: string;
};

export function PhysicalComponentViewer({ imageSrc, altText, componentName }: PhysicalComponentViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Effect to handle closing the modal with the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);

  return (
    <div className="rounded-lg border bg-neutral/50 p-4 dark:bg-primary/50">
      <h3 className="mb-2 text-base font-semibold text-primary dark:text-neutral">{componentName}</h3>
      {/* Thumbnail View */}
      <div
        className="group relative cursor-pointer overflow-hidden rounded-md"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
          <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      {/* Zoomed Modal View */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)} // Click outside to close
          role="dialog"
          aria-modal="true"
          aria-labelledby="zoomed-image-title"
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the image from closing the modal
          >
            <h4 id="zoomed-image-title" className="sr-only">{altText}</h4>
            <Image
              src={imageSrc}
              alt={altText}
              width={1200}
              height={900}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
            <Button
              variant="primary"
              className="absolute -top-2 -right-2 rounded-full bg-neutral text-primary dark:bg-primary dark:text-neutral"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoomed view"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}