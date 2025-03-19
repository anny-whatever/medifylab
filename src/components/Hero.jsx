// src/components/Hero.jsx
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import CarouselComponent from "./CarouselComponent.jsx";
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

function Hero() {
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <>
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
      <motion.div
        className="w-full py-10 bg-gradient-to-b from-primary/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            <motion.div
              className="lg:col-span-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                className="block mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-6xl text-primary font-displaymedium"
                variants={item}
              >
                MedifyLab
              </motion.h1>
              <motion.p
                className="mt-3 mb-8 text-lg leading-relaxed text-gray-800"
                variants={item}
              >
                Your trusted partner in health, delivering quality medicines at
                your doorstep. Experience convenience and care with our reliable
                online pharmacy services.
              </motion.p>
              <motion.div
                className="flex flex-col items-center gap-4 mt-5 lg:mt-8 sm:flex-row sm:gap-3"
                variants={item}
              >
                <div className="w-full sm:w-auto">
                  <label htmlFor="hero-input" className="sr-only">
                    Phone Number
                  </label>
                  <div className="w-full transition-all bg-white rounded-lg shadow hover:shadow-md">
                    <div className="phone-input-container">
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={value}
                        onChange={setValue}
                        placeholder="Enter phone number"
                        className="custom-phone-input"
                      />
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="secondary"
                    className="w-full px-6 py-6 font-medium rounded-lg shadow-lg sm:w-fit"
                    onClick={savePhoneNumber}
                    size="lg"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                  >
                    Request call
                  </Button>
                </motion.div>
              </motion.div>
              <motion.span className="flex items-center mt-5" variants={item}>
                Or chat with us on
                <motion.a
                  href="https://wa.me/16092371558"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={whatsapp}
                    className="relative ml-2.5 w-28"
                    alt="WhatsApp"
                  />
                </motion.a>
              </motion.span>
              {/* Brands */}
              <motion.div className="mt-8 lg:mt-12" variants={item}>
                <span className="text-xs font-medium text-gray-800 uppercase">
                  Accepted by us:
                </span>
                <div className="flex mt-3 gap-x-6">
                  <motion.img
                    src={paypal}
                    alt="PayPal"
                    className="h-8"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <motion.img
                    src={zelle}
                    alt="Zelle"
                    className="h-8"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <motion.img
                    src={cashapp}
                    alt="Cash App"
                    className="h-8"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <motion.img
                    src={venmo}
                    alt="Venmo"
                    className="h-8"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                </div>
              </motion.div>
              {/* End Brands */}
            </motion.div>
            {/* End Col */}
            <motion.div
              className="mt-10 lg:col-span-4 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-1 bg-gradient-to-tr from-primary to-secondary rounded-2xl">
                <div className="p-2 bg-white rounded-xl">
                  <CarouselComponent />
                </div>
              </div>
            </motion.div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Hero */}
      </motion.div>
    </>
  );
}

export default Hero;
