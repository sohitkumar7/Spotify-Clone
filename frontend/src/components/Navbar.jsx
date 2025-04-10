import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      console.log("inlogout handler");
      await axios.post("api/user/logout");
      localStorage.removeItem("spotify");
      window.location.reload();
      toast.success("logout Successfully");
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            src={assets.arrow_left}
            className="w-8 bg-black p-2 rounded-2xl"
            alt=""
          />
          <img
            onClick={() => navigate(+1)}
            src={assets.arrow_right}
            className="w-8 bg-black p-2 rounded-2xl"
            alt=""
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-white text-black  text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-white text-black  text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Install App
          </p>
          <p
            onClick={() => logoutHandler()}
            className="bg-white text-black  text-[15px] px-4 py-1 rounded-2xl  cursor-pointer"
          >
            Logout
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">Podcast</p>
        <p onClick={()=>navigate("/playlist")}  className="bg-black px-4 py-1 rounded-2xl cursor-pointer  md:hidden">Playlist</p>

      </div>
    </>
  );
}

export default Navbar;
