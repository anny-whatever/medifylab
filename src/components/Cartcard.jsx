import React from "react";
import { Button } from "@nextui-org/react";

function Cartpanel() {
  return (
    <div className="flex flex-col w-11/12 mx-auto mb-3 duration-200 ease-in-out md:flex-col hover:shadow-lg rounded-xl">
      <div className="flex flex-col w-full overflow-hidden border-gray-200 sm:flex-row cartCard h-fit border-1 rounded-xl">
        <div className="hidden w-full sm:block h-44 sm:max-w-52 sm:min-w-44 bg-slate-500 prodImg">
          <img
            src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg"
            alt="abcd"
            className="object-cover "
          />
        </div>
        <div className="flex justify-between w-full p-3 bg-gradient-to-t from-[#ffffff] to-[#ffffff88] sm:bg-white">
          <div className="flex flex-col justify-between ml-2 prodInfo">
            <div className="div">
              <div className="mt-3 text-xl title">Modafinin-100mg</div>
              <div className="mt-2 quantity">Qty: 60 Pills</div>
            </div>
            <Button className="mb-3 delete w-fit" color="danger" variant="flat">
              Remove
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col items-end justify-between mt-3 mr-3 md:items-center jus prodInfo">
            <div className="flex flex-col price">
              <span className="mr-1 font-displaybold ">
                <span className="mr-2 text-xl text-red-600 font-displaylight">
                  -50%
                </span>
                <span className="text-2xl font-displaybold text-primary">
                  $5
                </span>
                <span className="text-md text-primary">/pill</span>
              </span>
              <span className="font-displaylight">
                MRP: <span className="line-through ">$10/pill</span>
              </span>
            </div>
            <div className="flex flex-row items-center justify-center mb-3 sm:flex-col-reverse md:flex-row counter">
              <Button isDisabled={true} size="sm" variant="flat" color="danger">
                -
              </Button>
              <span className="mx-3">1</span>
              <Button size="sm" variant="flat" color="secondary">
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpanel;
