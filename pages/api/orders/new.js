import connect from "../../../helpers/db";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const client = await connect();
    
    try {
        const order = await client.db().collection('orders').insertOne(req.body);
        res.json({message: 'Success: Your order has been received! Amount due you are to pay upon the arrival of your order, to our delivery person!'});
    } catch(err) {
        console.log(err);
        res.json({message: 'Error: Something went wrong'});
    }
}