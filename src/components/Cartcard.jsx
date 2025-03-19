// src/components/Cartcard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Button, Badge } from "@nextui-org/react";
import { motion } from "framer-motion";

import { db } from "../utils/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { DataContext } from "../utils/dataContext";
import { AuthContext } from "../utils/authContext";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

function Cartcard({ cartpid, pid, qty, route, pack, price }) {
  const { products } = useContext(DataContext);
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState([]);
  const [localQty, setLocalQty] = useState();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);

  useEffect(() => {
    const productDetails = products?.productsArray?.filter((product) => {
      return product.uuid === pid;
    });
    setProductDetails(productDetails?.[0]);
  }, [products, pid]);

  const incrementQtyLocal = () => {
    setIsIncrementing(true);
    setTimeout(() => {
      let array = JSON.parse(localStorage.getItem("cart")) || [];
      const index = array.findIndex((obj) => obj.cartpid === cartpid);

      if (index !== -1) {
        array[index]["qty"] = array[index]["qty"] + 1;
        setLocalQty(array[index]["qty"]);
        localStorage.setItem("cart", JSON.stringify(array));
        toast.success("Item quantity increased");
        window.location.reload();
        return true;
      }

      window.location.reload();
      setIsIncrementing(false);
    }, 400);
  };

  const decrementQtyLocal = () => {
    setIsDecrementing(true);
    setTimeout(() => {
      let array = JSON.parse(localStorage.getItem("cart")) || [];
      const index = array.findIndex((obj) => obj.cartpid === cartpid);

      if (index !== -1) {
        array[index]["qty"] = array[index]["qty"] - 1;
        setLocalQty(array[index]["qty"]);
        localStorage.setItem("cart", JSON.stringify(array));
        toast.success("Item quantity decreased");
        window.location.reload();
        return true;
      }

      window.location.reload();
      setIsDecrementing(false);
    }, 400);
  };

  const removeLocal = () => {
    setIsRemoving(true);
    setTimeout(() => {
      let array = JSON.parse(localStorage.getItem("cart")) || [];
      const index = array.findIndex((obj) => obj.cartpid === cartpid);
      let updatedCart = [...array.slice(0, index), ...array.slice(index + 1)];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart");
      window.location.reload();
    }, 400);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    setTimeout(async () => {
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
        toast.error("Error removing item");
        setIsRemoving(false);
      });
      toast.success("Item removed from cart");
      setIsRemoving(false);
    }, 400);
  };

  const handleIncrementQty = async () => {
    setIsIncrementing(true);
    setTimeout(async () => {
      try {
        await updateDoc(doc(db, "users", userInfo?.uid), {
          cart: arrayUnion({
            cartpid: cartpid,
            uuid: pid,
            qty: qty + 1,
            route: route,
            pack: pack,
            price: price,
          }),
        });

        await updateDoc(doc(db, "users", userInfo?.uid), {
          cart: arrayRemove({
            cartpid: cartpid,
            uuid: pid,
            qty: qty,
            route: route,
            pack: pack,
            price: price,
          }),
        });

        toast.success("Item quantity increased");
        setIsIncrementing(false);
      } catch (error) {
        toast.error("Error updating quantity");
        setIsIncrementing(false);
      }
    }, 400);
  };

  const handleDecrementQty = async () => {
    setIsDecrementing(true);
    setTimeout(async () => {
      try {
        if (qty > 1) {
          await updateDoc(doc(db, "users", userInfo?.uid), {
            cart: arrayUnion({
              cartpid: cartpid,
              uuid: pid,
              qty: qty - 1,
              route: route,
              pack: pack,
              price: price,
            }),
          });

          await updateDoc(doc(db, "users", userInfo?.uid), {
            cart: arrayRemove({
              cartpid: cartpid,
              uuid: pid,
              qty: qty,
              route: route,
              pack: pack,
              price: price,
            }),
          });

          toast.success("Item quantity decreased");
        }
        setIsDecrementing(false);
      } catch (error) {
        toast.error("Error updating quantity");
        setIsDecrementing(false);
      }
    }, 400);
  };

  const isBtnDisabled = () => {
    if (localQty) {
      return localQty <= 1 ? true : false;
    } else {
      return qty <= 1 ? true : false;
    }
  };

  if (!productDetails) return null;

  return (
    <>
      <Toaster richColors position="top-right" />
      <motion.div
        className="mb-4 overflow-hidden transition-shadow duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        layout
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
      >
        <div className="flex flex-col sm:flex-row">
          <Link to={`/product/${pid}`} className="relative block h-40 sm:w-40">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={productDetails?.mainImage}
                alt={productDetails?.name}
                className="object-cover w-full h-full"
              />
              <Badge
                content={`${route === "intous" ? "IN→US" : "US→US"}`}
                color={route === "intous" ? "warning" : "primary"}
                placement="top-right"
                className="absolute top-2 right-2"
              />
            </motion.div>
          </Link>

          <div className="flex flex-col justify-between flex-1 p-4 sm:flex-row">
            <div className="mr-4">
              <Link to={`/product/${pid}`}>
                <h3 className="text-lg font-semibold text-gray-800 transition-colors hover:text-primary">
                  {productDetails?.name}
                </h3>
              </Link>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Pack: {pack} Pills
                </span>
                <span className="mx-2">•</span>
                <span>
                  Route: {route === "intous" ? "India to US" : "US to US"}
                </span>
              </div>

              <div className="mt-2">
                <div className="flex items-center">
                  <span className="text-xl font-semibold text-primary">
                    ${productDetails?.discount}
                  </span>
                  <span className="ml-1 text-sm text-gray-700">/pill</span>

                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${productDetails?.price}
                  </span>

                  <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                    {(
                      ((productDetails?.price - productDetails?.discount) /
                        productDetails?.price) *
                      100
                    ).toFixed(0)}
                    % off
                  </span>
                </div>

                <div className="mt-1 text-sm text-gray-500">
                  Subtotal: $
                  {(productDetails?.discount * qty * pack).toFixed(2)}
                </div>
              </div>

              <div className="mt-4">
                <Button
                  className="text-sm text-danger"
                  variant="light"
                  onClick={isLoggedIn ? handleRemove : removeLocal}
                  isLoading={isRemoving}
                  isDisabled={isRemoving || isIncrementing || isDecrementing}
                  startContent={
                    !isRemoving && (
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className="flex items-center mt-4 sm:mt-0">
              <div className="flex bg-gray-100 rounded-lg">
                <Button
                  isIconOnly
                  isDisabled={isBtnDisabled() || isDecrementing}
                  size="sm"
                  variant="flat"
                  className="rounded-r-none"
                  isLoading={isDecrementing}
                  onClick={isLoggedIn ? handleDecrementQty : decrementQtyLocal}
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
                      d="M20 12H4"
                    />
                  </svg>
                </Button>

                <div className="flex items-center justify-center w-12 font-medium text-gray-900">
                  {localQty || qty}
                </div>

                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="rounded-l-none"
                  isLoading={isIncrementing}
                  isDisabled={isIncrementing}
                  onClick={isLoggedIn ? handleIncrementQty : incrementQtyLocal}
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Cartcard;
