import React from "react";
import { useState, useEffect } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext.js";
import { Link } from "react-router-dom";

import Shopcard from "./Shopcard";
function Shoppanel() {
  const { products } = useContext(DataContext);
  const [category, setCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    let productsArray = [];
    products?.productsArray?.map((product) => {
      if (product.category === category || category === "all") {
        productsArray.push(product);
      }
    });
    setFilteredProducts(productsArray);
  }, [category, products]);

  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  useEffect(() => {
    // Get the products for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const current = filteredProducts?.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setCurrentProducts(current);
  }, [currentPage, filteredProducts, products]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="flex flex-col justify-center w-full md:flex-col ">
      <div className="flex flex-col justify-center w-full gap-x-7 md:flex-row">
        <div className="sticky hidden w-11/12 p-5 mx-auto my-5 shadow-md md:block md:w-2/6 lg:w-1/5 md:mx-0 border-1 h-fit top-5 rounded-xl">
          <h1 className="mb-5 text-2xl font-bold text-primary sm:text-2xl border-b-1">
            Categories
          </h1>
          <div className="flex md:flex-col">
            <RadioGroup
              label="Select product catergory"
              defaultValue={"all"}
              onChange={(value) => setCategory(value.target.value)}
              color="secondary"
            >
              <Radio value="all">All</Radio>
              <Radio value="ed">Erectile Dysfunction</Radio>
              <Radio value="control">Painkillers and more</Radio>
              <Radio value="performance">Performance / Power</Radio>
              <Radio value="other">Others</Radio>
            </RadioGroup>
          </div>
        </div>
        <div className="w-11/12 p-2 mx-auto my-5 shadow-md md:hidden md:mx-0 catSide border-1 h-fit top-5 rounded-xl">
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
                  onChange={(value) => setCategory(value.target.value)}
                  color="secondary"
                  className="text-base font-normal text-primary"
                >
                  <Radio value="all">All</Radio>
                  <Radio value="ed">Erectile Dysfunction</Radio>
                  <Radio value="control">Painkillers and more</Radio>
                  <Radio value="performance">Performance / Power</Radio>
                  <Radio value="other">Others</Radio>
                </RadioGroup>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-11/12 p-5 mx-auto my-5 shadow-lg md:w-3/5 md:mx-0 border-1 rounded-xl">
          <h1 className="mb-5 text-2xl font-bold text-primary sm:text-2xl border-b-1 ">
            {category === "all" ? "All Products" : null}
            {category === "ed" ? "Erectile Dysfunction" : null}
            {category === "control" ? "Painkillers and more" : null}
            {category === "performance" ? "Performance / Power" : null}
            {category === "other" ? "Others" : null}
          </h1>

          {currentProducts?.map((product) => {
            if (product.category === category || category === "all") {
              return (
                <Link key={product.uuid} to={`/product/${product.uuid}`}>
                  <Shopcard
                    title={product.name}
                    price={product.price}
                    discountedPrice={product.discount}
                    description={product.description}
                    mainImage={product.mainImage}
                  />
                </Link>
              );
            }
          })}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          color="secondary"
          showControls
          initialPage={1}
          className="mx-auto my-5 "
          onChange={(e) => {
            handlePageChange(e);
          }}
        />
      )}
    </div>
  );
}

export default Shoppanel;
