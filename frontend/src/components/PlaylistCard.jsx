 import React from 'react'
import {FaMusic} from "react-icons/fa"
import { useAuth } from '../Context/Authprovider'
function PlaylistCard() {
    const [authUser] = useAuth();
    
  return (
    <div className='flex items-center p-4 rounded-lg shadow-md cursor-pointer
     hover:bg-[#ffffff26]'>
        <div className='w-10 h-10 bg-gray-600 flex items-center justify-center rounded-md'>
            <FaMusic className='text-white text-xl'></FaMusic>
        </div>
        <div className="ml-4">
            <h2>My Playlist</h2>
            <p className='text-gray-400 text-sm'>
                Playlist • <span>{authUser.name}</span>
            </p>
        </div>
     </div>
  )
}

export default PlaylistCard