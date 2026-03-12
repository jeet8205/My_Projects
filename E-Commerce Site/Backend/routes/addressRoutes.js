import express from "express";
import {saveAddress, getAddresses} from "../controllers/addressController.js";

const router = express.Router();

//Route to save address
router.post('/add', saveAddress);

//Route to get address by user id
router.get('/:userId', getAddresses);

export default router;