import React from "react";
import Productpanel from "../components/Productpanel";
import RelatedProducts from "../components/RelatedProducts";
import { useState, useEffect } from "react";

function Product() {
  // const queryParams = new URLSearchParams(window.location.search);
  // const productid = queryParams.get("productid");

  return (
    <div>
      <Productpanel />
    </div>
  );
}

export default Product;
