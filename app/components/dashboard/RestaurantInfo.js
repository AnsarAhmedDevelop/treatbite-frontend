"use client"
import { getSingleRestaurant, publishToggleRestaurant } from '@/app/http/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UpdateRestaurant from './UpdateRestaurant'
import { HandPlatter, RefreshCcwDot } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

function RestaurantInfo({ id }) {
  const [showAll, setShowAll] = useState({})
  const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  // console.log(id, "id..rest info")
  // console.log(accessToken,"access token")
  // console.log(showAll, "show restaurant")
  useEffect(() => {
    // console.log(accessToken, "access token");
    async function singleRestaurant() {
      try {
        const singleRestaurant = await getSingleRestaurant(id)
        // console.log(singleRestaurant, "single Restaurants")
        setShowAll(singleRestaurant.data);

      } catch (error) {
        console.log(error)
      }
    }
    singleRestaurant()
  }, [id, open,showModal])


  const handlePublish = async () => {
    try {
      const res = await publishToggleRestaurant(accessToken, id)
     
      toast.success(res.data.message || "Successfully Change Status");
      setShowModal(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Something went wrong"
      );    
      setShowModal(false);
    }
  };

  return (
    <>
      <div className='bg-white shadow rounded-lg p-5'>
        {showAll.isCompleteInfo == true && update == false ? (
          <div>
            <div className="flex sm:flex-row flex-col justify-between font-bold text-xl  border-b border-gray-100">
              <h2 className='sm:order-1 order-2 pt-5 sm:pt-0'>Restaurant Information</h2>
              <div className="pb-1 sm:order-2 order-1  sm:mx-0  mx-auto">
                <button
                  type="button"
                  onClick={(e) =>
                    setShowModal(true)
                  }
                  className="cursor-pointer py-2 px-4  bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  "
                >
                  {showAll.isPublished ? "UnPublish" : "Publish"}

                </button>
                {/* <Link
                 
                  href="/"
                >
                  <button
                    type="button"
                    className="cursor-pointer py-1 px-2 ml-2 bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  rounded-lg "
                  >
                    Preview
                  </button>
                </Link> */}
                <button
                  onClick={() =>
                   { setOpen(true),setUpdate(true)}
                  }
                  type="button"
                  className="cursor-pointer py-2 px-4 ml-2 bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none  "
                >
                  Update
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:py-5 gap-x-5">
              <div className="my-2">
                <h3 className="text-lg font-semibold text-black ">
                  Restaurant Name
                </h3>
                <h5 className="text-base">
                  {showAll.restaurantName}
                </h5>
              </div>
              <div className="my-2">
                <h3 className="text-lg font-semibold text-black ">
                  Restaurant Address
                </h3>
                <h5 className="text-base">
                  {showAll.restaurantAddress}
                </h5>
              </div>
              <div className="my-2">
                <h3 className="text-lg font-semibold text-black ">
                  Restaurant Contact Number
                </h3>
                <h5 className="text-base">
                  {showAll.restaurantContact}
                </h5>
              </div>

            </div>
            <div className="my-2">
              <h3 className="text-lg font-semibold text-black ">About</h3>
              <h5 className="text-base">{showAll.about}</h5>
            </div>

            <div className="text-start py-4 text-xs font-medium leading-normal  text-black w-full border-t border-b border-gray-300">
              <h1 className="text-base font-semibold text-black pb-1">
                Type
              </h1>
              <div className="flex flex-wrap">
                {showAll?.type?.map((item, i) => (
                  <h5 key={i} className="text-sm mr-3 flex items-center">
                    <svg
                      className="w-6 h-6 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="black"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    {item}
                  </h5>
                ))}
              </div>
            </div>

            <div className="text-start py-4 text-xs font-medium leading-normal  text-black w-full  border-b border-gray-300">
              <h1 className="text-base font-semibold text-black pb-1">
                Dietary
              </h1>
              <div className="flex flex-wrap">
                {showAll.dietary.map((item, i) => (
                  <h5 key={i} className="text-sm mr-3 flex items-center">
                    <svg
                      className="w-6 h-6 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="black"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    {item}
                  </h5>
                ))}
              </div>
            </div>

            <div className="text-start py-4 text-xs font-medium leading-normal  text-black w-full border-b border-gray-300">
              <h1 className="text-base font-semibold text-black pb-1">
                Cuisine
              </h1>
              <div className="flex flex-wrap">
                {showAll.cuisine.map((item, i) => (
                  <h5 key={i} className="text-sm mr-3 flex items-center">
                    <svg
                      className="w-6 h-6 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="black"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    {item}
                  </h5>
                ))}
              </div>
            </div>

            <div className="text-start py-4 text-xs font-medium leading-normal  text-black w-full border-b border-gray-300">
              <h1 className="text-base font-semibold text-black pb-1">
                Features
              </h1>
              <div className="grid sm:grid-cols-3 grid-cols-2">
                {showAll.features.map((item, i) => (
                  <h5
                    key={i}
                    className="text-sm mr-3 mb-2 flex items-center"
                  >
                    <svg
                      className="w-6 h-6 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="6"
                      stroke="currentColor"
                      fill="black"
                      viewBox="0 0 1792 1792"
                    >
                      <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                    {item}
                  </h5>
                ))}
              </div>
            </div>

            <div className="text-start py-4 text-xs font-medium leading-normal  text-black w-full border-b border-gray-300">
              <h1 className="text-base font-semibold text-black pb-1">
                Menu
              </h1>
              <div className="flex flex-wrap">
                {showAll.restaurantMenu.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 flex items-center rounded-full text-white  bg-[#2B2E34] text-sm m-1"
                  >
                    <HandPlatter  className="mr-1 text-center text-xl" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 py-5  border-b border-gray-300 gap-x-5">
              <div className="my-2">
                <h3 className="text-base font-semibold text-black ">
                  Minimum Gift Voucher
                </h3>
                <h5 className="text-lg">
                  ${showAll.voucherMin}
                </h5>
              </div>
              <div className="my-2">
                <h3 className="text-base font-semibold text-black ">
                  Maximum Gift Voucher
                </h3>
                <h5 className="text-lg">
                  ${showAll.voucherMax}
                </h5>
              </div>
            </div>

            <div className="">
              <div className="py-5  border-b border-gray-300">
                <h1 className="text-base font-semibold text-black m-1">
                  Cover Photo
                </h1>
                {showAll.coverPhoto && (
                  <img
                    className="w-52 h-48 border border-black"
                    src={showAll.coverPhoto}
                    alt="img"
                  />
                )}
              </div>
              <div className="py-5 ">
                <h1 className="text-base font-semibold text-black m-1">
                  Ambience Photos
                </h1>
                {showAll.ambiencePhotos && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {showAll.ambiencePhotos.map((item, i) => (
                      <img
                        key={i}
                        className="w-52 h-48 border border-black"
                        src={item}
                        alt="img"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        ) : (
          <UpdateRestaurant setOpen={setOpen} open={open} setUpdate={setUpdate} id={id} restoInfo={showAll} />
        )}
      </div>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/6 my-6 ">
              <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
                <div className="flex flex-col justify-between h-full">
                  <RefreshCcwDot className="w-12 h-12 m-auto mt-4 text-purple-500" />
                  <p className="mt-4 text-center text-xl font-bold text-gray-800 dark:text-gray-200">
                    {showAll.isPublished
                      ? "UnPublish Restaurant"
                      : "Publish Restaurant"}
                  </p>
                  <p className="text-center px-6 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {showAll.isPublished
                      ? "Are you sure you want to UnPublish this Restaurant ?"
                      : "Are you sure you want to Publish this Restaurant ?"}
                  </p>
                  <div className="flex items-center justify-between w-full gap-4 mt-8">
                    <button
                      onClick={handlePublish}
                      type="button"
                      className="py-2 px-4 cursor-pointer bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      {showAll.isPublished ? "UnPublish" : "Publish"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(false);
                      }}
                      type="button"
                      className="py-2 px-4 cursor-pointer bg-white hover:bg-gray-100 focus:ring-purple-500 focus:ring-offset-purple-200 text-purple-500  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>

  )
}

export default RestaurantInfo