// src/components/ProductCard.jsx
import React from "react";
import { Button, Chip } from "@nextui-org/react";
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
        return {
          label: "Erectile Dysfunction",
          color: "#FF8A65",
          textColor: "white",
        };
      case "control":
        return { label: "Painkillers", color: "#FF5252", textColor: "white" };
      case "performance":
        return { label: "Performance", color: "#66BB6A", textColor: "white" };
      case "other":
        return { label: "Other", color: "#BDBDBD", textColor: "black" };
      default:
        return { label: category, color: "#BDBDBD", textColor: "black" };
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
    <motion.div
      className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-lg shadow-sm"
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(229, 231, 235, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Product Image Section */}
      <div className="relative">
        <motion.img
          className="w-full h-[180px] object-contain p-2"
          src={mainImage}
          alt={name}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <div
            className="px-2 py-1 text-xs font-medium rounded-full"
            style={{
              backgroundColor: categoryInfo.color,
              color: categoryInfo.textColor,
            }}
          >
            {categoryInfo.label}
          </div>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2">
            <div className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {discountPercentage}% OFF
            </div>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="flex flex-col flex-grow p-3">
        <h3 className="font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
          {name}
        </h3>

        {layout === "shop" && (brand || generic) && (
          <div className="flex items-center gap-1 mt-1 mb-2 text-xs text-gray-500">
            {brand && <span>{brand}</span>}
            {brand && generic && <span>•</span>}
            {generic && <span>{generic}</span>}
          </div>
        )}

        {layout === "shop" && description && (
          <p className="mb-3 text-xs text-gray-600 line-clamp-2">
            {truncateText(description, 100)}
          </p>
        )}

        <div className="mt-auto">
          {/* Price Display */}
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-primary">${discount}</span>
            <span className="ml-1 text-sm text-gray-600">/pill</span>
          </div>

          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500">
              MRP: <span className="line-through">${price}</span>
            </span>
          </div>

          {/* Action Button */}
          <Link to={`/product/${uuid}`} className="block mt-3">
            <Button
              className="w-full text-white bg-secondary hover:bg-secondary/90"
              radius="md"
              size="sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
