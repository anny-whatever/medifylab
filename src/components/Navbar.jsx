// src/components/Navbar.jsx
import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/img/logo.svg";
import Fuse from "fuse.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../utils/config";
import { AuthContext } from "../utils/authContext.js";
import { DataContext } from "../utils/dataContext.js";

import { db } from "../utils/config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

function Navbar() {
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);
  const { products } = useContext(DataContext);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (products?.productsArray?.length > 0 && search) {
      const fuse = new Fuse(products.productsArray, {
        keys: ["name", "generic", "brand", "class"],
      });
      const searchResults = fuse.search(search);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [search, products]);

  useEffect(() => {
    if (!isLoggedIn) {
      const cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      setCart(cartItems);
    } else if (userData?.cart) {
      setCart(userData.cart);
    }

    if (isLoggedIn && userData) {
      let localCart = [];
      if (localStorage.getItem("cart")) {
        localCart = JSON.parse(localStorage.getItem("cart"));

        if (localCart.length > 0) {
          localCart.forEach(async (item) => {
            try {
              await updateDoc(doc(db, "users", userInfo.uid), {
                cart: arrayUnion(item),
              });
            } catch (error) {
              console.error("Error updating cart:", error);
            }
          });

          localStorage.removeItem("cart");
        }
      }
    }
  }, [isLoggedIn, userData, userInfo]);

  const buttonStyle =
    "py-2.5 px-5 bg-transparent text-md text-white hover:bg-secondary hover:bg-opacity-80 rounded-lg duration-300 ease-in-out w-11/12 lg:w-auto";

  const buttonActiveStyle =
    "py-2.5 px-5 bg-transparent text-md text-white bg-secondary bg-opacity-80 rounded-lg duration-300 ease-in-out w-11/12 lg:w-auto";

  const handleLogout = () => {
    signOut(auth);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Search for products
                </motion.div>
              </ModalHeader>
              <ModalBody>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Input
                    label="Search"
                    isClearable
                    radius="lg"
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      ],
                      innerWrapper: "bg-transparent",
                    }}
                    placeholder="Type to search..."
                    startContent={
                      <motion.div
                        animate={{ rotate: search ? [0, 15, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                      >
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
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </motion.div>
                    }
                  />
                </motion.div>
              </ModalBody>
              <ModalFooter>
                <AnimatePresence>
                  {results.length > 0 && (
                    <motion.div
                      className="flex flex-col w-full gap-y-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-semibold text-primary">
                        Results
                      </span>
                      {results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="px-3 py-4 transition-all rounded-lg border-b-1 hover:bg-secondary hover:bg-opacity-10"
                          whileHover={{ scale: 1.01 }}
                        >
                          <Link
                            to={`/product/${result.item.uuid}`}
                            onClick={() => {
                              setSearch("");
                              onClose();
                            }}
                          >
                            <div className="flex flex-row items-center justify-between">
                              <span className="w-1/4 font-medium text-gray-800 text-md">
                                {result.item.name}
                              </span>

                              <span className="w-1/4 text-sm text-right text-gray-600">
                                {result.item.brand}
                              </span>
                              <span className="w-1/4 text-lg font-bold text-right text-primary">
                                ${result.item.discount}
                                <span className="ml-1 text-xs text-gray-500 line-through">
                                  ${result.item.price}
                                </span>
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="sticky top-0 z-50 flex flex-wrap w-full py-4 text-sm bg-zinc-800 lg:justify-start lg:flex-nowrap"
      >
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 lg:flex lg:items-center lg:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div
                className="inline-flex items-center text-xl font-semibold gap-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img src={logo} alt="Logo" className="w-12 h-auto" />
                <div className="text-4xl text-primary font-displaylight">
                  medifylab
                </div>
              </motion.div>
            </Link>

            <div className="lg:hidden">
              <motion.button
                type="button"
                className="inline-flex items-center justify-center p-2 text-white duration-100 ease-in-out rounded-lg shadow-sm bg-secondary bg-opacity-30 gap-x-2 hover:bg-opacity-40 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
                data-hs-collapse="#navbar-image-and-text-1"
                aria-controls="navbar-image-and-text-1"
                aria-label="Toggle navigation"
              >
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.svg
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="close"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {(isMenuOpen || windowWidth >= 1024) && (
              <motion.div
                id="navbar-image-and-text-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 z-30 w-full pb-5 overflow-hidden lg:p-0 bg-zinc-800 lg:bg-transparent lg:relative lg:flex lg:h-auto basis-full grow"
              >
                <div
                  id="preline__collapse"
                  className="flex flex-col items-center self-center justify-center gap-5 mx-auto mt-5 text-center lg:flex-row lg:items-end lg:justify-end lg:mt-0 lg:ps-5"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      color="secondary"
                      variant="light"
                      onPress={onOpen}
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                      <span className="hidden md:inline">Search</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/shop">
                      <Button
                        className={
                          location.pathname === "/shop"
                            ? buttonActiveStyle
                            : buttonStyle
                        }
                      >
                        Shop
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/about">
                      <Button
                        className={
                          location.pathname === "/about"
                            ? buttonActiveStyle
                            : buttonStyle
                        }
                      >
                        About
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/contacts">
                      <Button
                        className={
                          location.pathname === "/contacts"
                            ? buttonActiveStyle
                            : buttonStyle
                        }
                      >
                        Contacts
                      </Button>
                    </Link>
                  </motion.div>

                  {!isLoggedIn && (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link to="/login">
                          <Button
                            className={
                              location.pathname === "/login"
                                ? buttonActiveStyle
                                : buttonStyle
                            }
                          >
                            Login
                          </Button>
                        </Link>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link to="/register">
                          <Button
                            className={
                              location.pathname === "/register"
                                ? buttonActiveStyle
                                : buttonStyle
                            }
                          >
                            Sign Up
                          </Button>
                        </Link>
                      </motion.div>
                    </>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link to="/cart">
                      <Button
                        color="primary"
                        variant="flat"
                        className={
                          location.pathname === "/cart"
                            ? buttonActiveStyle
                            : buttonStyle
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        {cart?.length > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute z-50 px-2 py-0.5 text-xs font-bold rounded-full text-white p- -top-1 -right-1 count bg-primary"
                          >
                            {cart.length}
                          </motion.div>
                        )}
                      </Button>
                    </Link>
                  </motion.div>

                  {isLoggedIn && (
                    <Dropdown>
                      <DropdownTrigger>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Avatar
                            className="duration-200 shadow-lg cursor-pointer bg-primary hover:bg-secondary"
                            size="md"
                          />
                        </motion.div>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="User Actions">
                        <DropdownItem
                          key="profile"
                          variant="flat"
                          className="font-medium text-primary"
                        >
                          {userInfo?.email}
                        </DropdownItem>
                        <DropdownItem key="order">Orders</DropdownItem>
                        <DropdownItem
                          key="logout"
                          onClick={handleLogout}
                          className="text-danger"
                        >
                          Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}

export default Navbar;
