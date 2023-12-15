import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import path from 'path';
import jwt from 'jsonwebtoken';
import { google} from 'googleapis';
import { error } from 'console';
import { connectToDatabase,getCollection } from './db.js';
import mongoose from 'mongoose';
import {Headers} from 'node-fetch'


const app = express();
const PORT = 4000;


connectToDatabase();
const User = getCollection();
// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json(path.join(__dirname, '../build')));

// handles user registration by receiving POST requests with user data and saving it to the database
app.post('/api/register', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received Request Body:', req.body);
    const existingUser = await User.findOne({ email: formData.email });

    if (existingUser) {
      // If the user already exists, update the existing document
      existingUser.name = formData.name;
      existingUser.phoneNumber = formData.phoneNumber;
      existingUser.address = formData.address;
      existingUser.specialty = formData.specialty;

      await existingUser.save();

      res.status(200).json({
        success: true,
        userExists: true,
        userData: existingUser,
        message: 'User data updated successfully!',
      });
    } else {
      // If the user doesn't exist, create a new document
      const newUser = new User(formData);
      await newUser.save();

      res.status(200).json({ success: true, userExists: false, message: 'Registration successful!' });
    }
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
// set up a Google OAuth client and defines a function to generate the Google OAuth URL.
const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:4000/api/google/oauth',
);
console.log('GOOGLE_CLIENT_ID:',process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

const getGoogleOauthURL = () => {
  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

const googleOauthURL = getGoogleOauthURL();







app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Helper function to get access and bearer token URL
const getAccessAndBearerTokenUrl = ({ access_token }) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;


//handles the callback from Google OAuth, obtains tokens, 
//fetches user information, generates a JWT, and redirects the user to a login page with the JWT attached.
app.get('/api/google/oauth/', async (req, res) => {

  try{

    const { code } = req.query;
    console.log(code);

    // Obtain Google OAuth tokens
    const { tokens } = await oauthClient.getToken(code);
    console.log(tokens);

    // Get user information from Google
    const url = getAccessAndBearerTokenUrl(tokens);
    console.log(url);

    const myHeaders = new Headers();
    const bearerToken = "Bearer "+tokens.id_token;
    myHeaders.append("Authorization", bearerToken);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'  };

    const response = await fetch(url, requestOptions);
    const result = await response.json();   
    console.log(result)
    // Check if the user's email already exists in the database
    const existingUser = await User.findOne({ email: result.email });
    // If the user exists, generatjwt display the email on the registration page
    // If the user exists, display the email on the registration page
    if (existingUser) {
      jwt.sign({ email: result.email, name: result.name }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
        if (err) {
          throw new Error('Error generating JWT token');
        }
        res.redirect(`http://localhost:3000/InfusionSpecification?token=${token}`);
      });
    } else {

    // If the user doesn't exist, save the email to the database
    const newUser = new User({
      name: result.name,
      email: result.email,
     
    });
    await newUser.save();
    
      //generate JWT
      // const user  = { email: result.email, name: result.name }; 
      jwt.sign({ email: result.email, name: result.name }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
        if (err) {
        throw new Error('Error generating JWT token');
      }
             //redirect the user to the login page with JWT attached
             return res.redirect(`http://localhost:3000/Hcpregisteration?token=${token}`);
            });
    }
  } catch (error ) {
      console.log('Error in Google OAuth callback:', error);
      res.status(500).json({ success: false, message: 'Error in Google OAuth callback', error: error.message });
  }
  });

  app.get('/api/google/oauthURL', (req, res) => {
    res.status(200).json({"url": googleOauthURL});
  })
  
  app.get('/api/loginPage', async (req, res) => {
    const { authorization } = req.headers;
    console.log(authorization);
  
    if( authorization == null ) {
      return res.status(400).json({ message: 'Authorization needed' })
    }
  
    try {
      const token = authorization.split(' ')[1];
  
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: 'Unable to verify token' });
        }
      console.log(decoded);
     });
    } catch (error) {
      console.error('Error in /api/loginPage:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  app.get('/api/userinfo', async (req, res) => {
    try {
      const { authorization } = req.headers;
      
      if (!authorization) {
        return res.status(401).json({ success: false, message: 'Authorization header missing' });
      }
  
      const token = authorization.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        console.error('JWT Verification Error:', err);
        if (err) {
          return res.status(401).json({ success: false, message: 'Invalid token' });
        }
      const userEmail = decoded.email;
      const user = await User.findOne({ email: userEmail });     
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
  
        // Return user data
        res.status(200).json({
          success: true,
          userData: {
            name: user.name,
            email: user.email,
          
          },
        });
      });
    } catch (error) {
      
      console.error('Error in /api/userinfo:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  app.post('/api/checkRegistration',async (req, res) => {
    try {
      const { token } = req.body;
      const existingUser = await User.findOne ({email:token});
      if (existingUser){
        res.status(200).json({isUserRegistered : true});
      } else{
        res.status (200).json({isUserRegistered :false});
      }
    } catch (error){
      console.error ('Eroor checking registeration:', error);
      res.status (500).json({ssuccess: false,message:'server error'})
    }  
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});