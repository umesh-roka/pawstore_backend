import mongoose from "mongoose";
import Order from "../models/Order.js";


export const addOrder = async (req,res)=>{
  const { userDetail, address, items, total } = req.body;  try {
    await Order.create({
      address,
      items,
      total,
      userDetail,
      user:req.userId
    })
    return res.status(201).json({
      status:'success',
      message:'ordered successfully'
    })
    
  } catch (err) {
    return res.status(400).json({
      status:'success',
      message:`${err}`
    })
  }

}


export const getAllOrder = async(req,res)=>{
  try {
    const order = await Order.find();
    return res.status(200).json({
      status:'success',
      data:order
    })
    
  } catch (err) {
    return res.status(200).json({
      status:'success',
      message:`${err}`
    })
  }
}

export const getOrderById = async (req,res)=>{
  const {id} = req.params
  try {
    if(mongoose.isValidObjectId(id)){
      const order = await Order.findById(id).populate('user')
      return res.status(200).json({
        status:'success',
        data:order
      })
    }
    
    
  } catch (err) {
    
  }
}



export const getOrderByUser = async (req,res)=>{
  try {
    const orders = await Order.find({user:req.userId})
    return res.status(200).json({
      status:'success',
      data:orders
    })
    
  } catch (err) {
    return res.status(400).json({
      status:'success',
      message:`${err}`
    })
    
  }
}