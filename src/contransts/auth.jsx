import { FaGooglePlusG } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";

export const login =[
    {id : 1,
    label : 'Your email address',
    name : 'email'
    
    },
   { id :2,
    label : 'Your password',
    name : 'password'

   }
]
export const loginWidth = [
  
        {
        id : 1,
        icon : <FaGooglePlusG />,
        bg : 'blue'
        

    },    {
        id : 2,
        icon : <CiFacebook />,
        bg : '#1877F2'
        
    },
        
];
export const register =[
    {id : 1,
    label : 'Full Name',
    name: 'fullName'
    
    },
    {id : 2,
    label : 'Your email address',
    name : 'email'
    
    },
   { id :3,
    label : 'Create Your password',
    name : 'password'
   },
    { id :4,
    label : 'Confirm Your password',
    name : 'confirmPassword'
   },
]
