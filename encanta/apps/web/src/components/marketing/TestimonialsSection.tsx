"use client"

import { motion } from 'framer-motion'

const testimonials = [
    {
        quote: "Encanta has transformed our content strategy. We're now producing consistent, high-quality content that resonates with our audience, and we've seen a 40% increase in engagement.",
        author: "Sarah Johnson",
        title: "Marketing Director, TechStart",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
        quote: "The AI workflows are incredibly intuitive, and the ability to customize our brand voice has been game-changing. Our content now feels consistent across all channels.",
        author: "Michael Chen",
        title: "Founder, GrowthLabs",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    },
    {
        quote: "As a small team, we struggled to produce enough content. With Encanta, we've 3x our output while maintaining quality. The consulting service was particularly valuable for us.",
        author: "Emily Rodriguez",
        title: "Content Manager, Elevate",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
    }
]

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-purple-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-montserrat">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Hear from businesses that have transformed their content strategy with Encanta
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-6">
                                <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>
                            <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
} 