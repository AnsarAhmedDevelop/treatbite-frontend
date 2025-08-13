import AllRestaurants from '@/app/components/dashboard/AllRestaurants'
import Dashboardheader from '@/app/components/general/Dashboardheader'
import React from 'react'

function page() {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <Dashboardheader />
        <div>
          <AllRestaurants />
        </div>
    </div>
  )
}

export default page