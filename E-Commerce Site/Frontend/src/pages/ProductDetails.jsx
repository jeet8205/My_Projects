import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api/axios.js";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            
            const res = await api.get("/products"); 
            
            
            const allProducts = res.data.products || res.data;
            
            
            const foundProduct = allProducts.find(p => p._id === id);

            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                console.error("Product not found in the list");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-20 text-xl font-semibold">Loading product...</div>;
    }

    if (!product) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <button 
                    onClick={() => navigate("/")}
                    className="mt-4 text-blue-500 underline"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10">
            <button 
                onClick={() => navigate("/")}
                className="mb-6 flex items-center text-gray-600 hover:text-black transition"
            >
                ← Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
                {/* Product Image */}
                <div className="flex justify-center bg-gray-50 rounded-xl p-4">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-[400px] object-contain"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
                        {product.title}
                    </h1>
                    
                    <p className="text-3xl font-bold text-gray-800 mt-4">
                        ₹{product.price}
                    </p>

                    <div className="mt-6 border-t border-b py-6">
                        <h3 className="text-lg font-semibold text-gray-700">Description</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Availability</p>
                            <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                            </p>
                        </div>
                        
                        <button 
                            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition transform active:scale-95 disabled:bg-gray-400"
                            disabled={product.stock <= 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}