import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "../cart/Cart";

export default function Layout(props) {
    const [cart, setCart] = useState(false);

    function showCart() {
        setCart(true);
    }

    function hideCart() {
        setCart(false);
    }

    return <div className="flex flex-col min-h-screen">
        {cart && <Cart hideCart={hideCart} />}
        <Navbar showCart={showCart} />
        <main className="flex-grow container max-w-6xl mx-auto px-3 m-2">{props.children}</main>
        <Footer />
    </div>
}