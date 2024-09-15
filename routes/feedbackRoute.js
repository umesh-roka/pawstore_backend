import express from 'express'
import { addFeedBack, getFeedBack } from '../controllers/feedbackController.js'
import { adminCheck, userCheck } from '../middleware/userCheck.js'

const router = express.Router()

router.route('/').get(getFeedBack).post(addFeedBack)
router.route('/').get( userCheck,adminCheck, getFeedBack)


export default router;