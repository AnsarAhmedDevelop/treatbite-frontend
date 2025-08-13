"use client"
import { updatePartnerProfile } from '@/app/http/api';
import { updateUser } from '@/app/redux/slice/userSlice';
import { Pen, UserPen, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function PartnerProfile({ setProfileModel, user }) {
  const [step, setStep] = useState("profile");
  const [fullName, setFullName] = useState(user.fullName || "")
  const [contact, setContact] = useState(user.contact || "")
  const [avatarFile, setAvatarFile] = useState(null);
   const accessToken = useSelector((state) => state.user.accessToken);
  const [avatarPhotoPreview, setAvatarPhotoPreview] = useState(
    user.avatar || null
  );
//   console.log(user, "user")
  const dispatch=useDispatch()

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPhotoPreview(null);
  };

     const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(coverPhotoFile,"cover selected File")
      const fd = new FormData();
      fd.append("fullName", fullName);
      fd.append("contact", contact);
      
      if (avatarFile) {
        fd.append("avatar",avatarFile);
      }
         
      const res = await updatePartnerProfile(accessToken,fd)
     console.log(res.data,"updated data")
      toast.success(res.data.message || "Updated successfully");
      dispatch(updateUser(res.data.user));

      setProfileModel(false);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.error || "Something went wrong while updating"
      );
    }
  };


  return (
    <>
      <div className="justify-center  items-center flex   fixed bottom-16 top-16 sm:left-4 left-0 right-0 sm:right-4  z-50 outline-none focus:outline-none">
        <div className="relative  my-3 ">
          <div className='absolute right-2 sm:right-3 top-4 sm:top-2'>
            <button

              onClick={() => setProfileModel(false)}
              type="button"
              className="cursor-pointer font-medium text-sm "
            >
              <X className="text-2xl mr-1" />

            </button>
          </div>
          <div className="flex flex-col sm:w-full  py-4 bg-white rounded-lg shadow  sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-3 text-xl font-light text-gray-600 sm:text-2xl ">
              <h6> {step === "profile" ? "Personal Profile" : "Update Profile"}</h6>
            </div>
            {step === "profile" &&
              <div className='px-5 sm:px-0'>
                <div className="">
                  <img
                    src={user?.avatar}
                    alt="pic"
                    className="w-24 h-24 bg-indigo-100 mx-auto rounded-full shadow-2xl  !z-50 flex items-center justify-center text-indigo-500"
                  />
                </div>
                <div className="mt-10 text-center pb-5">
                  <h1 className="text-2xl font-medium text-gray-700">
                    {user.fullName}
                  </h1>
                  <p className="font-light text-gray-600 mt-3">
                    {user.email}
                  </p>
                  <p className="font-light text-gray-600 mt-3">
                    {user.contact}
                  </p>
                </div>
              </div>
            }
            {step === "update" &&
              <div className='px-5 sm:px-0'>
                <form onSubmit={handleSubmit} encType="multipart/form-data">              
                  <div className="flex sm:flex-row flex-col space-x-2 space-y-2 my-3">
                    <div className=" relative ">
                        <label className="">Full Name</label>{" "}
                      <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}

                        className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#0066A2] focus:border-transparent"
                      />
                    </div>
                    <div className=" relative ">
                    <label className="">Contact</label>{" "}

                      <input
                        type="text"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}

                        className=" rounded-lg  flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#0066A2] focus:border-transparent"
                      />
                    </div>
                  </div>
                 
                  <label className="">Change Profile Picture</label>{" "}
                  <br />
                  <div className="flex w-auto items-center justify-left">
                  
              <div className="flex w-auto items-start justify-left my-2">
                <label className="w-auto flex items-center px-4 py-1 bg-white text-[#2B2E34] hover:shadow-md tracking-wide   border border-gray-600 cursor-pointer hover:bg-[#2B2E34] hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="text-sm sm:text-base leading-normal px-2">
                    Select Single Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    className="hidden"
                    onChange={onAvatarChange}
                  
                  />
                </label>
              </div>

                  </div>
                     {avatarPhotoPreview  && (
                <div className="">
                  <img
                   src={avatarPhotoPreview}
                    alt="Preview"
                    className="w-28 h-28 border border-black"
                  />
                  <button type="button" className='cursor-pointer' onClick={removeAvatar}>
                    Remove
                  </button>
                </div>
              )}
                  <div className="flex justify-center mt-5">
                    <button
                      type="submit"                 
                      className="cursor-pointer font-medium text-sm inline-flex items-center justify-center border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out px-3 py-2 bg-[#0066A2] hover:bg-[#005b91] text-white"
                    >
                       <UserPen className="text-2xl mr-1" />
                  Update profile
                    </button>
                  </div>
                </form>
              </div>

            }
            <div className=" mx-auto">
              {step === "profile" &&
                <button
                  onClick={() => setStep("update")}
                  className="cursor-pointer font-medium text-sm inline-flex items-center text-left justify-center border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out px-3 sm:px-3 py-2 bg-[#0066A2] hover:bg-[#005b91] text-white"
                >
                  <Pen className="text-2xl mr-1" />
                  Edit profile
                </button>
              }
          

            </div>
          </div>
        </div>
      </div>
      <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default PartnerProfile