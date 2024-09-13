import mongoose from "mongoose"



const petSchema = mongoose.Schema({
  pet_image:{
    type:String,
    required:true,
  },
  pet_name:{
    type:String,
    required:true,
  },
  pet_breed:{
    type:String,
    required:true,
  },
  pet_gender:{
    type:String,
    required:true,
  },
  pet_price:{
    type:Number,
    required:true,
  },
  pet_detail:{
    type:String,
    required:true,
  },
  pet_category:{
    type:String,
    enum: ['Cat', 'Dog'],

    required:true,
  },
  countInStock:{
   type:Number,
   required:true,
  },
  rating:{
    type:Number,
   default:0
  },
  numReviews:{
    type:Number,
    default:0
  },
  reviews:[{
    rating:{
      type:Number,
      required:true,
    },
    comment:{
      type:String,
      required:true,
    },
    user:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'User'
    }
  }]

},{timestamps:true});

const Pet = mongoose.model('Pet',petSchema);

export default Pet;