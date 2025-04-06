import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast ,{Toaster} from "react-hot-toast";
import axios from"axios";
import { useAuth } from "../Context/Authprovider";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [authUser,setAuthUser] = useAuth();

  const submitHandler = async(e) => {
    e.preventDefault();
    if(password !== confirmpassword){
      toast.error("password and confirmpassword donnot match")
    }
    else{

      const userinfo = {
        name:username,
        password:password,
        email:email,
        confirmpassword:confirmpassword
      }
      
      await axios
        .post("api/user/register",userinfo)
        .then((response) => {
          if(response.data){
            toast.success("Register Successfully");
          }
          localStorage.setItem("spotify",JSON.stringify(response.data))
          setAuthUser(response.data);
          // ther we have to set current user which is logged in
        })
        .catch((error) => {
          if(error.response){
            console.log(error);
            toast.error("Error : "+error.response.data.message)
          }
        })
    
    }
  };

  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Register to Spotify
        </h2>

        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">username</label>

            <input
              type="text"
              placeholder="Username"
              className="auth-input"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>

            <input
              type="email"
              placeholder="Email "
              className="auth-input"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              confirmpassword
            </label>

            <input
              type="password"
              placeholder="confirmpassword"
              className="auth-input"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn">Register</button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/Login"
            className="text-sm text-gray-400 
                hover:text-gray-300"
          >
            have account ?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
