"use client"
import { CircleMinus, CirclePlus } from "lucide-react";
import React, { useState } from "react";


function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="mb-2">
        <div
          className={`  border-[#ddd] border-0 h-10 py-2 cursor-pointer ${
            isActive
              ? " bg-[#2b2e34] text-[#fff]"
              : "bg-[#f5f5f5] text-[#2b2e34]"
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          <div className="px-3 flex justify-between">
            {" "}
            <span
              className={` text-sm sm:text-base font-[600] tracking-wide font-spectral italic`}
            >
              {title}
            </span>
            <span className="px-3 pt-1">
              {" "}
              {isActive ? (
                
                <CircleMinus  
                  size={20}
                  className={`${
                    isActive ? "text-[#fff]" : "text-[#2b2e34]"
                  } "text-[#2b2e34]"`}
                />
              ) : (
                <CirclePlus 
                  size={20}
                  className={`${
                    isActive ? "text-[#fff]" : "text-[#2b2e34]"
                  } text-[#2b2e34]`}
                />
              )}{" "}
            </span>{" "}
          </div>
        </div>
        {isActive && <div className="p-2 text-sm sm:text-sm  border-2">{content}</div>}
      </div>
    </>
  );
}

export default Accordion;
