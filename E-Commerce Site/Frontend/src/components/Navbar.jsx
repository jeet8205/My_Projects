import {Link, useNavigate} from 'react-router';
import {useState, useEffect} from 'react';
import api from '../api/axios.js';

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(()=> {
       const loadCart = async () => {
            if(!userId) return setCartCount(0);
            const res = await api.get(`/cart/${userId}`);
            const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(total);
       } 

       loadCart();
       window.addEventListener("cartUpdated", loadCart);
       return () => window.removeEventListener("cartUpdated", loadCart);
       
    }, [userId]);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    }


    return (
    <nav className='flex justify-between p-4 shadow'>
        <Link to="/" className="text-2xl font-bold">Elextore</Link>
        <div className="flex items-center gap-6">
            <Link to="/cart" className="relative text-xl font-bold">
                🛒 Cart 
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">
                        {cartCount}
                    </span>
                )}
            </Link>

            
            {!userId ? (
                <>
                    <Link to="/login" className='text-lg'>Login</Link>
                    <Link to="/signup" className='text-lg'>SignUp</Link>
                </>
            ) : (
                <button onClick={logout} className='text-lg text-red-600'>Logout</button>
            )}
        </div>
    </nav>
    );
}