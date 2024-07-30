import React from "react";
import { Button } from "@nextui-org/react";

import { useContext } from "react";
import { DataContext } from "../utils/dataContext";

import { Link } from "react-router-dom";
function Bestseller() {
  const { products } = useContext(DataContext);
  return (
    <>
      {/* Card Blog */}
      <div
        className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
        id="bestseller"
      >
        {/* Grid */}
        <div className="max-w-2xl mx-auto mb-10 text-center lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Best selling products
          </h2>
          <p className="mt-1 text-gray-600">
            Get the best deals on the best products
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-y-16">
          {/* Card */}
          {products?.productsArray?.slice(3, 4).map((product) => (
            <a
              key={product.uuid}
              className="overflow-hidden transition-all duration-300 ease-in-out shadow-sm cursor-pointer group rounded-xl hover:shadow-lg"
            >
              <div className="sm:flex">
                <div className="relative flex-shrink-0 w-full overflow-hidden rounded-xl sm:w-56 h-44">
                  <img
                    className="absolute top-0 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 size-full start-0 rounded-xl"
                    src={product.mainImage}
                    alt="Image Description"
                  />
                </div>
                <div className="px-4 mt-4 grow sm:mt-0 sm:ms-6 sm:px-0">
                  <h3 className="mt-2 text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                    {product.name}
                  </h3>
                  <p className="flex flex-col mt-1 text-gray-600">
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
                      <span className="line-through ">${product.price}</span>
                    </span>
                  </p>
                  <Link to={`/product/${product.uuid}`}>
                    <Button className="my-3  view" color="secondary">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </a>
          ))}
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
      {/* End Card Blog */}
    </>
  );
}

export default Bestseller;
