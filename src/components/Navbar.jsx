import React from "react";
import { useState, useContext, useEffect } from "react";
import logo from "../assets/img/logo.svg";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/config";
import { AuthContext } from "../utils/authContext.js";

// import whatsapp from "../assets/img/whatsapp.svg";

function Navbar() {
  let { userInfo, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const buttonStyle =
    "py-2.5 px-5 bg-transparent text-md text-white hover:bg-secondary hover:bg-opacity-80 rounded-lg duration-300 ease-in-out w-11/12 lg:w-auto";

  const buttonActiveStyle =
    "py-2.5 px-5 bg-transparent text-md text-white bg-secondary bg-opacity-80 rounded-lg duration-300 ease-in-out w-11/12 lg:w-auto";

  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <header className="flex flex-wrap w-full py-4 text-sm bg-zinc-800 lg:justify-start lg:flex-nowrap">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 lg:flex lg:items-center lg:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="inline-flex items-center text-xl font-semibold gap-x-2">
              <img src={logo} alt="Logo" className="w-12 h-auto" />
              <div className="text-4xl text-primary font-displaylight">
                medifylab
              </div>
            </div>
          </Link>

          <div className="lg:hidden ">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-white duration-100 ease-in-out rounded-lg shadow-sm bg-secondary bg-opacity-30 hs-collapse-toggle gap-x-2 hover:bg-opacity-40 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-collapse="#navbar-image-and-text-1"
              aria-controls="navbar-image-and-text-1"
              aria-label="Toggle navigation"
            >
              <svg
                className="flex-shrink-0 hs-collapse-open:hidden size-4"
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
              </svg>
              <svg
                className="flex-shrink-0 hidden hs-collapse-open:block size-4"
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
              </svg>
            </button>
          </div>
        </div>

        <div
          id="navbar-image-and-text-1"
          className="absolute left-0 z-30 hidden w-full pb-5 overflow-hidden transition-all duration-300 lg:p-0 bg-zinc-800 lg:bg-transparent lg:relative hs-collapse basis-full grow lg:block"
        >
          <div
            id="preline__collapse"
            className="flex flex-col items-center self-center justify-center gap-5 mx-auto mt-5 text-center lg:flex-row lg:items-end lg:justify-end lg:mt-0 lg:ps-5"
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
            {!isLoggedIn ? (
              <>
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
              </>
            ) : null}

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
                  className=" size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </Button>
            </Link>

            {isLoggedIn ? (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    className="duration-200 cursor-pointer bg-primary hover:bg-secondary"
                    size="md"
                  />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="profile" variant="flat">
                    {userInfo?.email}
                  </DropdownItem>
                  <DropdownItem key="order">Orders</DropdownItem>

                  <DropdownItem key="logout" onClick={handleLogout}>
                    {" "}
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
