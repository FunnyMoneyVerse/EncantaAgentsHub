/*
<ai_context>
This server page is the contact page.
</ai_context>
*/

"use server"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Mail, Phone } from "lucide-react"

export default async function ContactPage() {
  return (
    <div className="pb-20 pt-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Have questions about Encanta? Get in touch with our team and we'll be happy to help.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center p-6 text-center">
            <MessageSquare className="mb-4 size-12 text-[#6A0DAD]" />
            <CardTitle className="mb-2">Schedule a Consultation</CardTitle>
            <CardDescription className="mb-4">
              Book a personalized demo and consultation with our experts.
            </CardDescription>
            <Button className="mt-auto bg-[#6A0DAD] hover:bg-[#5A0C9D]">
              Book a Meeting
            </Button>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center">
            <Mail className="mb-4 size-12 text-[#6A0DAD]" />
            <CardTitle className="mb-2">Email Us</CardTitle>
            <CardDescription className="mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </CardDescription>
            <a href="mailto:hello@encanta.ai" className="mt-auto">
              <Button variant="outline" className="border-[#6A0DAD] text-[#6A0DAD] hover:bg-[#6A0DAD] hover:text-white">
                hello@encanta.ai
              </Button>
            </a>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center">
            <Phone className="mb-4 size-12 text-[#6A0DAD]" />
            <CardTitle className="mb-2">Call Us</CardTitle>
            <CardDescription className="mb-4">
              Speak directly with our customer support team.
            </CardDescription>
            <a href="tel:+1234567890" className="mt-auto">
              <Button variant="outline" className="border-[#6A0DAD] text-[#6A0DAD] hover:bg-[#6A0DAD] hover:text-white">
                +1 (234) 567-890
              </Button>
            </a>
          </Card>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your message" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-32"
                  />
                </div>
                <Button className="w-full bg-[#6A0DAD] hover:bg-[#5A0C9D]">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
