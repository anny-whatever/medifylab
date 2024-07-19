import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";

import Toast from "./Toast";
const Toastalert = () => {
  const timeoutRef = useRef(null);

  const setRandomTimeout = () => {
    const minSeconds = 30;
    const maxSeconds = 500;
    const randomSeconds = Math.floor(
      Math.random() * (maxSeconds - minSeconds + 1) + minSeconds
    );
    const randomMilliseconds = randomSeconds * 1000;

    timeoutRef.current = setTimeout(() => {
      toast.success(<Toast />);
      setRandomTimeout();
    }, randomMilliseconds);
  };

  useEffect(() => {
    setRandomTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <Toaster richColors />;
};

export default Toastalert;
