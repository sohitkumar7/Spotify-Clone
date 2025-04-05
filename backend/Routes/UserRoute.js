import express from "express";
import { login, logout, myProfile, registerUser } from "../Controllers/User.Controller.js";
import { isAuth } from "../middleware/isAuth.js";


const router =  express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.post("/logout",logout);
router.get("/myProfile",isAuth,myProfile);


export default router;
