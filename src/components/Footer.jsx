// src/components/Footer.jsx
import React, { useState } from "react";
import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";

import { db } from "../utils/config.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
    const docRef = doc(db, "visitorInfo", "email");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setIsSubmitting(true);

    if (regex.test(email)) {
      try {
        await updateDoc(docRef, {
          letterEmails: arrayUnion(email),
        });
        toast.success("Thank you for subscribing!");
        setEmail("");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.error("Please enter a valid email");
    }

    setIsSubmitting(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <footer className="w-full mt-auto bg-zinc-800">
      <Toaster richColors position="bottom-right" />
      <div className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          <motion.div
            className="col-span-full lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <motion.div
                className="flex text-2xl font-semibold text-white text-displaymedium gap-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img src={logo} alt="Logo" className="w-8 h-auto" />
                <span className="text-primary">MedifyLab</span>
              </motion.div>
            </Link>
          </motion.div>
          {/* End Col */}
          <motion.div
            className="col-span-1"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-gray-100">Product</h4>
            <motion.div className="grid mt-3 space-y-3" variants={container}>
              <motion.p variants={item}>
                <Link to="/shop">
                  <span className="inline-flex text-gray-400 transition-all duration-300 gap-x-2 hover:text-white hover:translate-x-1">
                    Shop
                  </span>
                </Link>
              </motion.p>
              <motion.p variants={item}>
                <Link to="/shop?sort=bestseller">
                  <span className="inline-flex text-gray-400 transition-all duration-300 gap-x-2 hover:text-white hover:translate-x-1">
                    Best Sellers
                  </span>
                </Link>
              </motion.p>
              <motion.p variants={item}>
                <Link to="/shop?sort=offers">
                  <span className="inline-flex text-gray-400 transition-all duration-300 gap-x-2 hover:text-white hover:translate-x-1">
                    Newest
                  </span>
                </Link>
              </motion.p>
              <motion.p variants={item}>
                <Link to="/cart">
                  <span className="inline-flex text-gray-400 transition-all duration-300 gap-x-2 hover:text-white hover:translate-x-1">
                    Cart
                  </span>
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
          {/* End Col */}
          <motion.div
            className="col-span-1"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-gray-100">Company</h4>
            <motion.div className="grid mt-3 space-y-3" variants={container}>
              <motion.p variants={item}>
                <Link to="/contacts">
                  <span className="inline-flex text-gray-400 transition-all duration-300 gap-x-2 hover:text-white hover:translate-x-1">
                    Contact us
                  </span>
                </Link>
              </motion.p>
              <motion.p variants={item}>
                <Link to="/about">
                  <span className="inline-flex text-gray-400 transition-all duration-300 gap-x-2 hover:text-white hover:translate-x-1">
                    About us
                  </span>
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
          {/* End Col */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-gray-100">Stay up to date</h4>
            <div className="mt-4">
              <div className="flex flex-col items-center gap-2 p-2 bg-white rounded-lg sm:flex-row sm:gap-3">
                <div className="w-full">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full"
                    size="lg"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubscribe();
                      }
                    }}
                    isDisabled={isSubmitting}
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    color="secondary"
                    className="w-full rounded-lg sm:w-auto"
                    onClick={handleSubscribe}
                    isLoading={isSubmitting}
                    size="lg"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* End Col */}
        </div>
        {/* End Grid */}
        <div className="grid mt-5 sm:mt-12 gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
          <motion.div
            className="flex flex-col justify-between space-y-1 items-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a
              href="tel:+16092371558"
              className="flex items-center gap-2 text-left text-gray-400 transition-colors duration-200 hover:text-white"
              whileHover={{ x: 3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-primary"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              Tel 1: +1 (609) 237-1558
            </motion.a>
            <motion.a
              href="tel:+12549786592"
              className="flex items-center gap-2 text-left text-gray-400 transition-colors duration-200 hover:text-white"
              whileHover={{ x: 3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-primary"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              Tel 2: +1 (254) 978-6592
            </motion.a>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MedifyLab. All rights reserved.
            </p>
          </motion.div>
          {/* End Col */}
          {/* Social Brands */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {["facebook", "google", "twitter", "github", "slack"].map(
              (social, index) => (
                <motion.a
                  key={social}
                  className="inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-full size-10 gap-x-2 hover:bg-primary disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(89, 165, 44, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    {social === "facebook" && (
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    )}
                    {social === "google" && (
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                    )}
                    {social === "twitter" && (
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    )}
                    {social === "github" && (
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    )}
                    {social === "slack" && (
                      <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                    )}
                  </svg>
                </motion.a>
              )
            )}
          </motion.div>
          {/* End Social Brands */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
