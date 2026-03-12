import express from "express";
import {
    addToCart,
    removeItem,
    updateQuantity,
    getCartByUserId
} from "../controllers/cartController.js";

const router = express.Router();

//Route to add product to cart
router.post('/add', addToCart);

//Route to remove item from cart
router.post('/remove', removeItem);

//Route to update quantity of item in cart
router.post('/update', updateQuantity);

//Route to get cart by user ID
router.get('/:userId', getCartByUserId);

export default router;