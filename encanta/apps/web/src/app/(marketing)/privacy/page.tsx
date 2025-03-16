import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy | Encanta',
    description: 'Learn about how Encanta collects, uses, and protects your personal information when you use our AI-powered content platform.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="flex-grow">
            <div className="bg-gradient-to-b from-purple-50 via-white to-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Last updated: March 1, 2025
                        </p>

                        <div className="prose prose-purple max-w-none">
                            <p>
                                At Encanta, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                            </p>

                            <p>
                                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the platform.
                            </p>

                            <h2>1. Information We Collect</h2>
                            <p>
                                We collect several types of information from and about users of our platform, including:
                            </p>

                            <h3>1.1 Personal Data</h3>
                            <p>
                                When you register for an account, we collect:
                            </p>
                            <ul>
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Company name (if provided)</li>
                                <li>Billing information (for paid subscriptions)</li>
                            </ul>

                            <h3>1.2 Usage Data</h3>
                            <p>
                                We collect information about how you interact with our platform:
                            </p>
                            <ul>
                                <li>Log data (IP address, browser type, pages visited)</li>
                                <li>Device information</li>
                                <li>Feature usage statistics</li>
                                <li>Content generation and editing activities</li>
                            </ul>

                            <h3>1.3 Content Data</h3>
                            <p>
                                We collect and process content that you:
                            </p>
                            <ul>
                                <li>Input into our platform</li>
                                <li>Generate using our AI features</li>
                                <li>Upload as reference materials</li>
                                <li>Store in your workspaces</li>
                            </ul>

                            <h2>2. How We Use Your Information</h2>
                            <p>
                                We use the information we collect for various purposes, including to:
                            </p>
                            <ul>
                                <li>Provide, maintain, and improve our platform</li>
                                <li>Process and complete transactions</li>
                                <li>Send administrative information, such as updates or security alerts</li>
                                <li>Respond to customer service requests</li>
                                <li>Personalize your experience</li>
                                <li>Improve our AI models and content generation capabilities</li>
                                <li>Monitor usage patterns to optimize our service</li>
                                <li>Protect against malicious, deceptive, or illegal activity</li>
                                <li>Send marketing communications (with consent)</li>
                            </ul>

                            <h2>3. AI Training and Model Improvement</h2>
                            <p>
                                To improve our services, we may use:
                            </p>
                            <ul>
                                <li>Anonymous, aggregated usage patterns to refine our AI models</li>
                                <li>Content you generate with our platform to improve content quality (unless you opt out)</li>
                                <li>Feedback you provide about AI-generated content</li>
                            </ul>
                            <p>
                                You can opt out of having your content used for AI training in your account settings. Opting out will not affect the quality of service you receive.
                            </p>

                            <h2>4. Sharing Your Information</h2>
                            <p>
                                We may share your information in the following circumstances:
                            </p>
                            <ul>
                                <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, and other business partners who perform services on our behalf.</li>
                                <li><strong>Business Transfers:</strong> If Encanta is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                                <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
                                <li><strong>Workspace Collaborators:</strong> Information and content shared within workspaces will be accessible to other members of those workspaces.</li>
                            </ul>
                            <p>
                                We do not sell your personal information to third parties.
                            </p>

                            <h2>5. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>

                            <h2>6. Data Retention</h2>
                            <p>
                                We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                            </p>

                            <h2>7. Your Data Protection Rights</h2>
                            <p>
                                Depending on your location, you may have certain rights regarding your personal data, including:
                            </p>
                            <ul>
                                <li>The right to access your personal data</li>
                                <li>The right to rectify inaccurate personal data</li>
                                <li>The right to request deletion of your personal data</li>
                                <li>The right to restrict processing of your personal data</li>
                                <li>The right to data portability</li>
                                <li>The right to object to processing of your personal data</li>
                                <li>The right to withdraw consent</li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                            </p>

                            <h2>8. Children's Privacy</h2>
                            <p>
                                Our platform is not intended for children under the age of 16. We do not knowingly collect personal data from children under 16. If you are a parent or guardian and believe your child has provided us with personal data, please contact us, and we will take steps to delete such information.
                            </p>

                            <h2>9. Third-Party Links</h2>
                            <p>
                                Our platform may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policies of any third-party sites you visit.
                            </p>

                            <h2>10. Cookies and Tracking Technologies</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.
                            </p>
                            <p>
                                For more information about cookies, please see our <Link href="/cookies" className="text-purple-800 hover:text-purple-700">Cookie Policy</Link>.
                            </p>

                            <h2>11. International Transfers</h2>
                            <p>
                                Your information may be transferred to and processed in countries other than the country in which you are resident. These countries may have data protection laws that are different from those in your country. We have taken appropriate safeguards to require that your personal data will remain protected in accordance with this Privacy Policy.
                            </p>

                            <h2>12. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>

                            <h2>13. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul>
                                <li>By email: privacy@encanta.io</li>
                                <li>By visiting this page on our website: <Link href="/contact" className="text-purple-800 hover:text-purple-700">https://encanta.io/contact</Link></li>
                                <li>By mail: Encanta Ltd, 123 Innovation Street, London, EC1A 1BB, United Kingdom</li>
                            </ul>

                            <h2>14. Data Protection Officer</h2>
                            <p>
                                If you have questions or concerns about our processing of your personal data, you may contact our Data Protection Officer at dpo@encanta.io.
                            </p>
                        </div>

                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <p className="text-gray-600 text-sm">
                                If you have any questions about our Privacy Policy, please <Link href="/contact" className="text-purple-800 hover:text-purple-700">contact us</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 