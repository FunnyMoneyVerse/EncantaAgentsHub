/*
<ai_context>
This server page is the marketing homepage.
</ai_context>
*/

"use server"

import { FeaturesSection } from "@/components/landing/features"
import { HeroSection } from "@/components/landing/hero"
import { PricingSection } from "@/components/landing/pricing"

export default async function HomePage() {
  return (
    <div className="pb-20">
      <HeroSection />
      {/* social proof */}
      <FeaturesSection />
      <PricingSection />
      {/* faq */}
      {/* blog */}
      {/* footer */}
    </div>
  )
}
