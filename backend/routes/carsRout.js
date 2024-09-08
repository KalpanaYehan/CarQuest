import express from 'express'
import { createCar,getCars,getCarById,updateCarById,deleteCarById } from '../controllers/carController.js'
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router()//use without app

router.post('/',verifyUser,createCar);
router.get('/',verifyUser, getCars);
router.get('/:id',verifyUser, getCarById);
router.put('/:id',verifyUser, updateCarById);
router.delete('/:id',verifyUser, deleteCarById);

export default router;