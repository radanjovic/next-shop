import connect from '../../../helpers/db';

export default async function handler(req, res) {
    // Usually we would protect here to make sure only admins get this data,
    // but since we have only dummy admin login, we skip that here ...

    if (req.method !== 'GET') {
        return;
    }

    const client = await connect();
    const orders = await client.db().collection('orders').find({}).sort( { 'shipped': 1 } ).toArray();

    client.close();

    res.status(200).json(JSON.parse(JSON.stringify(orders)));
}