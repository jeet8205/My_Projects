import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })    
    const [msg, setMsg] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const hangleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", form);
            //save token
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            
            setMsg("Login sucessful");
            // redirect to home page
            navigate("/");
        } catch (error) {
            setMsg(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {msg && (
                    <div className="mb-4 text-center text-sm text-red-600 font-medium">
                        {msg}
                    </div>
                ) }

                <form onSubmit={hangleSubmit} className="space-y-4">
                    <input name="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                    <input name="password" type="password" placeholder="Enter Password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600">Login</button>
                </form>
            </div>
        </div>
    )
}