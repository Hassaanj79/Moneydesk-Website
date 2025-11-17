import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set. Stripe checkout will not work.");
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-10-29.clover",
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { priceId, billingPeriod } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Get the origin URL for success/cancel redirects
    const origin = request.headers.get("origin") || request.headers.get("referer") || "http://localhost:3000";
    const baseUrl = origin.split("/").slice(0, 3).join("/");

    // Create Stripe Checkout Session with 14-day free trial
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `https://app.moneydesk.co/signup?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      metadata: {
        billingPeriod: billingPeriod || "monthly",
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
      // Always collect payment method for trial subscriptions
      // This ensures we can charge automatically after trial ends
      payment_method_collection: "always",
      subscription_data: {
        trial_period_days: 14, // 14-day free trial
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel", // Cancel if payment method fails
          },
        },
        metadata: {
          billingPeriod: billingPeriod || "monthly",
        },
      },
      // Note: customer_creation is not needed for subscription mode
      // Stripe automatically creates customers for subscriptions
    });

    return NextResponse.json({ 
      success: true, 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error: any) {
    console.error("Error creating Stripe checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

