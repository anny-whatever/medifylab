// src/components/Stats.jsx
import React from "react";
import { motion } from "framer-motion";

function Stats() {
  return (
    <>
      {/* Features */}
      <div className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto mb-16 bg-gray-50 rounded-2xl">
        {/* Grid */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats */}
            <div className="lg:pe-6 xl:pe-12">
              <p className="text-6xl font-bold leading-10 text-primary">
                6500+
                <motion.span
                  className="ms-1 inline-flex items-center gap-x-1 bg-green-100 font-medium text-green-800 text-xs leading-4 rounded-full py-0.5 px-2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                  +17% this year
                </motion.span>
              </p>
              <p className="mt-2 text-lg text-gray-500 sm:mt-3">
                happy customers from all over the world
              </p>
            </div>
            {/* End Stats */}
          </motion.div>
          {/* End Col */}
          <div className="relative lg:col-span-8 lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-full p-6 bg-white shadow-sm rounded-xl">
                  <p className="text-3xl font-semibold text-center text-primary">
                    99.95%
                  </p>
                  <p className="mt-1 text-center text-gray-500">
                    in fulfilling orders
                  </p>
                </div>
              </motion.div>
              {/* End Stats */}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="h-full p-6 bg-white shadow-sm rounded-xl">
                  <p className="text-3xl font-semibold text-center text-primary">
                    12000+
                  </p>
                  <p className="mt-1 text-center text-gray-500">
                    orders fulfilled
                  </p>
                </div>
              </motion.div>
              {/* End Stats */}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="h-full p-6 bg-white shadow-sm rounded-xl">
                  <p className="text-3xl font-semibold text-center text-primary">
                    99%
                  </p>
                  <p className="mt-1 text-center text-gray-500">
                    on time delivery
                  </p>
                </div>
              </motion.div>
              {/* End Stats */}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
    </>
  );
}

export default Stats;
