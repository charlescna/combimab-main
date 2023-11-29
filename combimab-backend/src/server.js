import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import 'dotenv/config';


// Create an Express application
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Retrieve MongoDB credentials from environment variables
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;



// Construct the MongoDB connection URI
const mongoUri =`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.rurmw7b.mongodb.net/?retryWrites=true&w=majority`;


// Define a route for user registration
app.post('/api/register', async (req, res) => {
    let client ;
  try {
    // Destructure user registration data from the request body
    const { firstName, lastName, email, phoneNumber, speciality, zipcode } = req.body;

    // Create a new MongoDB client
    const client = new MongoClient(mongoUri);

    // Connect to the MongoDB server
    await client.connect();

    // Access the HcpRegistration-data database
    const db = client.db(HcpRegistrationInput);

    // Insert user data into the 'users' collection
    const result = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
      speciality,
      zipcode,
    });

    // Respond with a success message and the inserted user's ID
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    // Handle errors during user registration
    console.error('Error registering user:', error);

    // Respond with a 500 Internal Server Error status and an error message
    res.status(500).json({ message: 'Error registering user' });
  } finally {
    // Ensure that the MongoDB client is closed, whether an error occurred or not
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

