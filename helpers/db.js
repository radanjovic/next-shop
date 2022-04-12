import {MongoClient} from 'mongodb';

const uri = process.env.MONGO_URI;

// connect to db
export default async function connect() {
    const client = await MongoClient.connect(uri);
    return client;
}