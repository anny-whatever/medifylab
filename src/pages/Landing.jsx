import React from "react";
import Hero from "../components/Hero.jsx";

import Features from "../components/Features.jsx";
import Offers from "../components/Offers.jsx";
import Bestseller from "../components/Bestseller.jsx";
import Stats from "../components/Stats.jsx";

import Footer from "../components/Footer.jsx";
function Landing() {
  return (
    <>
      <Hero />
      <Features />
      {/* <div className="w-full mt-5 text-2xl text-center font-displaymedium text-primary">
        Products on sale
        <hr className="w-2/5 h-6 mx-auto mt-1 mx-full rounded-3xl border-primary" />
      </div> */}
      <Offers />
      <Bestseller />
      <Stats />
    </>
  );
}

export default Landing;
