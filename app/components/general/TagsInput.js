"use client";
import React, { useState } from "react";

export default function TagsInput({ tags, setTags, placeholder = "Type and press enter" }) {
  const [input, setInput] = useState("");
  // console.log(tags,"tags....")

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim() !== "") {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput("");
    }
  };

  const handleRemove = (index) => {
    const updated = tags.filter((_, i) => i !== index);
    setTags(updated);
  };

  return (
    <div className="w-full  accent-[#2B2E34] border border-gray-600 focus:border-[#2B2E34]    focus:outline-none  p-1 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-2"
        >
          {tag}
          <button
            onClick={() => handleRemove(index)}
            className="text-red-400 hover:text-red-600 font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 outline-none px-2 py-1"
      />
    </div>
  );
}
