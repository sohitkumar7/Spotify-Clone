import generateToken from "../jwt/generateToken.js";
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      return res.status(400).json({
        error: "password Does Not Match",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User Already exisrt",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    generateToken(user._id, res);

    res.status(201).json({
      message: "USer register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const ismatch = await bcrypt.compare(password, user.password);

    if (!user || !ismatch) {
      return res.status(400).json({
        messsage: "Invalid credinsial",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      message: "user login Successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      playlist: user.playlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ERROR: "Internal Server Error",
    });
  }
};


export const myProfile = async(req,res) => {
    try {
        
        const user = await User.findById(req.user._id);
        
        res.status(201).json({
            user
        })

    } catch (error) {
        console.log("Error in myProfile controller " ,error);
    }
}


export const logout = async(req,res) =>{

    try {
        
        res.clearCookie("jwt")
        res.status(201).json({
            message: "User successfully logout"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error in logout Controller "
        })
    }

}