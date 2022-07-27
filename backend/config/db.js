import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopologgy: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDb Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default connectDB;