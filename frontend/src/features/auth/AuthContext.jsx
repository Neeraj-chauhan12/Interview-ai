import { createContext, useEffect, useState } from "react";
import {  getme } from "./services/AuthApi";


export const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false);

 

useEffect(() => {
    const initUser = async () => {
      setLoading(true);
      try {
        const data = await getme();
        setUser(data?.user);
      } catch (error) {
        console.error("Failed to init user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initUser();
  }, []);

    return(
        <AuthContext.Provider value={{user,setLoading,setUser,loading}}> 
            {children}
           </AuthContext.Provider>
    )
}