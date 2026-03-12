import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,        
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    }
}, {
        timestamps: true
});

export default mongoose.model('Product', productSchema);