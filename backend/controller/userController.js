const { BiSolidMessageRoundedMinus } = require("react-icons/bi");
const jwt=require('jsonwebtoken');
const pool = require("../db");
const fs= require('fs').promises

const path = require('path')
const bcrypt = require('bcrypt');
const crypto =require('crypto')
const nodemailer= require('nodemailer')

const registerUser= async (req,res) =>{
    try {
        const {fullName , email , password ,confirmPassword}=req.body;

   if(!fullName) {
    res.status(400).json({
        message:"name is required"
    })
    return
   }
      if(!email) {
    res.status(400).json({
        message:"email is required"
    })
    return
   }   if(!password) {
    res.status(400).json({
        message:"password is required"
    })
    return
   }
   if(password.length < 6){
    res.status(400).json({
        message:"password is too short"
    })
    return
   }
   if(password !== confirmPassword){
    res.status(400).json({
        message:"password not match"
    })
    return
   }
   const existingEmail  = await pool.query('select * from users where email=$1 ',[email]);
   if(existingEmail.rows.length>0){
    res.status(400).json({
        message:"this email is already registered"
    })
    return
   }
   const hashedPassword = await bcrypt.hash(password,10);
   console.log(hashedPassword);
     console.log('creating user');

  const result = await pool.query('insert into users(full_name,email,hashed_password) values($1,$2,$3) returning *',[fullName,email,hashedPassword])
  console.log(result.rows[0]);
  
    res.status(201).json({
        message:"user registered"
    })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            message:"server crashed"
        })
    }
   
} 
const loginUser=async(req,res)=>{
    const {email,password} = req.body;
    console.log('email',email);
    console.log('password',password);
    
    
    
    if(!email || !password){
        res.status(400).json({
            message:"Enter email and password"
        })
        return
    }
    const findUser= await pool.query('select * from users where email=$1',[email])
    if(findUser.rows.length ===0){
    res.status(404).json({
        message:"user not found register new acount"
    })
    return
    }
    
    const isMatch =await bcrypt.compare(password,findUser.rows[0].hashed_password)
    console.log(isMatch);
    if(!isMatch){
        res.status(400).json({
            message : 'incorrect password'
        })
        return
    }
    const user=findUser.rows[0];
    const token =jwt.sign({
        id:user.id,
        email:user.email,
    },
process.env.JWT_SECRET,
{
    expiresIn:'1h'
});
    res.status(200).json({
        token:token,
        message: 'login sucess'
    })
    
}
const getUser =async (req,res)=>{
try {
const id= req.user.id;
const result = await pool.query('select id,full_name,email,profile_image from users where id=$1',[id]);
console.log(result.rows[0]);
if(result.rows.length === 0){
    res.status(404).json({
        message:'user not found'
    })
    return
}
res.status(200).json(result.rows[0])
    } catch (error) {
        console.log(error.message);
        
     res.status(500).json({
    message:"Server crashed"
})
    
    }



}
const updateUser = async(req,res)=>{
    try {
        let profile_image;
        const id=req.user.id;
        const {full_name,email}=req.body
        console.log(full_name);
        console.log(email);
        const currProfile= await pool.query('select profile_image from users where id=$1',[id])
        if(req.file){
        profile_image = req.file.filename;
        }else{
        profile_image=currProfile.rows[0].profile_image;
        }
        const result = await pool.query('update users set full_name=$1, email=$2, profile_image=$3 where id=$4 returning id,full_name,email,profile_image',[full_name,email,profile_image,id])
        console.log(result.rows[0]); 
        console.log(result.rowCount);
   
     if(req.file && currProfile.rows[0].profile_image ){
            const oldimagepath=path.join('uploads',currProfile.rows[0].profile_image);
           try {
    await fs.unlink(oldimagepath);
} catch (err) {
    console.log("Old image not found");
}
         
              
     }
        res.status(200).json(result.rows[0])     
        
    } catch (error) {
        res.status(500).json({
            message:'server crashed'
        })
    }

}
const changePassword=async(req,res)=>{
    try {
        
  
    const id=req.user.id
    const {currentPassword,newPassword,confirmPassword}=req.body
    if(newPassword.length<6){
        res.status(400).json({
            message:"password is too short"
        })
        return
    }
    if(newPassword!==confirmPassword){
        res.status(400).json({
            message:'New password and confirm password do not match.'
        })
        return
    }
    const currentHashPassword =await pool.query('select hashed_password from users where id=$1',[id])
    if (currentHashPassword.rows.length === 0) {
    return res.status(404).json({
        message: "User not found"
    });
}
    const isMatch = await bcrypt.compare(currentPassword,currentHashPassword.rows[0].hashed_password)
    if(!isMatch){
    res.status(400).json({
        message:'Current password is incorrect.'
    })
    return
    }
    const isNewPassword = await bcrypt.compare(newPassword,currentHashPassword.rows[0].hashed_password)
    if(isNewPassword){
        res.status(400).json({
            message:"this is your old password"
        })
        return
    } 

    const hash_password =await bcrypt.hash(newPassword,10);
       const result = await pool.query('update users set hashed_password=$1 where id=$2 returning*',[hash_password,id])
    res.status(200).json(result.rows[0]);
      } catch (error) {
          res.status(500).json({
      message: "Server crashed"
   });
    }
}
const forgetPassword =async(req,res)=>{
      try {

    const {email}=req.body
    const isExist = await pool.query('select id,full_name , email  from users where email=$1',[email])
    if(isExist.rowCount === 0){
        res.status(404).json({
            message:'user Not found'
        })
        return
    }

    const token = crypto.randomBytes(32).toString('hex');
    console.log(token);
    const expiry = new Date()
    expiry.setMinutes(expiry.getMinutes()+ 15)
    const result = await pool.query('update users set rest_token=$1, rest_token_expiry=$2 where email=$3 returning *',[token,expiry,email])
    console.log(result.rows[0]);
    
  const transpoter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure: true,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS,
    }
  })    
    const info = await transpoter.sendMail({
        from:`"Finance Tracker"${process.env.USER_EMAIL}`,
        to:`${email}`,
        subject:'Reset Password For Finance Tracker',
        text:`Hello ${isExist.rows[0].full_name}
        Click the link given below to reset your password:
        
          http://localhost:5173/reset-password?token=${result.rows[0].rest_token}
        
        
        This link expires after 15 minutes.`
    })


res.status(200).json({
    data:info.accepted[0],
    message:'sent reset password email'
})
  } catch (error) {
    res.status(500).json({
        message:'Interal Server Error'
    })
    
  }


    

}
const resetPassword=async(req,res)=>{

    try {
        
   
        const {token,newPassword}=req.body

    if(!token){
        res.status(400).json({
            message:'must have the token'
        })
        return
    }
    if(!newPassword){
        res.status(400).json({
            message:"must Enter the new Password"
        })
        return
    }
    if(newPassword.length<6){
        res.status(400).json({
            message:"Password is too short"
        })
        return
    }
    const isExist = await pool.query('select * from users where rest_token=$1',[token])
    if(isExist.rowCount===0){
        res.status(404).json({
            message:"Invalid Token"
        })
        return
    }
    

    if(new Date() > isExist.rows[0].rest_token_expiry){
        res.status(400).json({
            message:"Token is Expired"
        })
        return
    }
    const isMatch =await bcrypt.compare(newPassword,isExist.rows[0].hashed_password)
    if(isMatch){
        res.status(400).json({
            message:"this is your old password"
        })
        return
    }
    const hashed_password=await bcrypt.hash(newPassword,10)
    console.log(hashed_password);
    const result=await  pool.query('update users set hashed_password=$1, rest_token=null,rest_token_expiry=null where rest_token=$2 returning *',[hashed_password,token])
    console.log(result.rows[0]);
    res.status(200).json({
        message:"Password updated successfully. Please log in."
    })
     } catch (error) {
        res.status(500).json({
      message: "Internal Server Error"
   });
    }
    
}
module.exports={
    registerUser,
    loginUser,
    getUser,
    updateUser,
    changePassword,
    forgetPassword,
    resetPassword
}