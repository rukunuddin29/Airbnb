import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md"; 

const Host = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized access. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/properties/my-properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch host properties:", error);
        setError("Failed to load your properties.");
      }
    };

    fetchHostProperties();
  }, []);

  // ➤ Function to handle property deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token for authentication
        },
      });

      // Remove the deleted property from the list
      setProperties((prev) => prev.filter((property) => property._id !== id));
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error.response?.data?.message || error.message);
      alert("Failed to delete property.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>

      {error && <p className="text-red-500">{error}</p>}

      {Array.isArray(properties) && properties.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="relative flex flex-col md:flex-row w-full bg-white shadow-sm border border-slate-200 rounded-lg transition-all hover:shadow-md"
            >
              {/* Image Section */}
              <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                <img
                  src={property.images?.[0] || "https://via.placeholder.com/300x200"}
                  alt={property.title}
                  className="h-full w-full rounded-md md:rounded-lg object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 text-xs text-white w-20 text-center">
                    {property.status || "ACTIVE"}
                  </div>

                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {property.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-2">
                    {property.location}
                  </p>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4 border-b border-dotted border-slate-300 pb-2">
  {property.description?.split(" ").slice(0, 30).join(" ") + " ..."}
</p>


                  <p className="text-lg font-bold text-teal-700">
                    ${property.price}
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between items-center mt-6">
                  <Link
                    to={`/details/${property._id}`}
                    className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
                  >
                    Learn More
                    <FiArrowRight className="ml-2" />
                  </Link>

                  <div className="flex gap-4">
                    {/* Edit Button */}
                    <Link
                      to={`/edit/${property._id}`}
                      className="flex items-center bg-yellow-500 text-white px-4 py-1.5 rounded-md hover:bg-yellow-600 transition-all"
                    >
                      <MdOutlineModeEdit className="mr-1" />
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="flex items-center bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-all"
                    >
                      <MdDelete className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default Host;
