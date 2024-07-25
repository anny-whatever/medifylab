import React from "react";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext.js";

import Shopcard from "./Shopcard";
import { Button } from "@nextui-org/react";

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
  };
  return (
    <div className="flex flex-col justify-center w-full md:flex-col ">
      <div className="flex flex-col justify-center w-full gap-x-7 md:flex-row">
        <div className="w-11/12 p-5 mx-auto my-5 shadow-lg md:w-3/5 md:mx-0 border-1 rounded-xl">
          <h1 className="mb-5 text-xl font-bold  text-[#1F2937]">
            All Products
          </h1>

          {currentProducts?.map((product) => {
            if (product.category === category || category === "all") {
              return (
                <div
                  key={product.uuid}
                  className="grid w-full grid-flow-col grid-cols-1"
                >
                  <Shopcard
                    key={product.uuid}
                    title={product.name}
                    price={product.price}
                    discountedPrice={product.discount}
                    description={product.description}
                    mainImage={product.mainImage}
                  />
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleDeleteProduct(product);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            }
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
