import React from "react";
import { useContext } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
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

  // Helper function to get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case "ed":
        return "#ff8a65";
      case "control":
        return "#ff5252";
      case "performance":
        return "#66bb6a";
      default:
        return "#ff8a65"; // Default to ED color
    }
  };

  // Helper function to truncate text
  const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Calculate discount percentage
  const calculateDiscount = (price, discount) => {
    return Math.round(((price - discount) / price) * 100);
  };

  return (
    <div className="w-full mx-auto overflow-hidden border border-green-500 rounded-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products?.productsArray?.slice(0, 10)?.map((product) => {
            const discountPercentage = calculateDiscount(
              product.price,
              product.discount
            );

            return (
              <div
                className="flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0"
                key={product.uuid}
              >
                <div className="px-2 py-2">
                  <div className="relative p-2 overflow-hidden bg-white rounded-lg">
                    {/* Category and Discount Labels */}
                    <div className="absolute z-10 top-2 left-2">
                      <div
                        className="px-2 py-1 text-xs font-medium text-white rounded-full"
                        style={{
                          backgroundColor: getCategoryColor(product.category),
                        }}
                      >
                        {/* Shorter text for mobile */}
                        <span className="hidden sm:inline">
                          Erectile Dysfunction
                        </span>
                        <span className="inline sm:hidden">E.D.</span>
                      </div>
                    </div>

                    {discountPercentage > 0 && (
                      <div className="absolute z-10 top-2 right-2">
                        <div className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                          {discountPercentage}% OFF
                        </div>
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="flex justify-center mb-2">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="object-contain w-24 h-24 sm:w-32 sm:h-32"
                      />
                    </div>

                    {/* Product Info */}
                    <h3 className="mb-1 text-sm font-medium text-gray-800 truncate sm:text-base">
                      {product.name}
                    </h3>

                    <div className="mb-1 text-xs text-gray-600">
                      {product.brand && <span>{product.brand}</span>}
                      {product.brand && product.generic && <span> • </span>}
                      {product.generic && <span>{product.generic}</span>}
                    </div>

                    <div className="mb-3 text-xs text-gray-600 line-clamp-2">
                      {truncateText(product.description, 60)}
                    </div>

                    {/* Price Info */}
                    <div className="flex items-baseline mb-1">
                      <span className="text-xl font-bold text-primary sm:text-2xl">
                        ${product.discount}
                      </span>
                      <span className="ml-1 text-xs text-gray-600">/pill</span>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-gray-500">
                        MRP:{" "}
                        <span className="line-through">${product.price}</span>
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Link to={`/product/${product.uuid}`}>
                      <button className="w-full py-2 text-xs font-medium text-white transition duration-150 ease-in-out bg-green-500 rounded-md sm:text-sm hover:bg-green-600">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
