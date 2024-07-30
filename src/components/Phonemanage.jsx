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
function Phonemanage() {
  const [data, setData] = useState();

  useEffect(() => {
    const docRef = doc(db, "visitorInfo", "tel");
    onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      setData(data);
    });
  }, []);

  const handleMoveToAttended = (number) => {
    const docRef = doc(db, "visitorInfo", "tel");
    updateDoc(docRef, {
      pendingNumbers: arrayRemove(number),
      attendedNumbers: arrayUnion(number),
    });
  };

  return (
    <>
      <Toaster richColors />
      <div className="flex flex-col w-4/5 p-2 mx-auto rounded-lg shadow-lg border-1 h-fit">
        <div className="flex justify-between w-full px-5 mt-2 font-bold">
          <span>Pending Calls</span>
          <span>Move to Attended</span>
        </div>
        <hr className="mx-5 mt-2" />

        {data?.pendingNumbers?.map((item, index) => {
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
                  onClick={() => handleMoveToAttended(item)}
                >
                  Move to Attended
                </Button>
              </div>
              <hr className="mx-5 mt-2" />
            </>
          );
        })}
      </div>
      {/* <div className="flex flex-col w-3/5 p-2 mx-auto mt-10 rounded-lg shadow-lg border-1 h-fit">
        <div className="flex justify-between w-full px-5 mt-2 font-bold">
          <span>Attended Calls</span>
        </div>
        <hr className="mx-5 mt-2" />

        {data?.attendedNumbers?.reverse()?.map((item, index) => {
          return (
            <>
              <div
                className="flex justify-between w-full px-5 mt-5"
                key={index}
              >
                <div>+{item}</div>
              </div>
              <hr className="mx-5 mt-2" />
            </>
          );
        })}
      </div> */}
    </>
  );
}

export default Phonemanage;
