import React from "react";
import { useState, useEffect, useContext } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CardComponent from "./CardComponent";

import { DataContext } from "../utils/dataContext";

export default function CarouselComponent() {
  const { products } = useContext(DataContext);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
    },
    [Autoplay()]
  );

  return (
    <div className="w-[90vw] lg:w-full mx-auto overflow-hidden embla">
      <div className="h-full mx-auto mb-5 embla__viewport " ref={emblaRef}>
        <div className="w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/2 embla__container">
          {products?.productsArray?.slice(0, 10).map((product) => (
            <div
              className="flex items-center justify-center embla__slide"
              key={product.uuid}
            >
              <div className="flex items-center justify-center w-full h-full p-5 xl:p-10 embla__slide__number">
                <CardComponent
                  image={product.mainImage}
                  title={product.name}
                  price={product.price}
                  discountPrice={product.discount}
                  uuid={product.uuid}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
