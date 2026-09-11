'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

export default function BannerCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const banners = [
    { id: 1, src: 'https://picsum.photos/seed/sublimacao1/1200/400', alt: 'Kits Canecas Sublimadas' },
    { id: 2, src: 'https://picsum.photos/seed/sublimacao2/1200/400', alt: 'Camisas Personalizadas' },
    { id: 3, src: 'https://picsum.photos/seed/sublimacao3/1200/400', alt: 'Brindes Corporativos' },
  ];

  return (
    <div className="overflow-hidden rounded-xl shadow-md" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner) => (
          <div className="flex-[0_0_100%] min-w-0 relative h-64 md:h-96" key={banner.id}>
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
