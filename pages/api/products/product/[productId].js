import connect from "../../../../helpers/db";
import {ObjectId} from 'mongodb';

export default async function handler(req, res) {

    // Once again, here we would normaly validate admin cred..

    const {productId} = req.query;
    const id = new ObjectId(productId);

    const client = await connect();

    if (req.method === 'DELETE') {
         try {
            const product = await client.db().collection('products').deleteOne(
                {_id:id}
            );
            res.json({message: 'Success: Product deleted successfully!'});
        } catch(err) {
            console.log(err);
            res.json({message: 'Error: Something went wrong'});
        }
    } else if (req.method === 'PUT') {
        const action = req.body.action;
        if (action === 'SET') {
            try {
                const product = await client.db().collection('products').updateOne(
                    {_id:id},
                    {'$set': {'featured':true}}
                );
                res.json({message: 'Success: Product is now featured!'});
            } catch(err) {
                console.log(err);
                res.json({message: 'Error: Something went wrong'});
            }
        } else if (action === 'REMOVE') {
            try {
                const product = await client.db().collection('products').updateOne(
                    {_id:id},
                    {'$set': {'featured':false}}
                );
                res.json({message: 'Success: Product is no longer featured!'});
            } catch(err) {
                console.log(err);
                res.json({message: 'Error: Something went wrong'});
            }
        }
    } else {
        return; //protect
    }

    client.close();
   
}