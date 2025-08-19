"use client"
import { allPartners, togglePartnerApproval } from '@/app/http/api';
import { setLogout } from '@/app/redux/slice/userSlice';
import { deleteCookie } from 'cookies-next';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';



function page() {
    const [showAll, setShowAll] = useState([]);
    const router = useRouter()
    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.user.accessToken);
    const [state,setState]=useState(false);


    useEffect(() => {
        // console.log(accessToken, "access token");
        async function getAllPartners() {
            try {
                const AllPartners = await allPartners(accessToken)
                // console.log(AllPartners.data, "All Partners")
                setShowAll(AllPartners.data);

            } catch (error) {
                console.log(error)
            }
        }
        if (accessToken) {
            getAllPartners()
        }
    }, [accessToken,state])

    const logout = () => {
        router.push("/")
        dispatch(setLogout())
        deleteCookie("isPartnerLoggedIn");
        toast.success("Logout Successfully");
    };

    const handleApproval = async (id) => {
        try {
            const res = await togglePartnerApproval(accessToken, id)
            setState(!state)
            // console.log(res.data,"res data")
            toast.success(res.data.message || "Successfully Change Approval");            
        } catch (error) {
            console.log(error,"err")
            toast.error(
                error?.response?.data?.error || "Something went wrong"
            );            
        }
    };
    return (
        <div className='bg-gray-100 min-h-screen  pb-3'>
            <div className='bg-[#070707] py-3 h-[12vh] '>
                <div className='container mx-auto flex justify-between'>
                    <Link href="/superadmin-dashboard"> <img src='/images/logo.png' alt='Logo' className='w-44 h-10' /></Link>
                    <div>
                        <button
                            onClick={logout}
                            className="cursor-pointer rounded-md  px-4 py-1 w-full text-base border border-[#bf9444] text-gray-50  bg-[#bf9444] hover:text-gray-100 "
                        >
                            Logout
                        </button>
                    </div>

                </div>

            </div>
            <div className='container mx-auto py-3'>
                <h2 className='text-2xl text-left font-bold'>Superadmin Dashboard</h2>
                <h3 className='text-xl text-center font-semibold mt-5'>Partner details with restaurant info</h3>

                <section className="grid grid-cols-1 w-10/12 mx-auto gap-6 mt-3">
                    {showAll?.length > 0
                        ? showAll?.map((item, i) => (

                            <div key={i} className="flex flex-col relative items-center justify-center  bg-white shadow-xl rounded-lg">

                                <h2 className="text-center text-2xl font-bold mt-7">
                                    {item.fullName}
                                </h2>
                                <div className="flex justify-between mt-2 gap-x-5">

                                    <p className=" text-gray-500">
                                        {item.email}
                                    </p>
                                    <p className="self-end text-gray-500">
                                        {item.contact}
                                    </p>

                                </div>
                                <div className="flex justify-between mt-2 gap-x-5">
                                    <p
                                        className={`text-center px-1 py-1 text-xs font-semibold ${item.isVerified
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-600"
                                            }  rounded-md `}
                                    >
                                        {item.isVerified ? "Email is Verified" : "Email is Not Verified"}
                                    </p>
                                    <p
                                        className={`text-center px-1 py-1 text-xs font-semibold ${item.isApproved
                                            ? "bg-green-50 text-green-700"
                                            : "bg-red-50 text-red-600"
                                            }  rounded-md `}
                                    >
                                        {item.isApproved ? "Account is Approved" : "Account is Not Approved"}
                                    </p>
                                </div>
                                <div className='grid grid-cols-3 gap-5 py-5 mx-2'>
                                    {item.restaurants.map((resto, i) =>
                                        <div key={i} className='bg-gray-100 p-3 shadow-xl'>
                                            <h3 className='text-center font-semibold'>{resto.restaurantName}</h3>
                                            <p className='text-center'>{resto.restaurantAddress}</p>
                                            <p className={`text-center px-1 py-1 text-xs font-semibold ${resto.isPublished
                                                ? "bg-green-50 text-green-700"
                                                : "bg-red-50 text-red-600"
                                                }  rounded-md `}>{resto.isPublished ? "Restaurant Published" : "Restaurant not Published"}</p>
                                        </div>
                                    )}


                                </div>
                                <p className='text-base italic'>You can Approve or Block Account</p>
                                <button

                                    onClick={()=>handleApproval(item._id)}
                                    className="cursor-pointer py-1 px-4 mb-4 mt-1 bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none   "
                                >
                                    {item.isApproved ? "Block" : "Approve"}

                                </button>
                            </div>

                        ))
                        : <h2>Dont have any Partners</h2>}
                </section>

            </div>


        </div>
    )
}

export default page