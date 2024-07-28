import React from "react";

import { Button } from "@nextui-org/react";
function Shopcard({ title, price, discountedPrice, description, mainImage }) {
  return (
    <div className="flex p-3 mb-5 duration-300 ease-in-out cursor-pointer min:h-52 rounded-xl hover border-1 hover:shadow-lg">
      <div className="relative flex-shrink-0 overflow-hidden w-36 sm:w-56 rounded-xl h-44">
        <img
          className="absolute top-0 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 size-full start-0 rounded-xl"
          src={mainImage}
          alt="Image Description"
        />
      </div>
      <div className="px-4 mt-0 overflow-hidden grow sm:ms-6 sm:px-0">
        <h3 className="mt-2 text-lg font-semibold text-gray-800 sm:text-xl max-w-64 group-hover:text-gray-600">
          {title}
        </h3>
        <p className="flex flex-col mt-1 text-gray-600">
          <span className="mr-1 font-displaybold ">
            <span className="mr-2 text-xl text-red-600 font-displaylight">
              -{(((price - discountedPrice) / price) * 100).toFixed(0)}%
            </span>
            <span className="text-2xl font-displaybold text-primary">
              ${discountedPrice}
            </span>
            <span className="text-md text-primary">/pill</span>
          </span>
          <span className="font-displaylight">
            MRP: <span className="line-through ">${price}/pill</span>
          </span>
        </p>
        <p className="h-16 mt-0.5 text-sm text-gray-600 break-words line-clamp-3 text-wrap">
          {description}
        </p>
        {/* <Button className="my-3 view" color="secondary">
            View
          </Button> */}
      </div>
    </div>
  );
}

export default Shopcard;
