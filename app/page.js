import { ChefHat, CircleSmall, Gift, HandPlatter, MailCheck, Smile, Users } from "lucide-react";
import Footer from "./components/general/Footer";
import Header from "./components/general/Header";
import Link from "next/link";

export default function Home() {
  const countData = [
    {
      icon: <ChefHat className="text-[#bf9444]" />,
      count: "500+",
      title: "Partner Restaurants"
    },
    {
      icon: <Users className="text-[#bf9444]" />,
      count: "10K+",
      title: "Happy Customers"
    },
    {
      icon: <Gift className="text-[#bf9444]" />,
      count: "25K+",
      title: "Vouchers Sold"
    },
    {
      icon: <Smile className="text-[#bf9444]" />,
      count: "4.8",
      title: "Average Rating"
    },
  ]

  const howItWorksData = [
    {
      icon: <ChefHat className="text-[#bf9444]" />,
      title: "Explore Restaurants",
      desc: "Find restaurants based on cuisine, features, and style."
    },
    {
      icon: <Gift className="text-[#bf9444]" />,
      title: "Buy a Gift Voucher",
      desc: "Log in, enter the value, recipient email, and a message.."
    },
    {
      icon: <MailCheck className="text-[#bf9444]" />,
      title: "Email Delivery",
      desc: "Recipient receives an email with a unique voucher code, PIN, and redemption details."
    },
    {
      icon: <HandPlatter className="text-[#bf9444]" />,
      title: "Dine & Redeem",
      desc: "Voucher is redeemed securely using code, PIN, and OTP — no payment needed."
    },

  ]

  const forCustomersData=[
    {
      title:"Browse a wide range of restaurants",
      gap: false
    },
    {
      title:"Buy gift vouchers by logging in and entering:",
      gap: false
    },
    {
      title:"Voucher amount",
      gap: true
    },
    {
      title:"Recipients email",
      gap: true
    },
    {
      title:"A custom message",
      gap: true
    },
    {
      title:"Recipient receives:",
      gap: false
    },
    {
      title:"Restaurant details",
      gap: true
    },
    {
      title:"Voucher amount",
      gap: true
    },
    {
      title:"6-digit voucher code",
      gap: true
    },
    {
      title:"4-digit secret PIN",
      gap: true
    },
    {
      title:"Easy, secure, and perfect for any occasion",
      gap: false
    },
  ]
  const forOwnersData=[
    {
      title:"Register your restaurant on our platform",
      gap: false
    },
    {
      title:"Add full details: name, address, cover and ambience photos",
      gap: false
    },
    {
      title:"Add menu, cuisine, dietary preferences.",
      gap: false
    },
    {
      title:"Set minimum and maximum gift voucher amounts",
      gap: false
    },
    {
      title:"Use the Owner Dashboard to:",
      gap: false
    },
    {
      title:"View all purchased vouchers",
      gap: true
    },
    {
      title:"Track voucher codes, amounts, and purchase dates",
      gap: true
    },
    {
      title:"Mark vouchers as “Redeemed” after verifying code, PIN, and OTP",
      gap: true
    },
    {
      title:"PIN remains hidden from the restaurant to ensure security",
      gap: false
    },
    {
      title:"Complete tracking of all activity in dashboard",
      gap: false
    },
    {
      title:"Exposure to a broader audience through the platforms restaurant listings.",
      gap: false
    },
  ]
  return (
    <>
      <div className="bg-[url(/images/home-banner-bg.jpg)] bg-no-repeat bg-center bg-cover  py-5  relative">
        {/* <div className="bg-gray-950/95 opacity-50 z-0 absolute top-0 left-0 right-0 h-full"></div> */}
        <div className="">
          <Header home={true} />

          <div className="flex flex-col items-center justify-center sm:pt-16 pt-8 pb-12 sm:pb-24">


            <h5 className="text-3xl  text-white text-center sm:text-6xl  font-[900px] ">
              Gift the Joy of <br />
              <span className="text-[#bf9444] font-playwrite">Fine Dining</span>
            </h5>
            <div className="py-7">
              <p className="text-white text-base sm:mx-0 mx-5 sm:text-xl text-center">Connect restaurants with customers through digital gift vouchers.</p>
              <p className="text-white text-base sm:mx-0 mx-5 sm:text-xl text-center">Perfect for special occasions, corporate gifts, or treating someone special.</p>
            </div>
            <div className="sm:flex sm:gap-x-3">
              <Link href="/restaurants" className="cursor-pointer">
                <button className="bg-[#bf9444] text-white px-4 sm:px-8 py-2 sm:py-4  text-lg font-semibold hover:bg-[#bd8d35] transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 sm:w-auto w-60 mt-2"><Gift /> Browse Restaurants</button>
              </Link>
              <Link href="/join-as-partner" className="cursor-pointer">
                <button className="bg-white text-gray-800 px-4 sm:px-8 py-2 sm:py-4  text-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 sm:w-auto w-60 mt-2"><ChefHat /> Join as Restaurant</button>
              </Link>

            </div>
          </div>

        </div>
      </div>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {countData.map((item, i) =>
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#f4f0eb] rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">{item.count}</div>
                <div className="text-gray-600">{item.title}</div>
              </div>
            )}


          </div>
        </div>
      </section>
      {/* what we do */}
      <section className="px-3 sm:px-0 py-10 sm:py-20 bg-[#f4f0eb]">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-5xl text-center font-bold text-gray-800 mb-2 sm:mb-4">What We Do</h2>
          <p className="text-base sm:text-xl text-gray-600 mb-8 text-center">
            Our platform makes it easy to send digital restaurant gift vouchers to friends, family, or colleagues. We also help restaurants grow by adding a new way for customers to discover and support them through gifting.
          </p>
        </div>
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="col-span-1 space-y-1 pb-3">
              <h3 className="text-gray-800 text-xl sm:text-2xl font-semibold">
                For Customers            </h3>
                {forCustomersData.map((item,i)=>(
                    <p key={i}
                    className={`text-sm flex gap-x-1 text-gray-600 items-center ${item.gap?"ml-5":""}`}><CircleSmall size="15" className="" /> {item.title}</p>
                ))}           
              

            </div>
            <img src="/images/for-owners-3.jpg" alt="customers" className="col-span-1 hidden sm:block" />

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <img src="/images/for-owners-4.jpg" alt="customers" className="col-span-1 hidden sm:block" />
            <div className="space-y-1 sm:p-5">
              <h3 className="text-gray-800 text-xl sm:text-2xl font-semibold">
                For Restaurant Owners          </h3>
                     {forOwnersData.map((item,i)=>(
                    <p key={i}
                    className={`text-sm flex gap-x-1 text-gray-600 items-center ${item.gap?"ml-5":""}`}><CircleSmall size="15" className="" /> {item.title}</p>
                ))}
             

            </div>

          </div>

        </div>

      </section>
      {/* How It Works */}
      <section className="px-3 sm:px-0 py-10 sm:py-20 flex flex-col items-center bg-gray-900 text-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-5xl text-center font-bold text-gray-300 mb-2 sm:mb-4">How It Works</h2>
          <p className="text-base sm:text-xl text-gray-400 mb-8 text-center">
            Simple, secure, and seamless gift voucher experience for everyone
          </p>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-x-3 gap-y-3">
          {howItWorksData.map((item, i) =>
            <div key={i} className="text-center p-4 sm:p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors mx-3 sm:mx-0" >
              <div className="w-16 h-16 mx-auto mb-6 text-blue-600 flex items-center justify-center bg-white rounded-full shadow-lg">{item.icon}

              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          )}
        </div>
        <Link href="/restaurants" className="cursor-pointer mt-5 sm:mt-10 mx-auto">
          <button className="bg-[#bf9444] text-white px-4 sm:px-8 py-2 sm:py-4  text-lg font-semibold hover:bg-[#bd8d35] transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"><Gift /> Browse Restaurants</button>
        </Link>

      </section>

      <Footer />
    </>
  );
}
