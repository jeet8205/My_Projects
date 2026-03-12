import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let cart = await Cart.findOne({ userId });

        if(!cart) {
            cart = new Cart({ 
                userId, 
                items: [{ productId, quantity: 1 }] 
            });
        } else {
            const item = cart.items.find(i => i.productId.toString() === productId);
            
            if (item) {
                item.quantity++;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
        }
        
        await cart.save();
        res.json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json({ message: "Product removed from cart successfully", cart });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        item.quantity = quantity;

        await cart.save();
        res.json({ message: "Product quantity updated successfully", cart });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        res.json({ message: "Cart fetched successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
