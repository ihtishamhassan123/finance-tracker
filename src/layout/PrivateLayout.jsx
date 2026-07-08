import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import PrivateNavbar from '../components/PrivateNavbar'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <Flex w='80%'
    direction='column'
    mx='auto'>
      <PrivateNavbar/>
      <Outlet/>
    </Flex>
  )
}

export default PrivateLayout
