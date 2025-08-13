"use client"
import { allRestaurants } from '@/app/http/api';
import { Plus, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function AllRestaurants() {
     const accessToken = useSelector((state) => state.user.accessToken);
     const [showAll, setShowAll]=useState([]);
    useEffect(() => {
        // console.log(accessToken, "access token");
        async function getAllRestaurants() {
            try {           
                const AllRestaurants = await allRestaurants(accessToken)
                // console.log(AllRestaurants, "allRestaurants")
                setShowAll(AllRestaurants.data);
               
            } catch (error) {
                console.log(error)
            }
        }
        if(accessToken){
          getAllRestaurants()
        }
        
    }, [accessToken])
  return (
    <div className='container mx-auto py-5 sm:py-10 px-3 sm:px-0'>
         <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="sm:mr-6 sm:order-1 order-2">
          <h1 className="text-2xl font-semibold">All Restaurants</h1>
        </div>
        <div className="flex flex-wrap sm:order-2 order-1 items-start justify-end  -mb-3">
          <Link
            href="/dashboard/newRestaurant"
            className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
          >
           
            <Plus className="text-2xl mr-1"/>
            Add new restaurants
          </Link>
        </div>
      </div>

      <section className="grid md:grid-cols-3  gap-6 sm:mt-7">
        {showAll?.length > 0
          ? showAll?.map((item, i) => (
              <Link key={i} href={`dashboard/${item._id}`}>
                <div className="grid grid-cols-3 h-[140px] sm:h-[200px] items-center p-4 sm:p-8 bg-white shadow rounded-lg">
                  <div className="col-span-1 inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
               
                    <UtensilsCrossed className="text-2xl"/>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-2xl font-bold">
                      {item.restaurantName}
                    </span>
                    <span className="block text-gray-500">
                      {item.restaurantAddress}
                    </span>
                    <span
                      className={`inline  items-center px-1 py-1 text-xs font-semibold ${
                        item.isPublished
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }  rounded-md `}
                    >
                      {item.isPublished ? "PUBLISH" : "UNPUBLISH"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          : <h2>Dont have any Restaurant</h2>}
      </section>

    </div>
  )
}

export default AllRestaurants