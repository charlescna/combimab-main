import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    collection = client.db("HcpRegistrationInput").collection("users");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const getCollection = () => {
  return collection;
};

export { connectToDatabase, getCollection };
