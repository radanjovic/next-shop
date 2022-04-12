import connect from "../helpers/db";
import Card from "../components/products/Card";

export default function ShopPage({products}) {
    return <div>
        <h1 className="text-center text-2xl lg:text-4xl mb-12">All Products</h1>
        <div>

        </div>

        <div className="flex flex-wrap items-center justify-evenly mx-auto">
            {products.map(product => <Card key={product._id} product={product} />)}
        </div>
        
    </div>
}

export async function getServerSideProps() {
    const client = await connect();
    // Get and pass all products upon each request
    const products = await client.db().collection('products').find({}).toArray();

    client.close();

    return {
        props : {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}