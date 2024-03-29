import 'colors';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import connectDB from './config/db.js';
import { errorHandle, notFound } from './middleware/errorMiddleware.js';
import ordersRoutes from './routes/orderRoutes.js';
import productRouter from './routes/productRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.get('/api/config/paypal', (_req, res) => {
  res.send(PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();

app.use('uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRouter);
app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/uploads', uploadRouter);

app.use(notFound);

app.use(errorHandle);

app.listen(port, console.log(`Server runner on port ${port}`.yellow.bold));
