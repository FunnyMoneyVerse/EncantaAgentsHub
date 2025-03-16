import { Metadata } from 'next';
import PricingTable from '@/components/marketing/PricingTable';
import FAQ from '@/components/marketing/FAQ';
import CTASection from '@/components/marketing/CTASection';

export const metadata: Metadata = {
    title: 'Pricing | Encanta',
    description: 'Explore Encanta\'s flexible pricing plans designed for startups and SMEs. From free to enterprise, find the perfect plan for your content needs.',
};

export default async function PricingPage() {
    return (
        <main className="flex-grow">
            <section className="py-20 bg-gradient-to-b from-purple-50 via-white to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-6">
                            Simple, transparent pricing
                        </h1>
                        <p className="text-lg text-gray-700">
                            Choose the plan that's right for your business. All plans include a 14-day free trial with no credit card required.
                        </p>
                    </div>

                    <PricingTable />
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-700">
                            Have questions about Encanta? Find answers to common questions below.
                        </p>
                    </div>

                    <FAQ />
                </div>
            </section>

            <CTASection />
        </main>
    );
} 