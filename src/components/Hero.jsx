import React from "react";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import PhoneInput from "react-phone-input-2";
import CarouselComponent from "./CarouselComponent.jsx";
import whatsapp from "../assets/img/whatsapp.svg";

import zelle from "../assets/paylogo/zelle.svg";
import paypal from "../assets/paylogo/paypal.svg";
import cashapp from "../assets/paylogo/cashapp.svg";
import venmo from "../assets/paylogo/venmo.svg";
import "react-phone-input-2/lib/style.css";
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
  const [value, setValue] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const savePhoneNumber = async () => {
    const docRef = doc(db, "visitorInfo", "tel");
    await updateDoc(docRef, {
      pendingNumbers: arrayUnion(value),
    });
    onOpen();
  };
  return (
    <>
      <Toaster richColors />
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ff1212]">
                CALL REQUEST RECEIVED!
              </ModalHeader>
              <ModalBody>
                <p>
                  Thank you for reaching out to us. You will receive a call
                  within 5-10 minutes.
                </p>

                <p>
                  You may receive or place a call on numbers provided below.
                </p>
                <a href="tel:+16092371558" className="text-left text-gray-800 ">
                  +1 (609) 237-1558
                </a>
                <a href="tel:+12549786592" className="text-left text-gray-800">
                  +1 (254) 978-6592
                </a>

                <p>Thank you for your patience.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
                  onClick={() => savePhoneNumber()}
                >
                  Request call
                </Button>
              </div>
              <span className="flex items-center mt-3 ">
                Or chat with us on
                <a href="https://wa.me/16092371558">
                  <img src={whatsapp} className="relative ml-2.5 w-28" alt="" />
                </a>
              </span>
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
