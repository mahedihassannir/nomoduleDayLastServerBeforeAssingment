
const express = require('express');

const app = express()

const port = process.env.PORT || 5000

const cors = require("cors")


const jwt = require("jsonwebtoken");

app.use(cors())

require("dotenv").config()

app.use(express.json())

const stripe = require("stripe")(process.env.Stripe_PASS)



// verify function 

function verify(req, res, next) {


    const authorization = req.headers.authorization // grave the value from the client side jwt token 

    if (!authorization) { // here is  authorization token or bearer token jodi thake taholle take samne powchie dibe na hole return kore daw 

        return res.status(401).send({ err: "unothorised token " }) // na thakle res kore daw status code menningfull then send err :"u  nauthorised"

    }

    const token = authorization.split(' ')[1] // splite korte hobe '' karon samne localstorage er name thake the tahke the value


    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => { //here is the personally verify the jwt token  

        if (err) { // error jodi thake tahole samne aggano baron 
            return res.status(403).send("decoded user is not authorised")
        }

        req.decoded = decoded  // decoded er value ta neiye naw 

        next() // sob thik thakle samne jaw bro 

    })





}





// here is the jwt verify function 

// function verifyjwt(req, res, next) {
//     const authorization = req.headers.authorization

//     if (!authorization) {

//         return res.status(401).send("unauthorized access ")

//     }

//     const token = authorization.split(' ')[1]

//     jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
//         if (err) {
//             return res.status(401).sed({ massage: "unauthorised useer" })
//         }

//         req.decoded = decoded

//         next()
//     })

// }

// here is the jwt verify function ends



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

        const Db4 = client.db("pay").collection("paydetailes")

        // here is the all dbs ends

        // here is teh rest apis 



        // here is the payment related karsagi
        // TODO
        // here is the stripe payment intent 

        app.post('/pay', async (req, res) => {

            const { amount } = parseFloat.req.body

            console.log( amount );


            const paymentIntent = stripe.paymentIntent.create({
                amount: amount,
                currency: "usd",
                payment_methods_types: ["card"]
            });


            res.send({
                clientSecret: paymentIntent.client_secret
            })



        })


        app.post("/paysave", async (req, res) => {
            const data = req.body

            const result = await Db4.insertOne(data)
            res.send(result)
        })
        // 

        // vierw

        app.get("/paydetels", async (req, res) => {

            const filter = Db4.find()

            const result = await filter.toArray()

            res.send(result)



        })


        // here is the stripe payment intent ends


        // here is the payment related karsagi ends


        // app.post('/jwt', (req, res) => {
        //     const user = req.body

        //     const token = jwt.sign(user, process.env.JWT_TOKEN, {
        //         expiresIn: "1d"
        //     })
        //     res.send({ token })
        // })



        app.post('/jwt', (req, res) => {

            const user = req.body //  body thake user er email ta nitase 

            const token = jwt.sign(user, process.env.JWT_TOKEN, { // jwt token create kortase 

                expiresIn: "1d" // mayed 1 din 
            })

            res.send({ token }) // then token ta response er way tey send kortase 

        }) // done





        // here is the jwt koken system ends


        // here is the user infos and logins detailes
        app.get('/userinfos', async (req, res) => {

            const cursor = Db3.find()
            const result = await cursor.toArray()
            res.send(result)


        })
        // ends


        // this is the simple update system 

        app.patch('/userinfos/admin/:id', async (req, res) => {

            const id = req.params.id
            console.log(id);
            const filter = { _id: new ObjectId(id) }

            const UpdateDoc = {
                $set: {
                    role: "admin"
                }
            }

            const result = await Db3.updateOne(filter, UpdateDoc)

            res.send(result)

        })
        // this is the simple update system 


        app.delete("/userinfos/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await Db3.deleteOne(filter)
            res.send(result)
        })



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

        app.get('/cart', verify, async (req, res) => {

            const email = req.query.email

            if (!email) {
                res.send([])
            }

            // const authorization = req.decoded.email

            // if (email !== authorization) {
            //     return res.status(403).send({ err: "auth access" })
            // }


            // defination 

            const authorization = req.decoded.email // in this way we get the email from the decoded body 

            if (email !== authorization) { // here is a condition  godi email thake tahole entry dibe na jodi thake taholel samne berate dibe na 
                return res.status(403).send({ err: "email is not authorised" })
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



