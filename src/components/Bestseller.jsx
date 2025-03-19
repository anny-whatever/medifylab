// src/components/Bestseller.jsx
import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext";
import { Link } from "react-router-dom";

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
      {/* Card Blog */}
      <motion.div
        className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto"
        id="bestseller"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Grid */}
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

        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-y-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Card */}
          {products?.productsArray
            ?.sort((a, b) => b.discount - b.discount)
            ?.slice(0, 4)
            ?.map((product, index) => (
              <motion.div
                key={product.uuid}
                className="overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-sm cursor-pointer group rounded-xl hover:shadow-xl"
                variants={item}
                whileHover={{
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className="sm:flex">
                  <div className="relative flex-shrink-0 w-full overflow-hidden rounded-xl sm:w-56 h-44">
                    <motion.img
                      className="absolute top-0 object-cover w-full h-full rounded-l-xl"
                      src={product.mainImage}
                      alt={product.name}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute z-10 top-2 right-2">
                      <div className="px-2 py-1 text-xs font-bold text-white uppercase bg-red-500 rounded-full">
                        {(
                          ((product.price - product.discount) / product.price) *
                          100
                        ).toFixed(0)}
                        % off
                      </div>
                    </div>
                  </div>
                  <div className="p-4 px-4 mt-4 grow sm:mt-0 sm:ms-6 sm:px-0">
                    <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">
                      {product.name}
                    </h3>
                    <div className="flex flex-col mt-3">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary">
                          ${product.discount}
                        </span>
                        <span className="ml-1 text-sm text-primary">/pill</span>
                      </div>
                      <span className="mt-1 text-sm text-gray-500">
                        MRP:{" "}
                        <span className="line-through">${product.price}</span>
                      </span>
                    </div>
                    <div className="mt-4">
                      <Link to={`/product/${product.uuid}`}>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Button
                            className="text-white shadow-md bg-secondary"
                            radius="lg"
                          >
                            View Details
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 ml-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
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
        {/* End Grid */}
      </motion.div>
      {/* End Card Blog */}
    </>
  );
}

export default Bestseller;
