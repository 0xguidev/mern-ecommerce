import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import 'colors';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandle, notFound } from './middleware/errorMiddleware.js';

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandle);

app.listen(port, console.log(`Server runner on port ${port}`.yellow.bold));
