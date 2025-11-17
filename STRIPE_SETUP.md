# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for the MoneyDesk pricing plans.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Access to your Stripe Dashboard

## Step 1: Create Products and Prices in Stripe

1. **Log in to Stripe Dashboard**: https://dashboard.stripe.com
2. **Go to Products**: Click on "Products" in the left sidebar
3. **Create Monthly Product**:
   - Click "Add product"
   - Name: "MoneyDesk Premium Monthly"
   - Description: "Premium subscription - Monthly billing"
   - Pricing: 
     - Price: $11.99
     - Billing period: Recurring - Monthly
   - Click "Save product"
   - **Copy the Price ID** (starts with `price_...`)

4. **Create Annual Product**:
   - Click "Add product"
   - Name: "MoneyDesk Premium Annual"
   - Description: "Premium subscription - Annual billing (20% discount)"
   - Pricing:
     - Price: $115.10
     - Billing period: Recurring - Yearly
   - Click "Save product"
   - **Copy the Price ID** (starts with `price_...`)

## Step 2: Get Your Stripe API Keys

1. **Go to Developers → API keys** in Stripe Dashboard
2. **Copy your keys**:
   - **Publishable key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret key** (starts with `sk_test_...` or `sk_live_...`)

⚠️ **Important**: 
- Use `test` keys for development
- Use `live` keys for production
- Never commit secret keys to git!

## Step 3: Set Environment Variables

### For Local Development

Create or update `.env.local` file in the project root:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id_here
NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL=price_your_annual_price_id_here
```

### For Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id_here
NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL=price_your_annual_price_id_here
```

⚠️ **Important**: 
- Set these for **Production**, **Preview**, and **Development** environments
- Use **live keys** for production environment
- Use **test keys** for preview/development

## Step 4: Configure Stripe Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your application about payment events.

1. **Go to Developers → Webhooks** in Stripe Dashboard
2. **Click "Add endpoint"**
3. **Endpoint URL**: `https://your-domain.com/api/stripe/webhook`
4. **Events to listen to**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. **Copy the webhook signing secret** (starts with `whsec_...`)
6. **Add to environment variables**:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Step 5: Test the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Visit the pricing page**: http://localhost:3000/pricing

3. **Test with Stripe test cards**:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Use any future expiry date, any 3-digit CVC, any ZIP code

4. **Check Stripe Dashboard**:
   - Go to **Payments** to see test transactions
   - Go to **Customers** to see created customers

## Step 6: Go Live

When ready for production:

1. **Switch to live mode** in Stripe Dashboard
2. **Update environment variables** in Vercel with live keys
3. **Update Price IDs** if you created new products for production
4. **Test with real card** (use a small amount first)

## Troubleshooting

### Error: "No such price"
- Verify Price IDs are correct in environment variables
- Make sure you're using the correct Price ID (test vs live)

### Error: "Invalid API Key"
- Check that `STRIPE_SECRET_KEY` is set correctly
- Verify you're using test keys in development and live keys in production

### Checkout not redirecting
- Check browser console for errors
- Verify API route is accessible: `/api/stripe/checkout`
- Check server logs for errors

### Payments not appearing in Stripe
- Verify webhook endpoint is configured correctly
- Check webhook logs in Stripe Dashboard
- Ensure webhook secret is set in environment variables

## Security Notes

- ✅ Never commit `.env.local` or `.env` files to git
- ✅ Use environment variables for all sensitive keys
- ✅ Use test keys for development
- ✅ Use HTTPS in production (Vercel provides this automatically)
- ✅ Verify webhook signatures in production

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Testing](https://stripe.com/docs/testing)

