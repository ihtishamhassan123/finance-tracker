import { Button, Field, Flex, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import changePassword from '../contransts/changePasswrd'
import api from '../api/api'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { toaster } from "../components/ui/toaster";

const ChangePassword = () => {
    const [formData,setFormData]=useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""

    })
    const navigate=useNavigate()
    const {logout} =useContext(AuthContext)
    const handleOnChange =(e)=>{
     return setFormData({
        ...formData,
        [e.target.name]:e.target.value
     })
    }
    const handleSubmitChange =async(e)=>{
        try {
            
       
        e.preventDefault()
        if(!formData.currentPassword || !formData.newPassword || !formData.confirmPassword){
            console.log('enter all field');
            return
            
        };
        if(formData.newPassword.length<6){
            console.log('password is too short');
            return
            
        }
        if(formData.newPassword !== formData.confirmPassword){
            console.log('new pass not equal ti confirm');
            return
                    }
        const response = await api.put('/profile/change-password',formData)
        toaster.create({
    title: "Password changed successfully",
    type: "success",
});
        if(response.status === 200){
            logout();
            navigate('/login')
console.log('changed');

        }
        
         } catch (error) {
            console.log(error.response?.data.message);
            toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
        }
        }
      
    
    console.log(formData);
    
  return (
    <form onSubmit={handleSubmitChange}>
    <Flex w='100%'
    direction='column'
    gap='4' >
    {
        changePassword.map((item)=>(
            <Field.Root key={item.id}>
                <Field.Label fontWeight='bold'>{item.Label}</Field.Label>
                <Input name={item.name} onChange={handleOnChange} border='1px solid black'/>
            </Field.Root>
        ))
    }
     <Button type='submit'>Change Password</Button> 
    </Flex>
    </form>
  )
}

export default ChangePassword
