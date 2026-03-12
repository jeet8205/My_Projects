import {useParams} from "react-router";

export default function OrderSuccess() {
    const {id} = useParams();
    
    const goHome = () => {
        window.location.href = "/";
    }
    
    return (
        <div className="max-w-xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully</h1>
            <p className="mt-4">Your order ID is <span className="font-bold text-green-600">{id}</span>
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={goHome}>Go to Home</button>
        </div>
    )
}