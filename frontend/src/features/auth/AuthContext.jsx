import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "./services/AuthApi";


export const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);

    // useEffect(()=>{
    //     const getAndSetUser=async()=>{
    //         const data=await getCurrentUser();
    //         setUser(data);
    //         setLoading(false);
    //     }

    //     getAndSetUser();
    // },[])

    return(
        <AuthContext.Provider value={{user,setLoading,setUser,loading}}> 
            {children}
           </AuthContext.Provider>
    )
}