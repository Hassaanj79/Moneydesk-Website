/**
 * Test script for Stripe Checkout
 * Run with: node test-stripe-checkout.js
 */

require('dotenv').config({ path: '.env.local' });

async function testCheckout() {
  const monthlyPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY;
  const annualPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL;
  
  console.log('Testing Stripe Checkout API...\n');
  console.log('Monthly Price ID:', monthlyPriceId || 'NOT SET');
  console.log('Annual Price ID:', annualPriceId || 'NOT SET');
  console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY ? 'SET ✓' : 'NOT SET ✗');
  console.log('\n');

  if (!monthlyPriceId) {
    console.error('❌ NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY is not set!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: monthlyPriceId,
        billingPeriod: 'monthly',
      }),
    });

    const data = await response.json();
    
    if (data.success && data.url) {
      console.log('✅ Checkout session created successfully!');
      console.log('Session ID:', data.sessionId);
      console.log('Checkout URL:', data.url);
      console.log('\n📝 Next steps:');
      console.log('1. Open the checkout URL in your browser');
      console.log('2. Use test card: 4242 4242 4242 4242');
      console.log('3. Complete checkout');
      console.log('4. You should be redirected to: https://app.moneydesk.co/signup');
    } else {
      console.error('❌ Error:', data.error || 'Unknown error');
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Development server is running (npm run dev)');
    console.log('2. Environment variables are set in .env.local');
  }
}

testCheckout();

