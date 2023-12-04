import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import path from 'path';
import https from 'https';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { google} from 'googleapis';
import { error } from 'console';



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

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
const PORT = 4000;

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Helper function to get access and bearer token URL
const getAccessAndBearerTokenUrl = ({ access_token }) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;


// Google OAuth callback route
app.get('/api/google/oauth/', async (req, res) => {
  console.log("Hit callback route");

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
     redirect: 'follow'
   };


    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result =>  {
      console.log(result)
      
      //generate JWT
      const user  = { email: result.email, name: result.name }; 
      jwt.sign( user, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
        if (err) {
            res.status(500).json(error);
        }
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        //redirect the user to the login page with JWT attached
        return res.redirect(`http://localhost:3000/HCPregisteration`);
      });
    })
    .catch(error => {
      console.log('error', error);
      res.status(500).json(err); 
    });
      
  })
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


  



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});