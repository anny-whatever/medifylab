import React from "react";
import { useContext, useEffect, useState } from "react";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../utils/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/config";

import NewProductUpload from "../components/NewProductUpload";
import DeleteProduct from "../components/DeleteProduct";
import Phonemanage from "../components/Phonemanage";
import Ordersmanage from "../components/Ordersmanage";
import Acceptedordersmanage from "../components/Acceptedordersmanage";
import Deliveredordersmanage from "../components/Deliveredordersmanage";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
function Admin() {
  const { userInfo, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (userInfo) {
        const userDoc = await getDoc(doc(db, "users", userInfo?.uid));
        if (userDoc?.exists() && userDoc?.data().role === "admin") {
          setIsAdmin(true);
          setIsLoading(false);
        }
        if (!userInfo?.email) {
          setIsAdmin(false);
          setIsLoading(false);
        }
        // console.log(userInfo);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [userInfo]);

  if (isLoading === true) {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }

  if (isAdmin === false && isLoading === false) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isAdmin === true && isLoading === false ? (
        <>
          <Tabs aria-label="Options" className="w-10/12 mx-auto mt-3 ml-10">
            <Tab key="Product Upload" title="Product Upload">
              <Card className="mx-10 ">
                <CardBody>
                  <NewProductUpload />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Delete Product" title="Delete Product">
              <Card className="mx-10 ">
                <CardBody>
                  <DeleteProduct />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Pending Calls" title="Pending Calls">
              <Card className="mx-10 ">
                <CardBody>
                  <Phonemanage />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Pending Orders" title="Pending Orders">
              <Card className="mx-10 ">
                <CardBody>
                  <Ordersmanage />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Accepted Orders" title="Accepted Orders">
              <Card className="mx-10 ">
                <CardBody>
                  <Acceptedordersmanage />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Delivered Orders" title="Delivered Orders">
              <Card className="mx-10 ">
                <CardBody>
                  <Deliveredordersmanage />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Admin;
