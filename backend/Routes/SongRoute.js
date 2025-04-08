 import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";
import {addSong, addThumbnail, createAlbum, deleteSong, getAllAblums, getAllSongs, getALLSongsbyAlbum} from "../Controllers/Song.Controller.js"

const router = express.Router();

router.post("/album/new",isAuth,uploadFile,createAlbum)
router.get("/album/all",isAuth,getAllAblums)
router.post("/new",isAuth,uploadFile,addSong);
router.post("/:id",isAuth,uploadFile,addThumbnail);
router.delete("/:id",isAuth,deleteSong);
router.get("/all",isAuth,getAllSongs);
router.get("/album/:id",isAuth,getALLSongsbyAlbum);

export default router;

