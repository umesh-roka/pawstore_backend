import mongoose from "mongoose";
import Pet from "../models/Pet.js";
import fs from 'fs'


export const getTopPets = async (req, res, next) => {
  req.query = { rating: { $gt: 4.5 }, limit: 5 };
  next();
}

//pet add controller
export const addPets = async(req,res)=>{
  const {
    pet_name,
    pet_detail,
    pet_breed,
    pet_gender,
    pet_price,
    pet_category,
    countInStock,
  } = req.body;
  try {
    await Pet.create({
      pet_name,
      pet_image:req.imagePath,
      pet_detail,
      pet_breed,
      pet_gender,
      pet_price,
      pet_category,
      countInStock
    });
    return res.status(201).json({
      status:'success',
      message:'pet added'
    })
  
  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err)=>console.log(err));
    return res.status(400).json({
      status:'error',
      message:`${err}`

    })  }
}





//pet get pets controller
export const getPet = async (req,res)=>{
  const objFields = ['sort','fields','search','page','limit']
  try {
     
    const queryObject = {...req.query};

    objFields.forEach((ele)=> delete queryObject[ele]);


    if (req.query.search) {
      queryObject.pet_name = { $regex: req.query.search, $options: 'i' }
    }
    let query = Pet.find(queryObject);
  
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
    query = query.select(' -updatedAt').skip(skip).limit(limit);

    const pets = await query;
    const total = await Pet.countDocuments();

   return res.status(200).json({
    status:'success',
    length:pets.length,
    total,
    data:pets
   })
  } catch (error) {
    return res.status(400).json({
      status:'error',
      message:`${error}`
    })
  }
}

//get pet by id controller
export const getPetById = async (req,res)=>{
  const {id} = req.params;
  try {
    if(mongoose.isValidObjectId(id)){
      const pet = await Pet.findById(id).populate({
        path: 'reviews.user',
        select: 'username'
      });
      return res.status(200).json({
        status:'success',
        data:pet,
      })
    }
    return res.status(400).json({
      status: 'error',
      message: 'please provide valid id'
    });
  } catch (err) {
    return res.status(400).json({ status: 'error', message: `${err}` });
  }
}


//update pet controller

export const updatePets = async(req,res)=>{
  const {id} = req.params;
  let imagePath = req.imagePath;
  const {
    pet_name,
    pet_detail,
    pet_breed,
    pet_gender,
    pet_price,
    pet_category,
    countInStock,
  } = req.body;
  
  try {
    if(imagePath){
    await Pet.findByIdAndUpdate(id,{
        pet_name,
        pet_image:req.imagePath,
        pet_detail,
        pet_breed,
        pet_gender,
        pet_price,
        pet_category,
        countInStock
    })
    }
    else{
      await Pet.findByIdAndUpdate(id,{
      pet_name,
      pet_detail,
      pet_breed,
      pet_gender,
      pet_price,
      pet_category,
      countInStock
        
    })
    return res.status(200).json({
      status:'success',
      message:'updated'

    }) 
    }

  } catch (err) {
    fs.unlink(`.${req.imagePath}`, (err)=>console.log(err));
    return res.status(400).json({
      status:'error',
      message:`${err}`

    }) 
   }
}


export const removePet = async (req, res) => {
  const { id } = req.params;
  const imagePath = req.query.imagePath; // Correctly access imagePath

  try {
    await Pet.findByIdAndDelete(id);
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
      message: 'Pet removed',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`,
    });
  }
};


export const addReview = async (req, res) => {
  const { id } = req.params;
  const {
    comment,
    rating
  } = req.body;

  try {
    const isExist = await Pet.findById(id);
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



