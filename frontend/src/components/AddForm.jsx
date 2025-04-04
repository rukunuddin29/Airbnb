import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    country: "",
    categories: "",
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    description: "",
    price: "",
    images: "",          // Updated: images as comma-separated string
    checkin: "",
    checkout: "",
    maxGuest: 1,         // Added maxGuest field
    perks: "",
    extrainfo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
  
      if (!token ) {
        alert("You need to log in first.");
        return;  // ✅ Removed redirection to login
      }
  
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        maxGuest: Number(formData.maxGuest),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        beds: Number(formData.beds),
        images: formData.images.split(",").map((img) => img.trim()),
        userId: userId, 
      };
  
      await axios.post("http://localhost:5000/api/properties", propertyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Property added successfully!");
      navigate("/host");  // Redirect to host page after success
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700">Categories</label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-gray-700">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-gray-700">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Beds */}
          <div>
            <label className="block text-gray-700">Beds</label>
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700">Price (INR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700">Image URLs (comma separated)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Max Guest */}
          <div>
            <label className="block text-gray-700">Max Guests</label>
            <input
              type="number"
              name="maxGuest"
              value={formData.maxGuest}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">perks</label>
            <input
              type="text"
              name="perks"
              value={formData.perks}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Max Guests</label>
            <input
              type="text"
              name="extrainfo"
              value={formData.extrainfo}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;