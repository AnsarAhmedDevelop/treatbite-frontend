"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantContact: "",
    restaurantAddress: "",
    fullName: "",
    contact: "",
    email: "",
    password: "",
  })
  const [disableForm, setDisableForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const partner = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/register`, formData)
      // console.log(partner,"partner")
      toast.success(partner.data.message);
      setOtpSent(true);
      setDisableForm(true);
    } catch (error) {
      toast.error(error.response.data.error);
      // console.log(error)
    }
    // console.log(formData, "formData")

  }

  async function handleOtpVerify() {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const verifyResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/verifyEmail`,
        {
          email: formData.email,
          verifyOtp: otp
        }
      );
      toast.success(verifyResponse.data.message);
      // toast.success("You can Login after Approval of Your Registration ");
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.error || "OTP verification failed");
    }
  }
  return (
    <div>
      <div className="bg-[url('/images/partner-sineup.jpg')] h-[200px] sm:h-screen lg:h-[300px] w-[100%] bg-cover bg-center sm:bg-cover bg-no-repeat relative">
        <div className="text-white bg-black/50 h-full w-full absolute flex  justify-center items-center  top-0">
          <div className="">
            <div className="flex flex-col items-center ">
              <h2 className="text-center text-2xl  sm:max-w-2xl sm:text-4xl font-[500px] m-2 text-[#fff] font-spectral italic">
                Register your restaurant on Treatbite  and get more customers!
              </h2>

             </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="w-11/12 sm:w-10/12 mx-auto py-5">
          <div>
            <form onSubmit={handleSubmit} >
              <h1 className="p-2 text-xl">Restaurant Information</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative p-2">
                  <label className="text-gray-700">Restaurant Name</label>
                  <input
                    type="text"
                    autoComplete="off"
                    disabled={disableForm}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative p-2">
                  <label className="text-gray-700">
                    Restaurant Contact Number
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    disabled={disableForm}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="restaurantContact"
                    value={formData.restaurantContact}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative p-2">
                  <label className="text-gray-700">
                    Restaurant Complete Address
                  </label>
                  <textarea
                    type="text"
                    autoComplete="off"
                    disabled={disableForm}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="restaurantAddress"
                    value={formData.restaurantAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h1 className="p-2 text-xl">Restaurant owner details</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative p-2">
                  <label className="text-gray-700">Full Name</label>
                  <input
                    type="text"
                    disabled={disableForm}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative p-2">
                  <label className="text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    disabled={disableForm}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative p-2">
                  <label className="text-gray-700">Email</label>
                  <input
                    type="text"
                    disabled={disableForm}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative p-2">
                  <label className="text-gray-700">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className=" flex-1 appearance-none border border-gray-700 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent"
                    name="password"
                    disabled={disableForm}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div
                    className="absolute right-4 bottom-4 cursor-pointer"
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
              {!otpSent &&
                <div className="flex gap-x-2 mt-5">
                  <button
                    type="submit"
                    disabled={disableForm}
                    // className="m-2 cursor-pointer hover:bg-white hover:text-[#2B2E34] py-3 px-8 border-[#2B2E34] hover:border-2 border-2 text-white font-bold text-base uppercase  bg-[#2B2E34]"
                    className={`m-2 py-3 px-8 border-2 text-base font-bold uppercase ${disableForm
                      ? "bg-gray-400 text-white cursor-not-allowed border-gray-400"
                      : "bg-[#2B2E34] text-white cursor-pointer hover:bg-white hover:text-[#2B2E34] hover:border-2 border-[#2B2E34]"
                      }`}
                  >
                    Submit
                  </button>
                  <Link href="/">
                    <button
                      type="button"
                      disabled={disableForm}
                      className={`m-2 py-3 px-8 border-2 text-base font-bold uppercase ${disableForm
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300"
                        : "bg-white text-[#2B2E34] cursor-pointer hover:bg-[#2B2E34] hover:text-white hover:border-2 border-[#2B2E34]"
                        }`}
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              }

            </form>
            {otpSent && (
              <div className="mt-5   ">
                <h2 className="text-lg font-semibold mb-2">Enter the OTP sent to your email</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <input
                    type="text"
                    className="w-[200px] p-2 border border-gray-600 text-gray-800 bg-white"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p className='text-sm'>Enter Otp to verify Your Email. Approval Email will be sent then you can login. </p>
                  <button
                    className="px-6 py-2 bg-green-600 text-white font-semibold hover:bg-green-700"
                    onClick={handleOtpVerify}
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page