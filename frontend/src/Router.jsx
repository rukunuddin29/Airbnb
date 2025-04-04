import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Register from "./pages/Register";
import HotelDetails from "./pages/HotelDetails";
import Profile from "./pages/Profile";
import HostPage from "./pages/HostPage";
import AddForm from "./components/AddForm";
import { UserProvider } from "./context/UserContext";


const Router = () => {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/property/:id" element={<HotelDetails />} />
        <Route path="/profile/:subpage?" element={<Profile />} />
        <Route path="/profile/:subpage/:action" element={<Profile />} />
        <Route path="/host/addform" element={<AddForm />} />
        
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
};

export default Router;
