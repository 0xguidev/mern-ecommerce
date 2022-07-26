const express = require('express');
const products = require('./data/products');
const cors = require('cors');
required('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.get('/api/products', (_req, res) => {
    res.status(200).json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((prod) => prod._id === req.params.id)
    res.json(product);
})

app.listen(port, console.log(`Server runner on port ${port}`));