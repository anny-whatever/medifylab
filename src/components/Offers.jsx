import React from "react";
import { Button } from "@nextui-org/react";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext";

export default function Offers() {
  const { products } = useContext(DataContext);

  return (
    <>
      {/* Icon Blocks */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="max-w-2xl mx-auto mb-10 text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Products on sale
          </h2>
          <p className="mt-1 text-gray-600">
            Get the best deals on the best products
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Icon Block */}
          {products?.productsArray?.slice(0, 4).map((product) => (
            <div
              className="flex flex-col h-full p-5 transition-all duration-300 border border-gray-200 group hover:border-transparent hover:shadow-lg rounded-xl"
              href="#"
              key={product.uuid}
            >
              <div className="aspect-w-16 aspect-h-11">
                <img
                  className="object-cover w-full rounded-xl"
                  src={product.mainImage}
                  alt="Image Description"
                />
              </div>
              <div className="my-2">
                <h3 className="text-xl font-semibold text-gray-600">
                  {product.name}
                </h3>
                <p className="flex flex-col mt-1 text-gray-600 top-full">
                  <span className="mr-1 font-displaybold ">
                    <span className="mr-2 text-xl text-red-600 font-displaylight">
                      -
                      {(
                        ((product.price - product.discount) / product.price) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                    <span className="text-2xl font-displaybold text-primary">
                      ${product.discount}
                    </span>
                    <span className="text-md text-primary">/pill</span>
                  </span>
                  <span className="font-displaylight">
                    MRP:{" "}
                    <span className="line-through ">${product.price}/pill</span>
                  </span>
                </p>
              </div>
              <Link to={`/product/${product.uuid}`}>
                <Button className="w-full view" color="secondary">
                  View
                </Button>
              </Link>
            </div>
          ))}
          {/* End Icon Block */}
          {/* Icon Block */}

          {/* End Icon Block */}
        </div>
        <div className="mt-12 text-center">
          <Link to="/shop">
            <a
              className="inline-flex items-center px-4 py-3 text-sm font-medium text-blue-600 bg-white border border-gray-200 rounded-full shadow-sm gap-x-1 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              See all{" "}
              <svg
                className="flex-shrink-0 size-4"
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
            </a>
          </Link>
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </>
  );
}
