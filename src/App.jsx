import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "./utils/config";
import { collection, addDoc } from "firebase/firestore";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { HSStaticMethods } from "preline";
import Toastalert from "./components/Toastalert.jsx";

HSStaticMethods.autoInit();

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    HSStaticMethods.autoInit("#preline__collapse");
  }
});
observer.observe(document.body, {
  attributes: true,
  subtree: true,
  childList: true,
  characterData: true,
});

// components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// Pages
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contacts from "./pages/Contacts.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import Shop from "./pages/Shop.jsx";

function App() {
  // const test = async () => {
  //   console.time("test");
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  //   console.timeEnd("test");
  // };
  return (
    <>
      {/* <NavbarComponent /> */}
      <Toastalert />
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {/* <Landing /> */}
    </>
  );
}

export default App;
