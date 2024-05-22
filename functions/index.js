const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require("stripe");

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (isNaN(total) || total <= 0) {
    return res.status(400).json({ message: "Invalid or missing total parameter." });
  }

  try {
    const paymentIntent = await stripe(process.env.STRIPE_KEY).paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Error processing payment." });
  }
});

exports.api = onRequest(app);
