import connect from "../../../helpers/db";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const client = await connect();
    try {
        const product = await client.db().collection('products').insertOne(req.body);
        res.json({message: 'Success: New product created successfully!'});
    } catch(err) {
        console.log(err);
        res.json({message: 'Error: Something went wrong'});
    }
}