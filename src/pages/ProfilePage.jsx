import { Box, Button, Field, Flex, Image, Input } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import api from '../api/api';
import  { AuthContext } from '../context/authContext';
import { NavLink } from 'react-router-dom';
import { toaster } from "../components/ui/toaster";
const ProfilePage = () => {
    const {logout} =useContext(AuthContext) 
    const [profile,setProfile]=useState(null);
    const [selectedFile,setSelectedFile]=useState(null)
    const fileRefInput =useRef(null)
        useEffect(()=>{
       const getProfile =async ()=>{
       try {
        
        const response= await api.get('/profile');
        setProfile(response.data) 
        console.log(response.data);
        
        } catch (error) {
        console.log(error);
        
        }
       }
       getProfile();      
    },[])
    const handleOnChange =(e)=>{
    return setProfile({
            ...profile,
            [e.target.name]:e.target.value

        })
        
    }
    
    const updateProfile = async(e)=>{
        try {
        e.preventDefault()
        const formData=new FormData;
        formData.append('full_name',profile.full_name);
        formData.append('email',profile.email);
        formData.append('profile_image',selectedFile)


        const response = await api.put('/profile',formData)
        console.log(response.data);
        toaster.create({
    title: "Profile updated successfully",
    type: "success",
});
        setProfile(response.data)
        
        
        } catch (error) {
        console.log(error);
        toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
        }
    }
    const handleProfileClick=()=>{
      fileRefInput.current.click()
    
    }
    if(selectedFile){
        console.log(URL.createObjectURL(selectedFile));

    }

  return (
    <form onSubmit={updateProfile}>
    <Flex w='100%'
    gap='3'
    direction='column'>
         
<Image
src={
  selectedFile
    ? URL.createObjectURL(selectedFile)
    : `http://localhost:5000/uploads/${profile?.profile_image}`
}  alt="Profile"
  w='150px'
  h='150px'
  borderRadius='full'
  onClick={handleProfileClick}
/>        <Input name='profile_image' ref={fileRefInput}
        type='file' display='none'
         
         onChange={(e)=>{setSelectedFile(e.target.files[0])}
         }/>
      
      <Field.Root>
        <Field.Label fontWeight='bold'>
            Your Name
        </Field.Label>
        <Input name='full_name'
        value={profile?.full_name || ''}
         border='1px solid black'
         onChange={handleOnChange}/>
      </Field.Root>
      <Field.Root>
        <Field.Label
        fontWeight='bold'>
            Your Email
        </Field.Label>
        <Input name='email' 
         value={profile?.email ||''}
         border='1px solid black'
         onChange={handleOnChange}/>
      </Field.Root>
      <Button colorPalette='blue'
      type='submit'>Update</Button>
    </Flex>
    <NavLink to='/change-password'>
    <Button mt='2'>Change Password</Button>
    </NavLink>
    </form>
  )
}

export default ProfilePage
