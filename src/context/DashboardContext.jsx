import api from "../api/api";
import {  createContext,  useState } from "react";
const DashboardContext = createContext()
const DashboardContextProvider =({children})=>{
    const [summary,setSummary] =useState({})
    const [monthlySummary,setMonthlySummary] =useState([])
    const [categorySummary,setCategorySummary] =useState([])

    const getDashboardSummary=async ()=>{
        try {
           const response = await api.get('/dashboard')
        setSummary(response.data.data) 
        } catch (error) {
            console.log(error.response?.message);
                    }
            }
    const getMonthlySummary =async()=>{
        try {
        const response = await api.get('/dashboard/monthly')
        setMonthlySummary(response.data.data)
        
        } catch (error) {
            console.log(error.response?.data.message);
            
        }
        
    }
    const getCategoreySummary =async ()=>{
        try {
            const response=await api.get('/dashboard/category')
            setCategorySummary(response.data.data)
            
        } catch (error) {
         console.log(error.response?.data.message);
            
        }
    }
    return(
        <DashboardContext.Provider
        value={{
            getDashboardSummary,
            getMonthlySummary,
            summary,
            setSummary,
            monthlySummary,
            setMonthlySummary,
            getCategoreySummary,
            categorySummary,
            setCategorySummary
        }}>
            {children}
        </DashboardContext.Provider>
    )
}
export {DashboardContext}
export default DashboardContextProvider