import connect from '../../../helpers/db';

export default async function handler(req, res) {
    // Usually we would protect here to make sure only admins get this data,
    // but since we have only dummy admin login, we skip that here ...

    if (req.method !== 'GET') {
        return;
    }

    const client = await connect();
    const products = await client.db().collection('products').find({}).toArray();

    client.close();

    res.status(200).json(JSON.parse(JSON.stringify(products)));
}