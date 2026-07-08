import { Button, Field, Flex, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/api';
import { toaster } from "../components/ui/toaster";

const ResetPassword = () => {
    const navigate=useNavigate()
    const [searchParams] =useSearchParams();
    const [formData,setFormData] =useState({
        token:"",
        newPassword:""
    })
    useEffect(()=>{
        setFormData({
            ...formData,
            token: searchParams.get("token")
        })
    },[searchParams])
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            newPassword:e.target.value
        })
    }
    
    const resetPassword =async(e)=>{

        try {        e.preventDefault()
            console.log('butom is clicked');
            
                    const response = await api.put('/profile/reset-password',formData)
                    toaster.create({
    title: "Password reset successfully",
    type: "success",
});
console.log(response.data.message);
if(response.status==200){
    navigate('/login')
}

        } catch (error) {
            console.log(error.response?.data.message);
toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
        }
        
    }
  return (
    
      <form onSubmit={resetPassword}>
        <Flex direction='column'
        >

        
        <Field.Root minW='100%'>
            <Field.Label>Enter New Password</Field.Label>
            <Input border='1px solid black' onChange={handleChange}/>
        </Field.Root>
                </Flex>
 <Button mt='4' type='submit'
 >Reset Password</Button>
      </form>
    
  )
}

export default ResetPassword
