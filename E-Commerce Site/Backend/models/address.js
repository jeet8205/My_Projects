import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    country: String,
    pincode: String
}, {
        timestamps: true
});

export default mongoose.model('Address', addressSchema);