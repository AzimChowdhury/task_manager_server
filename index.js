const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());

function run() {
    const uri = `mongodb+srv://task-manager:${process.env.PASSWORD}@cluster0.c2swy.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


    try {
        client.connect()
        const taskCollection = client.db('task-manager').collection('taskCollection');
        const completedCollection = client.db('task-manager').collection('completedCollection');



        //post a task
        app.post('/addTask', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result)
        });

        //get my tasks by email
        app.get('/myTasks/:email', async (req, res) => {
            const email = req.params.email;
            const cursor = { email: email };
            const result = await taskCollection.find(cursor).toArray();
            res.send(result)
        })

        //add task to completed
        app.post('/completed', async (req, res) => {
            const task = req.body;
            const result = await completedCollection.insertOne(task)
            res.send(result)
        })

        //delete completed task
        app.delete('/deleteTask/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await taskCollection.deleteOne(query)
            res.send(result)
        })


        //get completed task by email
        app.get('/completed/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const result = await completedCollection.find(query).toArray();
            res.send(result);
        })

        //get a  task by id 
        app.get('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await taskCollection.findOne(query)
            res.send(result)
        })

        app.put('/editTask/:id', async (req, res) => {
            const id = req.params.id;
            const name = req.body.name;
            const description = req.body.description;
            const query = {_id:ObjectId(id)}
            const updatedDoc={
                $set:{
                    name:name,
                    description:description
                }
            };
            const result = await taskCollection.updateOne(query,updatedDoc);
            res.send(result)
        })



    }


    finally {
        // perform actions on the collection object
        //   client.close();
    }

    app.get('/', (req, res) => {
        res.send('server running')
    })

    app.listen(port, () => {
        console.log('server running on the port', port)
    })
}

run()










