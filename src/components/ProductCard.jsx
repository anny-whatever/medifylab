// src/components/ProductCard.jsx
import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCard({ product, layout = "shop" }) {
  // Extract all product details from the product object
  const {
    uuid,
    name,
    price,
    discount,
    mainImage,
    category,
    brand,
    generic,
    description,
  } = product;

  // Calculate discount percentage
  const discountPercentage = Math.round(((price - discount) / price) * 100);

  // Determine category label and color
  const getCategoryInfo = () => {
    switch (category) {
      case "ed":
        return { label: "Erectile Dysfunction", shortLabel: "E.D." };
      case "control":
        return { label: "Painkillers", shortLabel: "Painkillers" };
      case "performance":
        return { label: "Performance", shortLabel: "Performance" };
      case "other":
        return { label: "Other", shortLabel: "Other" };
      default:
        return { label: category, shortLabel: category };
    }
  };

  const categoryInfo = getCategoryInfo();

  // Truncate text
  const truncateText = (text, limit) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <div className="h-full overflow-hidden bg-white border border-gray-200 rounded-lg">
      <div className="relative">
        {/* Category Badge */}
        <div className="absolute z-10 top-2 left-2">
          <div
            className="px-2 py-1 text-xs font-medium rounded-full"
            style={{
              backgroundColor:
                category === "ed"
                  ? "#FF8A65"
                  : category === "control"
                  ? "#FF5252"
                  : category === "performance"
                  ? "#66BB6A"
                  : "#BDBDBD",
              color: "white",
            }}
          >
            <span className="hidden sm:inline">{categoryInfo.label}</span>
            <span className="sm:hidden">{categoryInfo.shortLabel}</span>
          </div>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute z-10 top-2 right-2">
            <div className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {discountPercentage}% OFF
            </div>
          </div>
        )}

        {/* Product Image */}
        <img
          src={mainImage}
          alt={name}
          className="object-contain w-full h-32 p-2 sm:h-40"
        />
      </div>

      <div className="p-3">
        {/* Product Name */}
        <h3 className="h-8 mb-1 overflow-hidden text-sm font-semibold leading-tight text-gray-800">
          {name}
        </h3>

        {/* Brand & Generic */}
        {(brand || generic) && (
          <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
            {brand && <span>{brand}</span>}
            {brand && generic && <span>•</span>}
            {generic && <span className="truncate">{generic}</span>}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-primary">${discount}</span>
          <span className="ml-1 text-xs text-gray-600">/pill</span>
        </div>

        <div className="mb-3 text-xs text-gray-500">
          MRP: <span className="line-through">${price}</span>
        </div>

        {/* View Details Button */}
        <Link to={`/product/${uuid}`}>
          <Button
            className="w-full  text-white bg-secondary  text-xs py-1.5"
            radius="md"
            size="sm"
            variant="flat"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
