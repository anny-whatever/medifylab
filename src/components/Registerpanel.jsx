import React from "react";
import { useState } from "react";
import { Button } from "@nextui-org/react";

function Registerpanel({ handleEmailSignUp, handleGoogleSignIn }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [checkbox, setCheckbox] = useState(false);

  return (
    <>
      {/* Contact Us */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto lg:max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">
              Login to your account!
            </h1>
            <p className="mt-1 text-gray-600">
              Make your shopping experience more convenient.
            </p>
          </div>
          <div className="grid items-center w-11/12 gap-6 mx-auto mt-12 lg:grid-cols-2 lg:gap-16">
            {/* Card */}

            <div className="bg-white border border-gray-200 shadow-sm mt-7 rounded-xl">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800">
                    Sign up
                  </h1>
                  <p className="mt-2 text-sm text-gray-600">
                    Already have an account?
                    <a
                      className="font-medium text-blue-600 decoration-2 hover:underline"
                      href="../examples/html/signin.html"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={() => handleGoogleSignIn()}
                  >
                    <svg
                      className="w-4 h-auto"
                      width={46}
                      height={47}
                      viewBox="0 0 46 47"
                      fill="none"
                    >
                      <path
                        d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                        fill="#34A853"
                      />
                      <path
                        d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                        fill="#EB4335"
                      />
                    </svg>
                    Sign up with Google
                  </button>
                  <div className="flex items-center py-3 text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                    Or
                  </div>
                  {/* Form */}
                  <form>
                    <div className="grid gap-y-4">
                      {/* Form Group */}
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm">
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg border-1 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            required=""
                            aria-describedby="email-error"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div className="absolute inset-y-0 hidden pointer-events-none end-0 pe-3">
                            <svg
                              className="text-red-500 size-5"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden mt-2 text-xs text-red-600"
                          id="email-error"
                        >
                          Please include a valid email address so we can get
                          back to you
                        </p>
                      </div>
                      {/* End Form Group */}
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg border-1 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            required=""
                            aria-describedby="password-error"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="absolute inset-y-0 hidden pointer-events-none end-0 pe-3">
                            <svg
                              className="text-red-500 size-5"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        {password?.length < 6 && password != "" ? (
                          <p
                            className="mt-2 text-xs text-red-600"
                            id="password-error"
                          >
                            6 or morecharacters required
                          </p>
                        ) : null}
                      </div>
                      {/* End Form Group */}
                      {/* Form Group */}
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block mb-2 text-sm"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg border-1 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            required=""
                            aria-describedby="confirm-password-error"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <div className="absolute inset-y-0 hidden pointer-events-none end-0 pe-3">
                            <svg
                              className="text-red-500 size-5"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        {password != confirmPassword && confirmPassword ? (
                          <p className="mt-2 text-xs text-red-600">
                            Password does not match
                          </p>
                        ) : null}
                        {password == confirmPassword &&
                        password != "" &&
                        confirmPassword != "" ? (
                          <p className="mt-2 text-xs text-green-600">
                            Password matched!
                          </p>
                        ) : null}
                      </div>
                      {/* End Form Group */}
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <div className="flex">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className=" border-1 shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                            onChange={(e) => setCheckbox(e.target.checked)}
                          />
                        </div>
                        <div className="ms-3">
                          <label htmlFor="remember-me" className="text-sm">
                            I accept the{" "}
                            <a
                              className="font-medium text-blue-600 decoration-2 hover:underline"
                              href="#"
                            >
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                      </div>
                      {/* End Checkbox */}
                      {email &&
                      password &&
                      confirmPassword &&
                      password == confirmPassword &&
                      password?.length > 5 &&
                      checkbox ? (
                        <Button
                          color="secondary"
                          onClick={() => handleEmailSignUp(email, password)}
                        >
                          Sign Up
                        </Button>
                      ) : (
                        <Button color="secondary" isDisabled>
                          Sign Up
                        </Button>
                      )}
                    </div>
                  </form>
                  {/* End Form */}
                </div>
              </div>
            </div>

            {/* End Card */}
            <div className="divide-y divide-gray-200">
              {/* Icon Block */}
              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 size-6 mt-1.5 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-primary">Knowledgebase</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We&apos;re here to help with any questions.
                  </p>
                  <div className="inline-flex items-center mt-2 text-sm font-medium text-gray-600 gap-x-2 hover:text-gray-800">
                    Contact support
                    <svg
                      className="flex-shrink-0 size-2.5 transition ease-in-out group-hover:translate-x-1"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 size-6 mt-1.5 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-primary">FAQ</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Search our FAQ for answers to anything you might ask.
                  </p>
                  <div className="inline-flex items-center mt-2 text-sm font-medium text-gray-600 gap-x-2 hover:text-gray-800">
                    Fill contact form
                    <svg
                      className="flex-shrink-0 size-2.5 transition ease-in-out group-hover:translate-x-1"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}

              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex py-6 gap-x-7">
                <svg
                  className="flex-shrink-0 size-6 mt-1.5 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                </svg>
                <div className="grow">
                  <h3 className="font-semibold text-primary">
                    Contact us by email
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    If you wish to write us an email instead please use
                  </p>
                  <div className="inline-flex items-center mt-2 text-sm font-medium gap-x-2 hover:text-gray-800 text-primary">
                    support@medifylab.com
                  </div>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
          </div>
        </div>
      </div>
      {/* End Contact Us */}
    </>
  );
}

export default Registerpanel;
