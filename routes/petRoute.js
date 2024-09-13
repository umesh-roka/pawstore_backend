import express from 'express'
import { addPets, addReview, getPet, getPetById, getTopPets, removePet, updatePets } from '../controllers/petController.js';
import { adminCheck, userCheck } from '../middleware/userCheck.js';
import { fileCheck, updateFile } from '../middleware/fileCheck.js';

 const router = express.Router();


 router.route('/').get(getPet).post(userCheck,adminCheck,fileCheck,addPets);
router.route('/top-pet').get(getTopPets,getPet)
 router.route('/:id').get(getPetById).put(userCheck,adminCheck,updateFile,updatePets).delete(userCheck,adminCheck ,removePet);
 router.route('/review/:id').patch(userCheck,addReview);
 

 
 export default router;