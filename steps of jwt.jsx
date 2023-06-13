// what is jwt =>

//     jwt is very amaizing to use 

// how to use jwt ehere useing jwt


// jwt is useing on the server 


// how to use jwt in server 

// first install jwt

// if you use yarn === sor use == yarn add jason webtoken

// if you use npm use npm i jsonwebtoken


// 1. step done installing


// 2. import the jsw in the server 

// how to import jwt in the server

// // const jwt = require("jsonwebtoken")

// // 2nd step is done

// // then



// // 3rd step is make the post route to create the jwt token =>{


// // this is the last step 


// const app = express()


// app.post('/jwt', (req, res) => {
//     const user = req.body;


//     // here is making the jwt token jwt from the jwt then sing method is for the create then get the valus from the user, use the secreat key then set the expair token like a object 

//     const token = jwt.sing(user, process.env.JWT_TOKEN, {
//         expair: {
//             '1h'
//         }
//     })

//     res.send({ token })


// })


// // thats part is complete 

// then got to the client part 

// then use exiops this is optipnal axios is helpfull for the api usees 

// go to the auth provider side or where your observer is set on the website



// then

// this is the onserver
// {
//     if (watch) {
//         axios.post(`https//:colcalhost:5000/jwt`, { email: watch.email })
//             .then(data =>
//                 console.log(data);

//         // when user is login  then the jwt is set in the localhost    

//         localStorage.setItem('jwt_key', data.data.token)


//         )

//     }

//     // when user is empty then the jwt is remove from the localhost

//     else {
//         localStorage.removeItem('jwt_key')

//     }

// }


// // thats is to use jwt and thats it to use axios this is the basic way to use jwt and axios



// // how to use stripe in the client side

// first stape is install the steipe

// // then import the stripe in the clinside in the component 

// const stripe = useStripe()

// const Elements = useElements()


// // make a handle submit to use the card in the website


// const handlePay = (e) => {

//     e.preventDefault()

//     if (!stripe || !elelets) {
//         return
//     }


//     // this is for 
//     const card = Elements.getElement(CardElement);



//     // this jodi card na thake tahole return kore daw

//     if (card === null) { // card jodi 0 or sonno or null hoy tahole return kore dew
//         return
//     }





//     // this is for the payment select to pay and simple baledate
//     const { error, payment } = await stripe.paymentMethod({
//         type: "card",
//         card
//     })

//     // error jodi thake tahole clg koro error
//     if (error) {
//         console.log(error);
//     }

//     // jodi error na thake jodi apyment thake tahole payment detalse dekaw
//     else {
//         console.log(payment);
//     }

// }


// // then use this form 

// <div>
//     <h1>hey i am bro taka taka</h1>
//     {
//         err ? <h1 className="font-bold text-lg text-center text-red-400"> {err ? "error" : ""} {err}</h1> :
//             <h1 className="font-bold text-lg text-center text-green-400"> {success ? "successfully" : ""}: {success}</h1>
//     }



//     <br />
//     <form onSubmit={handleSubmit}>
//         <CardElement
//             options={{
//                 style: {
//                     base: {
//                         fontSize: '16px',
//                         color: '#424770',
//                         '::placeholder': {
//                             color: '#aab7c4',
//                         },
//                     },
//                     invalid: {
//                         color: '#9e2146',
//                     },
//                 },
//             }}
//         />
//         <button className="btn btn-primary mt-5" type="submit" disabled={!stripe}>
//             Pay
//         </button>
//     </form>


// </div>

// // to pay


// // this is the last stape to  use the stipe card in the licnt side to show 


// <Elements>

// then import thhe component

// <Checkout stripePromis={} ></Checkout>

// </Elements>