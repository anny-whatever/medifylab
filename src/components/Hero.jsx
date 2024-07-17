import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Button } from "@nextui-org/react";

import CarouselComponent from "./CarouselComponent.jsx";

// import visa from "../assets/paylogo/visa.svg";
// import visa from "../assets/paylogo/visa-svgrepo-com.svg";
import zelle from "../assets/paylogo/zelle.svg";
import paypal from "../assets/paylogo/paypal.svg";
import cashapp from "../assets/paylogo/cashapp.svg";
import venmo from "../assets/paylogo/venmo.svg";

function Hero() {
  const [value, setValue] = useState();
  return (
    <>
      <div className="w-full py-5 bg-opacity-20 bg-primary">
        {/* Hero */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            <div className="lg:col-span-3">
              <h1 className="block text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl text-primary font-displaymedium">
                MedifyLab
              </h1>
              <p className="mt-3 text-lg text-gray-800">
                Your trusted partner in health, delivering quality medicines at
                your doorstep. Experience convenience and care with our reliable
                online pharmacy services.
              </p>
              <div className="flex flex-col items-center gap-2 mt-5 lg:mt-8 sm:flex-row sm:gap-3">
                <div className="w-full sm:w-auto">
                  <label htmlFor="hero-input" className="sr-only">
                    Search
                  </label>
                  <div className="flex w-full">
                    <PhoneInput
                      placeholder="Enter your phone number"
                      country={"us"}
                      value={value}
                      inputStyle={{
                        width: "100%",
                        minWidth: "256px",
                        border: 0,
                        height: "46px",
                      }}
                      dropdownStyle={{ backgroundColor: "white" }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        border: "none",
                        hoverBackgroundColor: "transparent",
                      }}
                      onChange={(phone) => setValue(phone)}
                    />
                  </div>
                </div>
                <Button
                  color="secondary"
                  className="w-full py-6 rounded-lg sm:w-fit"
                  href="#"
                >
                  Request call
                </Button>
              </div>
              {/* Brands */}
              <div className="mt-6 lg:mt-12">
                <span className="text-xs font-medium text-gray-800 uppercase">
                  Accepted by us:
                </span>
                <div className="flex w-16 mt-1 h-fit gap-x-4">
                  <img src={paypal} alt="PayPal" />
                  <img src={zelle} alt="Visa" />
                  <img src={cashapp} alt="Mastercard" />
                  <img src={venmo} alt="Amex" />
                </div>
              </div>
              {/* End Brands */}
            </div>
            {/* End Col */}
            <div className="lg:col-span-4 lg:mt-0">
              <CarouselComponent />
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Hero */}
      </div>
    </>
  );
}

export default Hero;
