/*
<ai_context>
This server page is the pricing page.
</ai_context>
*/

"use server"

import { PricingSection } from "@/components/landing/pricing"

export default async function PricingPage() {
  return (
    <div className="pb-20 pt-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold">Pricing Plans</h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Choose the plan that works best for your business. All plans include our core AI content generation features.
        </p>
      </div>
      <PricingSection />
    </div>
  )
}
