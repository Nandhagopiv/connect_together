import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

const app = express()
app.use(cors())

const client = new MongoClient('mongodb+srv://nandhagopy:2dWMzuUvetpKa1Y2@cluster0.1jl132p.mongodb.net/')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/refresh', async (req,res)=>{
    await client.connect()
    const collection = client.db('chatapp').collection('chats')
    const data = await collection.find().toArray()
    res.send(data)
})

app.get('/getusers', async (req, res) => {
    await client.connect()
    const collection = client.db('chatapp').collection('users')
    const data = await collection.find().toArray()
    res.send(data)
})

app.get('/addchat', async (req,res) => {
    const {sender,msg} = req.query
    await client.connect()
    const collection = client.db('chatapp').collection('chats')
    await collection.insertOne({
        sender:sender,
        msg:msg
    })
    const data = await collection.find().toArray()
    res.send(data)
})

app.get('/newuser', async (req, res) => {
    const { username, password, email, phone } = req.query;
    
    const collection = client.db('chatapp').collection('users');

    try {
        const existingUser = await collection.findOne({
            $or: [
                { username: username },
                { email: email },
                { phone: phone }
            ]
        });

        if (existingUser) {
            res.send(false);
        } else {
            await collection.insertOne({ 
                username: username, 
                password: password, 
                email: email, 
                phone: phone 
            });
            res.send(true);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating new user");
    }
    const data = await collection.find().toArray()
    console.log(data);
});


app.listen(5000, async () => {
    console.log('Server and db Started');
})