/*
<ai_context>
Contains server actions related to Stripe.
</ai_context>
*/

import {
  updateProfileAction,
  updateProfileByStripeCustomerIdAction
} from "@/actions/db/profiles-actions"
import { SelectProfile } from "@/db/schema"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

type MembershipStatus = SelectProfile["membership"]

const getMembershipStatus = (
  status: Stripe.Subscription.Status,
  membership: MembershipStatus
): MembershipStatus => {
  console.log(`🔍 Determining membership status from subscription status: ${status}`)
  let result: MembershipStatus;

  switch (status) {
    case "active":
    case "trialing":
      result = membership;
      console.log(`✅ Subscription is ${status}, keeping membership as: ${membership}`);
      break;
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "past_due":
    case "paused":
    case "unpaid":
      result = "free";
      console.log(`⚠️ Subscription is ${status}, downgrading to free tier`);
      break;
    default:
      result = "free";
      console.log(`❓ Unknown subscription status: ${status}, defaulting to free tier`);
      break;
  }

  return result;
}

const getSubscription = async (subscriptionId: string) => {
  console.log(`🔍 Retrieving subscription details for ID: ${subscriptionId}`)
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"]
    })
    console.log(`✅ Successfully retrieved subscription: ${subscription.id}`)
    console.log(`📊 Subscription status: ${subscription.status}`)
    console.log(`💰 Current period: ${new Date(subscription.current_period_start * 1000).toISOString()} to ${new Date(subscription.current_period_end * 1000).toISOString()}`)
    return subscription
  } catch (error) {
    console.error(`❌ Error retrieving subscription: ${error instanceof Error ? error.message : 'Unknown error'}`)
    throw error
  }
}

export const updateStripeCustomer = async (
  userId: string,
  subscriptionId: string,
  customerId: string
) => {
  console.log(`🔄 Updating Stripe customer for user: ${userId}`)
  console.log(`👤 Customer ID: ${customerId}`)
  console.log(`🔄 Subscription ID: ${subscriptionId}`)

  try {
    if (!userId || !subscriptionId || !customerId) {
      console.error(`❌ Missing required parameters for updateStripeCustomer`)
      throw new Error("Missing required parameters for updateStripeCustomer")
    }

    console.log(`🔍 Retrieving subscription details...`)
    const subscription = await getSubscription(subscriptionId)

    console.log(`📝 Updating user profile with Stripe details...`)
    const result = await updateProfileAction(userId, {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id
    })

    if (!result.isSuccess) {
      console.error(`❌ Failed to update customer profile: ${result.message}`)
      throw new Error("Failed to update customer profile")
    }

    console.log(`✅ Successfully updated customer profile`)
    return result.data
  } catch (error) {
    console.error(`❌ Error in updateStripeCustomer: ${error instanceof Error ? error.message : 'Unknown error'}`)
    throw error instanceof Error
      ? error
      : new Error("Failed to update Stripe customer")
  }
}

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  productId: string
): Promise<MembershipStatus> => {
  console.log(`🔄 Managing subscription status change`)
  console.log(`👤 Customer ID: ${customerId}`)
  console.log(`🔄 Subscription ID: ${subscriptionId}`)
  console.log(`🏷️ Product ID: ${productId}`)

  try {
    if (!subscriptionId || !customerId || !productId) {
      console.error(`❌ Missing required parameters for manageSubscriptionStatusChange`)
      throw new Error(
        "Missing required parameters for manageSubscriptionStatusChange"
      )
    }

    console.log(`🔍 Retrieving subscription details...`)
    const subscription = await getSubscription(subscriptionId)

    console.log(`🔍 Retrieving product details for ID: ${productId}`)
    const product = await stripe.products.retrieve(productId)
    console.log(`✅ Successfully retrieved product: ${product.name}`)

    const membership = product.metadata.membership as MembershipStatus
    console.log(`🏷️ Product metadata membership: ${membership}`)

    if (!["free", "pro", "business"].includes(membership)) {
      console.error(`❌ Invalid membership type in product metadata: ${membership}`)
      throw new Error(
        `Invalid membership type in product metadata: ${membership}`
      )
    }

    console.log(`🔍 Determining final membership status based on subscription status...`)
    const membershipStatus = getMembershipStatus(
      subscription.status,
      membership
    )
    console.log(`📊 Final membership status: ${membershipStatus}`)

    console.log(`📝 Updating user profile by Stripe customer ID...`)
    const updateResult = await updateProfileByStripeCustomerIdAction(
      customerId,
      {
        stripeSubscriptionId: subscription.id,
        membership: membershipStatus
      }
    )

    if (!updateResult.isSuccess) {
      console.error(`❌ Failed to update subscription status: ${updateResult.message}`)
      throw new Error("Failed to update subscription status")
    }

    console.log(`✅ Successfully updated subscription status to: ${membershipStatus}`)
    return membershipStatus
  } catch (error) {
    console.error(`❌ Error in manageSubscriptionStatusChange: ${error instanceof Error ? error.message : 'Unknown error'}`)
    throw error instanceof Error
      ? error
      : new Error("Failed to update subscription status")
  }
}
