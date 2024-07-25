import React from "react";
import Loginpanel from "../components/Loginpanel";
import { db, auth, provider } from "../utils/config";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Toaster, toast } from "sonner";

function Login() {
  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser) {
        const docRef = await setDoc(doc(db, "users", result?.user?.uid), {
          email: result?.user?.email,
        });
        toast.success("Sign up successful");
      } else {
        toast.success("Sign up successful");
      }
    });
  };

  const handleEmailSignIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        toast.success("Login successful");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message);
      });
  };

  return (
    <>
      <Loginpanel
        handleEmailSignUp={handleEmailSignIn}
        handleGoogleSignIn={handleGoogleSignIn}
      />
      <Toaster richColors />
    </>
  );
}

export default Login;
