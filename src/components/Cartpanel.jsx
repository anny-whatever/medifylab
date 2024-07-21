import React from "react";
import { Button } from "@nextui-org/react";

import Cartcard from "./Cartcard";
function Cartpanel() {
  return (
    <>
      <div className="w-3/5 pl-3 mx-auto mt-5 mb-10 text-center lg:mb-6">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight text-primary">
          Shopping cart
        </h2>
        <p className="mt-2 text-sm text-gray-500">Your cart is empty</p>
        {/* <hr className="mt-3 border-gray-200" /> */}
      </div>

      <div className="flex flex-col justify-center w-full mb-10 lg:flex-row">
        <div className="w-full lg:w-3/5">
          <Cartcard />
          <Cartcard />
          <Cartcard />
          <Cartcard />
          <Cartcard />
          <Cartcard />
        </div>
        <div className="flex flex-col w-11/12 p-10 mx-auto lg:mr-5 lg:mx-0 lg:w-2/5 bg-opacity-30 h-fit rounded-xl md:sticky top-10 bg-accent xl:w-1/4 gap-y-5">
          <p className="text-xl font-semibold">Order summary</p>
          <span className="flex justify-between">
            <p>Subtotal</p>
            <p className="">$100</p>
          </span>
          <hr />
          <span className="flex justify-between">
            <p>Shipping</p>
            <p className="">$20</p>
          </span>
          <hr />

          <span className="flex justify-between">
            <p>Tax</p>
            <p className="">$5</p>
          </span>
          <hr />

          <span className="flex justify-between text-xl font-semibold">
            <p>Total</p>
            <p className="">$125</p>
          </span>
          <Button color="primary" className="w-full mt-5">
            Place order
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cartpanel;
