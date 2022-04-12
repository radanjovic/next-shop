import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Orders() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState(null);
    const [change, setChange] = useState(0.01);

    useEffect( () => {
        fetch('/api/orders/get')
        .then(res => res.json())
        .then(data => {
            setOrders(data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [change]);

    function shipped(id) {
        fetch(`/api/orders/ship/${id}`)
        .then(res => res.json())
        .then(data => {
            setMessage(data.message)
            setTimeout(() => {
                setMessage(null);
                setChange(Math.random()); // update useEffect
            }, 2000);
        })
        .catch(err => console.log(err))
    }

    return <div>
        {loading ? <h1 className="text-center">Loading ...</h1> : (<div>
            {message && <p className="message">{message}</p>}
            <h1 className="text-center m-2 border-b-2 border-black">All Orders ({orders.length})</h1>
            {orders.map(order => <div key={order._id} className="flex flex-col space-y-2 border-b-2 border-[#7C7575] p-1">
                <div className="flex flex-col">
                    <div className="font-bold">Customer Information:</div>
                    <div className="flex flex-col pl-4">
                        <span><span className="font-semibold">Name:</span> {order.name}</span>
                        <span><span className="font-semibold">Email:</span> {order.email}</span>
                        <span><span className="font-semibold">Address (ship to):</span> {order.address}</span>
                    </div>
                </div>

                <div className="">
                    <div className="font-bold">Products to ship:</div>
                    <div className="pl-4">
                        {order.products.map(product => <div key={product.id} className="flex items-center space-x-4">
                            <span className="font-semibold">{product.title}</span>
                            <span>({Number(product.quantity) === 1 ? '1 item' : `${product.quantity} items`})</span>
                            <Link href={`/products/${product.id}`}><span className="underline cursor-pointer hover:text-black">view</span></Link>
                        </div>)}
                    </div>
                </div>

                <div className="flex justify-between gap-4">
                    <span><span className="font-semibold">Price:</span> ${order.price}</span>
                    <span>
                         {order.shipped ? <p className="font-semibold">Order has been shipped.</p> : <button onClick={() => shipped(order._id)} className="py-1 px-2 bg-gray-500 hover:bg-gray-600 text-white">Shipped</button>}
                    </span>
                </div>
            </div>)}
        </div>)}
        
    </div>
}