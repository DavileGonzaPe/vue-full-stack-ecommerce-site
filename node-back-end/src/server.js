import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { cartItems as cartItemsRaw, products as productsRaw } from './temp-data';

const uri = "mongodb+srv://davile:OGcetRbVNpcV6UqF@cluster0.gssuz0t.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

let cartItems = cartItemsRaw;
let products = productsRaw;

const app = express();
app.use(express.json());

function populateCartIds(ids) {
    return ids.map(id => products.find(product => product.id === id));
}

app.get('/hello', async (req, res) => {
    await client.connect();
    const db = client.db('fullstackvue-db');
    const products = await db.collection('products').find({}).toArray();
    res.send(products);
})

// Get all the products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get user shopping cart
app.get('/cart', (req, res) => {
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
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
    cartItems.push(productId);
    const populatedCart = populateCartIds(cartItems)
    res.json(populatedCart);
})

// Remove item from user cart
app.delete('/cart/:productId', (req, res) => {
    const productId = req.params.productId;
    cartItems = cartItems.filter(id => id !== productId);
    const populatedCart = populateCartIds(cartItems)
    res.json(populatedCart);
})


app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});