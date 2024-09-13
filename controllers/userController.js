import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const userSignup = async (req,res)=>{
const {username,email,password}= req.body;
try {
  const isExist = await User.findOne({email:email});
  if(isExist){
return res.status(400).json({
  stauts:'error',
  message:'user already exist'
})
  }
  else{
    const hashPass = bcrypt.hashSync(password,10);
    await User.create({
      username,
      email,
      password:hashPass,
    })
return res.status(201).json({
  status:'success',
  message:'successfully register'
})
  }
  
} catch (err) {
  return res.status(400).json({
    stauts:'error',
    message:`${err}`
  })
}

}




export const userLogin = async (req,res) =>{
  const {email,password}=req.body

  try{
    const isExist = await User.findOne({email:email});

    if(isExist){
      const passMatch = bcrypt.compareSync(password,isExist.password);
      if(!passMatch){
        return res.status(400).json({
          stauts:'error',
          message:'invalid credential'
        })
      }
      else{
        const token = jwt.sign({userId:isExist._id,isAdmin:isExist.isAdmin},'toky')
        return res.status(200).json({
          token,
          id : isExist._id,
          username:isExist.username,
          email:isExist.email,
          isAdmin:isExist.isAdmin,
        })
      }
    }
    else{
      return res.status(400).json({
        stauts:'error',
        message:'user not exist'
      })
    }
  } catch (err) {
    return res.status(400).json({
      stauts:'error',
      message:`${err}`
    })
  }

}


export const updateUser = async (req,res)=>{
  const {id}= req.params
  try {
    const isExist = await User.findOne({_id:id});
    if(isExist){
      await User.findByIdAndUpdate(id,{
        username:req.body?.username || isExist.username,
        email:req.body?.email || isExist.email

      });
      return res.status(200).json({
        status:'success',
        message:'updated successfully'
      })

    }
    else{
      return res.status(400).json({
        status:'error',
        message:'user not exist'
      })
    }

    
  } catch (error) {
    return res.status(400).json({
      status:'error',
      message:`${error}`
    })   
  }
}