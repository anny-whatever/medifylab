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
function AttendedPhonemanage() {
  const [data, setData] = useState();

  useEffect(() => {
    const docRef = doc(db, "visitorInfo", "tel");
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      setData(data);
    });
  }, []);

  const handleDelete = (number) => {
    const docRef = doc(db, "visitorInfo", "tel");
    updateDoc(docRef, {
      attendedNumbers: arrayRemove(number),
    });
  };

  return (
    <>
      <Toaster richColors />
      <div className="flex flex-col w-4/5 p-2 mx-auto rounded-lg shadow-lg border-1 h-fit">
        <div className="flex justify-between w-full px-5 mt-2 font-bold">
          <span>Attended Calls</span>
          <span>Delete</span>
        </div>
        <hr className="mx-5 mt-2" />

        {data?.attendedNumbers?.map((item, index) => {
          return (
            <>
              <div
                className="flex justify-between w-full px-5 mt-5"
                key={index}
              >
                <div>+{item}</div>
                <Button
                  variant="flat"
                  color="primary"
                  onClick={() => handleDelete(item)}
                >
                  Move to Attended
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

export default AttendedPhonemanage;
