import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext";
import ProductCard from "./ProductCard";

export default function Offers() {
  const { products } = useContext(DataContext);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Products on Sale Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mx-auto mb-10 text-center lg:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Products on sale
          </h2>
          <p className="mt-3 text-gray-600">
            Get the best deals on the best products
          </p>
          <motion.div
            className="w-20 h-1 mx-auto mt-4 rounded-full bg-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {products?.productsArray
            ?.sort(
              (a, b) =>
                (b.price - b.discount) / b.price -
                (a.price - a.discount) / a.price
            )
            .slice(0, 4)
            ?.map((product) => (
              <motion.div key={product.uuid} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
        </motion.div>

        {/* See All Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/shop">
            <motion.div
              className="inline-flex items-center px-6 py-3 text-sm font-medium bg-white border border-gray-200 rounded-full shadow-sm text-primary gap-x-2 hover:bg-gray-50 hover:text-secondary"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              See all products
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
