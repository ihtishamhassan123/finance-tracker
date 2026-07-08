import { Box, Button } from '@chakra-ui/react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const LogoutPages = () => {
   const navigate = useNavigate();
   const {logout} = useContext(AuthContext);

    const handleLogout =async()=>{
      await  logout();
        navigate('/login')
    }

  return (
    <Box w='100%' minH='100%' mx='auto'>
        <Button onClick={handleLogout}>Logout</Button>
      
    </Box>
  )
}

export default LogoutPages
