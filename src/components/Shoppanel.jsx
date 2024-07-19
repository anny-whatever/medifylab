import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

import ProductCard from "./ProductCard";
function Shoppanel() {
  return (
    <div className="flex flex-col justify-center w-full md:flex-col ">
      <div className="flex flex-col justify-center w-full gap-x-7 md:flex-row">
        <div className="sticky hidden w-11/12 p-5 mx-auto my-5 md:block md:w-2/6 lg:w-1/5 md:mx-0 border-1 h-fit top-5 rounded-xl">
          <h1 className="mb-5 text-2xl font-bold text-primary sm:text-2xl border-b-1">
            Categories
          </h1>
          <div className="flex md:flex-col">
            <RadioGroup
              label="Select product catergory"
              defaultValue={"all"}
              // onChange={(value) => console.log(value.target.value)}
              color="secondary"
            >
              <Radio value="all">All</Radio>
              <Radio value="ed">E.D.</Radio>
              <Radio value="control">Control</Radio>
              <Radio value="performance">Performance / Power</Radio>
              <Radio value="other">Others</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="w-11/12 p-2 mx-auto my-5 md:hidden md:mx-0 catSide border-1 h-fit top-5 rounded-xl">
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Categories"
              startContent="Categories"
              className="p-0 text-2xl font-bold text-primary "
            >
              <div className="flex md:flex-col">
                <RadioGroup
                  label="Select product catergory"
                  defaultValue={"all"}
                  // onChange={(value) => console.log(value.target.value)}
                  color="secondary"
                  className="text-base font-normal text-primary"
                >
                  <Radio value="all">All</Radio>
                  <Radio value="ed">E.D.</Radio>
                  <Radio value="control">Control</Radio>
                  <Radio value="performance">Performance / Power</Radio>
                  <Radio value="other">Others</Radio>
                </RadioGroup>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-11/12 p-5 mx-auto my-5 shadow-lg md:w-3/5 md:mx-0 border-1 rounded-xl">
          <h1 className="mb-5 text-2xl font-bold text-primary sm:text-2xl border-b-1 ">
            All Products
          </h1>

          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <Pagination
        total={3}
        color="secondary"
        showControls
        initialPage={1}
        className="mx-auto my-5 "
      />
    </div>
  );
}

export default Shoppanel;
