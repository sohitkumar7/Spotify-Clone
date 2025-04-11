import React, { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { useAuth } from "../Context/Authprovider";
import axios from "axios";
import toast from "react-hot-toast";
import { SongData } from "../Context/Songs";

const SongItem = ({ image, name, desc, id }) => {
  const [save, setsave] = useState(false);
  const [authUser, setAuthUser] = useAuth();
  const playlist = authUser.playlist;
  const {isPlaying,setisPlaying,setselectedSong } = SongData();


  const addtoplaylist = async (id) => {
    try {
      const response = await axios.post("/api/user/song/" + id);
      toast.success(response.data.message);

      let updatedUser

      if(response.data.message == "Added to Playlist"){
         updatedUser = {
          ...authUser,
          playlist: [...(authUser.playlist || []), id],
        };
      }else{
        updatedUser = {
          ...authUser,
          playlist: authUser.playlist.filter((songid) => songid !== id),
        };
        
      }

      setAuthUser(updatedUser);
      localStorage.setItem("spotify", JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    // console.log(playlist);

    if (playlist && playlist.includes(id)) {
      setsave(true);
    }
  }, [authUser]);

  const savetoPlaylist = () => {
    setsave(!save);
    addtoplaylist(id);
  };

  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img src={image} alt="" className="rounded w-[160px] " />
        <div className="flex gap-2">
          <button
            onClick={()=>{
              setselectedSong(id),setisPlaying(true)}
            }
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
            {save ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>

      <p className="font-bold mt-2 mb-1 ">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
