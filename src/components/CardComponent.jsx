import React from "react";
import { Button } from "@nextui-org/react";

import { Link } from "react-router-dom";

function CardComponent({ image, title, price, discountPrice, uuid }) {
  return (
    <div
      className="relative flex flex-col p-5 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group hover:border-transparent hover:shadow-lg rounded-xl h-96"
      href="#"
    >
      <div className="overflow-hidden h-1/2 rounded-xl">
        <img
          className="object-cover w-full rounded-xl "
          src={image}
          alt="Image Description"
        />
      </div>
      <div className="flex flex-col justify-around w-full mt-1">
        <div className="my-2">
          <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
          <p className="flex flex-col mt-1 text-gray-600">
            <span className="mr-1 font-displaybold ">
              <span className="mr-2 text-xl text-red-600 font-displaylight">
                -{(((price - discountPrice) / price) * 100).toFixed(0)}%
              </span>
              <span className="text-2xl font-displaybold text-primary">
                ${discountPrice}
              </span>
              <span className="text-md text-primary">/pill</span>
            </span>
            <span className="font-displaylight">
              MRP: <span className="line-through ">${price}/pill</span>
            </span>
          </p>
        </div>

        <Link to={`/product/${uuid}`}>
          <Button className="absolute w-[86.5%] bottom-5" color="secondary">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CardComponent;
