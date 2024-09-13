import express from 'express';
import userRoute from './routes/userRoute.js'
import petRoute from './routes/petRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import mongoose from 'mongoose';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

const port = 5000;
const app = express();

mongoose.connect('mongodb+srv://umeshrokamagar68:magar123@cluster0.fvlaut4.mongodb.net/powstore'

).then((val)=>{
  app.listen(port, ()=>{  
    console.log('server is running');
  })
})

app.get('/', async(req,res)=>{
  return res.status(200).json({
    message:'Welcome to Backend'
  })
})

app.use(express.json())

app.use(cors());

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use(morgan('dev'));


app.use('/uploads', express.static('uploads'));



app.use('/api/users',userRoute);
app.use('/api/pets',petRoute);
app.use('/api/products',productRoute);
app.use('/api/orders',orderRoute);


