import { useState } from "react";

import Orders from "./Orders";
import Products from "./Products";

export default function AdminPanel({logout}) {
    const [showForm, setShowForm] = useState(false);

    return <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-1 md:col-span-3 p-4">
            <div className="md:sticky relative top-8 flex flex-col space-y-4">
                <button className="bg-blue-600 hover:bg-blue-700 p-3 text-white" onClick={() => setShowForm(false)}>Orders</button>
                <button className="bg-green-600 hover:bg-green-700 p-3 text-white" onClick={() => setShowForm(true)}>Products</button>
                <button className="bg-red-600 hover:bg-red-700 p-3 text-white" onClick={() => logout()}>Log Out</button>
            </div>
        </div>

        <div className="col-span-1 md:col-span-9 p-4">
            {showForm ? <Products /> : <Orders />}
        </div>
    </div>
}