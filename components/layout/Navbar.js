import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useContext } from 'react';
import { CartContext } from '../../context';

export default function Navbar({showCart}) {
    const ctx = useContext(CartContext);
    const len = ctx.items.length;

    return <header className="flex items-center justify-between p-2 lg:py-3 lg:px-10 mb-2 bg-[#7C7575] text-[#FBF0F0]">
        <div className="font-serif font-bold text-lg lg:text-3xl cursor-pointer">
            <Link href='/'>NextShop</Link>
        </div>
        <nav className="flex items-center justify-between space-x-3">
            <p className="text-md lg:text-lg p-1 cursor-pointer hover:text-[#DFD3D3]">
                <Link href='/'>Home</Link>
            </p>
            <p className="text-md lg:text-lg p-1 cursor-pointer hover:text-[#DFD3D3]">
                <Link href='/shop'>Shop</Link>
            </p>
            <p onClick={showCart} className="flex items-center justify-between space-x-2 text-md lg:text-lg p-1 cursor-pointer hover:text-[#DFD3D3]">
                <ShoppingCartIcon className='w-5 h-5 lg:w-6 lg:h-6' />{len > 0 && <span className='bg-white rounded-full px-[6px] text-[#7C7575] relative right-2 text-xs lg:text-sm'>{len}</span>}
            </p>
        </nav>
    </header>
}