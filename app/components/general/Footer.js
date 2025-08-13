"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LogIn } from "lucide-react";
import PartnerSignIn from "../home/PartnerSignIn";


const Footer = () => {
  const [showModal, setShowModal] = useState(false); 
  
  return (
    <div className="bg-[#070707] py-2">
      <div className="sm:w-11/12 xl:w-10/12 flex flex-col sm:flex-row items-center sm:justify-between mx-auto text-white">
        <div className="sm:flex gap-x-3 text-sm sm:order-1 order-2 hidden">
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
   
          <div className="flex order-1 sm:order-2">
            <Link href="/join-as-partner" className="cursor-pointer">
              Join Us As Partner
            </Link>
            <hr className="w-px h-6 bg-white mx-3" />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className="cursor-pointer flex items-center justify-center"
            >
              <span className="mr-1">
          
                <LogIn />
              </span>{" "}
              Restaurant login
            </button>
          </div>
    
      </div>
      {showModal ? <PartnerSignIn setShowModal={setShowModal} /> : null}
    </div>
  );
};

export default Footer;
