"use client"
import { updateRestaurant } from '@/app/http/api';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import TagsInput from '../general/TagsInput';


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

function UpdateRestaurant({ setOpen, open, setUpdate, id, restoInfo }) {
  const accessToken = useSelector((state) => state.user.accessToken);
  //new start
  const [removedCover, setRemovedCover] = useState(false);
  const [removedAmbience, setRemovedAmbience] = useState([]);
  //new end
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
    features: [],
    coverPhoto: '',
    ambiencePhotos: [],
  });

  useEffect(() => {
    if (restoInfo) {
      setValues({
        restaurantName: restoInfo.restaurantName || '',
        restaurantContact: restoInfo.restaurantContact || '',
        restaurantAddress: restoInfo.restaurantAddress || '',
        about: restoInfo.about || '',
        voucherMin: restoInfo.voucherMin || '',
        voucherMax: restoInfo.voucherMax || '',

        type: restoInfo.type || [],
        dietary: restoInfo.dietary || [],
        cuisine: restoInfo.cuisine || [],
        features: restoInfo.features || [],
        coverPhoto: '',
        ambiencePhotos: [],
      });
      setSelected(restoInfo?.restaurantMenu || [])
      setCoverPhotoPreview(restoInfo?.coverPhoto || "")
      setAmbienceFiles((restoInfo.ambiencePhotos || []).map((url) => ({ url })))
    }
  }, [restoInfo]);

  const [selected, setSelected] = useState([]);

  // ambiencePhotos: array of {file?, preview?} or existing URLs
  const [ambienceFiles, setAmbienceFiles] = useState(
    restoInfo.ambiencePhotos || []
  );
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(
    restoInfo.coverPhoto || null
  );

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
      // console.log(coverPhotoFile,"cover selected File")
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



      //new
      // Cover Photo
      if (coverPhotoFile) {
        // case 1: user uploaded a NEW cover photo → send file to backend
        fd.append("coverPhoto", coverPhotoFile);
      } else if (removedCover) {
        // case 2: user removed the EXISTING cover photo → send flag
        fd.append("removeCoverPhoto", "true");
      }

      // Ambience Photos
      ambienceFiles.forEach((item) => {
        if (item.file) {
          // send new ambience photo uploads
          fd.append("ambiencePhotos", item.file);
        }
      });

      // if user removed some old ambience photos → send list of URLs
      if (removedAmbience.length > 0) {
        fd.append("removedAmbiencePhotos", JSON.stringify(removedAmbience));
      }

      const res = await updateRestaurant(accessToken, id, fd)

      toast.success(res.data.error || "Updated successfully");
      setUpdate(false)
      setOpen(!open);

    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.error || "Something went wrong while updating"
      );
    }
  };

  
  //new
  const removeCoverPhoto = () => {

    if (coverPhotoPreview && !coverPhotoFile) {
      // means it was an existing URL, not a new upload
      // condition: preview is showing an EXISTING DB URL, not a just-selected new file
      // → tell backend to remove it later
      setRemovedCover(true);
    }
    // reset local states
    setCoverPhotoFile(null);
    setCoverPhotoPreview(null);
  };

    // Remove ambience photo handler
  const removeAmbience = (idx) => {
    setAmbienceFiles((prev) => {
      const removed = prev[idx];
      // if it was an old URL, keep track for backend
      if (removed.url) {
        // if it was an old ambience photo from DB
        // → push to removedAmbience array so backend deletes it
        setRemovedAmbience((old) => [...old, removed.url]);
      }
      // finally, drop it from UI preview
      return prev.filter((_, i) => i !== idx);
    });
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
      <section className="w-full">
        <div className="">
          <div className="flex justify-between font-bold text-xl  border-b border-gray-100">
            <h2>Update Restaurant</h2>
            <div className="pb-1">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                className="py-2 px-4 cursor-pointer bg-purple-500 hover:bg-purple-600 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none "
              >
                Back
              </button>
            </div>
          </div>
          <div className=" overflow-y-auto  scroll-smooth">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 sm:grid-cols-2 py-5 gap-x-5">
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
                    rows="4"
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
                <div className="grid sm:grid-cols-3 grid-cols-2 ">
                  {features.map((item, i) => (
                    <div key={i} className="flex items-center my-2 space-x-3">
                      <input
                        type="checkbox"
                        name="features"
                        value={item.value}
                        onChange={handleChange}
                        checked={values.features.includes(item.value)}
                        className="form-tick   accent-[#2B2E34]   h-6 w-6 border border-gray-600 focus:border-[#2B2E34]    focus:outline-none"
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
                    required={values?.voucherMin === "" ? true : false}
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
                    required={values?.voucherMax === "" ? true : false}
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
                {coverPhotoPreview && (
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
                <div className="grid grid-cols-1 sm:grid-cols-3">
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
                className="my-3 cursor-pointer hover:bg-white hover:text-[#2B2E34] py-3 px-4 hover:border-[#2B2E34] hover:border-2 border-2 text-white font-bold text-base   bg-[#2B2E34]"
              >
                Update & Save
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UpdateRestaurant