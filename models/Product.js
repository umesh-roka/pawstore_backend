import mongoose from "mongoose";


export const productSchema = mongoose.Schema({

  product_image:{
    type:String,
    required:true,
  },
  product_name:{
    type:String,
    required:true,
  },
  
  product_price:{
    type:String,
    required:true,
  },

  product_detail:{
    type:String,
    required:true,
  },

  countInStock:{
   type:Number,
   required:true,
  },

  category:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    default:0,
  },
  numReviews:{
    type:Number,
    default:0,
  },
  reviews:[{
    rating:{
      type:Number,
      required:true,
    },
    comment:{
   type:String,
 required:true
 
    },
    user:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'User',
      required:'true'
    }
  }]



},{timestamp:true});


const Product = mongoose.model('Product',productSchema);

export default Product;