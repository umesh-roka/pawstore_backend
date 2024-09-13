import path from 'path';
import fs from 'fs';

const supports = ['.png', '.jpg', '.jpeg'];

export const fileCheck = (req, res, next) => {
  const file = req.files?.pet_image;
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





export const updateFile = (req, res, next) => {
  const file = req.files?.image;
  const oldImagePath = req.body.imagePath;
  try {
    if (file) {
      console.log('oldImagePath',req.body.imagePath);
      const val = path.extname(file.name);
      if (!supports.includes(val)) return res.status(400).json({
        status: 'error',
        message: 'please provide vaild image'
      });
      fs.unlink(`.${oldImagePath}`, (err) => {

      });
      file.mv(`./uploads/${file.name}`, (err) => {
       
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