

import jwt from 'jsonwebtoken'

export const userCheck = (req,res,next)=>{
  const token = req.headers?.authorization;
  try {
    const decode = jwt.decode(token, 'toky');
    if(decode){
      const {userId,isAdmin} = decode;
      req.userId = userId;
      req.isAdmin = isAdmin;
      next();
    }
    else{
      return res.status(400).json({
        status:'error',
        message:'not getting user'
      })
    }
  } catch (err) {
    return res.status(400).json({
      status:'error',
      message:`${err}`
    })
  }
}


export const adminCheck = (req,res,next)=>{
  if(req.isAdmin){
    next();
  }
  else{
    return res.status(400).json({
      status:'error',
      message:'unauthorised'
    })
  }
}