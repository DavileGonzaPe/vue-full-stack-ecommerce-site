import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import path from 'path';

async function start() {
    const uri = "mongodb+srv://davile:OGcetRbVNpcV6UqF@cluster0.gssuz0t.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('fullstackvue-db');

    const app = express();
    app.use(express.json());
    app.use('/images', express.static(path.join(__dirname, '../assets')));
    app.use(express.static(
        path.resolve(__dirname, '../dist'),
        { maxAge: '1y', etag: false },
    ));

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
        const populatedCart = await populateCartIds(user?.cartItems || []);
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
        const existingUser = await db.collection('users').findOne({ id: userId });

        if (!existingUser) {
            await db.collection('users').insertOne({ id: userId, cartItems: [] });
        }

        await db.collection('users').updateOne({ id: userId }, {
            $addToSet: { cartItems: productId }
        });

        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(user?.cartItems || []);
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
        const populatedCart = await populateCartIds(user?.cartItems || []);
        res.json(populatedCart);
    })

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'))
    });
    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log(`Server is listening on port ` + port);
    });
}

start();