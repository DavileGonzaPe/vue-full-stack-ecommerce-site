import express from 'express';
import { cartItems as cartItemsRaw, products as productsRaw } from './temp-data';

let cartItems = cartItemsRaw;
let products = productsRaw;

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello!');
})

// Get all the products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get user shopping cart
app.get('/cart', (req, res) => {
    res.json(cartItems);
});

// Get a product by id
app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find(product => product.id === productId);
    res.json(product);
});

// Add item to user cart
app.post('/cart', (req, res) => {
    const productId = req.body.id;
    const product = products.find(product => product.id === productId);
    cartItems.push(product);
    res.json(cartItems);
})

// Remove item from user cart

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});