import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../Context/Songs.jsx";
import Albumitems from "../components/Albumitems.jsx";
import SongItem from "../components/SongItem.jsx";

function Home() {
  const { songs, albums } = SongData();

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((e, i) => (
            <Albumitems
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songs.map((e, i) => (
            <SongItem
              key={i}
              image={e.thumbnail.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
