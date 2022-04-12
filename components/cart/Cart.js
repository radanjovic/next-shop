import { useState, useContext } from "react";
import Modal from "../modal/Modal";
import { CartContext } from "../../context";
import Item from "./Item";
import Checkout from "./Checkout";

export default function Cart({hideCart}) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [message, setMessage] = useState(null);

    const ctx = useContext(CartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    function removeItem(id) {
        ctx.removeItem(id);
    }

    function addItem(item) {
        ctx.addItem({...item, amount: 1});
    }

    function cancel() {
        setIsCheckout(false);
    }

    function order(userData) {
        const {name, email, address} = userData;
        const products = ctx.items.map(item => ({
            id: item.id,
            title: item.title,
            quantity: item.amount
        }));
        const price = ctx.totalAmount;
        const shipped = false;

        // Sending data:
        fetch('/api/orders/new', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                address,
                products,
                price,
                shipped
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            ctx.clearCart();
            setMessage(data.message);
            setTimeout(() => {
                setMessage(null);
                hideCart();
            }, 5000);
        })
        .catch(err => console.log(err));
    }

    const cartItems = <ul className="mb-8">
        {ctx.items.map(item => <Item key={item.id} item={item} addItem={addItem.bind(null, item)} removeItem={removeItem.bind(null, item.id)} />)}
    </ul>

    const modalContent = <>
        {cartItems}
        <div className="font-bold mb-8">
            <span>Total Amount: </span><span>{totalAmount}</span>
        </div>
        <div className="flex flex-col space-y-2">
            <button className="py-2 border-none outline-none bg-[#DFD3D3] hover:bg-[#EFE4E4] text-black" onClick={hideCart}>Close Cart</button>
            <button className="py-2 border-none outline-none bg-[#B8B0B0] hover:bg-[#C9C1C1] text-black" onClick={() => ctx.clearCart()}>Clear Cart</button>
            <button className="py-2 border-none outline-none bg-[#7C7575] hover:bg-[#9D9797] text-white" onClick={() => setIsCheckout(true)}>Proceed to Checkout</button>
        </div>
    </>

    const emptyCart = <>
        <h2 className="text-center text-lg font-bold w-[50%] mx-auto my-12">You Cart is Empty. Find the Product You Like and Click Add to Cart to Add That Product to Your Cart!</h2>
        <button onClick={hideCart} className='block mx-auto bg-[#7C7575] text-white px-4 py-2'>Close Cart</button>
    </>

    return <Modal hideCart={hideCart}>
        {!isCheckout && !message && <h1 className="text-center font-bold text-lg lg:text-xl mb-4">Your Cart</h1>}
        {!hasItems && !message && emptyCart}
        {hasItems && !isCheckout && modalContent}
        {hasItems && isCheckout && <Checkout cancel={cancel} order={order} />}
        {message && <h2 className="text-center text-lg lg:text-xl">{message}</h2>}
    </Modal>
}