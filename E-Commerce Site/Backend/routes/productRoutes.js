import express from "express";
import { createProduct, getallProducts, deleteProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

//Route to create a new product
router.post('/add', createProduct);

//Route to get all products
router.get('/', getallProducts);



//Route to delete a product
router.delete('/delete/:id', deleteProduct);

//Route to update a product
router.put('/update/:id', updateProduct);

export default router;