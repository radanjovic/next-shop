import connect from "../../../../helpers/db";
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {

    // Once again, here we would normaly validate admin cred..

    if (req.method !== 'GET') {
        return;
    }

    const {orderId} = req.query;
    const id = new ObjectId(orderId);

    const client = await connect();
    try {
        const order = await client.db().collection('orders').updateOne(
            {_id:id},
            {'$set': {'shipped':true}}
        );
        res.json({message: 'Success: Order status changed to shipped!'});
    } catch(err) {
        console.log(err);
        res.json({message: 'Error: Something went wrong'});
    }
}