import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Host from "../components/Host";

const HostPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowPopup(true);
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Navbar Section */}
      <nav className="flex justify-between items-center mb-6">
       <Link to={"/"}> <h1 className="text-2xl font-bold" >Airbnb Host</h1></Link>
        
        {isAuthenticated && (
          <Link to="/host/addform">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              + Add Property
            </button>
          </Link>
        )}
      </nav>

      {/* Hotel List Section */}
      {isAuthenticated ? (
        <div className="mt-8">
          <Host />
        </div>
      ) : (
        showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Login Required</h2>
              <p>You need to log in to add a property.</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleClosePopup}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HostPage;
