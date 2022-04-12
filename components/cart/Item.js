export default function Item({item, addItem, removeItem}) {
    // const price = `$${item.price.toFixed(2)}`;

    return <li className="px-4 py-2 lg:px-8 flex items-center justify-between  border-b border-[#7C7575]">
        <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="flex flex-col pl-3">
                <span>${item.price}</span>
                <span>Quantity: <span className="font-semibold">{item.amount}</span></span>
            </div>
        </div>
        <div className="flex item-center justify-between">
            <button className="bg-[#7C7575] text-white text-xl lg:text-2xl rounded-l-full w-10 h-10 mr-1" onClick={addItem}>+</button>
            <button className="bg-[#7C7575] text-white text-xl lg:text-2xl rounded-r-full w-10 h-10 mr-1" onClick={removeItem}>-</button>
        </div>
    </li>
}