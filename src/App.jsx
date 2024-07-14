import { useState } from "react";
import { db } from "./utils/config";
import { collection, addDoc } from "firebase/firestore";
function App() {
  const test = async () => {
    console.time("test");
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.timeEnd("test");
  };
  return (
    <>
      <button
        onClick={test}
        className="p-5 transition-all duration-500 bg-green-400 rounded-lg hover:bg-green-300 "
      >
        Hello World
      </button>
    </>
  );
}

export default App;
