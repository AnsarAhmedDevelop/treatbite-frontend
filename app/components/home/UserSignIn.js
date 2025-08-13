"use client"
import { setAccessToken, setLogout } from '@/app/redux/slice/userSlice';
import axios from 'axios';
import { Eye, EyeOff, X } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteCookie, setCookie } from "cookies-next";


function UserSignIn({ setUserLogin, setshowModalSignUp }) {
  // Step control for modal flow: login → forgot password → verify OTP
  const [step, setStep] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [emailOnly, setEmailOnly] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" })
  const dispatch = useDispatch()

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Login form submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Send login request to backend
      const user = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, formData)

      dispatch(setLogout())
      // Save JWT token to Redux
      dispatch(setAccessToken(user.data.token));
      // Manage cookies for session tracking
      deleteCookie("isPartnerLoggedIn");
      setCookie("isUserLoggedIn", true);
      toast.success("Login Successfully");
      // Close login modal
      setUserLogin(false)

    } catch (error) {
      console.log(error, "err")
      toast.error(error.response.data.error);
    }

  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1 left-4 right-4 z-[99] outline-none focus:outline-none">
        <div className="relative w-11/12 sm:w-2/6 my-6 ">
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
            <div className="flex justify-between mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
              <h6>{step === "login" ? "Login" : step === "forgotEmail" ? "Reset Password" : "Verify OTP"} </h6>
              <button
                onClick={() => setUserLogin(false)}
                type="button"
                className="cursor-pointer"
              >
                <X />

              </button>
            </div>

            <div className="mt-3">
              {/* STEP 1: Login form */}
              {step === "login" && (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col mb-2">
                    <div className="flex relative ">

                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mb-2">
                    <div className="flex relative ">

                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent"
                        placeholder="Your password"
                      />
                      <div
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <Eye className="h-4 font-extralight" />
                        ) : (
                          <EyeOff className="h-4 font-extralight" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setStep("forgotEmail")}
                      className="text-sm cursor-pointer font-semibold text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="flex w-full mt-3">
                    <button
                      type="submit"
                      className="py-2 px-4 cursor-pointer  bg-[#2B2E34] hover:bg-black focus:ring-[#2B2E34] focus:ring-offset-[#2B2E34] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Login
                    </button>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <div
                      className="inline-flex items-center text-xs font-thin text-center text-black hover:text-black"

                    >
                      <span className="ml-2 text-gray-900 font-semibold ">
                        You don&#x27;t have an account?
                        <span className='text-sm cursor-pointer text-blue-700 hover:underline' onClick={() => { setUserLogin(false), setshowModalSignUp(true) }}> Sign Up</span>
                      </span>
                    </div>
                  </div>
                </form>
              )}
              {/* STEP 2: Forgot password - email input */}
              {step === "forgotEmail" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/otpResetPassword`, { email: emailOnly });
                      toast.success("OTP sent to email");
                      setStep("verifyOtp");
                    } catch (err) {
                      toast.error(err.response?.data?.error || "Failed to send OTP");
                    }
                  }}
                >
                  <input
                    type="email"
                    value={emailOnly}
                    onChange={(e) => setEmailOnly(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className="mb-4 rounded-lg border w-full py-2 px-4"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#2B2E34] text-white w-full rounded-lg"
                  >
                    Send OTP
                  </button>
                </form>
              )}
              {/* STEP 3: Verify OTP & set new password */}
              {step === "verifyOtp" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/resetPassword`, {
                        email: emailOnly,
                        resetOtp: otp,
                        password: newPassword
                      });
                      toast.success("OTP verified! You can login with new password.");
                      setOtp("");
                      setNewPassword("");
                      setUserLogin(false)
                      // Optionally: Redirect or show password reset fields
                    } catch (err) {
                      toast.error(err.response?.data?.error || "Invalid OTP");
                    }
                  }}
                >
                  <div className="flex flex-col mb-6">
                    <div className="flex relative ">

                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent"
                        placeholder="Your new password"
                      />
                      <div
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <Eye className="h-4 font-extralight" />
                        ) : (
                          <EyeOff className="h-4 font-extralight" />
                        )}
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP sent on Registered email"
                    required
                    className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent  mb-4 "
                  />
                  <button
                    type="submit"
                    className="py-2 px-2 bg-[#2B2E34] text-white w-full rounded-lg"
                  >
                    Verify OTP
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>

      </div>
      {/* Modal background overlay */}
      <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>

    </>
  )
}

export default UserSignIn