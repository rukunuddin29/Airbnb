import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { RiContactsLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

function Profile() {
  const { subpage = "account" } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  function linkClasses(type) {
    let classes = "py-2 px-6 text-center cursor-pointer";
    if (type === subpage) {
      classes += " bg-rose-500 text-white rounded-full";
    }
    return classes;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login first");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/get-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading...</p>
        </div>
      </>
    );
  }
  

  return (
    <>
      <Navbar />
      <div>
        {/* Navigation Links */}
        <nav className="w-full flex mt-5 justify-center gap-4">
          <Link to="/profile/account" className={linkClasses("account")}>
            My Profile
          </Link>
          <Link to="/profile/booking" className={linkClasses("booking")}>
            My Booking
          </Link>
        </nav>

        {/* Conditional Rendering */}
        {subpage === "account" && (
          <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-5xl w-full gap-16 bg-white rounded-lg p-10">
              {/* Left Side - Initials */}
              <div className="border bg-black text-white rounded-full h-64 w-64 flex items-center justify-center mx-auto">
                <h1 className="text-5xl font-bold">{getInitials(user.name)}</h1>
              </div>

              {/* Right Side - Name & Email */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-center">
                  <RiContactsLine className="text-2xl text-gray-700" />
                  <span className="text-lg font-semibold text-gray-800">Name:</span>
                  <span className="text-lg text-gray-600">{user.name}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <MdOutlineEmail className="text-2xl text-gray-700" />
                  <span className="text-lg font-semibold text-gray-800">Email:</span>
                  <span className="text-lg text-gray-600">{user.email}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-4 w-[50%] bg-gray-200 hover:text-white py-3 rounded-lg transition hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {subpage === "booking" && (
          <div className="min-h-[60vh] flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-800">This is your booking section</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
