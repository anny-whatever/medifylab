import React from "react";
import { Button } from "@nextui-org/react";

// function CardComponent({ img, title, price, discountPercent }) {
function CardComponent() {
  // console.log(img, title, price, discountPercent);
  return (
    <div
      className="flex flex-col h-full p-5 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group hover:border-transparent hover:shadow-lg rounded-xl"
      href="#"
    >
      <div className="aspect-w-16 aspect-h-11">
        <img
          className="object-cover w-full rounded-xl"
          src="https://images.unsplash.com/photo-1562851529-c370841f6536?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80"
          alt="Image Description"
        />
      </div>
      <div className="my-2">
        <h3 className="text-xl font-semibold text-gray-600">Modafnil-100mg</h3>
        <p className="flex flex-col mt-1 text-gray-600">
          <span className="mr-1 font-displaybold ">
            <span className="mr-2 text-xl text-red-600 font-displaylight">
              -50%
            </span>
            <span className="text-2xl font-displaybold text-primary">$5</span>
            <span className="text-md text-primary">/pill</span>
          </span>
          <span className="font-displaylight">
            MRP: <span className="line-through ">$10/pill</span>
          </span>
        </p>
      </div>
      <Button className="view" color="secondary">
        View
      </Button>
    </div>
  );
}

export default CardComponent;
