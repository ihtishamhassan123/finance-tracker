import { Flex, Image} from '@chakra-ui/react'
import { publicNav } from '../contransts/navbar'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'


const PublicNavbar = () => {
  return (
    <Flex w='100%' justify='space-between'
    maxH='50px'

    mt='2'
    align='center'
    px='5'>
            <Image w='100px' src={Logo}/>
      <Flex gap='4'>
             
      {publicNav.map((item) => (
        <NavLink key={item.id}
        to={item.path}
       >
        {({isActive})=>(<Flex 
        border={isActive ? '2px solid blue' : 'none'}
        color={isActive ? 'Blue' : 'black'}
        transition='0.2s'
        px='2'
        borderRadius='xl' 
        fontWeight='bold'>
          {item.name}
        </Flex>)}
          
        </NavLink>
             ))}
             </Flex> 
    </Flex>
  )
}

export default PublicNavbar