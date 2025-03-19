// src/App.jsx
import { useState, useEffect } from "react";
import { db, auth } from "./utils/config";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { HSStaticMethods } from "preline";
import Toastalert from "./components/Toastalert.jsx";
import { Spinner } from "@nextui-org/react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setIsLoggedIn(true);
      } else {
        setUserInfo(null);
        setIsLoggedIn(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Products listener with error handling
  useEffect(() => {
    setLoading(true);
    let unsubscribe;

    try {
      unsubscribe = onSnapshot(
        doc(db, "site", "products"),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setProducts(docSnapshot.data());
          } else {
            console.warn("Products document doesn't exist");
            setProducts({ productsArray: [] });
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching products:", error);
          setError("Failed to load products. Please refresh the page.");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Error setting up products listener:", err);
      setError(
        "Failed to connect to the database. Please check your connection."
      );
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // User data listener with error handling
  useEffect(() => {
    let unsubscribe;

    if (userInfo?.uid) {
      try {
        unsubscribe = onSnapshot(
          doc(db, "users", userInfo.uid),
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserData(docSnapshot.data());
            } else {
              console.warn("User document doesn't exist for:", userInfo.uid);
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );
      } catch (err) {
        console.error("Error setting up user data listener:", err);
      }
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userInfo]);

  // Local cart synchronization with Firestore for logged-in users
  useEffect(() => {
    const syncLocalCart = async () => {
      if (isLoggedIn && userData && localStorage.getItem("cart")) {
        try {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];

          if (localCart.length > 0) {
            // We'll handle this in a separate component to avoid complexity here
            console.log(
              "Local cart available for syncing:",
              localCart.length,
              "items"
            );
          }

          // Clear local cart after sync attempt
          localStorage.removeItem("cart");
        } catch (err) {
          console.error("Error syncing local cart:", err);
        }
      }
    };

    syncLocalCart();
  }, [isLoggedIn, userData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" color="primary" className="mb-4" />
          <p className="text-gray-600">Loading MedifyLab...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Connection Error
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
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
              <Route path="/checkout" element={<Checkout />} />

              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
        </DataContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
