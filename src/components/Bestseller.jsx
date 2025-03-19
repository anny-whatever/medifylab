// src/components/Bestseller.jsx
import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function Bestseller() {
  const { products } = useContext(DataContext);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Best Sellers Section */}
      <motion.div
        className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto"
        id="bestseller"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mx-auto mb-10 text-center lg:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Best selling products
          </h2>
          <p className="mt-3 text-gray-600">
            Top rated products with the highest customer satisfaction
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
            ?.sort((a, b) => b.discount - b.discount)
            ?.slice(0, 4)
            ?.map((product) => (
              <motion.div key={product.uuid} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
        </motion.div>

        {/* See All Button */}
        <div className="mt-12 text-center">
          <Link to="/shop">
            <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white transition-all duration-300 border border-transparent rounded-full shadow-md bg-primary gap-x-2 hover:bg-secondary"
            >
              See all products
              <svg
                className="flex-shrink-0 size-4 animate-pulse"
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
        </div>
      </motion.div>
    </>
  );
}

export default Bestseller;
