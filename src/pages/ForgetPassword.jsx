import { Button, Field, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import api from '../api/api'
import { toaster } from "../components/ui/toaster";

const ForgetPassword = () => {
    const [email,setEmail]=useState({})
    const handleChange=(e)=>{
        setEmail({
            email:e.target.value
        })
    }
    const forgotPassword= async(e)=>{
        try {
            e.preventDefault()
            const response=await api.put('/profile/forget-password',email)
            toaster.create({
    title: "Reset link sent to your email",
    type: "success",
});
            console.log(response.data);
            
        } catch (error) {
            console.log(error.response?.message);
            toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
        }
    }
  return (
    <form onSubmit={forgotPassword}>
      <Field.Root>
        <Field.Label>Enter Email</Field.Label>
        <Input  onChange={handleChange} border='1px solid balck'/>
      </Field.Root>
      <Button  type='submit' mt='3'>Forget Password</Button>
    </form>
  )
}

export default ForgetPassword
