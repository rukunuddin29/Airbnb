import React, { useState } from 'react';
import { TbBeach, TbBuildingCottage, TbSofa } from "react-icons/tb";
import { PiCityFill } from "react-icons/pi";
import { LuMountainSnow } from "react-icons/lu";
import { GiCampingTent } from "react-icons/gi";
import { MdOutlineForest, MdOutlineCabin } from "react-icons/md";
import { IoBoatOutline, IoFilterOutline } from "react-icons/io5";
import '../index.css';


function Category() {
  const [isTaxIncluded, setIsTaxIncluded] = useState(false);

  const categories = [
    { icon: <TbBeach size={28} className="text-gray-600" />, label: "Beach" },
    { icon: <PiCityFill size={28} className="text-gray-600" />, label: "Top Cities" },
    { icon: <TbBuildingCottage size={28} className="text-gray-600" />, label: "Cottage" },
    { icon: <LuMountainSnow size={28} className="text-gray-600" />, label: "Mountain" },
    { icon: <GiCampingTent size={28} className="text-gray-600" />, label: "Camping" },
    { icon: <MdOutlineForest size={28} className="text-gray-600" />, label: "Forest" },
    { icon: <IoBoatOutline size={28} className="text-gray-600" />, label: "Boat" },
    { icon: <MdOutlineCabin size={28} className="text-gray-600" />, label: "Cabin" },
    { icon: <TbSofa size={28} className="text-gray-600" />, label: "Luxe" },
    { icon: <TbSofa size={28} className="text-gray-600" />, label: "Luxe" },
    { icon: <TbSofa size={28} className="text-gray-600" />, label: "Luxe" },
  ];

  return (
    <div className="w-full bg-white px-3 md:px-20">
      <div className="flex items-center space-x-4 overflow-x-auto px-4 md:px-6 scrollbar-hide-mobile">
        {/* Category Icons */}
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center px-4 rounded-xl hover:bg-gray-100 transition duration-300 cursor-pointer min-w-[80px]"
          >
            {cat.icon}
            <p className="text-sm mt-2 font-medium text-gray-500 text-center">{cat.label}</p>
          </div>
        ))}

        {/* Filter Button */}
        <button className="ml-auto lg:flex hidden items-center gap-2 whitespace-nowrap border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
          <IoFilterOutline className="text-gray-600" size={18} />
          <span>Filter</span>
        </button>

        {/* Tax Toggle */}
        <div className="lg:flex hidden items-center gap-3 border border-gray-300 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-700">Show After Tax</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isTaxIncluded}
              onChange={() => setIsTaxIncluded(!isTaxIncluded)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all relative">
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Category;
