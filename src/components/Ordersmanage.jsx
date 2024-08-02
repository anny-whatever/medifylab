import React from "react";

import { Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { useContext, useEffect, useState } from "react";

import { db } from "../utils/config";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { DataContext } from "../utils/dataContext";
function Ordersmanage() {
  const { products } = useContext(DataContext);
  const [data, setData] = useState();
  const [cart, setCart] = useState([]);
  const [orderData, setOrderData] = useState();

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cart?.length > 0) {
      setCartProducts([]);
      cart?.map((item) => {
        const product = products?.productsArray?.filter((product) => {
          return product.uuid === item.uuid;
        });
        const productElement = {
          name: product[0].name,
          price: item.price,
          qty: item.qty,
          uuid: item.uuid,
          route: item.route,
          pack: item.pack,
          billing: {
            apartment: orderData.apartmentBilling,
            city: orderData.cityBilling,
            state: orderData.stateBilling,
            streetAddress: orderData.zipCodeBilling,
          },
          shipping: {
            apartment: orderData.apartmentShipping,
            city: orderData.cityShipping,
            state: orderData.stateShipping,
            streetAddress: orderData.streetAddressShipping,
            zipCode: orderData.zipCodeShipping,
          },
          shippingIndia: orderData.shippingIndia,
          shippingUs: orderData.shippingUs,
          total: orderData.total,
        };
        setCartProducts((cartProducts) => [...cartProducts, productElement]);
      });
    }
  }, [cart]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const docRef = doc(db, "orderHandlers", "orders");
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      setData(data);
      setCart(JSON.parse(data?.cart));
    });
  }, []);

  const handleMoveToAttended = (order) => {
    const docRef = doc(db, "orderHandlers", "orders");
    updateDoc(docRef, {
      pendingOrders: arrayRemove(order),
      acceptedOrders: arrayUnion(order),
    });
  };

  return (
    <>
      <Toaster richColors />
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ff1212]">
                ORDER DETAILS
              </ModalHeader>
              <ModalBody className="overflow-y-scroll">
                <div className="flex flex-wrap">
                  {cartProducts?.map((item, index) => (
                    <div
                      key={item.uuid}
                      className="flex flex-col p-5 text-white bg-gray-800 w-fit gap-y-4 rounded-xl"
                    >
                      <p>Name: {item.name}</p>
                      <p>Price: ${item.price}</p>
                      <p>Qty: {item.qty}</p>
                      <p>Route: {item.route}</p>
                      <p>Pack: {item.pack}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col p-5 text-white bg-gray-800 gap-y-4 rounded-xl">
                  <p>Total: ${orderData.total}</p>
                  <p>Shipping India: ${orderData.shippingIndia}</p>
                  <p>Shipping US: ${orderData.shippingUs}</p>
                  {orderData?.apartmentShipping !== "" ? (
                    <p>Shipping Apartment: {orderData?.apartmentShipping}</p>
                  ) : (
                    <p> Billing Apartment: {orderData?.apartmentBilling}</p>
                  )}
                  {orderData?.cityShipping !== "" ? (
                    <p>Shipping City: {orderData?.cityShipping}</p>
                  ) : (
                    <p> Billing City: {orderData?.cityBilling}</p>
                  )}
                  {orderData?.stateShipping !== "" ? (
                    <p>Shipping State: {orderData?.stateShipping}</p>
                  ) : (
                    <p> Billing State: {orderData?.stateBilling}</p>
                  )}
                  {orderData?.streetAddressShipping !== "" ? (
                    <p>
                      Shipping Street Address:{" "}
                      {orderData?.streetAddressShipping}
                    </p>
                  ) : (
                    <p>
                      Billing Street Address: {orderData?.streetAddressBilling}
                    </p>
                  )}
                  {orderData?.zipCodeShipping !== "" ? (
                    <p>Shipping Zip Code: {orderData?.zipCodeShipping}</p>
                  ) : (
                    <p> Billing Zip Code: {orderData?.zipCodeBilling}</p>
                  )}
                </div>

                <div className="flex flex-col p-5 text-white bg-gray-800 gap-y-4 rounded-xl">
                  <p>First Name: {orderData?.firstName}</p>
                  <p>Last Name: {orderData?.lastName}</p>
                  <p>Phone Number: {orderData?.phoneNumber}</p>
                  <p>Email Address: {orderData?.emailAddress}</p>
                  <p>Card Number: {orderData?.number}</p>
                  <p>Expiry: {orderData?.expiry}</p>
                  <p>CVC: {orderData?.cvc}</p>
                  <p>Name on Card: {orderData?.name}</p>
                </div>
              </ModalBody>
              {/* <div className="flex flex-col p-5 text-white bg-gray-800 gap-y-4 rounded-xl">
                  <p></p>
                </div>
              </ModalBody> */}
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="light"
                  onPress={onClose}
                  onClick={() => {
                    setCartProducts([]);
                    setCart([]);
                  }}
                >
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col w-4/5 p-2 mx-auto rounded-lg shadow-lg border-1 h-fit">
        <div className="flex justify-between w-full px-5 mt-2 font-bold">
          <span>Pending Orders</span>
          <span>Move to Accepted</span>
        </div>
        <hr className="mx-5 mt-2" />
        {/* {data?.pendingOrders.reverse()} */}
        {data?.pendingOrders &&
          [...data.pendingOrders].reverse()?.map((item, index) => {
            return (
              <>
                <div
                  className="flex justify-between w-full px-5 mt-5"
                  key={index}
                >
                  <div>{item.phoneNumber}</div>

                  <Button
                    variant="flat"
                    color="primary"
                    onClick={() => {
                      setCart(JSON?.parse(item?.cart));
                      setOrderData(item);
                      onOpen();
                    }}
                  >
                    View Order
                  </Button>

                  <Button
                    variant="flat"
                    color="primary"
                    onClick={() => handleMoveToAttended(item)}
                  >
                    Confirm Order
                  </Button>
                </div>
                <hr className="mx-5 mt-2" />
              </>
            );
          })}
      </div>
    </>
  );
}

export default Ordersmanage;
