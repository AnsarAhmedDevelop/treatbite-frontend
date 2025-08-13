"use client"
import React, { useEffect, useRef, useState } from 'react'
import UserSignIn from '../home/UserSignIn';
import UserSignUp from '../home/UserSignUp';
import { getUserProfile } from '@/app/http/api';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookie } from 'cookies-next';
import { setLogout, setUser } from '@/app/redux/slice/userSlice';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Gift, LogOut, UserRoundPen } from 'lucide-react';
import UserProfile from '../home/UserProfile';


function Header({ home }) {
  const [userLogin, setUserLogin] = useState(false);
  const [showModalSignUp, setshowModalSignUp] = useState(false);
  const [open, setOpen] = useState(false)
  const [profileModel, setProfileModel] = useState(false)

  // Ref to detect outside clicks for profile dropdown
  const ref = useRef(null);

  // Redux state
  const accessToken = useSelector((state) => state.user.accessToken);
  // console.log(accessToken, "access token");
  const user = useSelector((state) => state.user.user);
  // console.log(user, "user")
  const dispatch = useDispatch()

  // Check if the user is logged in via cookies
  const isUserLogin = getCookie("isUserLoggedIn");
  // console.log(isUserLogin, "is user login")

  // Fetch user profile when accessToken changes
  useEffect(() => {
    // console.log(accessToken, "access token");
    async function getProfile() {
      try {
        // regular method
        // const partner = await axios.get('${process.env.NEXT_PUBLIC_SERVER_URL}/api/partner/profile/')
        // console.log(partner, "partner")

        // API call to get user details
        const user = await getUserProfile(accessToken)
        // console.log(user.data, "user info")
        // Store user in Redux
        dispatch(setUser(user.data));
      } catch (error) {
        console.log(error)
      }
    }
    if (accessToken) {
      getProfile()
    }

  }, [accessToken])

  // If profile is open and the clicked target is not within it
  // Close profile dropdown when clicking outside of it
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the profile is open and the clicked target is not within the profile,
      // then close the profile
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  // Logout function
  const logout = () => {
    deleteCookie("isUserLoggedIn"); // Remove login cookie
    toast.success("Logout Successfully");
    // router.push("/")
    setOpen(!open); // Close dropdown
    dispatch(setLogout()); // Clear Redux user data
  };
  return (
    <div className={`${home ? "" : "bg-[#070707] py-3"} `}>
      <div className='container mx-auto px-2 sm:px-0'>
        <div className='flex justify-between items-center'>
          <Link href="/">
            <img src='/images/logo.png' alt='Logo' className='w-36 sm:w-44 h-10' />
          </Link>
          <div className='flex gap-x-2 items-center'>
            <Link href="/restaurants">
              <button
                className="bg-white text-gray-800 px-2 sm:px-4 py-1 sm:py-2  text-base font-semibold hover:bg-gray-50 transition-colors  cursor-pointer  "
              >
                Restaurants
              </button>
            </Link>
            <div>
              {/* If not logged in, show Login button */}
              {isUserLogin == undefined ||
                isUserLogin == null ? (
                <div>
                  <button
                    className={`cursor-pointer  text-white px-2 sm:px-4 py-1 sm:py-2  text-base font-semibold bg-[#bf9444]`}
                    onClick={() =>
                      setUserLogin(true)
                    }
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className='flex flex-col relative w-auto'>
                  <button
                    onClick={() => setOpen(!open)}
                    className="inline-flex cursor-pointer justify-center items-center group"
                  >
                    <img
                      className="w-10 h-10 rounded-full drop-shadow-xl"
                      src={user?.avatar}
                      alt="User"
                    />
                    <div className="hidden sm:flex items-center truncate drop-shadow-xl">
                      <span className="truncate ml-2 text-lg font-medium text-white">
                        {user?.fullName}
                      </span>
                    </div>
                  </button>
                  {/* Profile dropdown menu */}
                  {open && (
                    <div
                      ref={ref}
                      className="sm:w-36  absolute sm:top-12 top-10 sm:left-0 right-0  shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="divide-y-2 divide-[#bf9444]">
                        <Link

                          href="/cart"
                          className="flex gap-x-1 px-4 py-2 text-base text-[#bf9444]  hover:bg-gray-900 hover:text-gray-100 "
                        >
                          <Gift /> Cart
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
                          onClick={() => logout()}
                          className="flex cursor-pointer gap-x-1 px-4 py-2 w-full text-base text-[#bf9444]  hover:bg-gray-900 hover:text-gray-100 "
                        >
                          <LogOut /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals for Login, Sign-up, and Profile */}

        {userLogin ? 
        <UserSignIn setUserLogin={setUserLogin} setshowModalSignUp={setshowModalSignUp} /> : null}
        
        {showModalSignUp ?
          <UserSignUp  setshowModalSignUp={setshowModalSignUp} /> : null }

        {profileModel ? 
        <UserProfile setProfileModel={setProfileModel} user={user} /> : null}

      </div>
    </div>
  )
}

export default Header