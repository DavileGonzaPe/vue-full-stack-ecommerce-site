import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

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
    app.get('/api/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray();
        res.send(products);
    });

    // Get user shopping cart
    app.get('/api/users/:userId/cart', async (req, res) => {
        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    // Get a product by id
    app.get('/api/products/:productId', async (req, res) => {
        const productId = req.params.productId;
        const product = await db.collection('products').findOne({ id: productId });
        res.json(product);
    });

    // Add item to user cart
    app.post('/api/users/:userId/cart/', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.body.id;

        await db.collection('users').updateOne({ id: userId }, {
            $addToSet: { cartItems: productId }
        });

        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    // Remove item from user cart
    app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.params.productId;

        await db.collection('users').updateOne({ id: userId }, {
            $pull: { cartItems: productId }
        });

        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    })

    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
}

start();