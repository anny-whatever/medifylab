import React from "react";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CardComponent from "./CardComponent";

export default function CarouselComponent() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
    },
    [Autoplay()]
  );

  return (
    <div className="w-[90vw] lg:w-full mx-auto overflow-hidden embla">
      <div className="mx-auto mb-5 h-96 embla__viewport " ref={emblaRef}>
        <div className="w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/2 embla__container">
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
          <div className="flex items-center justify-center embla__slide">
            <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
              <CardComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
