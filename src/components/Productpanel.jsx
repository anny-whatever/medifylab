import { useState, useEffect, useContext } from "react";
import ReactImageGallery from "react-image-gallery";
import { DataContext } from "../utils/dataContext.js";
import { AuthContext } from "../utils/authContext.js";

import { Button, user } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectItem, Input } from "@nextui-org/react";

import { useParams, Navigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

import { db } from "../utils/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { decl } from "postcss";
import RelatedProducts from "./RelatedProducts.jsx";

const Productpanel = () => {
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const { products } = useContext(DataContext);
  const { productId } = useParams();
  const [deliveryRoute, setDeliveryRoute] = useState();
  const [pack, setPack] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const [imageOpen, setImageOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  let cart = [];

  useEffect(() => {
    const productDetails = products?.productsArray?.filter((product) => {
      return product.uuid === productId;
    });

    setProductDetails(productDetails?.[0]);
  }, [products, productId]);

  const handleOpen = () => {
    setImageOpen(!imageOpen);
  };

  const openImageStyle =
    " absolute bg-black left-0 top-0 mx-auto right-0 z-40 w-screen h-full  duration-300 ease-in-out";
  const closedImageStyle = "container px-4 mx-auto duration-300 ease-in-out";

  const radioStyle =
    "ml-1 mb-2 rounded-md border-1 transition-all duration-300 ease-in-out";
  const activateRadioStyle =
    "ml-1 mb-2 rounded-md shadow-md border-1 duration-300 ease-in-out";

  // const openImageCanvasStyle =

  const productImages = {
    images: [
      {
        original: productDetails?.mainImage,
        thumbnail: productDetails?.mainImage,
      },

      {
        original: productDetails?.secondaryImage,
        thumbnail: productDetails?.secondaryImage,
      },
    ],
  };

  const saveProductToCart = () => {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cart);
    const product = {
      cartpid: uuidv4(),
      uuid: productDetails?.uuid,
      route: deliveryRoute,
      pack: pack,
      qty: 1,
      price: productDetails?.discount,
    };
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
      if (!deliveryRoute || !pack) {
        toast.error("Please select delivery route and pack size");
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Product added to cart");
      }
    }
  };

  const saveProductToCartIfLoggedin = async () => {
    const product = {
      cartpid: uuidv4(),
      uuid: productDetails?.uuid,
      route: deliveryRoute,
      pack: pack,
      qty: 1,
      price: productDetails?.discount,
    };
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
      if (!deliveryRoute || !pack) {
        toast.error("Please select delivery route and pack size");
      } else {
        await updateDoc(doc(db, "users", userInfo?.uid), {
          cart: arrayUnion(product),
        });
        toast.success("Product added to cart");
      }
    }
  };

  const handleBuyNow = () => {
    let deliveryCost;
    let india = 0;
    let us = 0;
    if (deliveryRoute == "intous") {
      deliveryCost = 40;
      india = 40;
    } else {
      deliveryCost = 70;
      us = 70;
    }

    const product = {
      uuid: productDetails?.uuid,
      route: deliveryRoute,
      pack: pack,
      qty: 1,
      price: productDetails?.discount,
    };

    const total =
      parseFloat(productDetails?.discount) * parseFloat(product.pack) +
      deliveryCost;

    if (!deliveryRoute || !pack) {
      toast.error("Please select delivery route and pack size");
    } else {
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
    }
  };

  return (
    <>
      <Toaster richColors />
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 text-gray-800 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        {imageOpen === true ? (
          <Button
            color="secondary"
            size="lg"
            className="absolute z-50 text-white left-5 top-5 "
            onClick={() => {
              handleOpen();
            }}
          >
            Back
          </Button>
        ) : null}

        <div className={imageOpen ? openImageStyle : closedImageStyle}>
          <ReactImageGallery
            showBullets={false}
            showPlayButton={false}
            infinite={true}
            lazyLoad={true}
            showFullscreenButton={false}
            items={productImages?.images}
            onClick={(e) => {
              handleOpen();
            }}
          />

          {/* /image gallery  */}
        </div>

        {/* description  */}

        <div className="px-5 mx-auto lg:px-5">
          <h2 className="pt-3 text-2xl font-bold text-gray-800 lg:pt-0">
            {productDetails?.name}
          </h2>

          <p className="mt-5 font-bold">
            <span className="text-sm text-primary ">Details</span>
            <br />
            Generic name:{" "}
            <span className="font-normal">{productDetails?.generic}</span>
          </p>
          <p className="font-bold">
            Brand name:{" "}
            <span className="font-normal">{productDetails?.brand}</span>
          </p>
          <p className="font-bold">
            Dosage form:{" "}
            <span className="font-normal">{productDetails?.dosage}</span>
          </p>
          <p className="font-bold">
            Drug class:{" "}
            <span className="font-normal">{productDetails?.class}</span>
          </p>
          <div className="mt-3 mr-1 font-displaybold">
            <span className="mr-2 text-2xl text-red-600 font-displaylight">
              {(
                ((parseInt(productDetails?.discount) -
                  parseInt(productDetails?.price)) /
                  parseInt(productDetails?.price)) *
                100
              ).toFixed(0)}
              %
            </span>
            <span className="text-4xl font-displaybold text-primary">
              ${productDetails?.discount}
            </span>
            <span className="text-lg text-primary">/pill</span>
            <div className="font-displaylight">
              MRP:{" "}
              <span className="line-through ">
                ${productDetails?.price}/pill
              </span>
            </div>
          </div>

          <p className="pt-5 mb-5 text-sm leading-5 text-gray-500">
            {productDetails?.description}
          </p>

          <RadioGroup
            label="Select delivery route"
            // defaultValue={"intous"}
            onChange={(value) => {
              setDeliveryRoute(value.target.value);
              setPack();
            }}
            color="secondary"
            orientation="horizontal"
          >
            {productDetails?.route?.map((routename) => (
              <Radio
                key={routename}
                value={routename}
                className={
                  deliveryRoute === routename ? activateRadioStyle : radioStyle
                }
              >
                {routename === "intous" ? "India to US" : "US to US"}
              </Radio>
            ))}
          </RadioGroup>
          <div className="mt-6">
            <div className="flex w-full gap-1 ">
              {deliveryRoute === "intous" ? (
                <>
                  <Select
                    label="Select Quantity"
                    className="max-w-xs"
                    onChange={(value) => {
                      setPack(value.target.value);
                      // console.log(value.target.value);
                    }}
                  >
                    {productDetails?.packSizeIN
                      ?.sort((a, b) => a - b)
                      ?.map((size) => {
                        return <SelectItem key={size}>{size}</SelectItem>;
                      })}
                  </Select>
                </>
              ) : null}
              {deliveryRoute === "ustous" ? (
                <>
                  <Select
                    label="Select Quantity"
                    className="max-w-xs"
                    onChange={(value) => {
                      setPack(value.target.value);
                      // console.log(value.target.value);
                    }}
                  >
                    {productDetails?.packSizeUS
                      ?.sort((a, b) => a - b)
                      ?.map((size) => {
                        return <SelectItem key={size}>{size}</SelectItem>;
                      })}
                  </Select>
                </>
              ) : null}
            </div>
          </div>

          {deliveryRoute === "intous" ? (
            <>
              <div className="mt-6">
                <p className="pb-2 text-gray-500 text-md">
                  Custom quantity (more than 60)
                </p>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  className="py-2 text-sm w-fit"
                  min={60}
                  size="lg"
                  onChange={(e) => {
                    setPack(e.target.value);
                  }}
                />
              </div>
            </>
          ) : null}
          <div className="flex flex-row items-center gap-6 mt-7">
            <Button
              className="my-3 view"
              color="secondary"
              size="lg"
              onClick={() => {
                isLoggedIn
                  ? saveProductToCartIfLoggedin()
                  : saveProductToCart();
              }}
            >
              Add to Cart
            </Button>
            <Button
              className="my-3 view "
              color="secondary"
              size="lg"
              onClick={handleBuyNow}
            >
              Buy now
            </Button>
          </div>
        </div>
      </section>

      <RelatedProducts
        thisUuid={productDetails?.uuid}
        category={productDetails?.category}
      />
    </>
  );
};

export default Productpanel;
