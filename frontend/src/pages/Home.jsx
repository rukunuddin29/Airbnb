import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/Footer";
import { CiHeart } from "react-icons/ci";


function Home() {
  const { properties, error, loading } = useUserContext();

  return (
    <>
      <Navbar />
      <Search />

      <div className="px-4 sm:px-8 md:px-16 lg:px-20 my-6">
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {Array.isArray(properties) && properties.length > 0 ? (
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Link to={`/property/${property._id}`} key={property._id}>
                <div className="relative flex flex-col h-full  rounded-lg transition duration-300">
                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-md h-[300px] sm:h-[250px] md:h-[280px] lg:h-[300px]">
                    {/* Heart Button */}
                    {/* <button className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white">
                    <CiHeart />

                    </button> */}

                    {/* Image */}
                    <img
                      src={
                        property.images?.[0] ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="py-2">
                    <div className="flex items-center mb-1">
                      <h6 className="text-slate-800 text-sm sm:text-base font-semibold truncate max-w-[80%]">
                        {property.title}
                      </h6>
                      <div className="flex items-center ml-auto text-yellow-500 text-xs sm:text-sm">
                        <span className="ml-1.5 font-medium text-slate-600">
                          ⭐ 4.8
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light line-clamp-2">
                      {property.description}
                    </p>

                    <p className="mt-2 text-sm sm:text-base font-semibold text-gray-800">
                      ₹{property.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center border-gray-100 gap-6 mt-10">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="w-full sm:w-[320px] p-4 rounded-xl animate-pulse bg-white shadow"
              >
                <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
