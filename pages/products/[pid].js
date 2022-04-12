import connect from "../../helpers/db";
import {ObjectId} from 'mongodb';
import { useContext } from "react";
import { CartContext } from "../../context";

export default function ProductPage({product}) {
    const ctx = useContext(CartContext);

    function addToCart() {
        ctx.addItem({
            id: product._id,
            title: product.title,
            amount: 1,
            price: product.price
        });
    }

    return <div className="flex flex-col md:flex-row items-start justify-around">
        <div className="w-[80%] md:w-[40%] p-4 lg:p-8 mx-auto">
            <div className="mb-4 lg:mb-8">
                <img className="object-content" src={product.image} alt={product.title} />
            </div>
            <div>
                <button onClick={addToCart} className="w-full py-2 bg-[#7C7575] hover:bg-[#9D9797] text-white">Add to Cart</button>
            </div>
            
        </div>
        <div className="w-[80%] md:w-[60%] mx-auto p-4 lg:p-8">
            <h1 className="font-bold text-2xl md:text-4xl mb-2">{product.title}</h1>
            <p className="mb-2 text-lg md:text-xl">{product.category}</p>
            <p className="font-semibold mb-2 text-lg md:text-xl">${product.price}</p>
            <p className="mb-2 text-lg md:text-xl">{product.description}</p>
        </div>
    </div>
}

export async function getServerSideProps(ctx) {
    const {pid} = ctx.params;
    const id = new ObjectId(pid);

    const client = await connect();
    const product = await client.db().collection('products').findOne({_id:id});

    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        }
    }
}

