"use client"
import { allHomeRestaurants } from '@/app/http/api';
import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function HomeRestaurants() {
  const [showAll, setShowAll] = useState([]);
  useEffect(() => {
    async function getAllRestaurants() {
      try {
        const AllRestaurants = await allHomeRestaurants()
        // console.log(AllRestaurants.data, "allRestaurants")
        setShowAll(AllRestaurants.data);

      } catch (error) {
        console.log(error)
      }
    }
    getAllRestaurants()
  }, [])
  return (
    <div className='sm:w-11/12 xl:w-10/12 mx-auto py-10 px-3 sm:px-0'>
      {showAll.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 mx-auto gap-x-7 gap-y-7 2xl:gap-x-10 2xl:gap-y-10">
          {showAll.map((item, i) =>
            <Link href={`/restaurant/${item._id}`} key={i}>
              <div className="bg-white rounded-xl shadow-gray-200 shadow-2xl hover:shadow-xl pb-2 ">
                <img
                  className="w-full sm:h-[250px] rounded-t-xl "
                  src={item.coverPhoto}
                  alt=""
                />
                <div className="pl-2">
                  <div className='mt-1 space-y-1'>
                    <p className="text-xl font-bold text-gray-800">
                      {item.restaurantName}
                    </p>
                    <p className="text-[#2b2e34]  truncate font-[400] text-sm pb-3 ">
                      {item.restaurantAddress}
                    </p>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className='mt-2'>
                    <div className='text-sm text-gray-500 pb-1'>Type</div>
                    <div className="flex flex-wrap gap-2 text-gray-800 font-[400] text-sm py-0 ">
                      {item.type.map((type, i) => (
                        <span className="capitalize bg-[#f4f0eb] p-1" key={i}>
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='mt-2'>
                    <div className='text-sm text-gray-500 pb-1'>Cuisine</div>
                    <div className="flex flex-wrap gap-2 text-gray-800 font-[400] text-sm py-0 ">
                      {item.cuisine.map((cuisines, i) => (
                        <span
                          className="capitalize bg-[#f4f0eb] text-left p-1"
                          key={i}
                        >
                          {cuisines}
                        </span>
                      ))}
                    </div>
                  </div>
                  </div>

                  <button className="mx-auto px-2 my-4 bg-[#bf9444] text-white py-2 font-semibold hover:bg-[#bd8d35] transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                    <UtensilsCrossed /> View Complete Detail</button>


                </div>
              </div>
            </Link>
          )}
        </div> : <h2>Dont have any restaurant</h2>}
    </div>
  )
}

export default HomeRestaurants