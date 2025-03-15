/*
<ai_context>
This client component provides the features section for the landing page.
</ai_context>
*/

"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Layers,
  Users,
  Palette,
  FileText,
  Brain,
  CreditCard,
  Lightbulb,
  LucideIcon
} from "lucide-react"

interface FeatureProps {
  title: string
  description: string
  icon: LucideIcon
}

const features: FeatureProps[] = [
  {
    title: "Modular AI Workflows",
    description: "Custom AI agents for ideation, research, drafting, and editing with automated quality checks.",
    icon: Brain
  },
  {
    title: "Workspace Collaboration",
    description: "Create and manage multiple workspaces with role-based access controls and real-time collaboration.",
    icon: Users
  },
  {
    title: "Brand Customization",
    description: "Upload logos, select color palettes, and configure typography with tone and messaging guidelines.",
    icon: Palette
  },
  {
    title: "Knowledge Management",
    description: "Upload external documents with semantic search using vector embeddings for contextual retrieval.",
    icon: FileText
  },
  {
    title: "Content Generation",
    description: "Real-time progress tracking on AI tasks with user-friendly interfaces for content review and editing.",
    icon: Layers
  },
  {
    title: "Payment Management",
    description: "Stripe integration for managing recurring subscriptions, trial periods, and customer billing.",
    icon: CreditCard
  },
  {
    title: "Guided Onboarding",
    description: "Interactive walkthroughs, pre-built templates, tooltips, and FAQ resources for all users.",
    icon: Lightbulb
  }
]

const FeatureCard = ({ title, description, icon: Icon }: FeatureProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="transform-gpu"
  >
    <Card className="group h-full transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <Icon className="mb-2 size-12 text-[#6A0DAD]" />
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
)

export const FeaturesSection = () => {
  return (
    <section className="mt-20 bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-center text-4xl font-bold">Powerful Features</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
            Encanta combines advanced AI technology with strategic marketing expertise to deliver a comprehensive content creation platform.
          </p>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
