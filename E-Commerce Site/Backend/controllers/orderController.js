import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        //  Get and Populate Cart
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Cart not found or empty" });
        }

        //  Map Items 
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        const totalAmount = cart.items.reduce((sum, item) => 
            sum + (item.quantity * item.productId.price), 0);

        // Update Stock 
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productId._id, 
                { $inc: { quantity: -item.quantity } }
            );
        }

        // Create the Order
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD",
            status: "Placed"
        });

        //  Delete the Cart
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Order Controller Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};