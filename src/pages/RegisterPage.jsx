import { Box, Button, Field, Flex, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import { loginWidth, register } from '../contransts/auth'
import axios from 'axios'
import api from '../api/api'
import { toaster } from "../components/ui/toaster";

const RegisterPage = () => {

  const [formData , setFormData] =useState({
    fullName : '',
    email : '',
    password : '',
    confirmPassword : ''

  });
  const [error ,setError] = useState({ })
    const navigate= useNavigate()


  const HandleChange = (e) =>(
  setFormData({...formData,
    [e.target.name] :e.target.value
  })
);
const handleSubmit =async (e) =>{
  try {
     e.preventDefault()
  if(formData.password.length < 6 ) {
    setError({
      password : 'password is too short'
    })
    return
  }
  if(formData.password !== formData.confirmPassword) {
    setError({
      confirmPassword : 'passoward not match'
    })
    return
  };
    setError({})
   const response = await api.post('/profile/register',formData)
  console.log(response.data);
  toaster.create({
    title: "Account created successfully",
    type: "success",
});
  if(response.data === 'user registered'){
  navigate('/login')

  }
  
   
  } catch (error) {
toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
    
    
  }
}

  

  return (
     <Flex direction='column'
      w={{base : '90%',md : '70%', lg : '40%' }}
      mx='auto'
      align='center'
      gap='5'
      mt='4'>
           <Flex w='100%'
           direction='column'
           align='center'
           >
   
           <Text fontWeight='bold'
            textAlign='center'
            textStyle={{base : '2xl' ,md : '3xl'
            }}>Create  account</Text>
           <Flex gap='1'>
             <Text textStyle={{base : 'sm',md : 'md', lg : 'xl'
             }}
             >Already have an account?</Text>
             <NavLink to='/login'>
             <Text fontWeight='500'
             textStyle={{base : 'sm',md : 'md', lg : 'xl'
             }} textDecoration='underline'>Login</Text></NavLink>
           </Flex>
           </Flex>
           <Box minW='100%'>

         
           <form onSubmit={handleSubmit}>
           <Flex direction='column'
           gap='4' w='100%'>
  
           {
           register.map((item) =>(<Field.Root key={item.id} required>
           <Field.Label>
             {item.label} <Field.RequiredIndicator/>
           </Field.Label>
           <Input name ={item.name} onChange={(e)=>HandleChange(e)} value={formData[item.name]} border='1px solid black'
           borderRadius='lg'/>
           {
            error[item.name] && (<Text color='red'>{error[item.name]}</Text>)
           }
           </Field.Root>))
   
           }
                   </Flex>
         <Button
         type='submit'
         mt='3'
          w='100%'
          colorPalette='blue'
          borderRadius='full' 
         >SignUp</Button>

     </form>
       </Box>
         <Text>Or Sign Up With</Text>
         <Flex justify='space-between' w='100%'>
         {
           loginWidth.map((item) =>(  <Flex key={item.id}
            borderRadius='lg'
            w='40%'
            py='2'
           border='1px solid grey'
           align='center'
           justify='center'
           cursor='pointer'
           fontSize='3xl'
           _hover={{
             bg : '#1877F2',
             color : 'white'
           }}
           >
             {item.icon}</Flex>))
         }
       
         </Flex>
   
          </Flex>
  )
}

export default RegisterPage
