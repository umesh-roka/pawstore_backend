import express from 'express'

import {  productFile, productFileUpdate } from '../middleware/producFileCheck.js';
import { adminCheck, userCheck } from '../middleware/userCheck.js';
import { addProduct, addReview, getAllProducts, getProductById, removeProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router()

router.route('/').get(getAllProducts).post(userCheck,adminCheck,productFile ,addProduct);

router.route('/:id').get(getProductById).put(userCheck,adminCheck,productFileUpdate,updateProduct).delete(userCheck,adminCheck,removeProduct)

router.route('/review/:id').patch(userCheck,addReview);



export default router;