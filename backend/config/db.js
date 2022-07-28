import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDb Connected: ${connect.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
  }
};

export default connectDB;
