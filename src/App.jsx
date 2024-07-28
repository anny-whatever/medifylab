import { useState, useEffect } from "react";
import { db, auth } from "./utils/config";
import { doc, onSnapshot } from "firebase/firestore";
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
import Admin from "./pages/Admin.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Contacts from "./pages/Contacts.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import Shop from "./pages/Shop.jsx";

import { DataContext } from "./utils/dataContext.js";
import { AuthContext } from "./utils/authContext.js";

import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [userInfo, setUserInfo] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData, setUserData] = useState();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setIsLoggedIn(true);
      } else {
        setUserInfo(null);
        setIsLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "site", "products"), (doc) => {
      setProducts(doc.data());
    });
  }, []);

  useEffect(() => {
    if (userInfo) {
      const unsub = onSnapshot(doc(db, "users", userInfo?.uid), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [userInfo]);

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
  let data = "Hein?????";
  return (
    <>
      {/* <NavbarComponent /> */}
      <AuthContext.Provider value={{ userInfo, isLoggedIn, userData }}>
        <DataContext.Provider value={{ products }}>
          <Toastalert />
          <div className="min-h-[60vh]">
            <Navbar />

            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route
                path="/login"
                element={userInfo ? <Navigate to="/" replace /> : <Login />}
              />
              <Route
                path="/register"
                element={userInfo ? <Navigate to="/" replace /> : <Register />}
              />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:productId" element={<Product />} />

              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
        </DataContext.Provider>
      </AuthContext.Provider>
      {/* <Landing /> */}
    </>
  );
}

export default App;
