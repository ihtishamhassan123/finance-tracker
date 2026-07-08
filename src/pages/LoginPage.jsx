import { Box, Button, Field, Flex, Grid, Input, Text } from '@chakra-ui/react'
import  {  useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { login, loginWidth } from '../contransts/auth'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { AuthContext } from '../context/authContext'
import { toaster } from "../components/ui/toaster";
const LoginPage = () => {
  const [formData,setFormData] =useState({
    email :'',
    password : '',
  });
  const {loginUser} =useContext(AuthContext)

 const navigate = useNavigate();
  const [error,setError] =useState({});
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  };
const HandleSubmit=async(e)=>{
       try {
           e.preventDefault();
          if(!formData.email ){
            setError({
              email : 'Enter Email'
            })
            return
          }
           if(!formData.password ){
            setError({
              password : 'Enter Password'
            })
            return
          }
      setError({});

      const data =await loginUser(formData);
      toaster.create({
        title: "Login successful",
        type: "success",
    });
      navigate('/dashboard')
      
       } catch (error) {
          toaster.create({
        title: error.response?.data?.message || "Login failed",
        type: "error",
    });
        
       }
}
  return (
   <Flex direction='column'
   w={{base : '90%',md : '70%', lg : '40%' }}
   mx='auto'
   align='center'
   gap={{base: '10' ,lg : '5'}}
   mt='4'>
        <Flex w='100%'
        direction='column'
        align='center'
        >

        <Text fontWeight='bold'
         textAlign='center'
         textStyle={{base : '2xl' ,md : '3xl'
         }}>Welcome back</Text>
        <Flex gap='1'>
          <Text textStyle={{base : 'sm',md : 'md', lg : 'xl'
          }}
          >New to Finance Tracker ? </Text>
          <NavLink to='/register'>
          <Text fontWeight='500'
          textStyle={{base : 'sm',md : 'md', lg : 'xl'
          }} textDecoration='underline'>Sign Up</Text></NavLink>
        </Flex>
        </Flex>
        <Box w='100%'>

       
        <form onSubmit={HandleSubmit}>
        <Flex direction='column'
        W='100%'
        gap='4' >

        {
        login.map((item) =>(<Field.Root key={item.id} >
        <Field.Label>
          {item.label} <Field.RequiredIndicator/>
        </Field.Label>
        <Input onChange={handleChange} name={item.name} border='1px solid black'
        borderRadius='lg'/>
        
 {
            error[item.name] && (<Text color='red'>{error[item.name]}</Text>)
           }        
        </Field.Root>))

        }
                </Flex>
      <Button
      mt='3'
       w='100%'
       colorPalette='blue'
       borderRadius='full'
       type='submit' 
      >Login</Button>
      </form>
       </Box>
      <NavLink to='/forget-password'>
        <Text textDecoration="underline">Forgot Password</Text>
      </NavLink>
      <Text>Or log in with</Text>
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

export default LoginPage
