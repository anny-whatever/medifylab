// src/components/CardComponent.jsx
import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CardComponent({ image, title, price, discountPrice, uuid }) {
  return (
    <motion.div
      className="relative flex flex-col p-5 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group hover:border-transparent hover:shadow-lg rounded-xl h-96"
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="overflow-hidden h-1/2 rounded-xl">
        <motion.img
          className="object-cover w-full h-full rounded-xl"
          src={image}
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex flex-col justify-around w-full mt-1">
        <div className="my-2">
          <h3 className="text-xl font-semibold text-gray-700 transition-colors duration-300 line-clamp-2 group-hover:text-primary">
            {title}
          </h3>
          <div className="flex flex-col mt-2">
            <div className="flex items-center">
              <motion.span
                className="mr-2 text-2xl font-bold text-primary"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ${discountPrice}
              </motion.span>
              <span className="text-sm text-primary">/pill</span>
              <span className="ml-2 text-sm text-red-600 font-medium px-2 py-0.5 bg-red-100 rounded-full">
                -{(((price - discountPrice) / price) * 100).toFixed(0)}%
              </span>
            </div>
            <span className="mt-1 text-sm text-gray-500">
              MRP: <span className="line-through">${price}/pill</span>
            </span>
          </div>
        </div>

        <Link to={`/product/${uuid}`} className="mt-auto">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              className="w-full text-white transition-all duration-300 shadow-md bg-secondary hover:shadow-lg"
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
    </motion.div>
  );
}

export default CardComponent;
