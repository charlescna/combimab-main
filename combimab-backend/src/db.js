
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;



const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,dbName: 'HcpRegistrationInput' });
    // console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const getCollection = () => {

  const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phoneNumber: {type:String},
    address:{type:String},
    specialty:{type:String},
 
  });

  return mongoose.model('User', userSchema);
};

export { connectToDatabase, getCollection };
