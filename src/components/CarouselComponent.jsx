import React from "react";
import { useState, useEffect, useContext } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "./ProductCard";
import { DataContext } from "../utils/dataContext";

export default function CarouselComponent() {
  const { products } = useContext(DataContext);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000 })]
  );

  return (
    <div className="w-full mx-auto overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products?.productsArray?.slice(0, 10)?.map((product) => (
            <div className="flex-[0_0_50%] min-w-0 px-2" key={product.uuid}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
