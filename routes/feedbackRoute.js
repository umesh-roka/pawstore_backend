import express from 'express'
import { addFeedBack, getFeedBack } from '../controllers/feedbackController.js'

const router = express.Router()

router.route('/').get(getFeedBack).post(addFeedBack)

export default router;