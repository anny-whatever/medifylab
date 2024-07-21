import { useState } from "react";
import ReactImageGallery from "react-image-gallery";
// import Rater from "react-rater";
// import "react-rater/lib/react-rater.css";

import { Button } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/radio";

const Productpanel = () => {
  const [deliveryRoute, setDeliveryRoute] = useState();
  const [packSize, setPackSize] = useState();

  const radioStyle =
    "ml-1 mb-2 rounded-md border-1 transition-all duration-300 ease-in-out";
  const activateRadioStyle =
    "ml-1 mb-2 rounded-md shadow-md border-1 duration-300 ease-in-out";

  const productDetailItem = {
    images: [
      {
        original:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        thumbnail:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],

    size: ["60 Pills", "112", "M", "L", "XL"],
    color: ["gray", "violet", "red"],
  };

  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 text-gray-800 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container px-4 mx-auto">
        <ReactImageGallery
          showBullets={false}
          showPlayButton={false}
          infinite={true}
          lazyLoad={true}
          showFullscreenButton={true}
          items={productDetailItem.images}
        />

        {/* /image gallery  */}
      </div>
      {/* description  */}

      <div className="px-5 mx-auto lg:px-5">
        <h2 className="pt-3 text-2xl font-bold text-gray-800 lg:pt-0">
          Modafinil-100mg
        </h2>
        {/* <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={getStateNumber()}
            />

            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div> */}
        <p className="mt-5 font-bold">
          <p className="text-sm text-primary ">Details</p>
          Generic name: <span className="font-normal">Modafinil</span>
        </p>
        <p className="font-bold">
          Brand name: <span className="font-normal">Provigil</span>
        </p>
        <p className="font-bold">
          Dosage form:{" "}
          <span className="font-normal">oral tablet (100 mg; 200 mg)</span>
        </p>
        <p className="font-bold">
          Drug class: <span className="font-normal">CNS stimulants</span>
        </p>
        <div className="mt-3 mr-1 font-displaybold">
          <span className="mr-2 text-2xl text-red-600 font-displaylight">
            -50%
          </span>
          <span className="text-4xl font-displaybold text-primary">$5</span>
          <span className="text-lg text-primary">/pill</span>
          <div className="font-displaylight">
            MRP: <span className="line-through ">$10/pill</span>
          </div>
        </div>

        <p className="pt-5 mb-5 text-sm leading-5 text-gray-500">
          Modafinil is a medication that promotes wakefulness. Modafinil is used
          to treat excessive sleepiness caused by sleep apnea, narcolepsy, or
          shift work sleep disorder.Modafinil may also be used for purposes not
          listed in this medication guide.
        </p>

        <RadioGroup
          label="Select delivery route"
          // defaultValue={"intous"}
          onChange={(value) => setDeliveryRoute(value.target.value)}
          color="secondary"
          orientation="horizontal"
        >
          <Radio
            value="intous"
            className={
              deliveryRoute === "intous" ? activateRadioStyle : radioStyle
            }
          >
            India to US
          </Radio>
          <Radio
            value="ustous"
            className={
              deliveryRoute === "ustous" ? activateRadioStyle : radioStyle
            }
          >
            US to US
          </Radio>
        </RadioGroup>
        <div className="mt-6">
          <div className="flex w-full gap-1 ">
            <RadioGroup
              label="Select Packing Size"
              // defaultValue={"intous"}
              onChange={(value) => setPackSize(value.target.value)}
              color="secondary"
              orientation="horizontal"
            >
              <Radio value="60" className={radioStyle}>
                60 Pills
              </Radio>
              <Radio value="90" className={radioStyle}>
                90 Pills
              </Radio>
              <Radio value="120" className={radioStyle}>
                120 Pills
              </Radio>
              <Radio value="150" className={radioStyle}>
                150 Pills
              </Radio>
              <Radio value="custom" className={radioStyle}>
                Custom
              </Radio>
            </RadioGroup>
          </div>
        </div>

        {packSize === "custom" ? (
          <>
            <div className="mt-6">
              <p className="pb-2 text-gray-500 text-md">
                Custom quantity (more than 60)
              </p>
              <input
                type="number"
                placeholder="Enter quantity"
                className="px-4 py-2 text-sm border-gray-300 rounded-md w-fit border-1"
                min={60}
              />
            </div>
          </>
        ) : null}
        <div className="flex flex-row items-center gap-6 mt-7">
          <Button className="my-3 view" color="secondary" size="lg">
            Add to Cart
          </Button>
          <Button className="my-3 view " color="secondary" size="lg">
            Buy now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Productpanel;
