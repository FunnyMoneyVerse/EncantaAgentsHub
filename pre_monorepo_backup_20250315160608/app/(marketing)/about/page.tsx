/*
<ai_context>
This server page is the about page.
</ai_context>
*/

"use server"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, Rocket, Target, Award } from "lucide-react"
import Link from "next/link"

export default async function AboutPage() {
  return (
    <div className="pb-20 pt-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold">About Encanta</h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            We're on a mission to democratize strategic content creation for startups and SMEs by combining AI technology with marketing expertise.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-lg">
              <p>
                Encanta was born from a simple observation: small businesses and startups struggle to create professional, strategic content without specialized marketing expertise or expensive agencies.
              </p>
              <p>
                Our founders, with backgrounds in both AI technology and strategic marketing, saw an opportunity to bridge this gap by creating a platform that combines the power of AI with human marketing expertise.
              </p>
              <p>
                Today, Encanta helps businesses of all sizes produce high-quality, on-brand content that drives results, without requiring specialized skills or breaking the bank.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-[#6A0DAD] shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD] to-[#00B4D8]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">Encanta</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Innovation",
                description: "We constantly push the boundaries of what's possible with AI and content creation.",
                icon: Brain
              },
              {
                title: "Accessibility",
                description: "We believe powerful marketing tools should be accessible to businesses of all sizes.",
                icon: Users
              },
              {
                title: "Excellence",
                description: "We're committed to delivering the highest quality content and user experience.",
                icon: Award
              },
              {
                title: "Results-Driven",
                description: "Everything we do is focused on helping our customers achieve their business goals.",
                icon: Target
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="flex flex-col items-center p-6 text-center">
                  <Icon className="mb-4 size-12 text-[#6A0DAD]" />
                  <CardTitle className="mb-2">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-[#6A0DAD] to-[#00B4D8] p-10 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">Ready to transform your content?</h2>
          <p className="mb-8 text-lg">
            Join thousands of businesses already using Encanta to create professional, strategic content without specialized skills.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button className="bg-white text-[#6A0DAD] hover:bg-gray-100">
                <Rocket className="mr-2 size-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
