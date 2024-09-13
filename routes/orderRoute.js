import express from 'express'
import { addOrder, getAllOrder, getOrderById, getOrderByUser,  } from '../controllers/orderController.js';
import { userCheck } from '../middleware/userCheck.js';

const router = express.Router();


router.route('/').get(getAllOrder).post(userCheck,addOrder)
router.route('/:id').get(getOrderById)
router.route('/user/:id').get(userCheck,getOrderByUser);


export default router;