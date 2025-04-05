import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Booking from "../components/Booking";

const HotelDetails = () => {
  const { id } = useParams();
  const { properties } = useUserContext();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const selectedProperty = properties.find((item) => item._id === id);
    setProperty(selectedProperty);
  }, [id, properties]);

  if (!property) {
    return <p className="text-center text-gray-500 mt-6">Property not found.</p>;
  }

  const perksArray = property.perks?.split(", ") || [];

  return (
    <>
      <Navbar />
      <div className="p-8 mx-20">
        <h1 className="text-3xl font-bold">{property.title}</h1>

        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row py-6 gap-3">
          {/* Left - Main Image */}
          <img
            src={property.images?.[0] || "/default-image.jpg"}
            alt={property.title}
            className="w-full md:w-1/2 h-108 rounded-l-3xl pb-1 object-cover"
          />

          {/* Right - Grid of Images */}
          <div className="grid grid-cols-2 gap-2 w-full md:w-1/2">
            {property.images?.slice(1, 5).map((image, index) => (
              <img
                key={index}
                className="object-cover object-center h-52 w-full"
                src={image}
                alt={`Hotel View ${index + 2}`}
              />
            ))}
          </div>
        </div>

        {/* Property Info and Booking Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left - Property Details */}
          <div className="w-full md:w-[70%]">
            <p className="flex items-center text-2xl font-semibold text-gray-800">
              {property.categories} in {property.city}, {property.country}
            </p>
            <p>
              {property.maxGuest} guests・{property.bedrooms} bedrooms・
              {property.beds} bed・{property.bathrooms} bathrooms
            </p>
            <hr className="my-4 text-gray-200" />

            <div className="flex items-center space-x-2">
              <p className="border rounded-full w-10 h-10 flex items-center justify-center bg-black text-white">
                R
              </p>
              <p className="text-black text-xl">Hosted by Rukunuddin</p>
            </div>
            <hr className="my-4 text-gray-200" />

            <h2 className="text-2xl font-semibold pb-2">What this place offers</h2>
            <div className="flex flex-wrap gap-2">
              {perksArray.map((perk, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                >
                  <IoMdCheckmarkCircleOutline className="text-xl text-green-600" />
                  <span className="text-lg">{perk}</span>
                </div>
              ))}
            </div>
            <hr className="my-4 text-gray-200" />

            <h2 className="text-2xl font-semibold pb-2">About</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {property.description}
            </p>
            <hr className="my-4 text-gray-200" />

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold pb-2">Where You'll Sleep</h2>
              <div className="relative">
                <img
                  src="abc.png"
                  alt="Living Room"
                  className="border h-52 w-80 rounded-2xl object-cover shadow-md"
                />
              </div>
              <h2 className="text-xl font-medium">Living Room</h2>
              <p className="text-gray-600">
                {property.bedrooms} bedrooms · {property.beds} beds
              </p>
            </div>

            <hr className="my-4 text-gray-200" />
            <h2 className="text-2xl font-semibold pb-2 pt-6">Extra Info</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {property.extrainfo}
            </p>
          </div>

          {/* Right - Booking Card */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
            <div className="sticky top-6">
            <Booking propertyId={property._id} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetails;
