import React from "react";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../utils/config";
import { storage } from "../utils/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { CircularProgress } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

import { Select, SelectItem } from "@nextui-org/react";

function NewProductUpload() {
  const [uuid, setUuid] = useState("");

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [fileSecondary, setFileSecondary] = useState(null);
  const [progressSecondary, setProgressSecondary] = useState(0);
  const [imageUrlSecondary, setImageUrlSecondary] = useState("");

  const [prodName, setProdName] = useState("");
  const [prodGeneric, setProdGeneric] = useState("");
  const [prodBrand, setProdBrand] = useState("");
  const [prodDosage, setProdDosage] = useState("");
  const [prodClass, setProdClass] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodDiscount, setProdDiscount] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodRoute, setProdRoute] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [prodPackSizeUS, setProdPackSizeUS] = useState("");
  const [prodPackSizeIN, setProdPackSizeIN] = useState("");

  const saveProduct = async () => {
    const docRef = doc(db, "site", "products");
    await updateDoc(docRef, {
      productsArray: arrayUnion({
        uuid: uuid,
        name: prodName,
        generic: prodGeneric,
        brand: prodBrand,
        dosage: prodDosage,
        class: prodClass,
        price: prodPrice,
        discount: prodDiscount,
        description: prodDescription,
        route: prodRoute,
        category: prodCategory,
        packSizeUS: prodPackSizeUS,
        packSizeIN: prodPackSizeIN,
        mainImage: imageUrl,
        secondaryImage: imageUrlSecondary,
      }),
    });
    window.location.reload();
  };

  const generateUuid = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `${uuid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Complete function
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
          });
        }
      );
    }
  };

  const handleChangeSecondary = (e) => {
    if (e.target.files[0]) {
      setFileSecondary(e.target.files[0]);
    }
  };

  const handleUploadSecondary = () => {
    if (fileSecondary) {
      const storageRef = ref(storage, `${uuid}/${fileSecondary.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileSecondary);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressSecondary(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Complete function
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrlSecondary(url);
          });
        }
      );
    }
  };

  return (
    <>
      {/* Card Section */}
      <div className="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
        {/* Card */}
        <div className="p-4 bg-white shadow rounded-xl sm:p-7">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800">Add new product</h2>
          </div>
          <>
            {/* Grid */}

            <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Product Uuid
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <div className="flex gap-x-2">
                    <div className="flex items-center gap-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                        onClick={generateUuid}
                      >
                        Generate Product unique Id
                      </button>
                      <div>{uuid}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Product primary Photo
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <div className="flex gap-x-2">
                    <div className="flex items-center gap-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className=" file:text-sm file:bg-white file:border-1 file:border-gray-300 file:rounded-lg file:shadow-sm file:hover:bg-gray-50 file:disabled:opacity-50 file:disabled:pointer-events-none file:focus:outline-none file:focus:bg-gray-50 file:py-2 file:cursor-pointer"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                      <CircularProgress
                        size="lg"
                        value={progress}
                        color="success"
                        formatOptions={{ style: "unit", unit: "percent" }}
                        showValueLabel={true}
                      />

                      {imageUrl && (
                        <div>
                          <img
                            src={imageUrl}
                            alt="Uploaded"
                            style={{ width: "100px" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="inline-block text-sm text-gray-800 mt-2.5">
                  Product secondary Photo
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <div className="flex gap-x-2">
                    <div className="flex items-center gap-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleChangeSecondary}
                        className=" file:text-sm file:bg-white file:border-1 file:border-gray-300 file:rounded-lg file:shadow-sm file:hover:bg-gray-50 file:disabled:opacity-50 file:disabled:pointer-events-none file:focus:outline-none file:focus:bg-gray-50 file:py-2 file:cursor-pointer"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                        onClick={handleUploadSecondary}
                      >
                        Upload
                      </button>
                      <CircularProgress
                        size="lg"
                        value={progressSecondary}
                        color="success"
                        formatOptions={{ style: "unit", unit: "percent" }}
                        showValueLabel={true}
                      />

                      {imageUrlSecondary && (
                        <div>
                          <img
                            src={imageUrlSecondary}
                            alt="Uploaded"
                            style={{ width: "100px" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* End Col */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Product Name
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 rounded-lg shadow-sm pe-11 -ms-px sm:mt-0 sm:first:ms-0 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                    placeholder="ABCD-5000mg"
                    onChange={(e) => {
                      setProdName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-full-name"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Product Info
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9 ">
                <div className="sm:flex gap-x-2">
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 rounded-lg shadow-sm pe-11 -ms-px sm:mt-0 sm:first:ms-0 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                    placeholder="Generic Name"
                    onChange={(e) => {
                      setProdGeneric(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 rounded-lg shadow-sm pe-11 -ms-px sm:mt-0 sm:first:ms-0 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                    placeholder="Brand name"
                    onChange={(e) => {
                      setProdBrand(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 rounded-lg shadow-sm pe-11 -ms-px sm:mt-0 sm:first:ms-0 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                    placeholder="Dosage form"
                    onChange={(e) => {
                      setProdDosage(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 -mt-px text-sm border-gray-200 rounded-lg shadow-sm pe-11 -ms-px sm:mt-0 sm:first:ms-0 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                    placeholder="Drug class"
                    onChange={(e) => {
                      setProdClass(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* End Col */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-email"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Prices
                </label>
              </div>
              {/* End Col */}
              <div className="flex sm:col-span-9 gap-x-4 ">
                <input
                  type="number"
                  className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                  placeholder="Original Price"
                  onChange={(e) => {
                    setProdPrice(e.target.value);
                  }}
                />
                <input
                  type="number"
                  className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                  placeholder="Discount Price"
                  onChange={(e) => {
                    setProdDiscount(e.target.value);
                  }}
                />
              </div>
              {/* End Col */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-password"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Description
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="space-y-2">
                  <textarea
                    className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pe-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border-1"
                    placeholder="Product Description"
                    rows={6}
                    onChange={(e) => {
                      setProdDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* End Col */}

              {/* End Col */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Routes
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <CheckboxGroup
                    label="Select Routes"
                    orientation="horizontal"
                    onChange={(e) => {
                      setProdRoute(e);
                    }}
                  >
                    <Checkbox value="ustous">US to US</Checkbox>
                    <Checkbox value="intous">IN to US</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Pack Size US to US
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <CheckboxGroup
                    label="Select Pack Size FOR US TO US"
                    orientation="horizontal"
                    onChange={(e) => {
                      setProdPackSizeUS(e);
                    }}
                  >
                    <Checkbox value="90">90</Checkbox>
                    <Checkbox value="180">180</Checkbox>
                    <Checkbox value="270">270</Checkbox>
                    <Checkbox value="360">360</Checkbox>
                    <Checkbox value="450">450</Checkbox>
                    <Checkbox value="540">540</Checkbox>
                    <Checkbox value="630">630</Checkbox>
                    <Checkbox value="720">720</Checkbox>
                    <Checkbox value="810">810</Checkbox>
                    <Checkbox value="900">900</Checkbox>
                    <Checkbox value="1080">1080</Checkbox>
                    <Checkbox value="1260">1260</Checkbox>
                    <Checkbox value="1440">1440</Checkbox>
                    <Checkbox value="1620">1620</Checkbox>
                    <Checkbox value="1800">1800</Checkbox>

                    <br />
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                    <Checkbox value="4">4</Checkbox>
                    <Checkbox value="5">5</Checkbox>
                    <Checkbox value="6">6</Checkbox>
                    <Checkbox value="7">7</Checkbox>
                    <Checkbox value="8">8</Checkbox>
                    <Checkbox value="9">9</Checkbox>
                    <Checkbox value="10">10</Checkbox>
                    <Checkbox value="11">11</Checkbox>
                    <Checkbox value="12">12</Checkbox>
                    <Checkbox value="13">13</Checkbox>
                    <Checkbox value="14">14</Checkbox>
                    <Checkbox value="15">15</Checkbox>
                    <Checkbox value="16">16</Checkbox>
                    <Checkbox value="17">17</Checkbox>
                    <Checkbox value="18">18</Checkbox>
                    <Checkbox value="19">19</Checkbox>
                    <Checkbox value="20">20</Checkbox>
                    <Checkbox value="60">60</Checkbox>
                    <Checkbox value="80">80</Checkbox>
                    <Checkbox value="100">100</Checkbox>
                    <Checkbox value="150">150</Checkbox>
                    <Checkbox value="200">200</Checkbox>
                    <Checkbox value="250">250</Checkbox>
                    <Checkbox value="300">300</Checkbox>
                    <Checkbox value="350">350</Checkbox>
                    <Checkbox value="400">400</Checkbox>
                    <Checkbox value="450">450</Checkbox>
                    <Checkbox value="500">500</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Pack Size IN to US
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <CheckboxGroup
                    label="Select Pack Size FOR INDIA TO US"
                    orientation="horizontal"
                    onChange={(e) => {
                      setProdPackSizeIN(e);
                    }}
                  >
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                    <Checkbox value="4">4</Checkbox>
                    <Checkbox value="5">5</Checkbox>
                    <Checkbox value="6">6</Checkbox>
                    <Checkbox value="7">7</Checkbox>
                    <Checkbox value="8">8</Checkbox>
                    <Checkbox value="9">9</Checkbox>
                    <Checkbox value="10">10</Checkbox>
                    <Checkbox value="11">11</Checkbox>
                    <Checkbox value="12">12</Checkbox>
                    <Checkbox value="13">13</Checkbox>
                    <Checkbox value="14">14</Checkbox>
                    <Checkbox value="15">15</Checkbox>
                    <Checkbox value="16">16</Checkbox>
                    <Checkbox value="17">17</Checkbox>
                    <Checkbox value="18">18</Checkbox>
                    <Checkbox value="19">19</Checkbox>
                    <Checkbox value="20">20</Checkbox>
                    <Checkbox value="60">60</Checkbox>
                    <Checkbox value="80">80</Checkbox>
                    <Checkbox value="100">100</Checkbox>
                    <Checkbox value="150">150</Checkbox>
                    <Checkbox value="200">200</Checkbox>
                    <Checkbox value="250">250</Checkbox>
                    <Checkbox value="300">300</Checkbox>
                    <Checkbox value="350">350</Checkbox>
                    <Checkbox value="400">400</Checkbox>
                    <Checkbox value="450">450</Checkbox>
                    <Checkbox value="500">500</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
              {/* End Col */}

              <div className="sm:col-span-3">
                <label
                  htmlFor="af-account-gender-checkbox"
                  className="inline-block text-sm text-gray-800 mt-2.5"
                >
                  Category
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <div className="sm:flex">
                  <RadioGroup
                    label="Select category"
                    orientation="horizontal"
                    onChange={(e) => {
                      setProdCategory(e.target.value);
                      // console.log(e.target.value);
                    }}
                  >
                    <Radio value="ed">E.D.</Radio>
                    <Radio value="control">Control</Radio>
                    <Radio value="performance">Performance</Radio>
                    <Radio value="other">Others</Radio>
                  </RadioGroup>
                </div>
              </div>

              {/* End Col */}
            </div>
            {/* End Grid */}
            <div className="flex justify-end mt-5 gap-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => saveProduct()}
              >
                Upload Product
              </button>
            </div>
          </>
        </div>
        {/* End Card */}
      </div>
      {/* End Card Section */}
    </>
  );
}

export default NewProductUpload;
