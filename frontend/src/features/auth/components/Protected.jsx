import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {

    const {loading,user}=useAuth();

    console.log("Protected user:", user);

    if(loading){
    return <h1>Loading....</h1>
  }

  if(!user){
    return <Navigate to="/login" />
  }

  if(user){ 
    return children
  }

  // return children
}

export default Protected
