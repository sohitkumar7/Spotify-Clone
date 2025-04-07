 import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";
import {createAlbum, getAllAblums} from "../Controllers/Song.Controller.js"

const router = express.Router();

router.post("/album/new",isAuth,uploadFile,createAlbum)
router.get("/album/all",isAuth,getAllAblums)
export default router;

