import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"
import { useAuth } from "../Context/Authprovider.jsx";

function Login() {
  
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [authUser ,setAuthUser] = useAuth();

    const submitHandler = async(e) => {
        e.preventDefault();

        const userinfo = {
          email:email,
          password:password,
        }

        // console.log("userinfo");
        
        await axios.post("/api/user/login",userinfo)
          .then((response)=>{
            if(response){
              toast.success("User loggin successfully")
            }
            console.log(response.data);
            localStorage.setItem("spotify",JSON.stringify(response.data));
            setAuthUser(response.data);
            // console.log(authUser);
          })
          .catch((error)=>{
            toast.error(error.response.data.messsage);
          })

    }


    return (

    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Login to Spotify
        </h2>

        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or Username
            </label>

            <input
              type="email"
              placeholder="Email or username"
              className="auth-input"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">password</label>

            <input
              type="password"
              placeholder="password"
              className="auth-input"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn">Login</button>
        </form>

        <div className="text-center mt-6">
            <Link to = "/Register" className="text-sm text-gray-400 
                hover:text-gray-300">don't have ? account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
