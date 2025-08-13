"use client"
import Accordion from '@/app/components/general/Accordian';
import Header from '@/app/components/general/Header';
import { getSingleRestaurant } from '@/app/http/api';
import { buyVoucher } from '@/app/redux/slice/cartSlice';
import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const accordionData = [
  {
    title: "How long is my card valid for?",
    content: `The Best Restaurants Gift Card is valid for 6 months from date of purchase. This gives the recipient plenty of time to decide where and when to spend their gift card.`,
  },
  {
    title: "How does it work?",
    content: `The recipient receives the gift card in their inbox a few moments after placing an order. Recipient can then download it. This Gift card bear a 8-digit unique coupon number along with a 6-digit pin. For redeeming a Gif recipient must share coupon number & pin with restaurant manager only`,
  },
  {
    title: "Who Accepts Gift Card?",
    content: `The Gift card can be redeemed toward the purchase of particular Restaurant's Gift Card ONLY. Not all restaurants listed on website accept the gift card, so please check participating restaurants prior to your purchase and visiting a venue.`,
  },
  {
    title: "Can I apply a refund to a Gift card?",
    content: `Once the Gift card is purchased, the User cannot cancel it, return it, seek a refund for it or redeem the Gift card for cash or credit.`,
  },
];

function page({ params }) {
  const { single } = use(params)
  const [showRestaurant, setShowRestaurant] = useState({});
  const dispatch=useDispatch()
 const router= useRouter()
  const [values, setValues] = useState({
    giftVoucherValue: "",
    recipientEmail: "",
    message: "",
  })
  const user = useSelector((state) => state.user.user);
   const userRole=user?.role || "";
 

  useEffect(() => {
    
    async function getSingleRestaurants() {
      try {
        const RestaurantData = await getSingleRestaurant(single)
        // console.log(RestaurantData.data, "single Restaurant")
        setShowRestaurant(RestaurantData.data);

      } catch (error) {
        console.log(error)
      }
    }
    getSingleRestaurants()
  }, [single])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    values.restaurantName=showRestaurant.restaurantName;
    values.restaurantAddress=showRestaurant.restaurantAddress;
    values.restaurantId=showRestaurant._id;
    // console.log(values,"values")
  dispatch(buyVoucher(values))
  toast.success("Voucher Added to cart");
  router.push("/cart")
  }
  return (
    <div>
      <Header home={false} />
      <div className="flex bg-gray-100 min-h-screen scroll-smooth">
        <div className="flex-grow text-gray-800">

          <main
            className="p-3 sm:p-10 space-y-6"
          >

            <section className="w-full">
              <div className=" bg-white shadow rounded-lg ">
                <div className="w-11/12 sm:w-10/12 mx-auto pt-0 sm:pt-10">
                  <div className="flex flex-col py-5 border-b-2 border-black">
                    <div>
                      <h1 className="text-2xl sm:text-4xl text-[#2b2e34] font-[500] tracking-wider font-spectral italic">
                        {showRestaurant?.restaurantName}
                      </h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <h5 className="sm:text-lg">
                        {showRestaurant?.restaurantAddress}
                      </h5>
                      <div className="pb-1">
                        <Link
                          href="/"
                          className="py-2 px-4  bg-[#2b2e34] hover:bg-black text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none "
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                    <div className="relative">
                      {showRestaurant?.coverPhoto && (
                        <div className="sticky top-6">
                          <img
                            className=""
                            src={showRestaurant?.coverPhoto}
                            alt="img"
                          />
                        </div>
                      )}
                    </div>
                    <div className="px-2 flex flex-col scroll-smooth">
                      <h2 className="sm:text-lg pb-5">
                        An e-gift card is sent straight to your email inbox.
                        Include a personal message and select a custom value
                        of your choice.
                      </h2>
                      <div className="py-3 border-t border-gray-500">
                        <div className="grid grid-cols-2 items-center py-1">
                          <h2 className="col-span-1 text-base font-semibold">
                            Gift Voucher Range
                          </h2>
                          <p className=" col-span-1 text-base text-start py-1 ">
                            <span className="text-base font-medium px-1">
                              ${showRestaurant?.voucherMin}
                            </span>{" "}
                            to{" "}
                            <span className="text-base font-medium px-1">
                              ${showRestaurant?.voucherMax}
                            </span>
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} >
                        <div className="grid grid-cols-3 items-center py-1">
                          <h2 className="col-span-1 text-base font-semibold">
                            Gift Voucher value
                          </h2>
                          <div className="col-span-2">
                            <input
                              type="number"
                              min={showRestaurant?.voucherMin}
                              max={showRestaurant?.voucherMax}
                              step="1"
                              autoComplete="off"
                              className="my-2 border w-full border-gray-600  py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                              name="giftVoucherValue"
                              value={values.giftVoucherValue}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 items-center py-1">
                          <h2 className="col-span-1 text-base font-semibold">
                            Recipient email
                          </h2>
                          <div className="col-span-2">
                            <input
                              type="text"
                              className="my-2 border w-full border-gray-600  py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                              name="recipientEmail"
                              value={values.recipientEmail}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="border-b border-gray-500">
                          <div className="grid grid-cols-3 items-center py-1">
                            <h2 className="col-span-1 text-base font-semibold">
                              Message
                            </h2>
                            <div className="col-span-2">
                              <textarea
                                type="text"
                                placeholder="Optional"
                                className="my-2 border w-full border-gray-600  py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="justify-self-end">

                          {userRole !== "User" ? (
                            <button
                              type="submit"
                              disabled
                              className="my-2 sm:my-5 w-full ease-in duration-300 opacity-50 cursor-not-allowed py-3 px-4  border-2 text-white font-bold text-lg   bg-[#2B2E34]"
                            >
                              Login and Buy
                            </button>
                          ) : (
                            <button
                              type="submit"
                         
                              className="my-2 sm:my-5 w-full ease-in duration-300 hover:bg-white hover:text-[#2B2E34] py-3 px-4 hover:border-[#2B2E34] hover:border-2 border-2 text-white font-bold text-lg   bg-[#2B2E34]"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </form>

                      <p className="sm:p-3 mb-1">
                        When buying more than 1 card, you can edit the
                        information individually after adding them to your
                        cart.
                      </p>
                      <div className="accordion w-full">
                        {accordionData.map(({ title, content }) => (
                          <Accordion
                            title={title}
                            content={content}
                            key={title}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="py-2 sm:py-5  border-b border-gray-300">
                    <h1 className="text-xl font-semibold text-black ">
                      About
                    </h1>
                    <p className="text-lg py-3">
                      {showRestaurant?.about}
                    </p>
                  </div>

                  <div className="text-start py-2 sm:py-5 text-xs font-medium leading-normal  text-black w-full border-t border-b border-gray-300">
                    <h1 className="text-xl font-semibold text-black pb-1">
                      Type
                    </h1>
                    <div className="flex py-3">
                      {showRestaurant?.type?.map((item, i) => (
                        <h5
                          key={i}
                          className="text-sm mr-3 flex items-center"
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
                          <span className="text-base">{item}</span>
                        </h5>
                      ))}
                    </div>
                  </div>

                  <div className="text-start py-2 sm:py-5 text-xs font-medium leading-normal  text-black w-full  border-b border-gray-300">
                    <h1 className="text-xl font-semibold text-black pb-1">
                      Dietary
                    </h1>
                    <div className="flex py-3">
                      {showRestaurant?.dietary?.map((item, i) => (
                        <h5
                          key={i}
                          className="text-sm mr-3 flex items-center"
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
                          <span className="text-base">{item}</span>
                        </h5>
                      ))}
                    </div>
                  </div>

                  <div className="text-start py-2 sm:py-5 text-xs font-medium leading-normal  text-black w-full border-b border-gray-300">
                    <h1 className="text-xl font-semibold text-black pb-1">
                      Cuisine
                    </h1>
                    <div className="flex py-3">
                      {showRestaurant?.cuisine?.map((item, i) => (
                        <h5
                          key={i}
                          className="text-sm mr-3 flex items-center"
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
                          <span className="text-base">{item}</span>
                        </h5>
                      ))}
                    </div>
                  </div>

                  <div className="text-start py-2 sm:py-5 text-xs font-medium leading-normal  text-black w-full border-b border-gray-300">
                    <h1 className="text-xl font-semibold text-black pb-1">
                      Features
                    </h1>
                    <div className="grid sm:grid-cols-3 py-3">
                      {showRestaurant?.features?.map((item, i) => (
                        <h5
                          key={i}
                          className=" mr-3 mb-2 flex items-center"
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
                          <span className="text-base">{item}</span>
                        </h5>
                      ))}
                    </div>
                  </div>

                  <div className="text-start py-2 sm:py-5 text-xs font-medium leading-normal  text-black w-full border-b border-gray-300">
                    <h1 className="text-xl font-semibold text-black pb-1">
                      Menu
                    </h1>
                    <div className="flex flex-wrap py-3">
                      {showRestaurant?.restaurantMenu?.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 flex items-center rounded-full text-white  bg-[#2B2E34] text-base mr-2"
                        >
                          <UtensilsCrossed  className="mr-1 text-center text-xl" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 py-2 sm:py-5 gap-x-5">
                    <div className="py-3">
                      <h1 className="text-xl font-semibold text-black ">
                        Minimum Gift Voucher
                      </h1>
                      <h5 className="text-base">
                        ${showRestaurant?.voucherMin}
                      </h5>
                    </div>
                    <div className="my-2">
                      <h1 className="text-xl font-semibold text-black ">
                        Maximum Gift Voucher
                      </h1>
                      <h5 className="text-base">
                        ${showRestaurant?.voucherMax}
                      </h5>
                    </div>
                  </div>
                  <div className="py-2 sm:py-5">
                    <h1 className="text-xl font-semibold text-black pb-1 ">
                      Restaurant Ambience Photos
                    </h1>
                    {showRestaurant.ambiencePhotos && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-3">
                        {showRestaurant?.ambiencePhotos?.map(
                          (item, i) => (
                            <img
                              key={i}
                              className="w-[250px] sm:w-[500px] h-[150px] sm:h-[300px] mr-10"
                              src={item}
                              alt="img"
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

    </div>
  )
}

export default page