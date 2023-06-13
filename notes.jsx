// hey my name is mahedi hassan 

const { ObjectId } = require("mongodb");

// new start first jwt

// first make jwt post in the server 


app.post('/jwt', (req, res) => {

    const user = req.body;

    const token = jwt.sing(user, process.env.JWT_TOKEN, {
        expaineIn: "1h"
    })

    res.send({ token })
})
// here is the jwt token create part complete done


// here is the jwt verify system 

// first make a function for the jwt  its called jwt function

function verifyJwt(req, res, next) {

    // this authorization is get from the clicent side fetching the headers in the headers there is a access token 
    const authorization = req.header.body // this body function is get the value from the client side fetching the headers  

    if (!authorization) {

        // if the authorizetion is not valide when its return the user 
        return res.status(401).send({ massage: " unauthorized access " })

    }


    const token = authorization.split(' ')[1]

    jwt.verification(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).sed({ massage: "unauthorised useer" })
        }

        req.decoded = decoded

        next()
    })


}


// then in the client side 





// this is the get request for the valide user only can see this data 

// ths is te get req
app.get("/user", verifyJwt, async (req, res) => {

    const email = req.query.email

    if (!email) {
        return res.send([])
    }


    // here is th jwt verify

    // here is th jwt verify ends


    const query = { email: email }

    const filter = { id: new ObjectId(id) }

    const result = await db2.findOne(query, filter)

    res.sed(result)


})




// get the localStorage get the token 

const token = localStorage.getItem("token")

fetch(url, {
    method: "POST",

    headers: {
        authorization: `bearr ${token}`
    }

})

// ends the part of the client side 