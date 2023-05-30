const express = require('express');

const app = express()

const port = process.env.PORT || 5000

const cors = require("cors")


app.use(cors())

require("dotenv").config()

app.use(express.json())


// here is the mongodb or database intregate 




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.p7bqic0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        // here is the all dbs

        const Db1 = client.db("products").collection("products1")

        const db2 = client.db("cartAdded").collection("cart")

        const Db3 = client.db("Logins").collection("LoginInfo")

        // here is the all dbs ends

        // here is teh rest apis 


        // here is the user infos and logins detailes
        app.get('/userinfos', async (req, res) => {

            const cursor = Db3.find()
            const result = await cursor.toArray()
            res.send(result)


        })
        // ends

        // her is the post method of user logins infos

        app.post("/userinfos", async (req, res) => {

            const info = req.body


            const query = { email: info.email }

            const existing = await Db3.findOne(query)

            if (existing) {
                return res.send({ massage: "user already exist" })
            }




            const result = await Db3.insertOne(info)

            res.send(result)
        })

        // her is the post method of user logins infos ends

        app.get('/productss', async (req, res) => {

            const cursor = Db1.find()


            const result = await cursor.toArray()

            res.send(result)

        })

        // here is teh rest apis  ends

        // ============>


        // add to cart get method 

        app.get('/cart', async (req, res) => {

            const email = req.query.email

            if (!email) {
                res.send([])
            }

            const query = { email: email }

            console.log(query);

            const result = await db2.find(query).toArray()

            res.send(result)


        })


        // add to cart get method  ends

        // here is teh delete method 

        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }

            const result = await db2.deleteOne(filter)

            res.send(result)
        })

        // here is teh delete method ends


        // here is the orderSystem 

        app.post("/cart", async (req, res) => {
            const data = req.body

            const result = await db2.insertOne(data)

            res.send(result)
        })


        // here is the orderSystem  ends


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// here is the mongodb or database intregate 



// basic response here 
app.get("/", (req, res) => {

    res.send("server is running")

})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})



