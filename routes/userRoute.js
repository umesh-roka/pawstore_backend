import express from 'express';
import validator from 'express-joi-validation'
import joi from 'joi'
import { updateUser, userLogin, userSignup } from '../controllers/userController.js';
const router = express.Router();
const valid = validator.createValidator({})

const singupSchema = joi.object({
  username:joi.string().required(),
  email:joi.string().email().required(),
  password:joi.string().min(8).max(20).required()
})
const loginSchema = joi.object({
  email:joi.string().email().required(),
  password:joi.string().min(8).max(20).required()
})
router.route('/login').post(valid.body(loginSchema),userLogin);
router.route('/signup').post(valid.body(singupSchema),userSignup);
router.route('/profile/:id').patch(updateUser)

export default router;
