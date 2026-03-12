import express from "express";
import { placeOrder } from "../controllers/orderController.js"; // 
const router = express.Router();

//Route to place order
router.post('/place', placeOrder);

export default router;