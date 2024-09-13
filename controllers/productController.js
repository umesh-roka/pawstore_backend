import mongoose from "mongoose";
import Product from "../models/Product.js";



export const addProduct = async (req,res)=>{
const {product_name,
  product_price,
  product_detail,
  countInStock,
  category,
} = req.body;

  try {

    await Product.create({
      product_name,
      product_image:req.imagePath,
      product_price,
      product_detail,
      countInStock,
      category,
    })
    return res.status(201).json({
      status:'success',
      message:'product added successfully'
    })
    
  } catch (err) {
    return res.status(400).json({
      status:'error',
      message:`${err}`
    })
  }
}


export const getAllProducts = async (req,res)=>{
  
  const objFields = ['sort','fields','search','page','limit']
  try {
     
    const queryObject = {...req.query};

    objFields.forEach((ele)=> delete queryObject[ele]);
    
    if(req.query.search){
      queryObject.product_name = {$regex:req.query.search,$options:'i'}
    }


    let query = Product.find(queryObject);
  
    if(req.query.sort) {
      const sorts = req.query.sort.split(',').join(' ');
      query = query.select(sorts);
    }

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page-1)*10;
    query = query.select('-createdAt -updatedAt').skip(skip).limit(limit);

    const products = await query;
    const total = await Product.countDocuments();

   return res.status(200).json({
    status:'success',
    length:products.length,
    total,
    data:products,
  
   })
  } catch (error) {
    return res.status(400).json({
      status:'error',
      message:`${error}`
    })
  }
}

export const getProductById = async (req,res)=>{
  const {id} = req.params;
  try {
    if(mongoose.isValidObjectId(id)){
      const product = await Product.findById(id).populate({
        path: 'reviews.user',
        select: 'username'
      });
      return res.status(200).json({
        status:'success',
        data:product
      })
    }
  } catch (err) {
    
  }
}



export const updateProduct = async (req,res)=>{
  const {id} = req.params
  const {
    product_name,
    product_price,
    product_detail,
    category,
    countInStock,
  } = req.body;
  let imagePath = req.imagePath
  try {
    if(!imagePath){
    await Product.findByIdAndUpdate(id,{
      product_name,
      product_price,
      product_detail,
      category,
      countInStock,
    })
    }
    else{
      await Product.findByIdAndUpdate(id,{
        product_name,
        product_price,
        product_detail,
        product_image:imagePath,
        category,
        countInStock,
      }) 

    }
    return res.status(201).json({
      status:'success',
      message:'updated successfully'
    })
  } catch (err) {
    return res.status(201).json({
      status:'success',
      message:`${err}`
    })
  }

}


export const addReview = async (req, res) => {
  const { id } = req.params;
  const {
    comment,
    rating
  } = req.body;

  try {
    const isExist = await Product.findById(id);
    if (isExist) {
      const review = isExist.reviews.find((rev) => rev.user.toString() === req.userId);
      if (review) return res.status(400).json({ status: 'error', message: `already reviewed` });
      isExist.reviews.push(
        {
          user: req.userId,
          rating,
          comment
        }
      );
      const total = isExist.reviews.reduce((a, b) => a + b.rating, 0);
      isExist.numReviews = isExist.reviews.length;
      isExist.rating = total / isExist.reviews.length;

      await isExist.save();

      return res.status(200).json({ status: 'succes', message: `review added successfully` });

    } else {
      return res.status(404).json({ status: 'error', message: `product not found` });
    }


  } catch (err) {

    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}



export const removeProduct = async (req, res) => {
  const { id } = req.params;
  const imagePath = req.query.imagePath; // Correctly access imagePath

  try {
    await Product.findByIdAndDelete(id);
    if (imagePath) {
      fs.unlink(`.${imagePath}`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Product removed',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`,
    });
  }
};
