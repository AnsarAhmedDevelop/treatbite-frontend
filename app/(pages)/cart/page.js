"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Header from "@/app/components/general/Header";
import { setVoucher } from "@/app/redux/slice/cartSlice";
import { voucherPurchase } from "@/app/http/api";
import toast from "react-hot-toast";

const Index = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems, "cart Items")
    // console.log(cartItems!==empty, "cart Items length")
    const user = useSelector((state) => state.user.user);
    console.log(user, "user values")
    const dispatch = useDispatch();
    const router = useRouter();
    const accessToken = useSelector((state) => state.user.accessToken);


    const voucherData = {
        giftVoucherValue: cartItems?.giftVoucherValue,
        recipientEmail: cartItems?.recipientEmail,
        message: cartItems?.message,
    }
    const removeVoucher = () => {
        dispatch(setVoucher());
        router.push("/");
    }
    const paymentfunction = async () => {
        try {
            const response = await voucherPurchase(accessToken, cartItems?.restaurantId, voucherData);
            // console.log(response.data, "resp data");
            toast.success(response.data.message);
            dispatch(setVoucher());
            router.push("/");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }

    return (
        <>
            <Header />
            <div className="flex bg-gray-100 min-h-screen scroll-smooth">
                <div className="flex-grow text-gray-800">
                    <main

                        className="p-3 sm:p-10 space-y-6"
                    >
                        <section className="w-full">
                            {Object.keys(cartItems).length !== 0 ? (
                                <div className="  ">
                                    <div className="sm:w-10/12 mx-auto bg-white shadow rounded-lg  p-5">
                                        <div className="flex justify-between font-bold text-xl my-5 border-b border-gray-100">
                                            <h2>Voucher Information</h2>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-x-5">
                                            <div className="my-2">
                                                <h3 className="text-base font-semibold text-black ">
                                                    Gift Voucher value
                                                </h3>
                                                <h5 className="text-lg">
                                                    ${cartItems?.giftVoucherValue}
                                                </h5>
                                            </div>
                                            <div className="my-2">
                                                <h3 className="text-base font-semibold text-black ">
                                                    Recipient email
                                                </h3>
                                                <h5 className="text-lg">{cartItems?.recipientEmail}</h5>
                                            </div>
                                            <div className="my-2">
                                                <h3 className="text-base font-semibold text-black ">
                                                    Restaurant Name
                                                </h3>
                                                <h5 className="text-lg">{cartItems?.restaurantName}</h5>
                                            </div>
                                            <div className="my-2">
                                                <h3 className="text-base font-semibold text-black ">
                                                    Restaurant Address
                                                </h3>
                                                <h5 className="text-lg">{cartItems?.restaurantAddress}</h5>
                                            </div>
                                            <div className="my-2">
                                                <h3 className="text-base font-semibold text-black ">
                                                    Message
                                                </h3>
                                                <h5 className="text-lg">
                                                    {cartItems?.message ? cartItems.message : null}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-5 sm:gap-x-10">
                                            <button
                                                onClick={paymentfunction}
                                                className="cursor-pointer my-3 hover:bg-white hover:text-[#2B2E34] py-3 px-2 sm:px-4 hover:border-[#2B2E34] hover:border-2 border-2 text-white font-bold text-base uppercase bg-[#2B2E34]"
                                            >
                                                Continue to Payment
                                            </button>
                                            <button
                                                onClick={removeVoucher}
                                                className="cursor-pointer my-3 bg-white text-[#2B2E34] py-3 px-2 sm:px-4 border-[#2B2E34]  border-2  font-bold text-base uppercase "
                                            >
                                                Cancel Voucher
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center py-12 italic text-xl font-semibold">Purchase Gift Voucher First</p>

                            )}
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Index;
