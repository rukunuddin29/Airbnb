import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-4 pt-4 sm:px-6 md:px-12 lg:px-20 bg-white relative z-20">
      {/* Logo */}
      <Link to="/" className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
        Airbnb Clone
      </Link>

      {/* Navigation Items */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Host Link */}
        <Link
          to="/host"
          className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors duration-200"
        >
          Host your place
        </Link>

        {/* Profile & Menu Button */}
        <div className="relative">
          <div
            className="flex items-center gap-2 sm:gap-3 p-2 border border-gray-200 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={toggleMenu}
          >
            <RxHamburgerMenu className="text-gray-700 w-5 h-5" />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800 hidden md:inline">
                  {user.name}
                </span>
                <Link to="/profile" onClick={(e) => e.stopPropagation()}>
                  <CiUser className="w-7 h-7 p-1 bg-gray-100 rounded-full text-gray-700" />
                </Link>
              </div>
            ) : (
              <CiUser className="w-7 h-7 text-gray-700" />
            )}
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
              <div className="flex flex-col text-sm">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 text-left transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
                <Link
                  to="/host"
                  className="sm:hidden px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Host your place
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