import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/Footer";

function Home() {
  const { properties, error, loading } = useUserContext();

  return (
    <>
      <Navbar />
      <Search />

      <div className="px-20 my-6">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(properties) && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Link to={`/property/${property._id}`} key={property._id}>
                <div className="relative flex flex-col h-95 bg-white shadow-sm border border-slate-200 rounded-lg hover:shadow-lg transition duration-300">
                  {/* Image Section */}
                  <div className="relative h-56 m-2.5 overflow-hidden rounded-md">
                    <img
                      src={property.images || "https://via.placeholder.com/300x200"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <h6 className="text-slate-800 text-xl font-semibold">
                        {property.title}
                      </h6>
                      <div className="flex items-center ml-auto">
                        <span className="text-slate-600 ml-1.5">⭐ 4.8</span>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-normal font-light line-clamp-2">
                      {property.description}
                    </p>
                    <p className="mt-3 text-lg font-bold text-gray-700">
                      ${property.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No properties found.</p>
        )}
      </div>

      <Footer/>
    </>
  );
}

export default Home;
