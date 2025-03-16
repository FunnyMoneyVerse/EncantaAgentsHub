# Stripe Integration Setup

This document outlines the Stripe integration for Encanta, including webhook setup, subscription management, and testing procedures.

## Environment Variables

### Next.js Frontend (.env.local)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51R1RUOH2uxSVHyT2MhZ0HB9mPSdl3d90vHppod8DxJp0OgLtQCyi8UDURMGVPaFEdfoFjDPjn9vNYvt2qKqPeCZx00yB2Sxf3k
STRIPE_SECRET_KEY=sk_test_51R1RUOH2uxSVHyT2Zy2xvE051HSSAxU9RCkWVh4kXBSM0UoD8OWwe1XNJ7wlbxyJ4lcARS2xf74b7fqUf8lnDznZ00eHETZGUD
STRIPE_WEBHOOK_SECRET=whsec_maCRBFajFHfhs4jmaFZJnG0wspt3LjTc
NEXT_PUBLIC_STRIPE_PORTAL_LINK=https://billing.stripe.com/p/login/4gw5m42VT2EEePK288
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO_YEARLY=https://buy.stripe.com/eVa5lFdQh8DS23K6op
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO_MONTHLY=https://buy.stripe.com/7sI15p5jLf2gcIo5kk
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BUSINESS_YEARLY=https://buy.stripe.com/fZe7tN7rTg6k6k09AD
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BUSINESS_MONTHLY=https://buy.stripe.com/9AQ01lbI97zObEkcMO
```

### FastAPI Backend (.env.local)

```
STRIPE_SECRET_KEY=sk_test_51R1RUOH2uxSVHyT2Zy2xvE051HSSAxU9RCkWVh4kXBSM0UoD8OWwe1XNJ7wlbxyJ4lcARS2xf74b7fqUf8lnDznZ00eHETZGUD
STRIPE_WEBHOOK_SECRET=whsec_maCRBFajFHfhs4jmaFZJnG0wspt3LjTc
```

## Webhook Setup

We have implemented webhook handlers in both the Next.js frontend and FastAPI backend. You can use either one depending on your needs:

### Next.js Webhook

- **URL Path**: `/api/stripe/webhooks`
- **Full URL with ngrok**: `https://8897-86-28-158-242.ngrok-free.app/api/stripe/webhooks`

### FastAPI Webhook

- **URL Path**: `/api/stripe/webhook`
- **Full URL with ngrok**: `https://8897-86-28-158-242.ngrok-free.app/api/stripe/webhook`

## Testing Webhooks

1. **Start your Next.js app**:
   ```bash
   cd encanta/apps/web
   npm run dev
   ```

2. **Start your FastAPI app**:
   ```bash
   cd encanta/apps/api
   uvicorn app.main:app --reload
   ```

3. **Start ngrok** to expose your local server:
   ```bash
   ngrok http 3000  # For Next.js
   # OR
   ngrok http 8000  # For FastAPI
   ```

4. **Update webhook URL in Stripe Dashboard**:
   - Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/test/webhooks)
   - Add a new endpoint with your ngrok URL
   - Select events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

5. **Test with Stripe CLI**:
   ```bash
   stripe trigger checkout.session.completed
   stripe trigger customer.subscription.updated
   stripe trigger customer.subscription.deleted
   ```

## Subscription Products and Prices

Ensure your Stripe products have the following metadata:

- **Key**: `membership`
- **Value**: `pro` or `business` (depending on the tier)

This metadata is used to determine the subscription tier in the webhook handlers.

## Testing the Complete Flow

1. **Create a test customer**:
   - Go to your subscription page
   - Select a plan
   - Use test card number `4242 4242 4242 4242` with any future expiry date and any CVC

2. **Verify webhook events**:
   - Check your server logs for webhook events
   - Verify that the user's subscription status is updated in the database

3. **Test subscription management**:
   - Go to the customer portal
   - Update or cancel the subscription
   - Verify that the webhook events are received and processed

## Moving to Production

When you're ready to go live:

1. **Create live products and prices** in the Stripe Dashboard
2. **Update environment variables** with live mode keys
3. **Set up webhooks for live mode**
4. **Test the complete flow** in live mode with real cards

## Troubleshooting

- **Webhook Errors**: Check the signature verification and ensure the webhook secret is correct
- **Subscription Status Not Updating**: Verify that the product metadata is set correctly
- **Payment Failures**: Check the Stripe Dashboard for detailed error messages 