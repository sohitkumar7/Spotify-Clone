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

        const fileUrl = getDataurl(file);
        const cloud = await cloudinary.uploader.upload(fileUrl.content,{
            resource_type:"video",
        });

        await Song.create({
            title,
            description,
            singer,
            thumbnail:{
                id:cloud.public_id,
                url:cloud.secure_url,
            },
            album,
        });

        res.status(201).json({
            message:"Song Added"
        })

    } catch (error) {
        console.log(error);
    }
}