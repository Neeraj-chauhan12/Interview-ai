import { createContext, useEffect, useState } from "react";
import {  getme } from "./services/AuthApi";


export const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const getAndSetUser=async()=>{
            const data=await getme();
            setUser(data.user);
            setLoading(false);
        }

        getAndSetUser();
    },[])

    return(
        <AuthContext.Provider value={{user,setLoading,setUser,loading}}> 
            {children}
           </AuthContext.Provider>
    )
}