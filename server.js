import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = Stripe(process.env.VITE_STRIPE_SK);

const app = express();
app.use(cors());
app.use(express.json());

const calculationOrderAmount = (items) => {
    let amount = 0;
    for (const item of items) {
        amount += item.price * item.quantity;
    }
    amount *= 100;
    return amount;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items, shipping, description } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculationOrderAmount(items),
        currency: "usd",
        payment_method_types: ["card"],
        description,
        shipping: {
            address: {
                line1: shipping.line1,
                city: shipping.city,
                country: shipping.country,
                postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    })
});


const PORT = process.env.PORT || 4242
app.listen(PORT,()=> console.log('Node server listening on port ',PORT))