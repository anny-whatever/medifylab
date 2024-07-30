import React, { useState, useEffect } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Payment from "payment";

import {
  Button,
  Input,
  Spinner,
  Checkbox,
  Select,
  SelectItem,
  user,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { useLocation } from "react-router-dom";
import { db } from "../utils/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { AuthContext } from "../utils/authContext";
import { useContext } from "react";

import { Toaster, toast } from "sonner";

function CheckoutPanel() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userInfo, isLoggedIn, userData } = useContext(AuthContext);

  const states = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Federated States Of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const [isSameShipping, setIsSameShipping] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const cart = searchParams.get("products");
  const total = searchParams.get("total");
  const shippingIndia = searchParams.get("shippingIndia");
  const shippingUs = searchParams.get("shippingUs");
  if (!orderId) {
    window.location.href = "/";
  }
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    streetAddressBilling: "",
    apartmentBilling: "",
    cityBilling: "",
    stateBilling: "",
    zipCodeBilling: "",
    streetAddressShipping: "",
    apartmentShipping: "",
    cityShipping: "",
    stateShipping: "",
    zipCodeShipping: "",
    number: "",
    expiry: "",
    cvc: "",
    orderId: orderId,
    cart: cart,
    total: total,
    shippingIndia: shippingIndia,
    shippingUs: shippingUs,
    isLoggedIn: isLoggedIn,
    time: new Date(),
    userId: userInfo?.uid || "",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const handleInfoEnter = (evt) => {
    setInfo((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
  }

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  function formatCreditCardNumber(value) {
    if (!value) {
      return value;
    }

    const issuer = Payment.fns.cardType(value);
    const clearValue = clearNumber(value);
    let nextValue;

    switch (issuer) {
      case "amex":
        nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
          4,
          10
        )} ${clearValue.slice(10, 15)}`;
        break;
      case "dinersclub":
        nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
          4,
          10
        )} ${clearValue.slice(10, 14)}`;
        break;
      default:
        nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
          4,
          8
        )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
        break;
    }

    return nextValue.trim();
  }

  function formatCVC(value, prevValue, allValues = {}) {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    if (allValues.number) {
      const issuer = Payment.fns.cardType(allValues.number);
      maxLength = issuer === "amex" ? 4 : 3;
    }

    return clearValue.slice(0, maxLength);
  }

  function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
  }

  const checkIfAllInfoFilled = () => {
    if (isSameShipping) {
      if (
        info.firstName !== "" &&
        info.lastName !== "" &&
        info.phoneNumber !== "" &&
        info.streetAddressBilling !== "" &&
        info.apartmentBilling !== "" &&
        info.cityBilling !== "" &&
        info.stateBilling !== "" &&
        info.zipCodeBilling !== "" &&
        info.number !== "" &&
        info.expiry !== "" &&
        info.cvc !== ""
      ) {
        return true;
      }
    } else if (!isSameShipping) {
      if (
        info.firstName !== "" &&
        info.lastName !== "" &&
        info.phoneNumber !== "" &&
        info.streetAddressBilling !== "" &&
        info.apartmentBilling !== "" &&
        info.cityBilling !== "" &&
        info.stateBilling !== "" &&
        info.zipCodeBilling !== "" &&
        info.streetAddressShipping !== "" &&
        info.apartmentShipping !== "" &&
        info.cityShipping !== "" &&
        info.stateShipping !== "" &&
        info.zipCodeShipping !== "" &&
        info.number !== "" &&
        info.expiry !== "" &&
        info.cvc !== ""
      ) {
        return true;
      }
    } else {
      return false;
    }
  };
  const handlePlaceOrder = async () => {
    const docRef = doc(db, "orderHandlers", "orders");
    setIsPlacingOrder(true);
    await updateDoc(docRef, { pendingOrders: arrayUnion(info) });
    if (isLoggedIn) {
      await updateDoc(doc(db, "users", userInfo.uid), {
        pendingOrders: arrayUnion(info),
        cart: [],
      });
    }
    setIsPlacingOrder(false);
    toast.success("A user from " + info.state + " just made a purchase!");
    onOpen();
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <>
      <Toaster richColors />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ff1212]">
                ORDER CONFIRMATION ALERT!
              </ModalHeader>
              <ModalBody>
                <p>
                  We are now processing your order. You will receive a
                  confirmation call within 5-10 minutes.
                </p>
                <p>
                  Our payment processor is currently experiencing issues. We
                  apologize for the inconvenience and will be working to resolve
                  this issue as soon as possible.
                </p>
                <p>The amount has NOT been deducted from your account.</p>
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
      <div className="flex flex-col items-center justify-center w-full lg:flex-row lg:items-start">
        {/* Card Section */}
        <div className="w-full max-w-2xl px-4 py-5 sm:px-6 lg:px-8 lg:py-5 ">
          {/* Card */}
          <div className="p-4 bg-white shadow rounded-xl sm:p-7">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Checkout
              </h2>
              <p className="text-sm text-gray-600">
                Please fill out the form below to checkout
              </p>
            </div>
            <form>
              {/* Section */}
              <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent">
                <label
                  htmlFor="af-payment-billing-contact"
                  className="inline-block text-sm font-medium"
                >
                  Billing contact
                </label>
                <div className="mt-2 space-y-3">
                  <Input
                    name="firstName"
                    id="af-payment-billing-contact"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => handleInfoEnter(e)}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => handleInfoEnter(e)}
                  />
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number (Please include country code)"
                    onChange={(e) => handleInfoEnter(e)}
                  />
                  <Input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    onChange={(e) => handleInfoEnter(e)}
                  />
                </div>
              </div>
              {/* End Section */}
              {/* Section */}
              <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent">
                <label
                  htmlFor="af-payment-billing-address"
                  className="inline-block text-sm font-medium"
                >
                  Billing address
                </label>
                <div className="mt-2 space-y-3">
                  <Input
                    id="af-payment-billing-address"
                    type="text"
                    placeholder="Street Address"
                    name="streetAddressBilling"
                    onChange={(e) => handleInfoEnter(e)}
                  />
                  <Input
                    type="text"
                    placeholder="Apt, Suite, Building"
                    name="apartmentBilling"
                    onChange={(e) => handleInfoEnter(e)}
                  />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      type="text"
                      placeholder="Zip Code"
                      name="zipCodeBilling"
                      onChange={(e) => handleInfoEnter(e)}
                    />
                    <Input
                      type="text"
                      placeholder="City"
                      name="cityBilling"
                      onChange={(e) => handleInfoEnter(e)}
                    />

                    <Select
                      placeholder="State"
                      name="stateBilling"
                      onChange={(e) => handleInfoEnter(e)}
                    >
                      {states.map((state) => (
                        <SelectItem value={state} key={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="py-6 border-t border-gray-200 first:pt-0 last:pb-0 first:border-transparent">
                <div className="flex justify-between">
                  <label
                    htmlFor="af-payment-billing-address"
                    className="inline-block text-sm font-medium"
                  >
                    Shipping address
                  </label>
                  <Checkbox
                    checked={isSameShipping}
                    onChange={(e) => setIsSameShipping(e.target.checked)}
                    className="text-sm"
                    size="sm"
                  >
                    Same as billing
                  </Checkbox>
                </div>

                {!isSameShipping && (
                  <div className="mt-2 space-y-3">
                    <Input
                      id="af-payment-billing-address"
                      type="text"
                      placeholder="Street Address"
                      name="streetAddressShipping"
                      onChange={(e) => handleInfoEnter(e)}
                    />
                    <Input
                      type="text"
                      placeholder="Apt, Suite, Building"
                      name="apartmentShipping"
                      onChange={(e) => handleInfoEnter(e)}
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        type="text"
                        placeholder="Zip Code"
                        name="zipCodeShipping"
                        onChange={(e) => handleInfoEnter(e)}
                      />
                      <Input
                        type="text"
                        placeholder="City"
                        name="cityShipping"
                        onChange={(e) => handleInfoEnter(e)}
                      />
                      <Select
                        placeholder="State"
                        name="stateShipping"
                        onChange={(e) => handleInfoEnter(e)}
                      >
                        {states.map((state) => (
                          <SelectItem value={state} key={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* End Card */}
        </div>
        {/* End Card Section */}
        <div className="p-5 mt-5 mb-5 shadow-lg lg:w-fit rounded-xl h-fit">
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
          <div className="flex flex-col mt-5 gap-y-4">
            <Input
              type="tel"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={(e) => {
                handleInputChange(e);
                handleInfoEnter(e);
              }}
              onFocus={handleInputFocus}
            />
            <Input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={state.name}
              onChange={(e) => {
                handleInputChange(e);
                handleInfoEnter(e);
              }}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="flex my-4 gap-x-4">
            <Input
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              value={state.expiry}
              onChange={(e) => {
                handleInputChange(e);
                handleInfoEnter(e);
              }}
              onFocus={handleInputFocus}
            />
            <Input
              type="tel"
              name="cvc"
              placeholder="Enter CVC"
              value={state.cvc}
              onChange={(e) => {
                handleInputChange(e);
                handleInfoEnter(e);
              }}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="flex justify-end mt-5 gap-x-2">
            <Button type="button">Cancel</Button>
            <Button
              type="button"
              color="secondary"
              isDisabled={!checkIfAllInfoFilled()}
              onClick={handlePlaceOrder}
            >
              {isPlacingOrder ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPanel;
