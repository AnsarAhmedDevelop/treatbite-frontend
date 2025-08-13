"use client"
import { updateBankInfo } from '@/app/http/api';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function UpdateBankDetails({ setOpen, token,bankInfo}) {
    const [bankData, setBankData] = useState(
         {
              accountName: bankInfo.accountName || "",
              accountNumber: bankInfo.accountNumber || "",
              ifscCode: bankInfo.ifscCode || "",
              
            }
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankData((prev) => ({ ...prev, [name]: value }));
    };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateBankInfo(token, bankInfo._id,bankData); // ⬅️ API call
        //    console.log(res,"updated bank info")
           toast.success(res.data.message || "Bank detail Updated successfully")
           
            setOpen(false); // switch to view mode
        } catch (err) {
            console.error("Bank info update failed:", err);
            // You can show toast or error message here
        }
    };
    return (
        <div className='w-11/12 xl:w-10/12 mx-auto mt-10 bg-white shadow rounded-lg'>
            <div className="w-10/12 mx-auto  pt-10  ">
                <div className="flex justify-between font-bold text-xl my-5 border-b border-gray-100">
                    <h1>Bank Information</h1>
                    <div className="pb-1">
                        <button
                            type="button"
                            onClick={(e) =>
                                setOpen(false)}
                            className="py-2 px-4  bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none "
                        >
                            Back
                        </button>
                    </div>
                </div>
                <div className=" overflow-y-auto  scroll-smooth">
                    <form onSubmit={handleSubmit}>                
                        <div className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-x-5">
                            <div className="relative ">
                                <label className=" font-semibold text-black ">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                    name="accountName"
                                    value={bankData.accountName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative ">
                                <label className="text-black font-semibold">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                    name="accountNumber"
                                    value={bankData.accountNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:py-5 gap-x-5">

                            <div className="relative ">
                                <label className="text-black font-semibold">
                                    IFSC Code
                                </label>
                                <input
                                    type="text"
                                    className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                    name="ifscCode"
                                    value={bankData.ifscCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="my-5 cursor-pointer hover:bg-white hover:text-[#2B2E34] py-3 px-8 hover:border-[#2B2E34] hover:border-2 text-white font-bold text-base uppercase  bg-[#2B2E34]"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateBankDetails