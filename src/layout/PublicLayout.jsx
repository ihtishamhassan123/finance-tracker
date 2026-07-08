import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import PublicNavbar from '../components/PublicNavbar'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <Flex direction='column'
    w='80%'
    mx='auto'
    minH='100vh'
    >
        <PublicNavbar/>
        <Box minH='calc(100vh - 59px)' >
        <Outlet/>
        </Box>
    </Flex>
  )
}

export default PublicLayout
