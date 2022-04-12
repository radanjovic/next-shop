import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState(null);
    const [message2, setMessage2] = useState(null);
    const [change, setChange] = useState(0.01);
    const [error, setError] = useState(null);

    const titleRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const featuredRef = useRef();

    const router = useRouter();

    // Get all products
    useEffect( () => {
        fetch('/api/products/get')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }, [change]);

    function deleteProduct(id) {
        fetch(`/api/products/product/${id}`, {method:'DELETE'})
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
            setTimeout(() => {
                setMessage(null);
                setChange(Math.random()); // update useEffect
            }, 2000);
        })
        .catch(err => console.log(err));
    }

    function setFeatured(id) {
        fetch(`/api/products/product/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: 'SET'})
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
            setTimeout(() => {
                setMessage(null);
                setChange(Math.random()); // update useEffect
            }, 2000);
        })
        .catch(err => console.log(err));
    }

    function removeFeatured(id) {
        fetch(`/api/products/product/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: 'REMOVE'})
        })
        .then(res => res.json())
        .then(data => {
            setMessage(data.message);
            setTimeout(() => {
                setMessage(null);
                setChange(Math.random()); // update useEffect
            }, 2000);
        })
        .catch(err => console.log(err));
    }

    function addNewProduct(e) {
        e.preventDefault();
        setError(null);

        const title = titleRef.current.value;
        const category = categoryRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const image = imageRef.current.value;
        const featured = featuredRef.current.checked;

        if (
            !title || title.trim().length <= 0 ||
            !category || category.trim().length <= 0 ||
            !price || price.trim().length <= 0 ||
            !description || description.trim().length <= 0 ||
            !image || image.trim().length <= 0) {
                setError('All fields must be filled out!');
                return;
        }

        const product = {
            title,
            category,
            price,
            description,
            image,
            featured
        }

        fetch('/api/products/new', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setMessage2(data.message);
            setTimeout(() => {
                setMessage2(null);
                setChange(Math.random()); // update useEffect
            }, 2000);
            titleRef.current.value = '';
            categoryRef.current.value = '';
            priceRef.current.value = '';
            descriptionRef.current.value = '';
            imageRef.current.value = '';
            featuredRef.current.checked = false;
        })
        .catch(err => console.log(err));
    }

    // Flex for display for simplicity, but with more time and effort, a nice table could be made

    return <div>
        {loading ? <h1 className="text-center">Loading ...</h1> : (<div>
            <div className="mb-8">
                {message && <p className="message">{message}</p>}
                <h1 className="text-center m-2 border-b border-[#7C7575]">All Products ({products.length})</h1>
                {products.map(product => <div key={product._id} className='flex items-center justify-between space-x-2 border-b border-[#7C7575] p-1'>
                    <div>{product.category}</div>
                    <div className="underline cursor-pointer hover:text-black" onClick={() => router.push(`/products/${product._id}`)}>{product.title}</div>
                    <div>{product.price}</div>
                    <div>{product.featured ? <button onClick={() => removeFeatured(product._id)}  className="py-1 px-2 bg-gray-500 hover:bg-gray-600 text-white">Remove Featured</button> : 
                        <button onClick={() => setFeatured(product._id)}  className="py-1 px-2 bg-gray-500 hover:bg-gray-600 text-white">Set Featured</button>}</div>
                    <div><button onClick={() => deleteProduct(product._id)} className="py-1 px-2 bg-red-500 hover:bg-red-600 text-white">Delete</button></div>
                </div>)}
            </div>

            <div className="mt-8">
                <form onSubmit={addNewProduct} className='form  border border-black'>
                <h1 className="text-center m-2 border-b border-[#7C7575]">Add New Product</h1>
                    <div className="flex flex-col">
                        <label htmlFor="title">Product Title:</label>
                        <input className="input" type='text' ref={titleRef} name='title' id='title' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category">Product Category:</label>
                        <select className="p-2 border-none outline-none text-black" name="category" id="category" ref={categoryRef}>
                            <option disabled selected></option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Desktop">Desktop</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="image">Product Image URL:</label>
                        <input className="input" type='text' ref={imageRef} name='image' id='image' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description">Product Description:</label>
                        <textarea className="input" rows='5' ref={descriptionRef} name='description' id='description' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price">Product Price:</label>
                        <input className="input" type='number' step=".01" ref={priceRef} name='price' id='price' />
                    </div>
                    <div>
                        <input className="m-2 cursor-pointer" type='checkbox' ref={featuredRef} name='featured' id='featured' />
                        <label htmlFor="featured" className="cursor-pointer" value='false'>Featured Product</label>
                    </div>
                    <button className="p-2 border-none text-white bg-gray-500 outline-none hover:bg-gray-700" type='submit'>Add New Product</button>
                    {message2 && <p className="text-center bg-white p-2 rounded-md">{message2}</p>}
                    {error && <p className="text-center text-red-600 bg-white p-2 rounded-md">{error}</p>}
                </form>
            </div>
        </div>)}
        
    </div>
}