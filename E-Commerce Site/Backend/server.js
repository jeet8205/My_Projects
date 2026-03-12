import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
app.use (cors());

//payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/address', addressRoutes);

app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
    res.send('API is running ...');
});

connectDB();

app.listen(5000, ()=> {
    console.log('Server is running @5000');
});