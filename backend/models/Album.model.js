import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },
    thumbnail:{
        id:{
            type:String,
            required:true
        },

        url:{
            type:String,
            required:true
        }
    }
},{timestamps:true})

export const Album = mongoose.model("Album",AlbumSchema);
