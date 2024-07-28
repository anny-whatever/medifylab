import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import Cartcard from "./Cartcard";
import { DataContext } from "../utils/dataContext";
import { AuthContext } from "../utils/authContext.js";
import { useContext } from "react";
function Cartpanel() {
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const { products } = useContext(DataContext);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingIndia, setShippingIndia] = useState(0);
  const [shippingUs, setShippingUs] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      const productDetails = JSON.parse(localStorage.getItem("cart"));
      setCart(productDetails);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function checkRoutes(array) {
      let hasIntous = false;
      let hasUstous = false;

      if (array?.length > 0) {
        for (const obj of array) {
          if (obj.route === "intous") {
            hasIntous = true;
          } else if (obj.route === "ustous") {
            hasUstous = true;
          }

          // setSubtotal(obj.qty * productDetails?.discount + Subtotal);
        }
      }

      if (hasIntous) {
        setShippingIndia(40);
      }

      if (hasUstous) {
        setShippingUs(70);
      }
    }
    if (!userData?.cart) {
      checkRoutes(cart);
    } else {
      checkRoutes(userData?.cart);
    }

    function calculateTotal(array) {
      const subtotal = array?.reduce((total, item) => {
        const itemTotal = item.qty * item.price * item.pack;
        return total + itemTotal;
      }, 0);
      console.log(subtotal);
      setSubtotal(subtotal);
    }

    if (!userData?.cart) {
      calculateTotal(cart);
    } else {
      calculateTotal(userData?.cart);
    }
  }, [cart]);
  // console.log(userData);
  return (
    <>
      <div className="w-3/5 pl-3 mx-auto mt-5 mb-10 text-center lg:mb-6">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight text-primary">
          Shopping cart
        </h2>
        {userData?.cart?.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">Your cart is empty</p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Your cart contains{" "}
            {isLoggedIn ? userData?.cart?.length : cart?.length} item(s)
          </p>
        )}

        {/* <hr className="mt-3 border-gray-200" /> */}
      </div>

      <div className="flex flex-col justify-center w-full mb-10 lg:flex-row">
        <div className="w-full lg:w-3/5">
          {isLoggedIn == true
            ? userData?.cart
                ?.sort((a, b) => a.pack - b.pack)
                ?.map((item, index) => (
                  <Cartcard
                    cartpid={item.cartpid}
                    key={index}
                    pid={item.uuid}
                    qty={item.qty}
                    route={item.route}
                    pack={item.pack}
                  />
                ))
            : cart
                ?.sort((a, b) => a.pack - b.pack)
                ?.map((item, index) => (
                  <Cartcard
                    cartpid={item.cartpid}
                    key={index}
                    pid={item.uuid}
                    qty={item.qty}
                    route={item.route}
                    pack={item.pack}
                  />
                ))}
        </div>
        <div className="flex flex-col w-11/12 p-10 mx-auto lg:mr-5 lg:mx-0 lg:w-2/5 bg-opacity-30 h-fit rounded-xl md:sticky top-10 bg-accent xl:w-1/4 gap-y-5">
          <p className="text-xl font-semibold">Order summary</p>
          <span className="flex justify-between">
            <p>Subtotal</p>
            <p className="">${subtotal}</p>
          </span>
          <hr />
          <span className="flex justify-between text-sm">
            <p>Shipping India to US</p>
            <p className="">${shippingIndia}</p>
          </span>
          <span className="flex justify-between text-sm">
            <p>Shipping US to US</p>
            <p className="">${shippingUs}</p>
          </span>
          <hr />
          <span className="flex justify-between ">
            <p>Total Shipping</p>
            <p className="">${shippingIndia + shippingUs}</p>
          </span>
          <hr />

          <span className="flex justify-between text-xl font-semibold">
            <p>Total</p>
            <p className="">${subtotal + shippingIndia + shippingUs}</p>
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
