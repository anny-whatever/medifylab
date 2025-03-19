// src/components/Hero.jsx
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import whatsapp from "../assets/img/whatsapp.svg";
import zelle from "../assets/paylogo/zelle.svg";
import paypal from "../assets/paylogo/paypal.svg";
import cashapp from "../assets/paylogo/cashapp.svg";
import venmo from "../assets/paylogo/venmo.svg";
import { Toaster, toast } from "sonner";
import { db } from "../utils/config.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useContext } from "react";
import { DataContext } from "../utils/dataContext";
import { Link } from "react-router-dom";

function Hero() {
  const { products } = useContext(DataContext);
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savePhoneNumber = async () => {
    if (!value) {
      toast.error("Please enter a phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      const docRef = doc(db, "visitorInfo", "tel");
      // Remove the + from the phone number if it exists
      const phoneNumber = value.startsWith("+") ? value.substring(1) : value;

      await updateDoc(docRef, {
        pendingNumbers: arrayUnion(phoneNumber),
      });
      onOpen();
    } catch (error) {
      console.error("Error saving phone number:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Featured products - take 3 most discounted products
  const featuredProducts =
    products?.productsArray
      ?.sort(
        (a, b) =>
          (b.price - b.discount) / b.price - (a.price - a.discount) / a.price
      )
      ?.slice(0, 3) || [];

  // Calculate discount percentage
  const calculateDiscount = (price, discount) => {
    return Math.round(((price - discount) / price) * 100);
  };

  return (
    <>
      {/* Call Request Success Modal */}
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ff1212]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  CALL REQUEST RECEIVED!
                </motion.div>
              </ModalHeader>
              <ModalBody>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <p className="mb-4">
                    Thank you for reaching out to us. You will receive a call
                    within 5-10 minutes.
                  </p>

                  <p className="mb-2 font-medium text-gray-700">
                    You may receive or place a call on numbers provided below:
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-3 mb-2 transition-all rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
                  >
                    <a
                      href="tel:+16092371558"
                      className="flex items-center gap-2 text-left text-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      +1 (609) 237-1558
                    </a>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-3 transition-all rounded-lg shadow-sm bg-gray-50 hover:shadow-md"
                  >
                    <a
                      href="tel:+12549786592"
                      className="flex items-center gap-2 text-left text-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      +1 (254) 978-6592
                    </a>
                  </motion.div>

                  <p className="mt-4 font-medium text-primary">
                    Thank you for your patience.
                  </p>
                </motion.div>
              </ModalBody>
              <ModalFooter>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button color="secondary" variant="light" onPress={onClose}>
                    Okay
                  </Button>
                </motion.div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent md:pt-16 md:pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full -top-24 -right-24 w-96 h-96 bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-2xl"></div>
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* MAIN CONTENT ROW - Important for proper ordering on all devices */}
          <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            {/* LEFT CONTENT COLUMN - Always first on mobile */}
            <motion.div
              className="flex flex-col order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Brand and Heading */}
              <div className="mb-6">
                <motion.div
                  className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="flex items-center">
                    <svg
                      className="mr-1.5 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Trusted Online Pharmacy
                  </span>
                </motion.div>
                <motion.h1
                  className="mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="text-primary">MedifyLab</span>
                  <br className="hidden sm:block" />
                  Your Health Partner
                </motion.h1>
                <motion.p
                  className="max-w-xl mb-6 text-gray-700 text-md md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Your trusted partner in health, delivering quality medicines
                  at your doorstep. Experience convenience and care with our
                  reliable online pharmacy services.
                </motion.p>
              </div>

              {/* Phone Input and Contact Section */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="p-4 bg-white shadow-md sm:p-6 rounded-2xl">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <label
                        htmlFor="phone-input"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Request a call back
                      </label>
                      <div className="p-1 rounded-lg bg-gray-50">
                        <PhoneInput
                          international
                          defaultCountry="US"
                          value={value}
                          onChange={setValue}
                          placeholder="Enter phone number"
                          className="custom-phone-input"
                          id="phone-input"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full"
                      >
                        <Button
                          color="secondary"
                          className="w-full px-4 py-6 font-medium text-white rounded-lg shadow-md sm:w-auto"
                          onClick={savePhoneNumber}
                          size="lg"
                          isLoading={isSubmitting}
                          isDisabled={isSubmitting}
                          startContent={
                            !isSubmitting && (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            )
                          }
                        >
                          Request Call
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 text-gray-600">
                    <span className="text-sm">Or message us directly: </span>
                    <motion.a
                      href="https://wa.me/16092371558"
                      className="flex items-center ml-2 font-medium text-green-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>WhatsApp</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-6 lg:mb-0"
              >
                <p className="mb-3 text-sm font-medium text-gray-500">
                  Payment Methods Accepted:
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  {[paypal, zelle, cashapp, venmo].map((logo, index) => (
                    <motion.img
                      key={index}
                      src={logo}
                      alt="Payment method"
                      className="object-contain h-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      whileHover={{ y: -3 }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN - Featured Products - Always second on mobile */}
            <motion.div
              className="order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                {/* Products Display */}
                <div className="grid grid-cols-1 gap-4">
                  {featuredProducts.map((product, index) => {
                    const discountPercentage = calculateDiscount(
                      product.price,
                      product.discount
                    );

                    return (
                      <motion.div
                        key={product.uuid}
                        className="overflow-hidden bg-white shadow-lg rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <Link
                          to={`/product/${product.uuid}`}
                          className="flex items-center p-3"
                        >
                          <div className="relative flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24">
                            <img
                              src={product.mainImage}
                              alt={product.name}
                              className="object-contain w-full h-full"
                            />

                            {discountPercentage > 0 && (
                              <div className="absolute flex items-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -left-1">
                                {discountPercentage}% OFF
                              </div>
                            )}
                          </div>

                          <div className="flex-1 ml-3 sm:ml-4">
                            <h3 className="mb-1 text-sm font-semibold text-gray-800 sm:text-base line-clamp-1">
                              {product.name}
                            </h3>

                            <div className="flex flex-wrap items-baseline gap-1 mb-1">
                              <span className="text-lg font-bold text-primary">
                                ${product.discount}
                              </span>
                              <span className="text-xs text-gray-500">
                                /pill
                              </span>
                              {product.price > product.discount && (
                                <span className="ml-1 text-xs text-gray-400 line-through">
                                  ${product.price}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-600 line-clamp-1 sm:line-clamp-2">
                              {product.description?.substring(0, 60)}...
                            </p>
                          </div>

                          <div className="ml-1 sm:ml-2">
                            <div className="rounded-full bg-primary/10 p-1.5 sm:p-2 text-primary">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* View All Link */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Link to="/shop">
                    <Button
                      color="primary"
                      variant="flat"
                      className="font-medium"
                      endContent={
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      }
                    >
                      View All Products
                    </Button>
                  </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute rounded-full -top-6 -right-10 w-28 h-28 bg-secondary/10 blur-xl -z-10"></div>
                <div className="absolute w-20 h-20 rounded-full -bottom-8 left-12 bg-primary/5 blur-lg -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
