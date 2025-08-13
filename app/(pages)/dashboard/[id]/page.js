"use client"
import Dashboardheader from '@/app/components/general/Dashboardheader';
import React, { use, useEffect, useState } from 'react'
import { Gift, Hotel, Menu, Vault, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import RestaurantInfo from '@/app/components/dashboard/RestaurantInfo';
import RestaurantVoucher from '@/app/components/dashboard/RestaurantVoucher';

function page({ params }) {
  const { id } = use(params);
  const [slug, setSlug] = useState("restoInfo");
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (slug === "bank") {
      router.push("/dashboard/bank");
    }
    if (slug === "allResto") {
      router.push(`/dashboard`);
    }
  }, [slug, router]);

  // console.log(id, "id")

  const sideBar = [
    {
      icon: <Hotel />,
      title: "All Restaurants",
      slugInfo: "allResto"
    },
    {
      icon: <Hotel />,
      title: "Restaurant Information",
      slugInfo: "restoInfo"
    },
    {
      icon: <Gift />,
      title: "Gift Vouchers",
      slugInfo: "gifts"
    },
    {
      icon: <Vault />,
      title: "Bank Detail",
      slugInfo: "bank"
    },
  ]


  return (

    <main className=" overflow-hidden bg-[#F3F3F3] ">
      <Dashboardheader />
      <div className="flex sm:flex-row flex-col">
        {/* left side bar */}
        <div>
          {/* only for Mobile Toggle Button */}
          <div className="sm:hidden p-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="bg-black text-white p-2 rounded-md flex items-center gap-2"
            >
              {mobileOpen ? <span className='flex gap-x-2 items-center'><X size={20} /> Close</span> : <span className='flex gap-x-2 items-center'><Menu size={20} /> Menu</span>}
            </button>
          </div>
          {/* only for desktop */}
          <div
            className={`bg-[#090909eb]  sm:flex sm:flex-col h-[88vh]  relative sm:w-72 ${mobileOpen ? "w-full" : "hidden"} `}
          >
            <ul className='pt-10 mx-3'>
              {sideBar.map((item, i) =>
                <li onClick={() =>{ setSlug(item.slugInfo),setMobileOpen(false)}} className={`${slug === item.slugInfo ? "border-white" : "border-[#09090923]"} px-3 py-2 mt-3 bg-[#090909ce]  border text-slate-200 rounded-md cursor-pointer`} key={i}>{item.title}</li>
              )}
            </ul>
          </div>
        </div>

        {/* right side bar */}
        <div className='flex-1 p-5 max-w-[80rem] h-[88vh] overflow-y-scroll'>

          {slug === "restoInfo" && <RestaurantInfo id={id} />}
          {slug === "gifts" && <RestaurantVoucher id={id} />}


        </div>
      </div>
    </main>

  )
}

export default page