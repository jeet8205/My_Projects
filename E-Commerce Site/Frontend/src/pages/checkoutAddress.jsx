import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""  
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const saveAddress = async () => {
        try {
            await api.post("/address/add", {
                ...form,
                userId,            
            });
            navigate("/checkout");
        } catch (error) {
            console.error("Save address error:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
            <div className="space-y-3">
                {Object.keys(form).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            name={key}
                            value={form[key]}
                            placeholder={`Enter ${key}`}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500" 
                        />
                    </div>
                ))}
            </div>
            <button 
                onClick={saveAddress} 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-bold mt-6"
            >
                Save Address & Continue
            </button>
        </div>
    );
}