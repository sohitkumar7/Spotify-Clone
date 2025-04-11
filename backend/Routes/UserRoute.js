import express from "express";
import { login,SavetoPlaylist, logout, myProfile, registerUser } from "../Controllers/User.Controller.js";
import { isAuth } from "../middleware/isAuth.js";


const router =  express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.post("/logout",logout);
router.get("/myProfile",isAuth,myProfile);
router.post("/song/:id",isAuth,SavetoPlaylist);


export default router;
