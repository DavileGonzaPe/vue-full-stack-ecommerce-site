import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { cartItems as cartItemsRaw, products as productsRaw } from './temp-data';

let cartItems = cartItemsRaw;
let products = productsRaw;

async function start() {
    const uri = "mongodb+srv://davile:OGcetRbVNpcV6UqF@cluster0.gssuz0t.mongodb.net/?retryWrites=true&w=majority";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    const db = client.db('fullstackvue-db');

    const app = express();
    app.use(express.json());

    async function populateCartIds(ids) {
        return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
    }

    // Get all the products
    app.get('/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray();
        res.send(products);
    });

    // Get user shopping cart
    app.get('/users/:userId/cart', async (req, res) => {
        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    // Get a product by id
    app.get('/products/:productId', async (req, res) => {
        const productId = req.params.productId;
        const product = await db.collection('products').findOne({ id: productId });
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
}

start();