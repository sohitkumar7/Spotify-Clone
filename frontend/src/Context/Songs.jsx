import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setloading] = useState(false);
  const [songLoading, setsongLoading] = useState(false);
  const [albums, setalbums] = useState([]);

  const [isPlaying, setisPlaying] = useState(false);
  const [selectedSong, setselectedSong] = useState();
  const [song, setSong] = useState([]);

  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/song/all");
      setSongs(data);
      setselectedSong(data[0]._id);
      setisPlaying(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSong() {
    try {
      const { data } = await axios.get("api/song/single/" + selectedSong);
      setSong(data);
    } catch (error) {
      console.log(error, "error in fetchSong function");
    }
  }

  async function addAlbum(formData, setdescription, settitle, setfile) {
    setloading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formData);
      toast.success(data.message);
      setloading(false);
      fetchAlbums();
      settitle("");
      setdescription("");
      setfile();
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  }

  async function addsong(
    formData,
    setdescription,
    settitle,
    setfile,
    setsinger,
    setalbum
  ) {
    setloading(true);
    try {
      const { data } = await axios.post("/api/song/new", formData);
      toast.success(data.message);
      setloading(false);
      fetchSongs();
      settitle("");
      setdescription("");
      setfile();
      setsinger("");
      setalbum();
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  }

  async function addthumbnail(id, formData, setfile) {
    // setloading(true);
    try {
      const { data } = await axios.post("/api/song/" + id, formData);
      toast.success(data.message);
      fetchSongs();
      setloading(false);
      setfile();
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  }

  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/song/album/all");
      setalbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/song/" + id);
      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const [index, setindex] = useState(0);

  function nextmusic() {
    if (index === songs.length - 1) {
      setindex(0);
      setselectedSong(songs[0]._id);
    } else {
      setindex(index + 1);
      setselectedSong(songs[index + 1]._id);
    }
  }
  function prevmusic() {
    if (index === 0) {
      setindex(songs.length - 1);
      setselectedSong(songs[songs.length-1]._id);
    } else {
      setindex(index - 1);
      setselectedSong(songs[index - 1]._id);
    }
  }

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <SongContext.Provider
      value={{
        prevmusic,
        nextmusic,
        selectedSong,
        fetchSong,
        song,
        isPlaying,
        setisPlaying,
        setselectedSong,
        addAlbum,
        albums,
        deleteSong,
        loading,
        songLoading,
        addthumbnail,
        addsong,
        songs,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
