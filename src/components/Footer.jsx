import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

const Footer = () => {
  return (
    <Flex w='100%' bg='blue.100' p='2'
    gap='2'
    borderRadius='lg'
    direction ='column'
    align='center'>
      <Heading>Finance Tracker</Heading>
      <Text textAlign='center'>A simple and intuitive finance tracker built with React, Chakra UI, and the MERN stack.</Text>
      <Flex align='center'
      gap='1'>
        <FaGithub/> <a href='https://github.com/ihtishamhassan123' target='_blank'>Github</a>
      </Flex>
      <Text>© 2025 Finance Tracker</Text>
    </Flex>
  )
}

export default Footer
