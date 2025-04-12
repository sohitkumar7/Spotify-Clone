import React, { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { SongData } from "../Context/Songs.jsx";
import { useAuth } from "../Context/Authprovider.jsx";
import { assets } from "../assets/assets.js";
import { FaBookmark, FaPlay } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function Playlist() {
  const { songs, setselectedSong, setisPlaying } = SongData();
  const [myPlaylist, setmyPlaylist] = useState([]);
  const [authUser, setAuthUser] = useAuth();
  const [save, setsave] = useState(false);
  const playlist = authUser.playlist;

  useEffect(() => {
    if (songs && authUser && Array.isArray(authUser.playlist)) {
      const filteredSongs = songs.filter((e) =>
        authUser.playlist.includes(e._id.toString())
      );
      setmyPlaylist(filteredSongs);
    }
  }, [songs, authUser]);

  const onClickHandler = (id) => {
    setisPlaying(true);
    setselectedSong(id);
  };


  
  const addtoplaylist = async (id) => {
    try {
      const response = await axios.post("/api/user/song/" + id);
      toast.success(response.data.message);

      let updatedUser;

      if (response.data.message == "Added to Playlist") {
        updatedUser = {
          ...authUser,
          playlist: [...(authUser.playlist || []), id],
        };
      } else {
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

  // useEffect(() => {
  //   // console.log(playlist);

  //   if (playlist && playlist.includes(id)) {
  //     setsave(true);
  //   }
  // }, [authUser]);

  const savetoPlaylist = (id) => {
    setsave(!save);
    addtoplaylist(id);
  };

  return (
    <Layout>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        {myPlaylist && myPlaylist[0] ? (
          <img
            className="w-48 rounded"
            src={myPlaylist[0].thumbnail.url}
            alt=""
          />
        ) : (
          <img
            className="w-48 rounded"
            src="https://via.placeholder.com/250"
            alt=""
          />
        )}

        <div className="flex flex-col ">
          <p>Playlist</p>
          <h2 className=" text-3xl font-bold mb-4 md:text-5xl">
            {authUser.name} Playlist
          </h2>
          <h4>Your Favourite Songs</h4>
          <p className="mt-1">
            <img
              className="inline-block w-6"
              src={assets.spotify_logo}
              alt=""
            />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Artist</p>
        <p className="hidden sm:block">Description</p>
        <p className="text-center ">Action</p>
      </div>

      <hr />
      {myPlaylist &&
        myPlaylist.map((e, i) => (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            key={i}
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
              <img className="inline w-10 mr-5" src={e.thumbnail.url} alt="" />
              {e.title}
            </p>
            <p className="text-[15px]">{e.singer}</p>
            <p className="text-[15px] hidden sm:block">
              {e.description.slice(0, 20)}...
            </p>
            <p className="flex items-center justify-center gap-5">
              <p
                className="text-[15px] text-center"
                onClick={() => savetoPlaylist(e._id)}
              >
                <FaBookmark></FaBookmark>
              </p>
              <p
                className="text-[15px] text-center"
                onClick={() => onClickHandler(e._id)}
              >
                <FaPlay></FaPlay>
              </p>
            </p>
          </div>
        ))}
    </Layout>
  );
}

export default Playlist;
