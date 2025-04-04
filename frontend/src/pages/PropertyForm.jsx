import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddForm from "../components/AddForm";

function PropertyForm() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setShowPopup(true);
      }
    }, []);
  
    const handleLoginRedirect = () => {
      navigate("/login");  // Navigate to the login page
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
      navigate("/");  // Redirect to home or another page if closed
    };
  return (
   <>
      {isAuthenticated ? (
        <AddForm />
      ) : (
        showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Login Required</h2>
              <p>You need to log in to add a property.</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleClosePopup}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )
      )}
   </>
  )
}

export default PropertyForm