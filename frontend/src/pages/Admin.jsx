import React, { useState } from "react";
import { useAuth } from "../Context/Authprovider.jsx";
import { Link, Navigate } from "react-router-dom";
import { SongData } from "../Context/Songs.jsx";
import { MdDelete } from "react-icons/md";
function Admin() {
  const [authUser, setAuthUser] = useAuth();
  const { albums,songs,addAlbum,loading,addsong,addthumbnail,deleteSong} = SongData();

//   console.log("all albums", albums);
  if (authUser.role === "user") {
    return <Navigate to="/" />;
  }

  const [title,settitle] = useState("");
  const [description,setdescription] = useState("");
  const [singer,setsinger] = useState("");
  const [file,setfile] = useState();
  const [album,setalbum] = useState("");

  
  const fileChangeHandle = (e)=>{
    console.log(e.target.files)
    const file = e.target.files[0];
    setfile(file)
  }



  const addAlbumHandler = (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append ("title",title)
    formData.append ("file",file)
    formData.append ("description",description)

    addAlbum(formData,setdescription,settitle,setfile)

  }


  const addSongHandler = (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append ("title",title)
    formData.append ("file",file)
    formData.append ("description",description)
    formData.append ("singer",singer)
    formData.append ("album",album)

    addsong(formData,setdescription,settitle,setfile,setsinger,setalbum)

  }


const addThumbnailHandler = (id) =>{
    const formData = new FormData();
    formData.append("file",file);
    addthumbnail(id,formData,setfile);
}

const deleteHandler = (id) => {
    console.log("song id " ,id);
    if(confirm("Are yoy Sure you want to delete this Song "))
    deleteSong(id);
}



  return (
    <div className="min-h-screen bg[#212121] text-white p-8">
      
      {/* link to go to home page */}

      <Link
        to="/"
        className="bg-green-500 text-white font-bold 
            py-2 px-4 rounded-full"
      >
        Go to Home page
      </Link>
    
    {/* First for to add Album */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
      <form  onSubmit={addAlbumHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg ">
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="title"
            className="auth-input"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="auth-input"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={fileChangeHandle}
            className="auth-input"
            required
          />
        </div>

        <button disabled={loading}  className="auth-btn" style={{ width: "100px" }}>
          {loading? "please Wait...." : "Add"}
        </button>
      </form>



      {/* Second Form to add Song */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>
      <form onSubmit={addSongHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg ">
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="title"
            className="auth-input"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="auth-input"
            required
              value={description}
              onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Singer</label>
          <input
            type="text"
            placeholder="Singer"
            className="auth-input"
            required
            value={singer}
            onChange={(e) => setsinger(e.target.value)}
          />
        </div>

        <select className="auth-input" value={album} onChange={(e) => setalbum(e.target.value)}>
          <option value="">Choose Album</option>
          {albums &&
            albums.map((e, i) => (
              <option value={e._id} key={i}>
                {e.title}
              </option>
            ))}
        </select>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Audio</label>
          <input
            type="file"
            accept="audio/*"
            onChange={fileChangeHandle}
            className="auth-input"
          />
        </div>

        <button disabled={loading}  className="auth-btn" style={{ width: "100px" }}>
          {loading? "please Wait...." : "Add"}
        </button>

        </form>
        

        {/* div that show all added songs */}

        <div className="mt-8">
          <h3 className=" text-xl font-semibold mb-4">Added Songs</h3>
          <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
            {songs &&
              songs.map((e, i) => (
                <div key={i} className="bg-[#181818] p-4 rounded-lg shadow-md">
                  {e.thumbnail ? (
                    <img className="mr-1 w-42 h-42" src={e.thumbnail.url} />
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <input type="file" onChange={fileChangeHandle} />
                      <button onClick={addThumbnailHandler(e._id)} className="bg-green-500 text-white px-2 py-1 rounded ">
                        Add Thumbnail
                      </button>
                    </div>
                  )}

                  <h4 className="text-lg font-bold" >{e.title}</h4>
                  <h4 className="text-sm text-gray-500" >{e.singer}</h4>
                  <h4 className="text-sm text-gray-500" >{e.description}</h4>
                  
                  <button onClick={()=>deleteHandler(e._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                    <MdDelete/>
                  </button>

                </div>
              ))}
          </div>
        </div>


    </div>
  );
}

export default Admin;
