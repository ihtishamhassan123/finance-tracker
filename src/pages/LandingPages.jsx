import {  Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { featuresarr } from '../contransts/features';
import Footer from '../components/Footer';




const LandingPages = () => {
  return (
   <Flex direction='column' w='100%'
   h='100%'
    justify='center'
    align='center'
    gap='4'
    mt='5'
    
   >
      <Box w='100%' textAlign='center'
      >
      
      <Heading size={{base : '3xl' , md : '4xl', lg:'5xl'}} fontWeight='extrabold'>Finance Tracker</Heading>
      <Text textStyle={{base : 'lg' , md : 'xl', lg:'2xl'}}> Track your income and expenses with confidence.
      </Text>
      <Text textStyle={{base : 'md' , md : 'lg', lg:'xl'}}> Manage your personal finances in one place.</Text>
    
      <NavLink to='/login' >
      <Button w='fit-content'
      size={{base : 'sm', md:'md',lg:'lg'}}
      mt='3'
      colorPalette='blue'
      borderRadius='lg'>Get Started</Button>
            </NavLink>
              </Box>

      <Flex direction='column' mt='10' w='100%'  gap='1' mb='6'>
      
      <Heading mx='auto' maxW={{base :'100%', md :'45%',lg:'27%'}} textAlign='center' size='2xl' fontWeight='extrabold'>Everything You Need to Manage Your Finances</Heading>
      <Box>
   <Text mx='auto' textStyle='xl' w='70%'  textAlign='center' >Take control of your finances with tools  designed to help you.   </Text>
      </Box>
   <Grid templateColumns={{base : 'repeat(1,1fr)',
   md : 'repeat(2,1fr)',
   lg :'repeat(3,1fr)'
   }}
   mt='5' gap='4'>

    {
    featuresarr.map((item) => ( <Flex 
    key={item.id}
    direction='column'
     gap='2' 
     bg='white'
    p='4'
    boxShadow='md'
    borderRadius='lg'
    cursor='pointer'
    _hover={{boxShadow : 'lg',
      transform:"translateY(-5px)",
      transition : '0.3s'
    }}
    >
      <Box color={item.color}>
    {item.icons}
      </Box>
      <Text fontWeight='bold'>
        {item.title}
      </Text>
      <Text>
       {item.desc}
      </Text>
</Flex>))
    }
   
   
  

   </Grid>
      </Flex>

      
    <Footer/>
       </Flex>
  )
}

export default LandingPages
