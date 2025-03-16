# Migrating Stripe to Production

This document outlines the steps to migrate your Stripe integration from test mode to production for the Encanta platform.

## Prerequisites

Before migrating to production, ensure:

1. Your test mode integration is fully functional
2. You have thoroughly tested all subscription flows
3. Your webhook handling is robust and error-free
4. You have a production domain where your application will be hosted

## Step 1: Create Live Products and Prices

1. **Switch to Live Mode in Stripe Dashboard**:
   - Toggle off "View test data" in the Stripe Dashboard
   - You'll now be in live mode

2. **Recreate Your Products**:
   - Go to Products > Add Product
   - Create the same products you had in test mode:
     - Free tier
     - Pro tier
     - Business tier
   - Ensure each product has the correct metadata:
     - Key: `membership`
     - Value: `free`, `pro`, or `business`

3. **Set Up Prices**:
   - For each product, create the same pricing options:
     - Monthly subscription
     - Annual subscription (with discount)
   - Make sure the prices match your business model

4. **Create Payment Links** (if using direct payment links):
   - Go to Products > Payment links
   - Create payment links for each subscription tier and billing frequency
   - Save these URLs for your environment variables

## Step 2: Set Up Live Webhooks

1. **Create a New Webhook Endpoint**:
   - Go to Developers > Webhooks
   - Add a new endpoint with your production URL:
     ```
     https://your-production-domain.com/api/stripe/webhooks
     ```
   - Select the same events as in test mode:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Save the new webhook signing secret

2. **Test the Live Webhook** (if possible):
   - Use the Stripe Dashboard to send test events to your production webhook
   - Check your logs to ensure events are being received and processed

## Step 3: Update Environment Variables

1. **Update Next.js Environment Variables**:
   - In your production environment, update:
     ```
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
     STRIPE_SECRET_KEY=sk_live_...
     STRIPE_WEBHOOK_SECRET=whsec_live_...
     NEXT_PUBLIC_STRIPE_PORTAL_LINK=https://billing.stripe.com/p/login/live_...
     NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO_YEARLY=https://buy.stripe.com/live_...
     NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO_MONTHLY=https://buy.stripe.com/live_...
     NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BUSINESS_YEARLY=https://buy.stripe.com/live_...
     NEXT_PUBLIC_STRIPE_PAYMENT_LINK_BUSINESS_MONTHLY=https://buy.stripe.com/live_...
     ```

2. **Update FastAPI Environment Variables** (if using FastAPI webhook):
   - In your production environment, update:
     ```
     STRIPE_SECRET_KEY=sk_live_...
     STRIPE_WEBHOOK_SECRET=whsec_live_...
     ```

## Step 4: Deploy and Test

1. **Deploy Your Application**:
   - Deploy your application to your production domain
   - Ensure your webhook endpoint is accessible from the internet

2. **Test the Live Integration**:
   - Create a real subscription (using a real card)
   - Verify that the webhook events are received and processed
   - Check that the user's subscription status is updated correctly

3. **Test the Customer Portal**:
   - Access the customer portal
   - Update or cancel the subscription
   - Verify that the webhook events are received and processed

## Step 5: Monitor and Maintain

1. **Set Up Monitoring**:
   - Monitor webhook events in the Stripe Dashboard
   - Set up alerts for failed webhook deliveries
   - Regularly check for failed payments

2. **Implement Error Handling**:
   - Ensure your application can handle temporary Stripe outages
   - Implement retry logic for failed API calls
   - Log all Stripe-related errors for debugging

3. **Stay Updated**:
   - Keep your Stripe libraries up to date
   - Monitor Stripe API changes and deprecations
   - Test your integration after major updates

## Security Considerations

1. **Protect Your API Keys**:
   - Never expose your secret key in client-side code
   - Rotate keys if you suspect they've been compromised
   - Use restricted API keys when possible

2. **Validate Webhook Signatures**:
   - Always verify webhook signatures to prevent fraud
   - Keep your webhook secret secure

3. **PCI Compliance**:
   - Use Stripe Elements or Checkout to avoid handling card data
   - Follow Stripe's security best practices

## Rollback Plan

In case of issues with the production integration:

1. **Temporary Fallback**:
   - Have a mechanism to temporarily disable paid features
   - Implement a grace period for subscription verification

2. **Communication Plan**:
   - Prepare communication templates for payment issues
   - Have a support process for subscription-related questions

3. **Monitoring Alerts**:
   - Set up alerts for unusual payment patterns
   - Monitor failed webhook deliveries and API errors 