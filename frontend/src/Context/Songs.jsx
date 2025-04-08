import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setloading] = useState(false);
  const [songLoading, setsongLoading] = useState(false);
  const [albums, setalbums] = useState([]);

  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/song/all");
      setSongs(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addAlbum(formData,setdescription,settitle,setfile) {
    setloading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formData);
      toast.success(data.message);
      setloading(false);
      fetchAlbums();
      settitle("");
      setdescription("")
      setfile()
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  }

  async function addsong(formData,setdescription,settitle,setfile,setsinger,setalbum) {
    setloading(true);
    try {
      const { data } = await axios.post("/api/song/new", formData);
      toast.success(data.message);
      setloading(false);
      fetchSongs();
      settitle("");
      setdescription("")
      setfile()
      setsinger("")
      setalbum()
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  }

  async function addthumbnail(id,formData,setfile) {
    // setloading(true);
    try {
      const { data } = await axios.post("/api/song/"+id, formData);
      toast.success(data.message);
      fetchSongs()
      setloading(false);
      setfile()
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
        const {data} = await axios.delete("/api/song/"+id)
        toast.success(data.message);
        fetchSongs();
    } catch (error) {
        toast.error(error.response.data.message)
    }    
  }

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <SongContext.Provider
      value={{ addAlbum, albums, deleteSong, loading, songLoading,addthumbnail, addsong,songs }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
