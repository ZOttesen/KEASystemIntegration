import Stripe from 'stripe';
import express from 'express';
import dotenv from 'dotenv';
const app = express();
app.use(express.static('public'));
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

const PORT = process.env.PORT || 8080;

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
        {
            price_data: {
            currency: 'usd',
            product_data: {
                name: 'Stubborn Attachments',
                images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 20000,
            },
            quantity: 1,
        },
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/success.html',
        cancel_url: 'http://localhost:8080/cancel.html',
    });
    res.redirect(303, session.url);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});