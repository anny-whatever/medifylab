import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext.js";

import { Button } from "@nextui-org/react";
import { toast, Toaster } from "sonner";

import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../utils/config.js";

function DeleteProduct() {
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

  const productsPerPage = 8;
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

  const handleDeleteProduct = async (productObject) => {
    const deleteRef = doc(db, "site", "products");
    await updateDoc(deleteRef, {
      productsArray: arrayRemove(productObject),
    });
    toast.success("Product Deleted");
  };
  return (
    <div className="flex flex-col justify-center w-full md:flex-col ">
      <Toaster richColors={true} />
      <div className="flex flex-col justify-center w-full gap-x-7 md:flex-row">
        <div className="w-11/12 p-5 mx-auto my-5 shadow-lg md:w-3/5 md:mx-0 border-1 rounded-xl">
          <h1 className="mb-5 text-xl font-bold  text-[#1F2937]">
            All Products
          </h1>

          {currentProducts?.map((product) => {
            return (
              <div
                key={product.uuid}
                className="block mb-3 border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none dark:border-neutral-700"
                href="#"
              >
                <div className="relative flex items-center overflow-hidden">
                  <img
                    className="absolute inset-0 object-cover w-32 h-full sm:w-48 rounded-s-lg"
                    src={product.mainImage}
                    alt="Blog Image"
                  />
                  <div className="p-4 grow ms-32 sm:ms-48">
                    <div className="flex flex-col justify-center min-h-24">
                      <p className="text-2xl">{product.name}</p>
                      <p className="flex flex-col mt-1 text-gray-600">
                        <span className="mr-1 font-displaybold ">
                          <span className="mr-2 text-xl text-red-600 font-displaylight">
                            -
                            {(
                              ((product.price - product.discount) /
                                product.price) *
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
                          <span className="line-through ">
                            ${product.price}/pill
                          </span>
                        </span>
                      </p>
                    </div>
                    <Button
                      className="w-fit "
                      onClick={() => {
                        handleDeleteProduct(product);
                      }}
                      color="danger"
                      variant="flat"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* <Shopcard
          // key={product.uuid}
          // title={product.name}
          // price={product.price}
          // discountedPrice={product.discount}
          // description={product.description}
          // mainImage={product.mainImage}
          /> */}
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

export default DeleteProduct;
