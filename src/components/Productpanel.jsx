// src/components/Productpanel.jsx
import { useState, useEffect, useContext } from "react";
import ReactImageGallery from "react-image-gallery";
import { DataContext } from "../utils/dataContext.js";
import { AuthContext } from "../utils/authContext.js";
import { motion, AnimatePresence } from "framer-motion";

import { Button, Chip, Divider } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectItem, Input } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

import { db } from "../utils/config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import RelatedProducts from "./RelatedProducts.jsx";

const Productpanel = () => {
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const { products } = useContext(DataContext);
  const { productId } = useParams();
  const [deliveryRoute, setDeliveryRoute] = useState();
  const [pack, setPack] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const [imageOpen, setImageOpen] = useState(false);
  const [customQty, setCustomQty] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  let cart = [];

  useEffect(() => {
    const productDetails = products?.productsArray?.filter((product) => {
      return product.uuid === productId;
    });

    setProductDetails(productDetails?.[0]);

    // Scroll to top when component loads
    window.scrollTo(0, 0);
  }, [products, productId]);

  const handleOpen = () => {
    setImageOpen(!imageOpen);
  };

  const saveProductToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      const finalPack = customQty || pack;

      const product = {
        cartpid: uuidv4(),
        uuid: productDetails?.uuid,
        route: deliveryRoute,
        pack: finalPack,
        qty: 1,
        price: productDetails?.discount,
      };

      if (!deliveryRoute || !finalPack) {
        toast.error("Please select delivery route and pack size");
        setIsAddingToCart(false);
        return;
      }

      if (
        cart.some(
          (item) =>
            item.uuid === product?.uuid &&
            item.route === product?.route &&
            item.pack === product?.pack
        )
      ) {
        toast.error("Product already added to cart");
      } else {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Product added to cart");
      }
      setIsAddingToCart(false);
    }, 500);
  };

  const saveProductToCartIfLoggedin = async () => {
    setIsAddingToCart(true);
    setTimeout(async () => {
      const finalPack = customQty || pack;

      const product = {
        cartpid: uuidv4(),
        uuid: productDetails?.uuid,
        route: deliveryRoute,
        pack: finalPack,
        qty: 1,
        price: productDetails?.discount,
      };

      if (!deliveryRoute || !finalPack) {
        toast.error("Please select delivery route and pack size");
        setIsAddingToCart(false);
        return;
      }

      if (
        userData?.cart?.some(
          (item) =>
            item.uuid === product?.uuid &&
            item.route === product?.route &&
            item.pack === product?.pack
        )
      ) {
        toast.error("Product already added to cart");
      } else {
        try {
          await updateDoc(doc(db, "users", userInfo?.uid), {
            cart: arrayUnion(product),
          });
          toast.success("Product added to cart");
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
        }
      }
      setIsAddingToCart(false);
    }, 500);
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    setTimeout(() => {
      const finalPack = customQty || pack;

      if (!deliveryRoute || !finalPack) {
        toast.error("Please select delivery route and pack size");
        setIsBuying(false);
        return;
      }

      let deliveryCost;
      let india = 0;
      let us = 0;

      if (deliveryRoute === "intous") {
        deliveryCost = 40;
        india = 40;
      } else {
        deliveryCost = 70;
        us = 70;
      }

      const product = {
        uuid: productDetails?.uuid,
        route: deliveryRoute,
        pack: finalPack,
        qty: 1,
        price: productDetails?.discount,
      };

      const total =
        parseFloat(productDetails?.discount) * parseFloat(finalPack) +
        deliveryCost;

      window.location.href =
        "/checkout?orderId=" +
        uuidv4() +
        "&products=" +
        JSON.stringify([product]) +
        "&total=" +
        total +
        "&shippingIndia=" +
        india +
        "&shippingUs=" +
        us;
    }, 600);
  };

  const handleCustomQtyChange = (e) => {
    const value = e.target.value;
    if (!value || (value > 0 && value <= 1000)) {
      setCustomQty(value);
      setPack(null);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };

  const imageContainerStyle = imageOpen
    ? "fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-5"
    : "relative";

  const discount =
    productDetails?.price && productDetails?.discount
      ? (
          ((productDetails.price - productDetails.discount) /
            productDetails.price) *
          100
        ).toFixed(0)
      : 0;

  return (
    <>
      <Toaster richColors position="top-center" />
      <motion.section
        className="container mx-auto max-w-[1200px] py-10 text-gray-800 lg:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid gap-8 px-4 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery Section */}
          <div className={imageContainerStyle}>
            {imageOpen && (
              <motion.button
                className="absolute z-10 p-2 text-white transition-all rounded-full top-4 left-4 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                onClick={() => setImageOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            )}

            <div className="overflow-hidden shadow-lg rounded-xl">
              <motion.div
                layoutId="productGallery"
                className="cursor-pointer"
                onClick={() => !imageOpen && setImageOpen(true)}
              >
                <ReactImageGallery
                  showBullets={false}
                  showPlayButton={false}
                  infinite={true}
                  lazyLoad={true}
                  showFullscreenButton={false}
                  showThumbnails={!imageOpen}
                  items={[
                    {
                      original: productDetails?.mainImage,
                      thumbnail: productDetails?.mainImage,
                    },
                    {
                      original: productDetails?.secondaryImage,
                      thumbnail: productDetails?.secondaryImage,
                    },
                  ]}
                />
              </motion.div>
            </div>
          </div>

          {/* Product Details Section */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div variants={fadeIn} className="mb-3">
              <Chip color="primary" variant="flat" className="mb-2">
                {productDetails?.category === "ed"
                  ? "Erectile Dysfunction"
                  : productDetails?.category === "control"
                  ? "Painkillers & More"
                  : productDetails?.category === "performance"
                  ? "Performance"
                  : "Other"}
              </Chip>
              <h1 className="mb-1 text-3xl font-bold text-gray-800">
                {productDetails?.name}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Brand: {productDetails?.brand}
                </span>
                <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-sm font-medium text-gray-600">
                  Generic: {productDetails?.generic}
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${productDetails?.discount}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${productDetails?.price}
                </span>
                <Chip color="danger" size="sm">
                  {discount}% OFF
                </Chip>
              </div>
              <p className="mt-1 text-sm text-gray-500">Price per pill</p>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-6">
              <Tabs
                aria-label="Product Details"
                color="primary"
                selectedKey={activeTab}
                onSelectionChange={setActiveTab}
                classNames={{
                  tabList: "gap-6",
                  cursor: "bg-primary",
                }}
              >
                <Tab key="description" title="Description">
                  <div className="py-4">
                    <p className="leading-relaxed text-gray-700">
                      {productDetails?.description}
                    </p>
                  </div>
                </Tab>
                <Tab key="details" title="Details">
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-500">Generic name</p>
                      <p className="font-medium">{productDetails?.generic}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-500">Brand name</p>
                      <p className="font-medium">{productDetails?.brand}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-500">Dosage form</p>
                      <p className="font-medium">{productDetails?.dosage}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">
                      <p className="text-sm text-gray-500">Drug class</p>
                      <p className="font-medium">{productDetails?.class}</p>
                    </div>
                  </div>
                </Tab>
                <Tab key="shipping" title="Shipping">
                  <div className="py-4">
                    <div className="p-4 mb-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <h3 className="font-medium">India to US</h3>
                      </div>
                      <p className="text-gray-700 ml-7">
                        Delivery within 15-21 working days
                      </p>
                      <p className="text-gray-700 ml-7">Shipping cost: $40</p>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <h3 className="font-medium">US to US</h3>
                      </div>
                      <p className="text-gray-700 ml-7">
                        Delivery within 7-10 working days
                      </p>
                      <p className="text-gray-700 ml-7">Shipping cost: $70</p>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </motion.div>

            <Divider className="my-4" />

            <motion.div variants={fadeIn} className="mb-6">
              <h3 className="mb-3 font-medium">Select delivery route</h3>
              <RadioGroup
                orientation="horizontal"
                value={deliveryRoute}
                onValueChange={setDeliveryRoute}
                classNames={{
                  wrapper: "gap-4",
                }}
              >
                {productDetails?.route?.includes("intous") && (
                  <Radio
                    value="intous"
                    classNames={{
                      base:
                        deliveryRoute === "intous"
                          ? "border-2 border-primary bg-primary/5 px-4 py-3 rounded-lg"
                          : "border-2 border-gray-200 px-4 py-3 rounded-lg",
                    }}
                  >
                    India to US
                    <span className="block mt-1 text-xs text-gray-500">
                      15-21 days delivery
                    </span>
                  </Radio>
                )}
                {productDetails?.route?.includes("ustous") && (
                  <Radio
                    value="ustous"
                    classNames={{
                      base:
                        deliveryRoute === "ustous"
                          ? "border-2 border-primary bg-primary/5 px-4 py-3 rounded-lg"
                          : "border-2 border-gray-200 px-4 py-3 rounded-lg",
                    }}
                  >
                    US to US
                    <span className="block mt-1 text-xs text-gray-500">
                      7-10 days delivery
                    </span>
                  </Radio>
                )}
              </RadioGroup>
            </motion.div>

            {deliveryRoute && (
              <motion.div
                variants={fadeIn}
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-3 font-medium">Select pack size</h3>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {(deliveryRoute === "intous"
                    ? productDetails?.packSizeIN
                    : productDetails?.packSizeUS
                  )
                    ?.sort((a, b) => a - b)
                    ?.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => {
                          setPack(size);
                          setCustomQty("");
                        }}
                        className={`border ${
                          pack === size
                            ? "border-primary bg-primary/5"
                            : "border-gray-200"
                        } rounded-lg py-3 px-4 transition-all`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {size} Pills
                      </motion.button>
                    ))}
                </div>

                {deliveryRoute === "intous" && (
                  <div className="mt-4">
                    <h3 className="mb-2 font-medium">
                      Or enter custom quantity
                    </h3>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={customQty}
                      onChange={handleCustomQtyChange}
                      className="max-w-xs"
                      labelPlacement="outside"
                      description="For quantities more than 60 pills"
                    />
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex flex-col gap-4 mt-auto sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1"
              >
                <Button
                  color="primary"
                  variant="flat"
                  className="w-full py-6 font-medium"
                  onClick={() =>
                    isLoggedIn
                      ? saveProductToCartIfLoggedin()
                      : saveProductToCart()
                  }
                  isLoading={isAddingToCart}
                  isDisabled={isAddingToCart || isBuying}
                  startContent={
                    !isAddingToCart && (
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    )
                  }
                >
                  Add to Cart
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1"
              >
                <Button
                  color="secondary"
                  className="w-full py-6 font-medium"
                  onClick={handleBuyNow}
                  isLoading={isBuying}
                  isDisabled={isAddingToCart || isBuying}
                  startContent={
                    !isBuying && (
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
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    )
                  }
                >
                  Buy Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <RelatedProducts
        thisUuid={productDetails?.uuid}
        category={productDetails?.category}
      />
    </>
  );
};

export default Productpanel;
