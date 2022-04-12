import connect from "../helpers/db";
import Link from 'next/link';
import Card from "../components/products/Card";


export default function HomePage({products}) {

  return <div>
    <div className="text-center flex items-center min-h-screen mb-12">
      <div className="m-auto max-w-[50%] space-y-12">
        <h1 className="font-semibold text-4xl lg:text-8xl font-serif text-[#2F1B44]">NextShop - Shop For Techies</h1>
        <p className="font-semibold text-2xl lg:text-4xl text-[#892C41]">Prices that no one can beat!</p>
        <p className="font-semibold text-xl lg:text-2xl text-[#C89034]">Enjoy our Spring 2022 offer and find the best prices for mobile phones, tablets, laptops, desktop computers and accessories!</p>
      </div>
    </div>

    <div className="mb-12">
      <h2 className="font-semibold text-2xl lg:text-4xl text-center underline mb-12">Featured Products</h2>
      <div className="flex flex-wrap items-center justify-evenly mx-auto">
        {products.map(product => <Card key={product._id} product={product} />)}
      </div>
      
    </div>

    <div className="text-center">
      <p className="font-semibold text-xl lg:text-2xl mb-12">Browse all our products and shop at the prices you are comfortable with!</p>
      <div className="mb-12">
        <button className="bg-[#7C7575] text-xl text-white border-none outline-none px-4 py-2 tansition duration-300 transform hover:-translate-y-1"><Link href='/shop'>Shop Now</Link></button>
      </div>
    </div>

  </div>
}

export async function getStaticProps() {
  const client = await connect();
  // Get and pass all featured products once a day
  const products = await client.db().collection('products').find({featured:true}).toArray();

  client.close();

  return {
      props : {
          products: JSON.parse(JSON.stringify(products))
      },
      revalidate: 86400 // revalidate each day
  }
}