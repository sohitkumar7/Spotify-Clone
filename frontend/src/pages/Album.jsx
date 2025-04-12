import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../Context/Songs";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/Authprovider";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

function Album() {
  const {
    fetchAlbumSong,
    albumSong,
    albumdata,
    setselectedSong,
    setisPlaying,
  } = SongData();
  
  const params = useParams();

  const [authUser, setAuthUser] = useAuth();
  const [save, setsave] = useState(false);
  const playlist = authUser.playlist;

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id]);

  const onClickHandler = (id) => {
    setselectedSong(id);
    setisPlaying(true);
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

  const savetoPlaylist = (id) => {
    setsave(!save);
    addtoplaylist(id);
  };

  return (
    <Layout>
      {albumdata && (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            {albumdata.thumbnail && (
              <img
                className="w-48 rounded"
                src={albumdata.thumbnail.url}
                alt=""
              />
            )}

            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumdata.title} PlayList
              </h2>
              <h4>{albumdata.description}</h4>
              <p className="mt-1">
                <img
                  src={assets.spotify_logo}
                  className="inline-block w-6"
                  alt=""
                />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p>
              <b className="mr-4">#</b>
            </p>
            <p>Artist</p>
            <p className="hidden sm:block">Description</p>
            <p className="text-center">Actions</p>
          </div>

          <hr />
          {albumSong &&
            albumSong.map((e, i) => (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                key={i}
              >
                <p className="text-white">
                  <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                  <img
                    src={e.thumbnail.url}
                    className="inline w-10 mr-5"
                    alt=""
                  />
                  {e.title}
                </p>
                <p className="text-[15px]">{e.singer}</p>
                <p className="text-[15px] hidden sm:block">
                  {e.description.slice(0, 20)}...
                </p>
                <p className="flex justify-center items-center gap-5">
                  <p
                    className="text-[15px] text-center"
                    onClick={() => savetoPlaylist(e._id)}
                  >
                    <FaBookmark />
                  </p>
                  <p
                    className="text-[15px] text-center"
                    onClick={() => onClickHandler(e._id)}
                  >
                    <FaPlay />
                  </p>
                </p>
              </div>
            ))}
        </>
      )}
    </Layout>
  );
}

export default Album;
