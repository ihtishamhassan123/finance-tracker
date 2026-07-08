import {  Flex, Image} from '@chakra-ui/react'
import { privateNav } from '../contransts/navbar'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'

const PrivateNavbar = () => {
  return (
    <Flex maxH='50px'
    justify='space-between'
    align='center'
    w='100%'
    px='5'
    mt='2'
    >
      <Image w='100px' src={Logo}/>
    <Flex gap='4'> 
    {
      
      privateNav.map(
        (item) => (
        <NavLink key={item.id} to={item.path}>
          {({isActive}) =>(
            <Flex border={isActive ? '2px solid blue' : 'none'}
            color={isActive ? 'Blue' : 'black'}
            transition='0.1s'
            px='2'
            borderRadius='xl'
            fontWeight='bold'>{item.name}</Flex>
          )}
        </NavLink>
        )
      )
    }
    </Flex> 
    </Flex>
  )
}

export default PrivateNavbar
