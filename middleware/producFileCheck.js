import path from 'path'
import fs from 'fs'
const supports = ['.jpg','.png','.jpeg'];

export const productFile = (req, res, next) => {
  const file = req.files?.product_image;
  try {
    if (file) {
      
      const val = path.extname(file.name);
      if (!supports.includes(val)) return res.status(400).json({
        status: 'error',
        message: 'please provide vaild image'
      });
      file.mv(`./uploads/${file.name}`, (err) => {
        console.log(err);
      });

      req.imagePath = `/uploads/${file.name}`;

      next();
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}



export const productFileUpdate = async (req,res,next)=>{
  const file = req.files?.image;
  const oldImagePath = req.body.imagePath;
 
  try {
    if(file){
      const val = path.extname(file.name);
      if(!supports.includes(val)){
        return res.status(400).json({
          status:'error',
          message:'provide valid image'
        })
      }
  
      fs.unlink(`.${oldImagePath}`,(err)=>{
        
      })
  
      file.mv(`./uploads/${file.name}`,(err)=>{
  
      })
     
  
      req.imagePath = `/uploads/${file.name}`
      next();
  
    }
    else{
  next();
    }
  } catch (err) {
    return res.status(400).json({
      status:'error',
      message:`${err}`
    })
  }
}