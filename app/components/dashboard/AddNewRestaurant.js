"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import TagsInput from '../general/TagsInput';
import { addRestaurant } from '@/app/http/api';
const type = [
    { value: "Restaurant", name: "Restaurant" },
    { value: "Cafe", name: "Cafe" },
    { value: "Bar", name: "Bar" },
];

const dietary = [
    { value: "vegetarianOnly", name: "Vegetarian Only" },
    { value: "nonVegAvailable", name: "Non Veg Available" },
    { value: "vegAvailable", name: "Veg Available" },
];
const cuisine = [
    { value: "Afghani", name: "Afghani" },
    { value: "Indian", name: "Indian" },
    { value: "American", name: "American" },
    { value: "Thai", name: "Thai" },
    { value: "Chinese", name: "Chinese" },
    { value: "Italian", name: "Italian" },
    { value: "International", name: "International" },
];

const features = [
    { value: "allDayDining", name: "All day dining" },
    { value: "privateDiningRoom", name: "Private Dining Room" },
    { value: "waterfrontDining", name: "Waterfront Dining" },
    { value: "outdoorDining", name: "Outdoor Dining" },
    { value: "kidsPlayArea", name: "Kids Play Area" },
    { value: "familyFriendly", name: "Family Friendly" },
    { value: "Brunch", name: "Brunch" },
    { value: "Breakfast", name: "Breakfast" },
    { value: "smookingArea", name: "Smooking Area" }
];

function AddNewRestaurant() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const [values, setValues] = useState({
        restaurantName: '',
        restaurantContact: '',
        restaurantAddress: '',
        about: '',
        voucherMin: '',
        voucherMax: '',
        restaurantMenu: [],
        type: [],
        dietary: [],
        cuisine: [],
        features: []      
    });
    const [selected, setSelected] = useState([]);

    // ambiencePhotos: array of {file?, preview?} or existing URLs
    const [ambienceFiles, setAmbienceFiles] = useState([]);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setValues((prev) => {
                const prevArray = prev[name] || [];
                if (checked) {
                    return { ...prev, [name]: [...prevArray, value] };
                } else {
                    return { ...prev, [name]: prevArray.filter((v) => v !== value) };
                }
            });
        } else {
            setValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(coverPhotoFile, "cover selected File")
            const fd = new FormData();
            fd.append("restaurantName", values.restaurantName);
            fd.append("restaurantContact", values.restaurantContact);
            fd.append("restaurantAddress", values.restaurantAddress);

            fd.append("about", values.about);
            fd.append("voucherMin", values.voucherMin);
            fd.append("voucherMax", values.voucherMax);

            fd.append("type", JSON.stringify(values.type));
            fd.append("dietary", JSON.stringify(values.dietary));

            fd.append("cuisine", JSON.stringify(values.cuisine));
            fd.append("features", JSON.stringify(values.features));

            fd.append("restaurantMenu", JSON.stringify(selected));
            if (coverPhotoFile) {
                fd.append("coverPhoto", coverPhotoFile);
            }

            // Only send newly added File objects. (If you want to keep old URLs,
            // your backend should already have them; no need to re-send.)
            ambienceFiles.forEach((item) => {
                if (item.file) {
                    fd.append("ambiencePhotos", item.file);
                }
            });

            const res = await addRestaurant(accessToken, fd)
            toast.success(res.data.message || "Add new Restaurant successfully");
            router.push("/dashboard");

        } catch (err) {
            console.error(err);
            toast.error(
                err?.message || "Something went wrong"
            );
        }
    };

    const removeCoverPhoto = () => {
        setCoverPhotoFile(null);
        setCoverPhotoPreview(null);
    };

    const removeAmbience = (idx) => {
        setAmbienceFiles((prev) => prev.filter((_, i) => i !== idx));
    };


    const onCoverChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverPhotoFile(file);
        setCoverPhotoPreview(URL.createObjectURL(file));
    };

    const onAmbienceChange = (e) => {
        const files = Array.from(e.target.files || []);
        const mapped = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setAmbienceFiles((prev) => [...prev, ...mapped]);
    };


    return (
        <div>
            <div className=" bg-white shadow rounded-lg ">
                <div className="w-11/12 sm:w-10/12 mx-auto pt-5 sm:pt-10">
                    <div className="flex justify-between font-bold text-xl my-5 border-b border-gray-100">
                        <h1>Add New Restaurant</h1>
                        <div className="pb-1">
                            <button
                                type="button"
                                onClick={(e) =>
                                    router.push("/dashboard")
                                }
                                className="py-2 px-4  bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none "
                            >
                                Back
                            </button>
                        </div>
                    </div>
                    <div className=" overflow-y-auto  scroll-smooth">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 sm:py-5 gap-x-5">
                                    {/* restaurant name */}
                                    <div className="relative ">
                                      <label className=" font-semibold text-black ">
                                        Restaurant Name
                                      </label>
                                      <input
                                        type="text"
                                        className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                        name="restaurantName"
                                        value={values?.restaurantName}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    {/* Contact */}
                                    <div className="relative ">
                                      <label className="text-black font-semibold">
                                        Restaurant Contact Number
                                      </label>
                                      <input
                                        type="text"
                                        className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                        name="restaurantContact"
                                        value={values.restaurantContact}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    {/* Address */}
                                    <div className="relative ">
                                      <label className=" font-semibold text-black ">
                                        Restaurant Address
                                      </label>
                                      <textarea
                                        rows="2"
                                        className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                        name="restaurantAddress"
                                        value={values.restaurantAddress}
                                        onChange={handleChange}
                                      />
                                    </div>
                                    {/* About */}
                                    <div className="relative ">
                                      <label className=" font-semibold text-black ">About</label>
                                      <textarea
                                        rows="2"
                                        className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                        name="about"
                                        value={values.about}
                                        onChange={handleChange}
                                      />
                                    </div>
                                
                                  </div>
                                  {/* Menu */}
                                  <div className="pb-5">
                                    <label className="text-black font-semibold">
                                      Add Restaurant Menu
                                    </label>
                                    <TagsInput tags={selected} setTags={setSelected} />                                   
                    
                                  </div>
                                  {/* type */}
                                  <div className="pb-5">
                                    <label className="text-black font-semibold">Type </label>
                                    <div className="grid sm:grid-cols-3 grid-cols-2">
                                      {type.map((item, i) => (
                                        <div key={i} className="flex items-center my-2 space-x-3">
                                          <input
                                            type="checkbox"
                                            name="type"
                                            value={item.value}
                                            onChange={handleChange}
                                            checked={values?.type.includes(item.value)}
                                            className="form-tick  accent-[#2B2E34]   h-6 w-6 border border-gray-600 focus:border-[#2B2E34]    focus:outline-none"
                                          />
                                          <span className="text-black font-[500] ">{item.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  {/* dietary */}
                                  <div className="pb-5">
                                    <label className="text-black font-semibold">Dietary </label>
                                    <div className="grid sm:grid-cols-3 grid-cols-2">
                                      {dietary.map((item, i) => (
                                        <div key={i} className="flex items-center my-2 space-x-3">
                                          <input
                                            type="checkbox"
                                            name="dietary"
                                            value={item.value}
                                            onChange={handleChange}
                                            checked={values.dietary.includes(item.value)}
                                            className="form-tick  accent-[#2B2E34] h-6 w-6 border border-gray-600 focus:border-[#2B2E34] focus:outline-none"
                                          />
                                          <span className="text-black font-[500] ">{item.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  {/* cuisine */}
                                  <div className="pb-5">
                                    <label className="text-black font-semibold">Cuisine</label>
                                    <div className="grid sm:grid-cols-3 grid-cols-2">
                                      {cuisine.map((item, i) => (
                                        <div key={i} className="flex items-center my-2 space-x-3">
                                          <input
                                            type="checkbox"
                                            name="cuisine"
                                            value={item.value}
                                            onChange={handleChange}
                                            checked={values.cuisine.includes(item.value)}
                                            className="form-tick  accent-[#2B2E34]   h-6 w-6 border border-gray-600 focus:border-[#2B2E34]    focus:outline-none"
                                          />
                                          <span className="text-black font-[500] ">{item.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  {/* features */}
                    
                                  <div className="pb-5">
                                    <label className="text-black font-semibold">Features</label>
                                    <div className="grid sm:grid-cols-3 grid-cols-2">
                                      {features.map((item, i) => (
                                        <div key={i} className="flex items-center my-2 space-x-3">
                                          <input
                                            type="checkbox"
                                            name="features"
                                            value={item.value}
                                            onChange={handleChange}
                                            checked={values.features.includes(item.value)}
                                            className="form-tick  accent-[#2B2E34]   h-6 w-6 border border-gray-600 focus:border-[#2B2E34]    focus:outline-none"
                                          />
                                          <span className="text-black font-[500] ">{item.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  {/* min max voucher */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-x-5">
                                    <div className="relative ">
                                      <label className=" font-semibold text-black ">
                                        Minimum Gift Voucher (upto two unit decibel)
                                      </label>
                                      <input
                                        type="text"
                                        className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                        name="voucherMin"
                                                        
                                        value={values.voucherMin}
                                        onChange={handleChange}
                                      />
                                    </div>
                    
                                    <div className="relative ">
                                      <label className="text-black font-semibold">
                                        Maximum Gift Voucher (upto two unit decibel)
                                      </label>
                                      <input
                                        type="text"
                                        className="my-2 border border-gray-600 w-full py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none "
                                        name="voucherMax"
                                     
                                        value={values.voucherMax}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  {/* cover photo */}
                                  <div className="pb-5">
                                  <label className=" font-semibold text-black ">Cover Photo</label>
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
                                        name="coverPhoto"
                                        className="hidden"
                                        onChange={onCoverChange}                                 
                                      />
                                    </label>
                                  </div>
                                  {coverPhotoPreview  && (
                                    <div className="">
                                      <img
                                       src={coverPhotoPreview}
                                        alt="Preview"
                                        className="w-48 h-48 border border-black"
                                      />
                                      <button type="button" className='cursor-pointer' onClick={removeCoverPhoto}>
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </div>
                    
                                <div className="pb-5">
                                  <label className=" font-semibold text-black ">
                                    Ambience Pictures
                                  </label>
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
                                        You can Select Many Photos 
                                      </span>
                                      <input
                                        type="file"
                                        className="hidden"
                                        name="ambiencePhotos"
                                        multiple                                
                                         onChange={onAmbienceChange}
                                      />
                                    </label>
                                  </div>
                                  <div className="grid grid-cols-3">
                                    {ambienceFiles.map((item, index) => (
                                      <div key={index} className="m-2">
                                        <img
                                          src={
                                            item.preview
                                              ? item.preview
                                              : item.url
                                          }
                                          alt={`Preview ${index + 1}`}
                                          className="w-52 h-48 border border-black"
                                        />
                                        <button type="button" className='cursor-pointer' onClick={() => removeAmbience(index)}>
                                          Remove
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                    
                                  <button
                                    type="submit"
                                    className="sm:my-3 my-2 cursor-pointer hover:bg-white hover:text-[#2B2E34] py-3 px-4 hover:border-[#2B2E34] hover:border-2 border-2 text-white font-bold text-base   bg-[#2B2E34]"
                                  >
                                    Add Restaurant
                                  </button>
                                </form>
                              </div>
                </div>

            </div>

        </div>
    )
}

export default AddNewRestaurant