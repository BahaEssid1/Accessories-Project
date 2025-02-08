// pages/api/checkout.js (or app/api/checkout/route.js)
import Stripe from "stripe";

const stripe = new Stripe(process.env.sk_test_51Ql8v9LLsAlXKfdGARF3eDJigGj5CAqylpewqrnMrRHTtlT6PH9KXVqIEfzleJ6grcd008MHQuAh23QUPw3YUHpO00YBRw2No6, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cartItems } = req.body;

    try {
      // Convert cartItems to the required format for Stripe
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "usd", // Set the currency as needed
          product_data: {
            name: item.title,
            description: item.details,
            images: [item.imageUrl],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Create a Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      });

      // Return session ID to frontend for redirect
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
