import express from 'express'
import { createCar,getCars,getCarById,updateCarById,deleteCarById } from '../controllers/carController.js'
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router()//use without app

router.post('/', createCar);
router.get('/',verifyUser, getCars);
router.get('/:id', getCarById);
router.put('/:id', updateCarById);
router.delete('/:id', deleteCarById);

export default router;