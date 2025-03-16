# Testing Stripe Webhooks

This guide provides step-by-step instructions for testing your Stripe webhook implementation using the Stripe CLI.

## Prerequisites

1. **Install the Stripe CLI**
   - Download from [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
   - Follow the installation instructions for your operating system

2. **Log in to your Stripe account**
   ```bash
   stripe login
   ```
   This will open a browser window where you can authorize the CLI to access your Stripe account.

## Step 1: Start Your Development Server

1. **Start your Next.js app**
   ```bash
   cd encanta/apps/web
   npm run dev
   ```

2. **Verify that your app is running**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Make sure the app loads correctly

## Step 2: Start the Stripe CLI Webhook Listener

1. **Open a new terminal window**

2. **Start the webhook listener**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhooks
   ```

3. **Copy the webhook signing secret**
   - The CLI will display a webhook signing secret that looks like `whsec_...`
   - Make sure this matches the `STRIPE_WEBHOOK_SECRET` in your `.env.local` file
   - If it doesn't match, update your `.env.local` file with the new secret

## Step 3: Trigger Test Events

1. **Open a new terminal window**

2. **Trigger a checkout.session.completed event**
   ```bash
   stripe trigger checkout.session.completed
   ```

3. **Check your Next.js server logs**
   - You should see detailed logs about the webhook event
   - Verify that the event is processed correctly

4. **Trigger other subscription events**
   ```bash
   stripe trigger customer.subscription.updated
   stripe trigger customer.subscription.deleted
   ```

5. **Check your logs again**
   - Verify that each event is processed correctly

## Step 4: Verify Database Updates

1. **Check your database**
   - After processing a webhook event, verify that the user's subscription status is updated correctly
   - You can use Supabase's dashboard to check the profiles table

2. **Verify subscription status**
   - For `checkout.session.completed`, the user should have the correct membership tier
   - For `customer.subscription.updated`, the membership tier should be updated based on the subscription status
   - For `customer.subscription.deleted`, the membership tier should be downgraded to "free"

## Step 5: Test the Complete Payment Flow

1. **Go to your subscription page**
   - Navigate to the subscription page in your app

2. **Select a subscription plan**
   - Choose a plan (e.g., Pro Monthly)

3. **Complete the checkout**
   - Use a test card number (e.g., 4242 4242 4242 4242)
   - Enter any future expiry date and any CVC

4. **Check your webhook logs**
   - Verify that the `checkout.session.completed` event is received and processed
   - Check that the user's subscription status is updated correctly

5. **Test subscription management**
   - Go to the customer portal
   - Update or cancel the subscription
   - Verify that the webhook events are received and processed

## Troubleshooting

- **Webhook not receiving events**
  - Make sure the Stripe CLI is running and forwarding events
  - Check that your webhook endpoint is correct
  - Verify that your webhook secret is correct

- **Events not being processed**
  - Check your server logs for errors
  - Make sure your webhook handler is correctly parsing the event
  - Verify that your database update logic is working

- **Subscription status not updating**
  - Check that your product metadata is set correctly
  - Verify that your database update logic is working
  - Make sure your webhook handler is correctly processing the event

## Next Steps

Once you've verified that your webhook implementation is working correctly, you can proceed to:

1. **Complete the test mode integration**
   - Test all subscription flows
   - Verify that the user's subscription status is updated correctly

2. **Prepare for production**
   - Follow the steps in [stripe-production-migration.md](./stripe-production-migration.md)
   - Set up live mode products, prices, and webhooks 