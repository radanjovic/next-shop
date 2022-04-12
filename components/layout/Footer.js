import {BsTwitter, BsFacebook, BsInstagram} from 'react-icons/bs';

export default function Footer() {
    // Dummy footer - no functionality
    return <footer className="flex flex-col sm:items-center justify-around sm:flex-row !pb-10 py-2 px-5 lg:py-3 lg:px-10 mt-4 bg-[#7C7575] text-[#FBF0F0] space-y-4 sm:space-y-0">
        <div>
            <h3 className= 'font-semibold text-xs md:text-sm'>NextShop LLC</h3>
            <p className='text-xs md:text-sm text-[#B8B0B0]'>Random Address 123</p>
            <p className='text-xs md:text-sm mb-2 text-[#B8B0B0]'>home@nextshop.com</p>
            <div className='flex gap-2 cursor-pointer text-[#B8B0B0]'>
                <BsFacebook />
                <BsInstagram />
                <BsTwitter />
            </div>
        </div>

        <div>
            <h3 className='font-semibold text-lg md:text-xl mb-2'>Shop</h3>
            <p className='text-[#B8B0B0] text-xs md:text-sm cursor-pointer hover:text-[#DFD3D3]'>Home</p>
            <p className='text-[#B8B0B0] text-xs md:text-sm cursor-pointer hover:text-[#DFD3D3]'>All Products</p>
            <p className='text-[#B8B0B0] text-xs md:text-sm cursor-pointer hover:text-[#DFD3D3]'>Categories</p>
        </div>

        <div>
            <h3 className='font-semibold text-lg md:text-xl mb-2'>Company</h3>
            <p className='text-[#B8B0B0] text-xs md:text-sm cursor-pointer hover:text-[#DFD3D3]'>Privacy Policy</p>
            <p className='text-[#B8B0B0] text-xs md:text-sm cursor-pointer hover:text-[#DFD3D3]'>Terms</p>
            <p className='text-[#B8B0B0] text-xs md:text-sm cursor-pointer hover:text-[#DFD3D3]'>Deliveries</p>
        </div>
    </footer>
}