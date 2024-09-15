import mongoose from "mongoose";

export const feedBackSchema = mongoose.Schema({
  email:{
    type:String,
     required:true
  },
  name:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
},{timestamps:true})

const Feedback = mongoose.model('Feedback',feedBackSchema)
export default Feedback;