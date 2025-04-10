import React, { useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";

const SongItem = ({ image, name, desc, id }) => {


  const [save,setsave] = useState(false);
  
  const savetoPlaylist = () => {
    setsave(!save);
  }

  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img src={image} alt="" className="rounded w-[160px] " />
        <div className="flex gap-2">
          <button
            className="absolute bottom-2 right-14 bg-green-500 
            text-black p-3 rounded-full opacity-0 
            group-hover:opacity-100 transform-opacity duration-300"
          >
            <FaPlay />
          </button>
          
          <button
            className="absolute bottom-2 right-2 bg-green-500 
            text-black p-3 rounded-full opacity-0 
            group-hover:opacity-100 transform-opacity duration-300"
            onClick={savetoPlaylist}
          >
            {save?<FaBookmark/> : <FaRegBookmark/> }
          </button>

        </div>
      </div>

      <p className="font-bold mt-2 mb-1 ">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
