import React from "react";
import { Button } from "@nextui-org/react";

function RelatedProducts() {
  return (
    <>
      {/* Icon Blocks */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="max-w-2xl mb-10 text-left lg:mb-6">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-primary">
            Related Products
          </h2>
          <p className="mt-1 text-gray-600">
            Products that are similar to the one you are looking for
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Icon Block */}
          <div
            className="flex flex-col h-full p-5 transition-all duration-300 border border-gray-200 group hover:border-transparent hover:shadow-lg rounded-xl"
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
              <h3 className="text-xl font-semibold text-gray-600">
                Modafnil-100mg
              </h3>
              <p className="flex flex-col mt-1 text-gray-600">
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
              </p>
            </div>
            <Button className="view" color="secondary">
              View
            </Button>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div
            className="flex flex-col h-full p-5 transition-all duration-300 border border-gray-200 group hover:border-transparent hover:shadow-lg rounded-xl"
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
              <h3 className="text-xl font-semibold text-gray-600">
                Modafnil-100mg
              </h3>
              <p className="flex flex-col mt-1 text-gray-600">
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
              </p>
            </div>
            <Button className="view" color="secondary">
              View
            </Button>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div
            className="flex flex-col h-full p-5 transition-all duration-300 border border-gray-200 group hover:border-transparent hover:shadow-lg rounded-xl"
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
              <h3 className="text-xl font-semibold text-gray-600">
                Modafnil-100mg
              </h3>
              <p className="flex flex-col mt-1 text-gray-600">
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
              </p>
            </div>
            <Button className="view" color="secondary">
              View
            </Button>
          </div>
          <div
            className="flex flex-col h-full p-5 transition-all duration-300 border border-gray-200 group hover:border-transparent hover:shadow-lg rounded-xl"
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
              <h3 className="text-xl font-semibold text-gray-600">
                Modafnil-100mg
              </h3>
              <p className="flex flex-col mt-1 text-gray-600">
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
              </p>
            </div>
            <Button className="view" color="secondary">
              View
            </Button>
          </div>
          {/* End Icon Block */}
        </div>
        <div className="mt-12 text-center">
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
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </>
  );
}

export default RelatedProducts;
