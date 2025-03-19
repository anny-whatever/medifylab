import React from "react";
import { Badge, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";

function ShopCard({
  title,
  price,
  discountedPrice,
  description,
  mainImage,
  viewMode = "grid",
  category,
  brand,
  generic,
}) {
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((price - discountedPrice) / price) * 100
  );

  // Determine category label
  const getCategoryLabel = () => {
    switch (category) {
      case "ed":
        return "Erectile Dysfunction";
      case "control":
        return "Painkillers";
      case "performance":
        return "Performance";
      case "other":
        return "Other";
      default:
        return category;
    }
  };

  // Truncate description based on viewMode
  const truncateDescription = (text, limit) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  // Grid view card
  if (viewMode === "grid") {
    return (
      <motion.div
        className="group h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:translate-y-[-4px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative flex-shrink-0 overflow-hidden h-52">
          <motion.img
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-500"
            src={mainImage}
            alt={title}
            whileHover={{ scale: 1.05 }}
          />

          {discountPercentage > 0 && (
            <div className="absolute z-10 top-3 right-3">
              <Chip
                color="danger"
                size="sm"
                variant="solid"
                className="font-semibold shadow-lg"
              >
                {discountPercentage}% OFF
              </Chip>
            </div>
          )}

          <div className="absolute top-3 left-3">
            <Chip
              color={
                category === "ed"
                  ? "warning"
                  : category === "control"
                  ? "danger"
                  : category === "performance"
                  ? "success"
                  : "default"
              }
              variant="flat"
              size="sm"
              className="text-xs"
            >
              {getCategoryLabel()}
            </Chip>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <div className="mb-auto">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 transition-colors duration-200 line-clamp-2 group-hover:text-primary">
              {title}
            </h3>
            {(brand || generic) && (
              <div className="flex gap-2 mb-2 text-xs text-gray-500">
                {brand && <span>{brand}</span>}
                {brand && generic && <span>•</span>}
                {generic && <span>{generic}</span>}
              </div>
            )}
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">
              {truncateDescription(description, 80)}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${discountedPrice}
                </span>
                {discountPercentage > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${price}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">Price per pill</span>
            </div>

            <motion.div
              className="flex items-center justify-center w-full h-10 mt-3 font-medium transition-colors duration-300 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Details
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // List view card
  return (
    <motion.div
      className="flex overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-md hover:border-gray-300"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="relative flex-shrink-0 overflow-hidden w-36 sm:w-48 h-36 sm:h-48">
        <motion.img
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-500"
          src={mainImage}
          alt={title}
          whileHover={{ scale: 1.05 }}
        />

        {discountPercentage > 0 && (
          <div className="absolute z-10 top-2 right-2">
            <Chip
              color="danger"
              size="sm"
              variant="solid"
              className="font-semibold shadow-lg"
            >
              {discountPercentage}% OFF
            </Chip>
          </div>
        )}

        <div className="absolute top-2 left-2">
          <Chip
            color={
              category === "ed"
                ? "warning"
                : category === "control"
                ? "danger"
                : category === "performance"
                ? "success"
                : "default"
            }
            variant="flat"
            size="sm"
            className="text-xs"
          >
            {getCategoryLabel()}
          </Chip>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="mb-auto">
          <h3 className="mb-1 text-xl font-semibold text-gray-800 transition-colors duration-200 group-hover:text-primary">
            {title}
          </h3>
          {(brand || generic) && (
            <div className="flex gap-2 mb-2 text-sm text-gray-500">
              {brand && <span>{brand}</span>}
              {brand && generic && <span>•</span>}
              {generic && <span>{generic}</span>}
            </div>
          )}
          <p className="mb-3 text-sm text-gray-600 line-clamp-3">
            {truncateDescription(description, 150)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${discountedPrice}
              </span>
              {discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${price}
                </span>
              )}
              <span className="text-xs text-gray-500">per pill</span>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center px-6 py-2 font-medium transition-colors duration-300 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ShopCard;
