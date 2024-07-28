import React from "react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import { db } from "../utils/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { DataContext } from "../utils/dataContext";
import { AuthContext } from "../utils/authContext";
import { Toaster, toast } from "sonner";
function Cartpanel({ cartpid, pid, qty, route, pack, price }) {
  const { products } = useContext(DataContext);
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState([]);
  const [localQty, setLocalQty] = useState();

  useEffect(() => {
    const productDetails = products?.productsArray?.filter((product) => {
      return product.uuid === pid;
    });
    setProductDetails(productDetails?.[0]);
    console.log("sfihsdiuf");
  }, [products]);

  const incrementQtyLocal = () => {
    let array = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the index of the object to update
    const index = array.findIndex((obj) => obj.cartpid === cartpid);
    console.log(index);
    if (index !== -1) {
      // Update the key in the found object
      array[index]["qty"] = array[index]["qty"] + 1;

      // Save the updated array back to local storage
      setLocalQty(array[index]["qty"]);
      localStorage.setItem("cart", JSON.stringify(array));
      toast.success("Item Quantity Increased successfully");
      window.location.reload();
      return true; // Update successful
    }

    window.location.reload();
  };

  const decrementQtyLocal = () => {
    let array = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the index of the object to update
    const index = array.findIndex((obj) => obj.cartpid === cartpid);
    console.log(index);
    if (index !== -1) {
      // Update the key in the found object
      array[index]["qty"] = array[index]["qty"] - 1;

      // Save the updated array back to local storage
      setLocalQty(array[index]["qty"]);
      localStorage.setItem("cart", JSON.stringify(array));
      toast.success("Item Quantity Decreased successfully");
      window.location.reload();
      return true; // Update successful
    }

    window.location.reload();
  };

  const removeLocal = () => {
    let array = JSON.parse(localStorage.getItem("cart")) || [];
    const index = array.findIndex((obj) => obj.cartpid === cartpid);
    let updatedCart = [...array.slice(0, index), ...array.slice(index + 1)];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Removed successfully");
    window.location.reload();
  };

  const handleRemove = async () => {
    await updateDoc(doc(db, "users", userInfo?.uid), {
      cart: arrayRemove({
        cartpid: cartpid,
        uuid: pid,
        qty: qty,
        route: route,
        pack: pack,
        price: price,
      }),
    }).catch((error) => {
      console.log(error);
    });
    toast.success("Item removed successfully");
  };

  const handleIncrementQty = async () => {
    updateDoc(doc(db, "users", userInfo?.uid), {
      cart: arrayUnion({
        cartpid: cartpid,
        uuid: pid,
        qty: qty + 1,
        route: route,
        pack: pack,
        price: price,
      }),
    });
    updateDoc(doc(db, "users", userInfo?.uid), {
      cart: arrayRemove({
        cartpid: cartpid,
        uuid: pid,
        qty: qty,
        route: route,
        pack: pack,
        price: price,
      }),
    });
    toast.success("Item Quantity Increased successfully");
    // window.location.reload();
  };

  const handleDecrementQty = async () => {
    updateDoc(doc(db, "users", userInfo?.uid), {
      cart: arrayUnion({
        cartpid: cartpid,
        uuid: pid,
        qty: qty - 1,
        route: route,
        pack: pack,
        price: price,
      }),
    });
    updateDoc(doc(db, "users", userInfo?.uid), {
      cart: arrayRemove({
        cartpid: cartpid,
        uuid: pid,
        qty: qty,
        route: route,
        pack: pack,
        price: price,
      }),
    });
    toast.success("Item Quantity Decreased successfully");
    // window.location.reload();
  };

  const isBtnDisabled = () => {
    if (localQty) {
      return localQty <= 1 ? true : false;
    } else {
      return qty <= 1 ? true : false;
    }
  };
  return (
    <>
      <Toaster richColors />
      <div className="flex flex-col w-11/12 mx-auto mb-3 duration-200 ease-in-out md:flex-col hover:shadow-lg rounded-xl">
        <div className="flex flex-col w-full overflow-hidden border-gray-200 sm:flex-row cartCard h-fit border-1 rounded-xl">
          <div className="hidden w-full sm:block min-h-44 sm:max-w-52 sm:min-w-44 bg-slate-500 prodImg">
            <img
              src={productDetails?.mainImage}
              alt={productDetails?.name}
              className="object-cover"
            />
          </div>
          <div className="flex justify-between w-full p-3 bg-gradient-to-t from-[#ffffff] to-[#ffffff88] sm:bg-white">
            <div className="flex flex-col justify-between ml-2 prodInfo">
              <div className="div">
                <div className="mt-3 text-xl title">{productDetails?.name}</div>
                <div className="mt-2 quantity">Pack size: {pack} Pills</div>
                <div className="mt-2 quantity">
                  Route: {route === "intous" ? "India to US" : "US to US"}
                </div>
              </div>
              <Button
                className="mb-3 delete w-fit"
                color="danger"
                variant="flat"
                onClick={isLoggedIn ? handleRemove : removeLocal}
              >
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
                    -
                    {(
                      ((productDetails?.price - productDetails?.discount) /
                        productDetails?.price) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                  <span className="text-2xl font-displaybold text-primary">
                    ${productDetails?.discount}
                  </span>
                  <span className="text-md text-primary">/pill</span>
                </span>
                <span className="font-displaylight">
                  MRP:{" "}
                  <span className="line-through ">
                    ${productDetails?.price}/pill
                  </span>
                </span>
              </div>
              <div className="flex flex-row items-center justify-center mb-3 sm:flex-col-reverse md:flex-row counter">
                <Button
                  isDisabled={isBtnDisabled()}
                  size="sm"
                  className="bg-transparent hover:bg-red-500 hover:bg-opacity-30"
                  onClick={isLoggedIn ? handleDecrementQty : decrementQtyLocal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </Button>
                <span className="mx-3">{localQty ? localQty : qty}</span>
                <Button
                  size="sm"
                  className="bg-transparent hover:bg-green-500 hover:bg-opacity-30"
                  onClick={isLoggedIn ? handleIncrementQty : incrementQtyLocal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cartpanel;
