import React from "react";

function Features() {
  return (
    <>
      {/* Icon Blocks */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid items-center gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto border border-gray-200 rounded-full size-12 bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-primary">
                Fastest response
              </h3>
              <p className="mt-1 text-gray-600">
                Expect the fastest response time from the us
              </p>
            </div>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto border border-gray-200 rounded-full size-12 bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-primary">
                Guarenteed authenticity
              </h3>
              <p className="mt-1 text-gray-600">
                Get authentic products directly from manufacturer
              </p>
            </div>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto border border-gray-200 rounded-full size-12 bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="text-primary"
                fill="currentColor"
              >
                <path d="M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path>
              </svg>
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-primary">
                24*7 Customer support
              </h3>
              <p className="mt-1 text-gray-600">
                Our services are always available for our customers
              </p>
            </div>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex items-center justify-center mx-auto border border-gray-200 rounded-full size-12 bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                className="text-primary"
              >
                <path d="M20 13C20 15.2091 19.1046 17.2091 17.6569 18.6569L19.0711 20.0711C20.8807 18.2614 22 15.7614 22 13 22 7.47715 17.5228 3 12 3 6.47715 3 2 7.47715 2 13 2 15.7614 3.11929 18.2614 4.92893 20.0711L6.34315 18.6569C4.89543 17.2091 4 15.2091 4 13 4 8.58172 7.58172 5 12 5 16.4183 5 20 8.58172 20 13ZM15.293 8.29297 10.793 12.793 12.2072 14.2072 16.7072 9.70718 15.293 8.29297Z"></path>
              </svg>
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-primary">
                Speedy delivery
              </h3>
              <p className="mt-1 text-gray-600">
                India to USA 15-21 working days. <br /> USA to USA 7-10 Working
                days.
              </p>
            </div>
          </div>
          {/* End Icon Block */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  );
}

export default Features;
