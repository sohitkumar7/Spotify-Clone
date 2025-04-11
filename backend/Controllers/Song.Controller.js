import { Album } from "../models/Album.model.js"
import { Song } from "../models/song.model.js";
import getDataurl from "../utilis/urlGenerater.js"
// import cloudinary from "cloudinary"
import { v2 as cloudinary } from 'cloudinary';

export const createAlbum = async(req,res) =>{

    try {
        
        if(req.user.role =="user"){
            return res.status(403).json({
                message:"you are not admin"
            })
        }

        const {title,description} = req.body
        const file = req.file

        const fileUrl = getDataurl(file);
        const cloud = await cloudinary.uploader.upload(fileUrl.content);

        await Album.create({
            title,
            description,
            thumbnail:{
                id:cloud.public_id,
                url:cloud.secure_url,
            }
        });
        

        res.json({
            message:"Album Added"
        })

    } catch (error) {
        console.log(error)
    }
} 

export const getAllAblums = async(req,res) => {
    try {
        
        const albums = await Album.find()
        res.status(201).json(albums);

    } catch (error) {
        console.log(error);
    }
}

export const addSong = async(req,res) => {
    try {
        
        if(req.user.role =="user"){
            return res.status(403).json({
                message:"you are not admin"
            })
        }

        const {title,description,singer,album} = req.body
        
        const file = req.file

        if (!file) {
            return res.status(400).json({ message: "Audio file is required" });
        }
        
        
        const audioUrl = getDataurl(file);
        const audioCloud = await cloudinary.uploader.upload(audioUrl.content, {
            resource_type: "video",
        });
        
        await Song.create({
            title,
            description,
            singer,
            album,
            audio: {
                id: audioCloud.public_id,
                url: audioCloud.secure_url,
            },
        });

        res.status(201).json({
            message:"Song Added"
        })

    } catch (error) {
        console.log("ERROR in add song",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addThumbnail = async(req,res) => {
    try {
        if(req.user.role ==="user"){
            return res.status(403).json({
                message:"you are not admin"
            })
        }

        const {title,description} = req.body
        const file = req.file

        const fileUrl = getDataurl(file);
        const cloud = await cloudinary.uploader.upload(fileUrl.content);


        await Song.findByIdAndUpdate(req.params.id,{
            thumbnail:{
                id: cloud.public_id,
                url: cloud.secure_url
            },
        },
            {new:true}
        )

        res.status(201).json({
            message:"thumbnail added",
        })

    } catch (error) {
        console.log("error in thumbnail adding",error);
    }
}


export const getAllSongs = async(req,res) => {
    try {
        const songs = await Song.find();
        res.status(201).json(songs);
    } catch (error) {   
        console.log("error in getALLSongs", error);
    }
}

export const getALLSongsbyAlbum = async(req,res) => {
    try {
        const album = await Album.findById(req.params.id)
        const songs = await Song.find({album:req.params.id})
        
        res.json({album,songs});

    } catch (error) {
        console.log("Error in getallmessagebyAlbum : ",error)
    }
}


export const deleteSong = async(req,res) => {
    try {
        const song = await Song.findById(req.params.id);

        await song.deleteOne();
        res.json({
            message:"Song Deleted"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getSingleSong = async(req,res) => {
    try {
        const song = await Song.findById(req.params.id);
        res.json(song);
    } catch (error) {
        res.json(error);
    }
  }