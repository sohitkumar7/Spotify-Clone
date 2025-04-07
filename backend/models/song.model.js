import mongoose, { Types } from "mongoose";

const songSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    singer:{
        type:String,
        required:true
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
    },

    audio:{
        id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    
    album:{
        type:String,
        required:true
    },

},{timestamps:true})

export const Song = mongoose.model("Song",songSchema);