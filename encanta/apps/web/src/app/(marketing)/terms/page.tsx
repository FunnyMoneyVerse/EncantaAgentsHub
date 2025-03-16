import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service | Encanta',
    description: 'Review Encanta\'s terms of service and legal agreements for using our AI-powered content platform.',
};

export default function TermsPage() {
    return (
        <main className="flex-grow">
            <div className="bg-gradient-to-b from-purple-50 via-white to-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Last updated: March 1, 2025
                        </p>

                        <div className="prose prose-purple max-w-none">
                            <p>
                                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Encanta website and platform (the "Service") operated by Encanta Ltd ("us", "we", or "our").
                            </p>

                            <p>
                                Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
                            </p>

                            <p>
                                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.
                            </p>

                            <h2>1. Communications</h2>
                            <p>
                                By creating an account on our Service, you agree to subscribe to newsletters, marketing or promotional materials, and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
                            </p>

                            <h2>2. Subscriptions</h2>
                            <p>
                                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
                            </p>

                            <p>
                                At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Encanta Ltd cancels it. You may cancel your Subscription renewal through your online account management page.
                            </p>

                            <p>
                                A valid payment method, including credit card or other payment methods, is required to process the payment for your Subscription. You shall provide Encanta Ltd with accurate and complete billing information including full name, address, state, zip code, telephone number, and valid payment method information. By submitting such payment information, you automatically authorize Encanta Ltd to charge all Subscription fees incurred through your account to any such payment instruments.
                            </p>

                            <p>
                                Should automatic billing fail to occur for any reason, Encanta Ltd will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.
                            </p>

                            <h2>3. Free Trial</h2>
                            <p>
                                Encanta Ltd may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").
                            </p>

                            <p>
                                You may be required to enter your billing information in order to sign up for the Free Trial.
                            </p>

                            <p>
                                If you do enter your billing information when signing up for the Free Trial, you will not be charged by Encanta Ltd until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.
                            </p>

                            <p>
                                At any time and without notice, Encanta Ltd reserves the right to (i) modify the terms and conditions of the Free Trial offer, or (ii) cancel such Free Trial offer.
                            </p>

                            <h2>4. Content</h2>
                            <p>
                                Our Service allows you to generate, post, link to, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for ensuring that you have all necessary rights, licenses, and permissions to use any content that you input into the Service, including any content that is used to guide or inform the AI-generated outputs.
                            </p>

                            <p>
                                You retain any rights you may have in the content you submit to the Service. However, by submitting content to the Service, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content in any and all media or distribution methods, for the purposes of providing and improving the Service.
                            </p>

                            <h2>5. AI-Generated Content</h2>
                            <p>
                                The Service uses artificial intelligence to generate content based on your inputs and instructions. You understand and acknowledge that:
                            </p>

                            <ul>
                                <li>AI-generated content may not always be accurate, appropriate, or aligned with your intentions.</li>
                                <li>You are responsible for reviewing and editing any AI-generated content before using it for your purposes.</li>
                                <li>Encanta Ltd does not claim ownership of AI-generated outputs created through the Service, and upon generation, the rights to use such outputs are granted to you, subject to these Terms.</li>
                                <li>You are responsible for ensuring that your use of AI-generated content complies with applicable laws and does not infringe on the rights of third parties.</li>
                                <li>Encanta Ltd may use content generated through the Service to improve our AI models, but we will not claim ownership or rights to content you create using our Service.</li>
                            </ul>

                            <h2>6. Accounts</h2>
                            <p>
                                When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
                            </p>

                            <p>
                                You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                            </p>

                            <h2>7. Intellectual Property</h2>
                            <p>
                                The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Encanta Ltd and its licensors. The Service is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Encanta Ltd.
                            </p>

                            <h2>8. Links To Other Web Sites</h2>
                            <p>
                                Our Service may contain links to third-party websites or services that are not owned or controlled by Encanta Ltd.
                            </p>

                            <p>
                                Encanta Ltd has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
                            </p>

                            <p>
                                You acknowledge and agree that Encanta Ltd shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third-party websites or services.
                            </p>

                            <p>
                                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
                            </p>

                            <h2>9. Termination</h2>
                            <p>
                                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                            </p>

                            <p>
                                If you wish to terminate your account, you may simply discontinue using the Service or contact our support team to request account deletion.
                            </p>

                            <p>
                                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                            </p>

                            <h2>10. Limitation Of Liability</h2>
                            <p>
                                In no event shall Encanta Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                            </p>

                            <h2>11. Disclaimer</h2>
                            <p>
                                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                            </p>

                            <p>
                                Encanta Ltd, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                            </p>

                            <h2>12. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
                            </p>

                            <p>
                                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
                            </p>

                            <h2>13. Changes</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>

                            <p>
                                By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                            </p>

                            <h2>14. Data Protection</h2>
                            <p>
                                The processing of personal data is governed by our <Link href="/privacy" className="text-purple-800 hover:text-purple-700">Privacy Policy</Link>, which forms part of these Terms.
                            </p>

                            <h2>15. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <ul>
                                <li>By email: legal@encanta.io</li>
                                <li>By visiting this page on our website: <Link href="/contact" className="text-purple-800 hover:text-purple-700">https://encanta.io/contact</Link></li>
                                <li>By mail: Encanta Ltd, 123 Innovation Street, London, EC1A 1BB, United Kingdom</li>
                            </ul>
                        </div>

                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <p className="text-gray-600 text-sm">
                                If you have any questions about our Terms of Service, please <Link href="/contact" className="text-purple-800 hover:text-purple-700">contact us</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 