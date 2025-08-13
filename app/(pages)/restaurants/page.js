import Footer from '@/app/components/general/Footer'
import Header from '@/app/components/general/Header'
import HomeRestaurants from '@/app/components/home/HomeRestaurants'
import React from 'react'

function page() {
  return (
    <div className='bg-[#f4f0eb]'>
           <Header home={false} />
            <div className='min-h-[90vh]'>
              <div className='py-8 sm:py-16 bg-gray-900 text-white'>
<h1 className="text-2xl text-center md:text-5xl font-lato font-semibold mb-6">Discover Amazing Restaurants</h1>
              <p className="text-lg px-3 sm:px-0 md:text-xl mb-8 max-w-3xl mx-auto text-center" >Explore our handpicked collection of restaurants and buy gift vouchers to treat your loved ones.</p>
              </div>
                   <HomeRestaurants />
            </div>
             <Footer />
    </div>
  )
}

export default page