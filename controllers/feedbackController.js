import Feedback from "../models/Feedback.js"


export const addFeedBack = async(req,res)=>{
  const{email,name,message}= req.body
  try {
    await Feedback.create ({
      email,
      name,
      message
    })
  return res.status(201).json({
    status:'success',
    message:'feedback added'
  })
  } catch (err) {
    return res.status(201).json({
      status:'success',
      message:`${err}`
    })
  }
}


export const getFeedBack = async(req,res)=>{
  try {
    const feedbacks = await Feedback.find({ })
    return res.status(200).json({
      status:'success',
      data:feedbacks
    })
    
  } catch (err) {
    return res.status(201).json({
      status:'success',
      message:`${err}`
    })
  }
}