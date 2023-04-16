import ComponentLayout from "@/pages/layout/ComponentLayout";
import React from "react";

const Hero = () => {
  return (
    <ComponentLayout>
      <div
        className="w-screen h-[550px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/landscape.png')",
        }}
      >
        <div className="mx-auto text-center px-8 lg:pt-32 lg:pb-12 md:pt-16 md:pb-6 pt-12 pb-8 md:mb-4">
          <span className="text-orange-600 font-semibold text-base lg:text-2xl md:text-xl">
            🏆 Rewards for Everything 🚀
          </span>
          <h1 className=" font-heading text-white mt-4 mb-6 text-5xl md:text-7xl">
            GATEWAY
            <p className="text-2xl md:text-4xl text-orange-400">on Archway</p>
          </h1>
          <div className="lg:text-lg md:text-md mb-10 text-white mx-4 md:mx-12 lg:mx-32">
            <p>Bridging Web2 and Web3 to empower developers and</p>
            <p>accelerate the growth of the decentralized applications.</p>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};

export default Hero;
