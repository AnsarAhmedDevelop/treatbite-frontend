"use client"
import { setAccessToken, setLogout } from '@/app/redux/slice/userSlice';
import axios from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';
import { Eye, EyeOff, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

function PartnerSignIn({ setShowModal }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [step, setStep] = useState("login");
    const [emailOnly, setEmailOnly] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("");
    const dispatch=useDispatch()
    const router=useRouter()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
         const partner= await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/login`, formData)
            // console.log(partner.data,"partner")
             dispatch(setLogout())
            dispatch(setAccessToken(partner.data.token));
            deleteCookie("isUserLoggedIn");
            setCookie("isPartnerLoggedIn", true);
            toast.success("Login Successfully");

            if(partner.data.role === "SuperAdmin"){
                router.push("/superadmin-dashboard")
            }else{
                router.push("/dashboard")
            }
            
        } catch (error) {
            console.log(error.response.data.error,"message")
            toast.error(error.response.data.error);
        }

    }
    return (

        <>
            <div className="justify-center  items-center flex  overflow-x-hidden overflow-y-auto fixed bottom-32 left-4 right-4  z-50 outline-none focus:outline-none">
                <div className="relative w-11/12 sm:w-2/6  my-6 ">
                    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
                        <div className="flex justify-between mb-6 text-xl font-light text-gray-600 sm:text-2xl ">
                            <h6>{step === "login"?"Login":step === "forgotEmail"?"Reset Password":"Verify OTP"} </h6>
                            <button
                                onClick={() => setShowModal(false)}
                                type="button"
                                className="cursor-pointer"
                            >
                                <X />

                            </button>
                        </div>

                        <div className="mt-3">
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

                                    <div className="flex flex-col mb-6">
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

                                    <div className="flex w-full mt-3">
                                        <button
                                            type="submit"
                                            className="py-2 px-4 cursor-pointer bg-[#2B2E34] hover:bg-black focus:ring-[#2B2E34] focus:ring-offset-[#2B2E34] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => setStep("forgotEmail")}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === "forgotEmail" && (
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        try {
                                            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/otpResetPassword`, { email: emailOnly });
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

                            {step === "verifyOtp" && (
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        try {
                                            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/resetPassword`, {
                                                email: emailOnly,
                                                resetOtp:otp,
                                                password:newPassword
                                            });
                                            toast.success("OTP verified! You may now reset your password.");
                                            setOtp("");
                                            setNewPassword("");
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
                                                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#2B2E34] focus:border-transparent"
                                                placeholder="Your new password"
                                            />
                                            <div
                                                className="absolute right-4 top-4 cursor-pointer"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 font-extralight" />
                                                ) : (
                                                    <Eye className="h-4 font-extralight" />
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
                                        className="mb-4 rounded-lg border w-full py-2 px-4"
                                    />
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-[#2B2E34] text-white w-full rounded-lg"
                                    >
                                        Verify OTP
                                    </button>
                                </form>
                            )}

                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>

    )
}

export default PartnerSignIn