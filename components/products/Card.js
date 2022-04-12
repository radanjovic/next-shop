import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../context";

export default function Card({product}) {
    const ctx = useContext(CartContext);
    const router = useRouter();

    function addToCart() {
        ctx.addItem({
            id: product._id,
            title: product.title,
            amount: 1,
            price: product.price
        });
    }

    return <div className="w-[300px] h-[360px] border border-[#7C7575] m-4 rounded-md ">
        <img className="w-full h-[60%] object-center" src={product.image} alt={product.title} />
        <div className="p-2 bg-[#DFD3D3] w-full h-[40%] flex flex-col">
            <div className="flex-grow cursor-pointer" onClick={() => router.push(`/products/${product._id}`)}>
                <h2 className="font-bold text-lg lg:text-xl">{product.title}</h2>
                <p className="font-semibold text-sm lg:text-md">${product.price}</p>
            </div>
            <button onClick={addToCart} className="w-full border-none outline-none bg-[#7C7575] text-white py-2 tansition duration-300 transform hover:-translate-y-1">Add To Cart</button>
        </div>
            
    </div>
}