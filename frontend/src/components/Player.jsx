import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../Context/Songs";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";

function Player() {
  const {nextmusic,prevmusic, song, fetchSong, selectedSong, isPlaying, setisPlaying } = SongData();

  useEffect(() => {
    fetchSong();
  }, [selectedSong]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setisPlaying(!isPlaying);
  };


  const [volume,setvolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setvolume(newVolume);
    audioRef.current.volume = newVolume;
  }

  const [progress, setprogress] = useState(0);
  const [duration, setduration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => setduration(audio.duration);
    const handleTimeUpdate = () => {
      setprogress(audio.currentTime);
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleprogress = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setprogress(newTime);
  };

  return (
    <div>
      {song && (
        <div
          className="h-[10%] bg-black flex justify-between items-center
                text-white px-4"
        >
          <div className="lg:flex items-centergap-4">
            <img
              className="w-12"
              src={
                song.thumbnail
                  ? song.thumbnail.url
                  : "https://via.placeholder.com/50"
              }
              alt=""
            />
            <div className="hidden md:block">
              <p className="pl-2">{song.title}</p>
              <p className="pl-2">
                {song.description && song.description.slice(0, 30)}...
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 m-auto">
            {song && song.audio && (
              <>
                {isPlaying ? (
                  <audio ref={audioRef} src={song.audio.url} autoPlay></audio>
                ) : (
                  <audio ref={audioRef} src={song.audio.url}></audio>
                )}
              </>
            )}
            <div className="w-full flex items-center font-thin text-green-400">
              <input
                type="range"
                min={"0"}
                max={"100"}
                className="progress-bar w-[120px] md:w-[300px]"
                value={duration ? (progress / duration) * 100 : 0}
                onChange={handleprogress}
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <span className="cursor-pointer" onClick={prevmusic}>
                <GrChapterPrevious />
              </span>
              <button
                onClick={handlePlayPause}
                className="bg-white text-black rounded-full p-2"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <span className="cursor-pointer" onClick={nextmusic}>
                <GrChapterNext />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32 "
              min={"0"}
              max={"1"}
              step={"0.01"}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
