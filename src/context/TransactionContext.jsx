import {  createContext, useContext, useEffect, useState } from "react";
const TransactionContext =createContext();
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const TransactionProvider = ({children}) => {
  const navigate =useNavigate()

          const [transactions,setTransaction] = useState([]);
          const {token} =useContext(AuthContext)
                const getTransation =async () =>{
        try {
              console.log("getTransactions called");
          const response= await api.get('/transactions');
          setTransaction(response.data)
      
          
        } catch (error) {
         if(error.response?.status===401){
          navigate('/login')
         }
          console.log(error.response?.data);
          
        }
      }
      useEffect(()=>{
        if(token){
          getTransation()
        }
        else{
          setTransaction([])
        }
      },[token])

  return (
    <TransactionContext.Provider
 value={{transactions,setTransaction,getTransation}}
    
    >
    {children}
    </TransactionContext.Provider>
  )
}

export {TransactionContext} 

export default TransactionProvider;