import React from "react";

import { Button } from "@nextui-org/react";
function Shopcard() {
  return (
    <div className="flex p-3 mb-5 duration-300 ease-in-out cursor-pointer h-52 rounded-xl hover border-1 hover:shadow-lg">
      <div className="relative flex-shrink-0 overflow-hidden w-36 sm:w-56 rounded-xl h-44">
        <img
          className="absolute top-0 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 size-full start-0 rounded-xl"
          src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Image Description"
        />
      </div>
      <div className="px-4 mt-0 grow sm:ms-6 sm:px-0">
        <h3 className="mt-2 text-xl font-semibold text-gray-800 group-hover:text-gray-600">
          Modafnil-100mg
        </h3>
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
        <p className="h-16 mt-0.5 text-sm text-gray-600 line-clamp-3 text-wrap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quas
          quae quasi fuga? Consequatur quos omnis facere odit nemo vel quod,
          deserunt ducimus praesentium nisi, earum,zfdsf sequi ad modi qui.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quas
          quae quasi fuga? Czdfsdfsdfonsequatur quos omnis facere odit nemo vel
          quod, deserunt ducimus praesentium nisi, earum, sequi ad modi qui.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quas
          quae quasi fuga? Consequatur quos omnis facere odit nemo vel quod,
          deserunt ducimus praesentium nisi, earum, sequi ad modi qui. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Aliquam quas quae
          quasi fuga? Consequatur quos omnis facere odit nemo vel quod, deserunt
          ducimus praesentium nisi, earum, sequi ad modi qui. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Aliquam quas quae quasi fuga?
          Consequatur quos omnis facere odit nemo vel quod, deserunt ducimus
          praesentium nisi, earum, sequi ad modi qui. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Aliquam quas quae quasi fuga?
          Consequatur quos omnis facere odit nemo vel quod, deserunt ducimus
          praesentium nisi, earum, sequi ad modi qui.
        </p>
        {/* <Button className="my-3 view" color="secondary">
            View
          </Button> */}
      </div>
    </div>
  );
}

export default Shopcard;
