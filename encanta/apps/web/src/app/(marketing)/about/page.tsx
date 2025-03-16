import { Metadata } from 'next';
import Image from 'next/image';
import CTASection from '@/components/marketing/CTASection';
import { ArrowRightIcon } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us | Encanta',
    description:
        "Learn about Encanta's story, our mission to democratize content creation, and the founder behind our AI-powered platform for startups and SMEs.",
};

// Currently, the team consists solely of our Founder.
// Future team members will be added as the company grows.
const teamMembers = [
    {
        name: 'Naeem Shabir',
        role: 'Founder & CEO',
        bio: 'A marketing expert with over 8 years of experience working with startups and SMEs. Naeem has successfully led marketing initiatives in the web3 and tech space, driving user engagement and strategic growth. As the sole founder of Encanta, he is dedicated to building a platform that empowers businesses to create professional, strategically aligned content without the need for specialized marketing skills.',
        imageSrc: '/images/team/naeem.jpg',
    },
];

// Define company values
const values = [
    {
        title: 'Democratize Content Creation',
        description:
            'We believe every business should access professional, strategic content without specialized expertise or high costs.',
    },
    {
        title: 'Blend AI with Human Expertise',
        description:
            'Our platform enhances human creativity by combining advanced AI with deep strategic marketing insights.',
    },
    {
        title: 'Prioritize Strategic Value',
        description:
            'We focus on content that drives measurable business results, aligning every piece with strategic goals.',
    },
    {
        title: 'Commit to Quality',
        description:
            'Our robust quality assurance systems ensure every output meets professional standards and resonates with audiences.',
    },
    {
        title: 'Practice Radical Simplicity',
        description:
            'We make sophisticated marketing capabilities accessible through intuitive interfaces, guided workflows, and contextual assistance.',
    },
    {
        title: 'Foster Continuous Learning',
        description:
            'We continually evolve our platform based on user feedback, marketing best practices, and advances in AI technology.',
    },
];

export default function AboutPage() {
    return (
        <main className="flex-grow">
            {/* Hero Section */}
            <section
                className="py-20 bg-gradient-to-b from-purple-50 via-white to-white"
                aria-label="Introduction"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-6">
                            Our Mission is to Democratize Professional Content Creation
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Encanta was founded with a simple yet powerful vision: empower startups and SMEs to produce high-quality, strategically aligned content through AI-driven innovation and expert marketing guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white" aria-labelledby="our-story-heading">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <article className="relative rounded-xl overflow-hidden shadow-xl border border-gray-100 aspect-[4/3]">
                            <Image
                                src="/images/about/founding-story.jpg"
                                alt="Visual representation of Encanta's founding story"
                                fill
                                className="object-cover"
                                priority
                            />
                        </article>
                        <article className="space-y-6">
                            <h2 id="our-story-heading" className="text-3xl font-bold font-montserrat text-gray-900">
                                Our Story
                            </h2>
                            <p className="text-gray-700">
                                Encanta was born in 2024 when our founder, Naeem Shabir, identified a critical gap: startups and SMEs were struggling to produce strategic, high-quality content due to limited resources and expertise.
                            </p>
                            <p className="text-gray-700">
                                With years of experience in marketing and digital strategy, Naeem set out to create a platform that marries advanced AI technology with human marketing insight, ensuring that every business, regardless of size, could access professional-grade content.
                            </p>
                            <p className="text-gray-700">
                                Today, while Encanta is driven solely by Naeem's vision and expertise, the foundation is firmly in place for a world-class team to join as the platform grows.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-purple-50" aria-labelledby="our-values-heading">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 id="our-values-heading" className="text-3xl font-bold font-montserrat text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Our core principles drive everything we do at Encanta.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-purple-100">
                                <h3 className="text-xl font-bold font-montserrat text-purple-800 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-700">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white" aria-labelledby="team-heading">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 id="team-heading" className="text-3xl font-bold font-montserrat text-gray-900 mb-4">
                            Meet Our Founder
                        </h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                            Currently, Encanta is led by its founder, Naeem Shabir, a seasoned marketing expert with a passion for innovative content solutions.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                                <div className="relative aspect-square">
                                    <Image
                                        src={member.imageSrc}
                                        alt={`Portrait of ${member.name}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-purple-700 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-700 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800 text-white" aria-label="Statistics">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        <div>
                            <h3 className="text-4xl font-bold font-montserrat mb-2">2024</h3>
                            <p className="text-purple-200">Founded</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold font-montserrat mb-2">1</h3>
                            <p className="text-purple-200">Founder</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold font-montserrat mb-2">0</h3>
                            <p className="text-purple-200">Team Members (Coming Soon)</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold font-montserrat mb-2">10M+</h3>
                            <p className="text-purple-200">Words Generated</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Careers Banner */}
            <section className="py-16 bg-white" aria-label="Join Our Team">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto bg-teal-50 rounded-xl p-8 md:p-12 border border-teal-100 shadow-sm">
                        <div className="md:flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900 mb-3">
                                    We're Building Our Dream Team
                                </h2>
                                <p className="text-gray-700 mb-6 md:mb-0 max-w-xl">
                                    Although Encanta is currently led by our founder, Naeem Shabir, we are actively seeking talented individuals who share our passion for AI and marketing. Stay tuned for open positions and join us in shaping the future of content creation.
                                </p>
                            </div>
                            <a
                                href="/careers"
                                className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                            >
                                View Open Positions
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <CTASection />
        </main>
    );
} 