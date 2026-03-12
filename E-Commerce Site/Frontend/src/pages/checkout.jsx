import { useState, useEffect } from "react";
import api from "../api/axios.js";  
import { useNavigate } from "react-router";

export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const loadData = async () => {
        if (!userId) {
            navigate("/login");
            return;
        }
        try {
            const cartRes = await api.get(`/cart/${userId}`);
            // Ensure we set the cart object which contains the items array
            setCart(cartRes.data.cart || { items: [] });

            const addrRes = await api.get(`/address/${userId}`);
            const addressList = Array.isArray(addrRes.data) ? addrRes.data : (addrRes.data.addresses || []);
            setAddress(addressList);
            if (addressList.length > 0) setSelectedAddress(addressList[0]);
            
        } catch (err) {
            console.error("Fetch error:", err);
            setCart({ items: [] });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const placeOrder = async () => {
        if (!selectAddress) {
            alert("Please select an address");
            return;
        }
        try {
            const res = await api.post("/order/place", {
                userId,
                address: selectAddress,
            });
            alert("Order placed successfully!");
            navigate(`/order-success/${res.data.order._id}`);
        } catch (error) {
            console.error("Order error:", error);
            alert("Failed to place order");
        }
    };

    if (!cart) return <div className="p-6 text-center">Loading...</div>;

    
    const total = (cart.items || []).reduce((sum, item) => 
        sum + (item.quantity * (item.productId?.price || 0)), 0
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <h2 className="font-semibold mb-2">Select address</h2>
            {address.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
                    <p className="text-yellow-700">No saved addresses found. Please add one to continue.</p>
                </div>
            ) : (
                address.map((addr) => (
                    <label key={addr._id} className={`block border p-3 rounded mb-2 cursor-pointer ${selectAddress?._id === addr._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <input 
                            type="radio" 
                            name="address"
                            checked={selectAddress?._id === addr._id}
                            onChange={() => setSelectedAddress(addr)}
                            className="mr-2"
                        />
                        <strong>{addr.fullName}</strong>
                        <p className="text-sm">{addr.addressLine}, {addr.city}, {addr.state}, {addr.pincode}</p>
                        <p className="text-sm">{addr.phone}</p>
                    </label>
                ))
            )}
            
            <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
            <div className="border border-gray-300 rounded p-4 mb-4">
                <p className="mb-2">Items: {cart.items?.length || 0}</p>
                <p className="mb-2 text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
            </div>
            <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-bold transition-colors disabled:bg-gray-400" 
                onClick={placeOrder}
                disabled={address.length === 0}
            >
                Place Order
            </button>
        </div>
    );
}