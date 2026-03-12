import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "", 
        stock: ""
    });
    const [loading, setLoading] = useState(true);

    const allowedFields = ["title", "description", "price", "category", "image", "stock"];

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                alert("No product ID");
                navigate("/admin/products");
                return;
            }

            try {
                setLoading(true);
                const response = await api.get("/products");
                
                let productsArray;
                if (Array.isArray(response.data)) {
                    productsArray = response.data;
                } else if (response.data.products && Array.isArray(response.data.products)) {
                    productsArray = response.data.products;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    productsArray = response.data.data;
                } else {
                    throw new Error("Invalid API response");
                }

                const product = productsArray.find(p => p._id === id);

                if (!product) {
                    alert(`Product with ID ${id} not found`);
                    navigate("/admin/products");
                    return;
                }

                setForm({
                    title: product.title || "",
                    description: product.description || "",
                    price: product.price || "",
                    category: product.category || "",
                    image: product.image || "",
                    stock: product.stock || ""
                });
                
            } catch (error) {
                console.error("Error loading product:", error);
                alert("Could not load product data.");
                navigate("/admin/products");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/update/${id}`, form);
            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading product...</div>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {allowedFields.map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                            {key}
                        </label>
                        <input 
                            name={key}
                            value={form[key] || ""} 
                            onChange={handleChange}
                            type={key === "price" || key === "stock" ? "number" : "text"}
                            placeholder={`Enter ${key}`}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                ))}
                
                <div className="flex gap-4 pt-4">
                    <button 
                        type="submit" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                        Update Product
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate("/admin/products")}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
