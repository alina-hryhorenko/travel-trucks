'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import type { CamperImage } from '@/types/camper';
import styles from './CamperGallery.module.css';

export function CamperGallery({ images, alt }: { images: CamperImage[]; alt: string }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const canLoop = images.length > 1;

  return (
    <div className={styles.wrapper}>
      <Swiper
        loop={canLoop}
        spaceBetween={12}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className={styles.mainSwiper}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={styles.mainSlideInner}>
              <Image
                src={image.original}
                alt={alt}
                fill
                priority
                className={styles.mainImage}
                sizes="638px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={32}
        slidesPerView="auto"
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className={styles.thumbsSwiper}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className={styles.thumbSlide}>
            <div className={styles.thumbSlideInner}>
              <Image src={image.thumb} alt="" fill className={styles.thumbImage} sizes="135px" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
