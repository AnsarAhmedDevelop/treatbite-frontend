"use client"
import { getPartnerProfile } from '@/app/http/api';
import { setLogout, setUser } from '@/app/redux/slice/userSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { LogOut, UserRoundPen, Vault } from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import PartnerProfile from '../dashboard/PartnerProfile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Dashboardheader() {
    const [open, setOpen] = useState(false)
    const [profileModel, setProfileModel] = useState(false)
    const ref = useRef(null);
    const router = useRouter()

    const accessToken = useSelector((state) => state.user.accessToken);
    // console.log(accessToken,"access token");
    const user = useSelector((state) => state.user.user);
    // console.log(user, "user")
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(accessToken, "access token");
        async function getProfile() {
            try {
                // const partner = await axios.get('${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/profile')
                // console.log(partner, "partner")
                const partner = await getPartnerProfile(accessToken)
                // console.log(partner, "partner")
                dispatch(setUser(partner.data));
            } catch (error) {
                console.log(error)
            }
        }
        if(accessToken){
            getProfile()
        }        
    }, [accessToken])

    // If profile is open and the clicked target is not within it
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            // If the profile is open and the clicked target is not within the profile,
            // then close the profile
            if (setOpen && ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [open]);
    const logout = () => {
        router.push("/")
        dispatch(setLogout())
        deleteCookie("isPartnerLoggedIn");
        toast.success("Logout Successfully");
    };
    return (
        <div>
            <div className="bg-[#070707] py-4 sm:py-3 h-[12vh]">

                <div className='container mx-auto px-2 sm:px-0'>
                    <div className='flex justify-between'>
                        <Link href="/dashboard"> <img src='/images/logo.png' alt='Logo' className='w-36 sm:w-44 h-10' /></Link>
                        <div className='flex flex-col relative w-auto'>
                            <button
                                onClick={() => setOpen(!open)}
                                className="inline-flex items-center cursor-pointer  rounded-lg">

                                <img
                                    src={user?.avatar}
                                    alt="user profile photo"
                                    className="h-10 w-10  bg-gray-100 rounded-full overflow-hidden object-cover"
                                />

                                <div className="flex items-center truncate drop-shadow-xl">
                                    <span className="truncate ml-2 text-lg font-medium text-white">
                                        {user?.fullName}
                                    </span>
                                </div>

                            </button>
                            {open && (
                                <div
                                    ref={ref}
                                    className="w-40 z-50 absolute sm:top-12 top-10 left-0 right-0  shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                >
                                    <div className="divide-y-2 divide-[#bf9444]">

                                        <Link
                                            onClick={() => setOpen(!open)}
                                            href="/dashboard/bank"
                                            className="flex w-full cursor-pointer gap-x-1 px-4 py-2 text-base text-[#bf9444]  hover:bg-gray-900 hover:text-gray-100 "
                                        >
                                            <Vault /> Bank Details
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setProfileModel(true)
                                                setOpen(!open)
                                            }}
                                            className="flex w-full cursor-pointer gap-x-1 px-4 py-2 text-base text-[#bf9444]  hover:bg-gray-900 hover:text-gray-100 "
                                        >
                                            <UserRoundPen /> Profile
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="flex cursor-pointer gap-x-1 px-4 py-2 w-full text-base text-[#bf9444]  hover:bg-gray-900 hover:text-gray-100 "
                                        >
                                            <LogOut /> Logout
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {profileModel ? <PartnerProfile setProfileModel={setProfileModel} user={user} /> : null}
                </div>
            </div>
        </div>
    )
}

export default Dashboardheader