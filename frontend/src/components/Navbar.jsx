import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

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
          headers: { Authorization: `Bearer ${token}` }
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
    <nav className="flex justify-between pt-4 px-20 items-center relative">
      <Link to={'/'} className="text-xl font-bold">Airbnb Clone</Link>

      {/* <div className="text-[18px] space-x-4">
        <Link to="/" className="hover:border px-4 p-1 rounded-3xl">Home</Link>
        <Link to="/experience" className="hover:border px-4 p-1 rounded-3xl">Experience</Link>
      </div> */}

      <div className="flex items-center gap-6">
        {/* Separate "Host your place" */}
        <Link to={'/host'} className="px-4 py-2 hover:bg-gray-100 rounded-full border border-gray-300">
          Host your place
        </Link>

        <div className="border border-gray-200 rounded-full flex items-center bg-white shadow-lg gap-4 p-2 cursor-pointer relative">
          <RxHamburgerMenu className="text-gray-900 transition ease-in" onClick={toggleLogin} />

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{user.name}</span>
              <Link to={'/profile'}><CiUser className=" rounded-full text-2xl bg-gray-200 p-1" /></Link>
            </div>
          ) : (
            <CiUser className="text-2xl" />
          )}

          {logg && (
            <div className="absolute right-0 top-12 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
              <div className="flex flex-col">
                {user ? (
                  <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 hover:bg-gray-100 text-left">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="px-4 py-2 hover:bg-gray-100">
                    Login
                  </Link>
                )}
                <Link to="/register" className="px-4 py-2 hover:bg-gray-100">Register</Link>
               </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
