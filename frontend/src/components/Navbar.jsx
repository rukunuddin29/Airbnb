import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaAirbnb } from "react-icons/fa";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [logg, setLogg] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get("http://localhost:5000/get-user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const toggleLogin = () => setLogg((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center pt-4 px-4 sm:px-6 md:px-12 lg:px-20 relative">
      <Link to="/" className="text-lg sm:text-xl font-bold flex justify-center items-center gap-1"><span className="text-rose-500 text-2xl
      "><FaAirbnb /></span>Airbnb</Link>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Host your place button */}
        <Link
          to="/host"
          className=" sm:inline-block px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-gray-100 rounded-full border border-gray-300"
        >
          Host your place
        </Link>

        {/* Profile & Hamburger */}
        <div className="border border-gray-200 rounded-full flex items-center bg-white shadow-lg gap-2 sm:gap-4 p-2 cursor-pointer relative">
          <RxHamburgerMenu
            className="text-gray-900 text-lg sm:text-xl transition ease-in"
            onClick={toggleLogin}
          />

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
              <Link to="/profile">
                <CiUser className="rounded-full text-xl sm:text-2xl bg-gray-200 p-1" />
              </Link>
            </div>
          ) : (
            <CiUser className="text-xl sm:text-2xl" />
          )}

          {logg && (
            <div className="absolute right-0 top-12 mt-2 w-36 sm:w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
              <div className="flex flex-col text-sm sm:text-base">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="px-4 py-2 hover:bg-gray-100">
                    Login
                  </Link>
                )}
                <Link to="/register" className="px-4 py-2 hover:bg-gray-100">
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
