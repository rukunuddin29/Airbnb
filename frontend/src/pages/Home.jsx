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

      <div className="px-4 sm:px-8 md:px-16 lg:px-20 my-6">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(properties) && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <Link to={`/property/${property._id}`} key={property._id}>
                <div className="relative flex flex-col h-full bg-white shadow-sm border border-slate-200 rounded-lg hover:shadow-lg transition duration-300">
                  {/* Image Section */}
                  <div className="relative h-56 sm:h-60 overflow-hidden m-2.5 rounded-md">
                    <img
                      src={property.images?.[0] || "https://via.placeholder.com/300x200"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <h6 className="text-slate-800 text-lg sm:text-xl font-semibold">
                        {property.title}
                      </h6>
                      <div className="flex items-center ml-auto">
                        <span className="text-slate-600 ml-1.5 text-sm">⭐ 4.8</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-normal font-light line-clamp-2">
                      {property.description}
                    </p>
                    <p className="mt-3 text-base sm:text-lg font-bold text-gray-700">
                      ${property.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-sm animate-pulse">
  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
  <div className="flex gap-2">
    <div className="h-8 w-20 bg-gray-300 rounded"></div>
    <div className="h-8 w-20 bg-gray-300 rounded"></div>
  </div>
</div>

        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
