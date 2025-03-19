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
  Tooltip,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import CartCard from "./CartCard";
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
  const [freeShippingThreshold] = useState(100); // Threshold for free shipping
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [steps, setSteps] = useState([
    { title: "Cart", active: true, completed: false },
    { title: "Checkout", active: false, completed: false },
    { title: "Confirmation", active: false, completed: false },
  ]);

  // Sample promo codes (in a real app, these would come from a database)
  const promoCodes = {
    WELCOME10: {
      discount: 0.1,
      type: "percentage",
      description: "10% off your order",
    },
    FREESHIP: { discount: 1, type: "shipping", description: "Free shipping" },
    FLAT20: { discount: 20, type: "fixed", description: "$20 off your order" },
  };

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

      // Apply free shipping if subtotal meets threshold
      if (hasIntous) {
        setShippingIndia(subtotal >= freeShippingThreshold ? 0 : 40);
      }

      if (hasUstous) {
        setShippingUs(subtotal >= freeShippingThreshold ? 0 : 70);
      }

      // Apply shipping promo if applicable
      if (appliedPromo && appliedPromo.type === "shipping") {
        setShippingIndia(0);
        setShippingUs(0);
      }
    }

    if (!userData?.cart) {
      checkRoutes(cart);
    } else {
      checkRoutes(userData?.cart);
    }

    function calculateTotal(array) {
      const subtotal = array?.reduce((total, item) => {
        const product = products?.productsArray?.find(
          (product) => product.uuid === item.uuid
        );
        if (product) {
          const itemTotal = item.qty * product.discount * item.pack;
          return total + itemTotal;
        }
        return total;
      }, 0);

      setSubtotal(subtotal || 0);
    }

    if (!userData?.cart) {
      calculateTotal(cart);
    } else {
      calculateTotal(userData?.cart);
    }
  }, [cart, userData, products, freeShippingThreshold, appliedPromo]);

  useEffect(() => {
    // Calculate promo discount
    if (appliedPromo) {
      if (appliedPromo.type === "percentage") {
        setPromoDiscount(subtotal * appliedPromo.discount);
      } else if (appliedPromo.type === "fixed") {
        setPromoDiscount(Math.min(appliedPromo.discount, subtotal)); // Don't discount more than subtotal
      } else {
        setPromoDiscount(0);
      }
    } else {
      setPromoDiscount(0);
    }
  }, [appliedPromo, subtotal]);

  const handlePlaceOrder = async () => {
    if (cart?.length > 0) {
      setIsCheckingOut(true);
      setTimeout(() => {
        const order = {
          orderId: uuidv4(),
          products: cart,
          total: subtotal - promoDiscount,
          shippingIndia: shippingIndia,
          shippingUs: shippingUs,
          promoDiscount: promoDiscount,
          promoCode: appliedPromo ? promoCode : null,
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
          "cart" +
          (appliedPromo
            ? "&promoCode=" + promoCode + "&promoDiscount=" + promoDiscount
            : "");
      }, 800);
    }
  };

  const handleApplyPromo = () => {
    const promo = promoCodes[promoCode];
    if (promo) {
      setAppliedPromo(promo);
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoApplied(false);
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

  // Calculate amount needed for free shipping
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 bg-gray-50"
    >
      <div className="w-full max-w-6xl px-4 mx-auto">
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

        {/* Progress Steps */}
        <motion.div
          className="max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.active
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.completed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      step.active || step.completed
                        ? "text-primary font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-1 ${
                      step.completed ? "bg-green-500" : "bg-gray-200"
                    } flex-1 mx-2`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

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
                      ?.map((item) => (
                        <motion.div
                          key={item.cartpid}
                          variants={cartItemVariants}
                          exit="exit"
                          layout
                        >
                          <CartCard
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
                      ?.map((item) => (
                        <motion.div
                          key={item.cartpid}
                          variants={cartItemVariants}
                          exit="exit"
                          layout
                        >
                          <CartCard
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
              <Card className="sticky shadow-md top-20">
                <CardHeader className="flex-col items-start px-6 pt-6 pb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Summary
                  </h2>
                </CardHeader>
                <CardBody className="px-6 py-4">
                  {/* Free Shipping Progress */}
                  {amountForFreeShipping > 0 && (
                    <motion.div
                      className="p-3 mb-4 rounded-lg bg-primary/5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mb-2 text-sm text-gray-700">
                        Add{" "}
                        <span className="font-semibold text-primary">
                          ${amountForFreeShipping.toFixed(2)}
                        </span>{" "}
                        more to qualify for free shipping!
                      </p>
                      <Progress
                        aria-label="Free shipping progress"
                        size="sm"
                        value={freeShippingProgress}
                        color="success"
                        className="max-w-full"
                        showValueLabel={true}
                        formatOptions={{ style: "percent" }}
                      />
                    </motion.div>
                  )}

                  {/* Promo Code */}
                  <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-700">Promo Code</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) =>
                          setPromoCode(e.target.value.toUpperCase())
                        }
                        disabled={appliedPromo}
                        placeholder="Enter promo code"
                        className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {!appliedPromo ? (
                        <Button
                          size="sm"
                          color="secondary"
                          isDisabled={!promoCode}
                          onClick={handleApplyPromo}
                        >
                          Apply
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          onClick={removePromo}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    {promoApplied && appliedPromo && (
                      <motion.div
                        className="flex items-center gap-2 p-2 mt-2 text-sm text-green-700 border border-green-100 rounded-lg bg-green-50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p>{appliedPromo.description} applied!</p>
                      </motion.div>
                    )}
                    {promoCode && !appliedPromo && promoApplied === false && (
                      <motion.div
                        className="flex items-center gap-2 p-2 mt-2 text-sm text-red-700 border border-red-100 rounded-lg bg-red-50"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <p>Invalid promo code</p>
                      </motion.div>
                    )}
                  </div>

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
                  ) : (
                    shippingIndia === 0 &&
                    subtotal > 0 && (
                      <div className="flex items-start justify-between py-2">
                        <div>
                          <p className="text-gray-700">Shipping India to US</p>
                          <p className="text-xs font-medium text-primary">
                            Free Shipping!
                          </p>
                        </div>
                        <span className="text-primary">
                          <span className="mr-1 text-gray-400 line-through">
                            $40.00
                          </span>
                          FREE
                        </span>
                      </div>
                    )
                  )}

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
                  ) : (
                    shippingUs === 0 &&
                    subtotal > 0 && (
                      <div className="flex items-start justify-between py-2">
                        <div>
                          <p className="text-gray-700">Shipping US to US</p>
                          <p className="text-xs font-medium text-primary">
                            Free Shipping!
                          </p>
                        </div>
                        <span className="text-primary">
                          <span className="mr-1 text-gray-400 line-through">
                            $70.00
                          </span>
                          FREE
                        </span>
                      </div>
                    )
                  )}

                  <Divider className="my-2" />

                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Total Shipping</span>
                    <span className="font-medium">
                      ${(shippingIndia + shippingUs).toFixed(2)}
                    </span>
                  </div>

                  {appliedPromo && promoDiscount > 0 && (
                    <>
                      <Divider className="my-2" />
                      <div className="flex justify-between py-2">
                        <span className="text-success">Promo Discount</span>
                        <span className="font-medium text-success">
                          -${promoDiscount.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}

                  <Divider className="my-3" />

                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      $
                      {parseFloat(
                        subtotal + shippingIndia + shippingUs - promoDiscount
                      ).toFixed(2)}
                    </span>
                  </div>
                </CardBody>
                <CardFooter className="px-6 py-5 bg-gray-50">
                  <div className="w-full">
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
                      Proceed to Checkout
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
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
                      <p className="text-xs text-gray-500">
                        Secure checkout powered by trusted payment processors
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Help & Info Cards */}
              <div className="mt-4 space-y-4">
                {/* Free Returns */}
                <motion.div
                  className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Free Returns
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Not satisfied with your purchase? Return it within 30
                        days for a full refund.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Support */}
                <motion.div
                  className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
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
                      <p className="text-sm text-gray-700">
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Cartpanel;
