import { Metadata } from 'next';
import ContactForm from '@/components/marketing/ContactForm';
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | Encanta',
    description: 'Get in touch with the Encanta team. Whether you have questions about our platform, need assistance, or want to discuss enterprise solutions, we\'re here to help.',
};

export default function ContactPage() {
    return (
        <main className="flex-grow">
            <section className="py-20 bg-gradient-to-b from-purple-50 via-white to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-4">
                            Get in touch
                        </h1>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Have questions about Encanta? Want to learn more about our platform or discuss enterprise solutions? We're here to help.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">
                                    Contact Information
                                </h2>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-purple-100 rounded-full p-3 text-purple-800">
                                            <MailIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <p className="text-gray-700 mt-1">hello@encanta.io</p>
                                            <p className="text-gray-700">support@encanta.io</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-purple-100 rounded-full p-3 text-purple-800">
                                            <PhoneIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Phone</h3>
                                            <p className="text-gray-700 mt-1">+44 (0) 20 1234 5678</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-purple-100 rounded-full p-3 text-purple-800">
                                            <MapPinIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Office</h3>
                                            <p className="text-gray-700 mt-1">123 Innovation Street</p>
                                            <p className="text-gray-700">London, EC1A 1BB</p>
                                            <p className="text-gray-700">United Kingdom</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-purple-100 rounded-full p-3 text-purple-800">
                                            <ClockIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">Hours</h3>
                                            <p className="text-gray-700 mt-1">Monday - Friday: 9am - 6pm GMT</p>
                                            <p className="text-gray-700">Saturday - Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">
                                    Schedule a Demo
                                </h2>
                                <p className="text-gray-700 mb-4">
                                    Want to see Encanta in action? Schedule a personalized demo with our product specialists.
                                </p>
                                <a
                                    href="https://calendly.com/encanta/demo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-purple-800 hover:bg-purple-900 text-white px-6 py-3 rounded-md font-medium transition-colors"
                                >
                                    Book a Demo
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">
                                Send us a message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto rounded-xl overflow-hidden h-96 shadow-md border border-gray-200">
                        {/* This would be replaced with an actual map component in production */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">Interactive Map Would Be Displayed Here</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 