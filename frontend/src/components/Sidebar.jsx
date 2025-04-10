import React from "react";
import { assets } from "../assets/assets";
import {useNavigate} from "react-router-dom"
import PlaylistCard from "./PlaylistCard";
import { useAuth } from "../Context/Authprovider";
function Sidebar() {

    const navigate = useNavigate();
    const [authUser] = useAuth();

  return (
    // <div className='w-[25%] h-full p-2 flex-col gap-2
    //  text-white hidden lg:flex'>Sidebar</div>
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[14%] rounded flex flex-col justify-around">
        
        <div className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={()=>navigate("/")}>
          <img src={assets.home_icon} className="w-6" alt="" />
          <p className="fond-bold">Home</p>
        </div>
        
        <div className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={()=>navigate("/")}>
          <img src={assets.search_icon} className="w-6" alt="" />
          <p className="fond-bold">Search</p>
        </div>
      </div>

        <div className="bg-[#121212] h-[84%]  rounded mt-3">
            <div className="p-4 flex items-center justify-between">
                <div className=" flex items-center gap-3">
                    <img src={assets.stack_icon} className="w-8" alt="" />
                    <p className="font-semibold">Your Library</p>
                </div>
                <div className=" flex items-center gap-3">
                    <img src={assets.arrow_icon} className="w-8" alt="" />
                    <img src={assets.plus_icon} className="w-8" alt="" />
                    
                </div>
            </div>

            <div onClick={()=>navigate("/playlist")}>
                <PlaylistCard/>
            </div>

            <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4mt-4">
              <h1>Let's findsome podcast to follow </h1>
              <p className="font-light">we'll keep you update on new episode</p>
              <button className="px-4 py-1.5 bg-white text-black text-14px rounded-full mt-4">Browse Podcast</button>
            </div>

            {authUser && authUser.role === "admin" && (
              <button onClick={()=>navigate("/admin")} className="px-4 py-1.5 bg-white text-black text-14px rounded-full mt-4">Admin DashBoard</button>
              
            )}
        </div>
    </div>
  );
}

export default Sidebar;
