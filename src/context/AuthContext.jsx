import { createContext, useState } from "react";
const AuthContext = createContext();

import React from 'react'
import api from "../api/api";

const AuthContextProvider = ({children}) => {
const [token,setToken] = useState(localStorage.getItem('token'))
  const loginUser =async (formData)=>{
    try {
     const response =await api.post('/profile/login',formData)
      localStorage.setItem("token" ,response.data.token)
      setToken(response.data.token);
      return response.data;
    } 
    catch (error) {
           throw error      
    } 
  }
      const logout =()=>{
          localStorage.removeItem('token')
          setToken(null)
      }

  return (
    <AuthContext.Provider
    value={{
      loginUser,
      token,
      logout

    }}>{children}</AuthContext.Provider>
  )
}
export {AuthContext}
export default AuthContextProvider
