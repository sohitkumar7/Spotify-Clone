import { Children, createContext, use, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
 
export const Authprovider = ({children}) => {
    
    const initialUser = Cookies.get("jwt") || localStorage.getItem("spotify")
    // console.log("initial loggedin user is ==== ",initialUser);

    const [authUser,setAuthUser] = useState(initialUser? JSON.parse(initialUser):undefined)

    return (
        <AuthContext.Provider value={[authUser,setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);