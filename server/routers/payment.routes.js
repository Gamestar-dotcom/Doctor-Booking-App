import express from "express";
import conn from "../connectDB/DB.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authenticateToken.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent for Stripe
router.post(
  "/create-payment-intent",
  authenticateToken,
  authorizeRoles("patient"),
  async (req, res) => {
    try {
      const { appointmentId } = req.body;

      // Get appointment details
      const [appointments] = await conn.query(
        `
      SELECT a.id, d.fee, d.id as doctor_id
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.id = ? AND a.patient_id = ?
    `,
        [appointmentId, req.user.id]
      );

      if (appointments.length === 0) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      const appointment = appointments[0];

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: appointment.fee * 100, // Stripe expects amounts in cents
        currency: "usd",
        metadata: {
          appointmentId: appointment.id,
        },
      });

      // Create a pending payment record
      await conn.query(
        "INSERT INTO payments (appointment_id, amount, payment_status, stripe_payment_id) VALUES (?, ?, ?, ?)",
        [appointment.id, appointment.fee, "pending", paymentIntent.id]
      );

      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: appointment.fee,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Webhook to handle successful payments
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the payment_intent.succeeded event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      try {
        // Update payment status
        await conn.query(
          "UPDATE payments SET payment_status = ? WHERE stripe_payment_id = ?",
          ["completed", paymentIntent.id]
        );

        // Also update the appointment status
        const [payments] = await conn.query(
          "SELECT appointment_id FROM payments WHERE stripe_payment_id = ?",
          [paymentIntent.id]
        );

        if (payments.length > 0) {
          await conn.query("UPDATE appointments SET status = ? WHERE id = ?", [
            "confirmed",
            payments[0].appointment_id,
          ]);
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    }

    res.json({ received: true });
  }
);

export default router;
