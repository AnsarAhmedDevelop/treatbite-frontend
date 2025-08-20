"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { restaurantVouchers, voucherCodeVerify, voucherSearch } from "@/app/http/api";
import { Gift } from "lucide-react";


const RestaurantVoucher = ({ id }) => { 
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [getVoucher, setVoucher] = useState(null);    
    const accessToken = useSelector((state) => state.user.accessToken);
    const [showAll, setShowAll] = useState([]);
    const [voucherPin, setVoucherPin] = useState("");    

    useEffect(() => {
        async function getAllRestaurantVouchers() {
            try {
                const AllVouchers = await restaurantVouchers(accessToken, id)
                // console.log(AllVouchers.data, "AllVouchers")
                setShowAll(AllVouchers.data);
            } catch (error) {
                console.log(error)
            }
        }
        getAllRestaurantVouchers()
    }, [id,showModal])

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const verifyData = { voucherId: data?._id, voucherPin }
        try {
            const response = await voucherCodeVerify(accessToken, verifyData)
            // console.log(response.data, "res")
            setShowModal(false);
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    const handleSearch = async (e) => {
        let key = e.target.value;    
        if (key) {
            try {
                const response = await voucherSearch(accessToken, key, { restaurant: id })
                // console.log(response.data, "voucher serach data")
                setVoucher(response.data);
            } catch (error) {
                console.log(error)
            }
        } else {
            setVoucher(null);
        }
    };

    return (
        <>
            <main
                className="p-6 sm:p-10 space-y-6 h-full bg-[#F3F3F3]"
            >
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                    <div className="mr-6">
                        <h1 className="text-2xl font-semibold">Gift Vouchers</h1>
                    </div>
                    <div className=" relative z-0">
                        <input
                            type="number"
                            onChange={handleSearch}
                            className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Type Gift Voucher Code"
                        />
                    </div>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-3  xl:grid-cols-4 gap-4 mt-7">
                    {getVoucher === null ? (
                        showAll && showAll.length > 0 ? (
                            showAll.map((item, i) => (
                                <button
                                    className="cursor-pointer"
                                    key={i}
                                    onClick={() => {
                                        setShowModal(true);
                                        setData(item);
                                    }}
                                >
                                    <div className="flex items-center p-3 bg-white shadow rounded-lg">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-10 w-10 text-purple-600 bg-purple-100 rounded-full mr-4">
                                            <Gift className="text-2xl" />

                                        </div>
                                        <div className="flex flex-col justify-start items-start">
                                            <span className="block text-xl font-bold">
                                                {item.voucherCode}
                                            </span>
                                            <span className="block text-sm text-gray-500">
                                                {new Date(item.createdAt).toDateString()}
                                            </span>
                                            <span
                                                className={`${item.status == "visited"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                                    }  inline  items-center px-1 py-1 text-xs font-semibold"bg-green-50 text-green-700" rounded-md`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : <h2>Dont have any Voucher yet. </h2>
                    ) : (
                        <button
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                                setData(getVoucher);
                            }}
                        >
                            <div className="flex items-center p-5 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-10 w-10 text-purple-600 bg-purple-100 rounded-full mr-4">
                                    <Gift className="text-2xl" />

                                </div>
                                <div className="flex flex-col justify-start items-start">
                                    <span className="block text-xl font-bold">
                                        {getVoucher.voucherCode}
                                    </span>
                                    <span className="block text-sm text-gray-500">
                                        {new Date(getVoucher.createdAt).toDateString()}
                                    </span>
                                    <span
                                        className={`${getVoucher.status == "visited"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-600"
                                            }  inline  items-center px-1 py-1 text-xs font-semibold"bg-green-50 text-green-700" rounded-md`}
                                    >
                                        {getVoucher.status}
                                    </span>
                                </div>
                            </div>
                        </button>
                    )}
                </section>
            </main>

            {showModal && data ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-11/12 sm:w-1/2 my-6 ">
                            <div className="flex flex-col w-full  px-4 py-4 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
                                <div className="flex flex-col justify-between h-full">
                                    <Gift className="w-12 h-12 mx-auto my-4 text-purple-500" />
                                    <div className="grid grid-cols-2 gap-x-5">
                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Status
                                            </h3>
                                            <h5>
                                                <span
                                                    className={`${data.status == "visited"
                                                        ? " text-green-700"
                                                        : " text-red-600"
                                                        } text-sm `}
                                                >
                                                    {data.status}
                                                </span>
                                            </h5>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Issue Date
                                            </h3>
                                            <h5><span className="text-sm"> {new Date(data.createdAt).toDateString()}</span></h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 py-5 gap-x-5">
                                        <div className="my-2">
                                            <h3 className="my-1 text-base font-semibold text-black ">
                                                Email
                                            </h3>
                                            <h5 className="text-sm">{data.recipientEmail}</h5>
                                        </div>
                                        <div className="my-2">
                                            <h3 className="my-1 text-base font-semibold text-black ">
                                                Code
                                            </h3>
                                            <h5 className="text-sm">{data.voucherCode}</h5>
                                        </div>

                                        <div className="my-2">
                                            <h3 className="my-1 text-base font-semibold text-black ">
                                                Voucher Amount
                                            </h3>
                                            <h5 className="text-sm">{data.giftVoucherValue}</h5>
                                        </div>
                                    </div>

                                    {data.status == "visited" ? (
                                        <div className="my-2">
                                            <h5 className="text-base font-semibold">
                                                visited Date:{" "}
                                                <span className="text-sm"> {new Date(data.visitedDate).toDateString()}</span>

                                            </h5>
                                                   <button
                                                        onClick={() => {
                                                            setShowModal(false);
                                                            setData(null);
                                                        }}

                                                        className="py-2 px-4 cursor-pointer  bg-red-600 text-white  mt-5  mx-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  "
                                                    >
                                                        Close
                                                    </button>
                                        </div>
                                    ) : (
                                        <div className="text-end">
                                            <form
                                                onSubmit={handleSubmit}
                                                className="flex flex-col justify-center w-3/4  space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="voucherPin"
                                                        className="rounded-lg  flex-1 appearance-none border border-purple-600 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                        value={voucherPin}
                                                        onChange={(e) => setVoucherPin(e.target.value)}
                                                        placeholder="Enter Voucher pin"
                                                    />
                                                </div>
                                                <div className="flex space-x-1 sm:space-x-3">
                                                    <button
                                                        type="submit"
                                                        className="cursor-pointer  px-4 py-2 text-base font-semibold text-white bg-purple-600  shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                                    >
                                                        Verify
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowModal(false);
                                                            setData(null);
                                                        }}

                                                        className="py-2 px-4 cursor-pointer  bg-red-600 text-white     mx-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  "
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    );
};

export default RestaurantVoucher;
