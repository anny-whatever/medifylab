import React from "react";
import Registerpanel from "../components/Registerpanel";
import { db, auth, provider } from "../utils/config";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";

import { Toaster, toast } from "sonner";

function Register() {
  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const additionalInfo = getAdditionalUserInfo(result);
        if (additionalInfo?.isNewUser) {
          const docRef = await setDoc(doc(db, "users", result?.user?.uid), {
            email: result?.user?.email,
          });
          toast.success("Sign up successful");
        } else {
          toast.success("Sign up successful");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleEmailSignUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        toast.success("Sign up successful");
        const docRef = await setDoc(doc(db, "users", user.uid), {
          email: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message);
      });
  };
  return (
    <>
      <Registerpanel
        handleEmailSignUp={handleEmailSignUp}
        handleGoogleSignIn={handleGoogleSignIn}
      />
      <Toaster richColors />
    </>
  );
}

export default Register;
