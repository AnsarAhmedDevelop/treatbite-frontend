"use client"
import Dashboardheader from '@/app/components/general/Dashboardheader';
import UpdateBankDetails from '@/app/components/general/UpdateBankDetails';
import { getBankInfo } from '@/app/http/api';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function page() {
  const [open, setOpen] = useState(false);
  const [bankInfo, setBankInfo] = useState({});

  const accessToken = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    // console.log(accessToken, "access token");
    async function getBankDetail() {
      try {
        const response = await getBankInfo(accessToken)
        const bank = response.data[0];
        setBankInfo(bank)
       
      } catch (error) {
        console.log(error)
      }
    }
    if (accessToken) getBankDetail();

  }, [accessToken, setOpen])



  return (
    <div className='bg-gray-100 min-h-screen'>
       <Dashboardheader />
      {!open && bankInfo.isBankInfo ? (
        <div className="w-11/12 xl:w-10/12 mx-auto mt-10 bg-white shadow rounded-lg ">
          <div className="w-11/12 sm:w-10/12 mx-auto pt-5 sm:pt-10">
            <div className="flex sm:flex-row flex-col justify-between font-bold text-xl my-5 border-b border-gray-100">
              <h2 className='sm:order-1 order-2 pt-5 sm:pt-0'>Bank Information</h2>
                  <div className="flex gap-x-5 order-1 sm:order-2">
                        <button
                            type="button"
                            onClick={(e) =>
                                setOpen(true)}
                            className="py-2  px-2 flex items-center gap-x-2  cursor-pointer bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  "
                        >
                               <SquarePen size={20} /> Edit Bank Detail
                        </button>
                        <Link href="/dashboard">
                        <button
                            type="button"
                          
                            className="py-2 px-2 cursor-pointer bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  "
                        >
                               Back to Dashboard
                        </button>
                        </Link>
                    </div>
    
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:py-5 gap-3">
              <div className="my-2">
                <h3 className="text-base font-semibold text-black ">
                  Account Name
                </h3>
                <h5 className="text-lg">{bankInfo?.accountName}</h5>
              </div>

              <div className="my-2">
                <h3 className="text-base font-semibold text-black ">
                  Account Number
                </h3>
                <h5 className="text-lg">{bankInfo?.accountNumber}</h5>
              </div>
              <div className="my-2">
                <h3 className="text-base font-semibold text-black ">
                  IFSC Code
                </h3>
                <h5 className="text-lg">{bankInfo?.ifscCode}</h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UpdateBankDetails        
          setOpen={setOpen}
          open={open}          
          token={accessToken}
          bankInfo={bankInfo}
        />
      )}

    </div>
  )
}

export default page