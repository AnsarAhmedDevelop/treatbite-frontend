"use client"
import axios from 'axios';
import { Eye, EyeOff, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function UserSignUp({ setshowModalSignUp }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", fullName: "" })
    const [disableForm, setDisableForm] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

     // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

     // Send register request to backend
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userData = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/register`, formData)
            //   console.log(partner,"partner")
            toast.success(userData.data?.message || "Enter OTP sent on your Email");
            setOtpSent(true);
            setDisableForm(true);

        } catch (error) {
            toast.error(error.response.data.error);
        }

    }

    async function handleOtpVerify() {
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        try {
            const verifyResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/verifyEmail`,
                {
                    email: formData.email,
                    verifyOtp: otp
                }
            );
            toast.success(verifyResponse.data.message);
            setshowModalSignUp(false)
        } catch (error) {
            toast.error(error.response?.data?.error || "OTP verification failed");
        }
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1 left-4 right-4 z-[99] outline-none focus:outline-none">
                <div className="relative w-11/12 sm:w-2/6 my-6 ">
                    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
                        <div className="flex justify-between mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
                            <h6>Sign Up </h6>
                            <button
                                onClick={() => setshowModalSignUp(false)}
                                type="button"
                                className=""
                            >
                                <X />

                            </button>
                        </div>
                        <div className='mt-3'>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            disabled={disableForm}
                                            required
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent"
                                            placeholder="Enter Your Full Name"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <div className="flex relative ">

                                        <input
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={disableForm}
                                            required
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent"
                                            placeholder="Your email"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={disableForm}
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
                                {!otpSent &&
                                    <div className="flex w-full mt-3">
                                        <button
                                            type="submit"
                                            className="py-2 px-4 cursor-pointer  bg-[#2B2E34] hover:bg-black focus:ring-[#2B2E34] focus:ring-offset-[#2B2E34] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        >
                                            Register
                                        </button>
                                    </div>
                                }

                            </form>
                            {otpSent && (
                                <div className="mt-5   ">
                                    <h2 className="text-normal font-semibold mb-2">Enter the OTP sent to your email</h2>
                                    <div className="flex flex-col items-center gap-4">
                                        <input
                                            type="text"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparen"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <button
                                            className="px-6 py-2 w-full cursor-pointer bg-green-800 text-white transition ease-in duration-200 font-semibold hover:bg-green-900 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
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
                {/* Modal background overlay */}
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default UserSignUp