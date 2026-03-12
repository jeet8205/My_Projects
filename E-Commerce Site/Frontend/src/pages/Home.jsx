import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = async () => {
        try {
            const res = await api.get(`/products?search=${search}&category=${category}`);
            const data = res.data.products || res.data; 
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading products:", error);
            setProducts([]); 
        }
    }

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
        const userId = localStorage.getItem("userId");
        
        if (!userId) {
            alert("Please log in to add products to your cart.");
            return;
        }

        try {
            const res = await api.post(`/cart/add`, { userId, productId });
            
            const cartCount = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
            
            localStorage.setItem("cartCount", cartCount);
            window.dispatchEvent(new Event("cartUpdated"));
            
            alert("Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart");
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6 flex gap-3">
                <input 
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded w-1/2 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border px-3 py-2 rounded w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="">All Categories</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Tablets">Tablets</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div 
                            key={product._id}
                            className="border p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col"
                        >
                            <Link 
                                to={`/product/${product._id}`} 
                                className="group flex flex-col flex-1"
                            >
                                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-50">
                                    <img 
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-48 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h2 className="text-md font-bold text-gray-800 line-clamp-2 mb-1">{product.title}</h2>
                                <p className="text-blue-600 font-bold mt-auto text-lg">₹{product.price}</p>
                                <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{product.category}</span>
                            </Link>
                            
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product._id);
                                }} 
                                className="mt-3 w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        <p className="text-xl">No products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
