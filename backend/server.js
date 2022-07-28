import express from 'express';
import products from './data/products.js';
import cors from 'cors';
import 'dotenv/config';
import 'colors';
import connectDB from './config/db.js';


const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/products', (_req, res) => {
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

app.listen(port, console.log(`Server runner on port ${port}`.yellow.bold));
