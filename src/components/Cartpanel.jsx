// src/components/Cartpanel.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Progress,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Cartcard from "./Cartcard";
import { DataContext } from "../utils/dataContext";
import { AuthContext } from "../utils/authContext.js";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

function Cartpanel() {
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const { products } = useContext(DataContext);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingIndia, setShippingIndia] = useState(0);
  const [shippingUs, setShippingUs] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      const productDetails = JSON.parse(localStorage.getItem("cart"));
      setCart(productDetails);
    } else {
      setCart(userData?.cart);
    }
  }, [isLoggedIn, userData]);

  useEffect(() => {
    function checkRoutes(array) {
      let hasIntous = false;
      let hasUstous = false;
      setShippingIndia(0);
      setShippingUs(0);

      if (array?.length > 0) {
        for (const obj of array) {
          if (obj.route === "intous") {
            hasIntous = true;
          } else if (obj.route === "ustous") {
            hasUstous = true;
          }
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

      setSubtotal(subtotal || 0);
    }

    if (!userData?.cart) {
      calculateTotal(cart);
    } else {
      calculateTotal(userData?.cart);
    }
  }, [cart, userData]);

  const handlePlaceOrder = async () => {
    if (cart?.length > 0) {
      setIsCheckingOut(true);
      setTimeout(() => {
        const order = {
          orderId: uuidv4(),
          products: cart,
          total: subtotal,
          shippingIndia: shippingIndia,
          shippingUs: shippingUs,
        };
        window.location.href =
          "/checkout?orderId=" +
          order.orderId +
          "&products=" +
          JSON.stringify(order.products) +
          "&total=" +
          order.total +
          "&shippingIndia=" +
          order.shippingIndia +
          "&shippingUs=" +
          order.shippingUs +
          "&checkOutFrom=" +
          "cart";
      }, 800);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cartItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  const isCartEmpty =
    (isLoggedIn && (!userData?.cart || userData?.cart?.length === 0)) ||
    (!isLoggedIn && (!cart || cart?.length === 0));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-6xl px-4 py-10 mx-auto">
        <div className="mb-8 text-center">
          <motion.h1
            className="mb-2 text-3xl font-bold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Shopping Cart
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isCartEmpty
              ? "Your cart is empty"
              : `Your cart contains ${
                  isLoggedIn ? userData?.cart?.length : cart?.length
                } item(s)`}
          </motion.p>
        </div>

        {isCartEmpty ? (
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="mb-4 text-xl font-medium text-gray-700">
              Your shopping cart is empty
            </h2>
            <p className="max-w-md mx-auto mb-8 text-gray-500">
              Looks like you havent added any products to your cart yet.
            </p>
            <Link to="/shop">
              <Button
                color="primary"
                size="lg"
                className="font-medium"
                startContent={
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                }
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            <motion.div
              className="lg:w-2/3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {isLoggedIn
                  ? userData?.cart
                      ?.sort((a, b) => a.pack - b.pack)
                      ?.map((item, index) => (
                        <motion.div
                          key={item.cartpid}
                          variants={cartItemVariants}
                          exit="exit"
                          layout
                        >
                          <Cartcard
                            cartpid={item.cartpid}
                            pid={item.uuid}
                            qty={item.qty}
                            price={item.price}
                            route={item.route}
                            pack={item.pack}
                          />
                        </motion.div>
                      ))
                  : cart
                      ?.sort((a, b) => a.pack - b.pack)
                      ?.map((item, index) => (
                        <motion.div
                          key={item.cartpid}
                          variants={cartItemVariants}
                          exit="exit"
                          layout
                        >
                          <Cartcard
                            cartpid={item.cartpid}
                            pid={item.uuid}
                            price={item.price}
                            qty={item.qty}
                            route={item.route}
                            pack={item.pack}
                          />
                        </motion.div>
                      ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="lg:w-1/3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="sticky top-20">
                <CardHeader className="flex-col items-start px-6 pt-4 pb-0">
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Summary
                  </h2>
                </CardHeader>
                <CardBody className="py-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium">
                      ${parseFloat(subtotal).toFixed(2)}
                    </span>
                  </div>

                  <Divider className="my-2" />

                  {shippingIndia > 0 ? (
                    <div className="flex items-start justify-between py-2">
                      <div>
                        <p className="text-gray-700">Shipping India to US</p>
                        <p className="text-xs text-gray-500">
                          15-21 working days
                        </p>
                      </div>
                      <span className="font-medium">
                        ${parseFloat(shippingIndia).toFixed(2)}
                      </span>
                    </div>
                  ) : null}

                  {shippingUs > 0 ? (
                    <div className="flex items-start justify-between py-2">
                      <div>
                        <p className="text-gray-700">Shipping US to US</p>
                        <p className="text-xs text-gray-500">
                          7-10 working days
                        </p>
                      </div>
                      <span className="font-medium">
                        ${parseFloat(shippingUs).toFixed(2)}
                      </span>
                    </div>
                  ) : null}

                  <Divider className="my-2" />

                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Total Shipping</span>
                    <span className="font-medium">
                      ${(shippingIndia + shippingUs).toFixed(2)}
                    </span>
                  </div>

                  <Divider className="my-3" />

                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      $
                      {parseFloat(
                        subtotal + shippingIndia + shippingUs
                      ).toFixed(2)}
                    </span>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    color="secondary"
                    className="w-full py-6 font-medium text-md"
                    onClick={handlePlaceOrder}
                    isLoading={isCheckingOut}
                    disabled={isCheckingOut}
                    startContent={
                      !isCheckingOut && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )
                    }
                  >
                    Checkout
                  </Button>
                </CardFooter>
              </Card>

              <div className="p-4 mt-4 border rounded-lg bg-primary/5 border-primary/20">
                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="mb-1 text-sm text-gray-700">
                      Need help with your order?
                    </p>
                    <p className="text-xs text-gray-600">
                      Contact our customer support at{" "}
                      <span className="font-medium text-primary">
                        support@medifylab.com
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Cartpanel;
