import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Cookie Policy | Encanta',
    description: 'Learn about how Encanta uses cookies and similar technologies to enhance your experience on our AI-powered content platform.',
};

export default function CookiePolicyPage() {
    return (
        <main className="flex-grow">
            <div className="bg-gradient-to-b from-purple-50 via-white to-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-6">
                            Cookie Policy
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Last updated: March 1, 2025
                        </p>

                        <div className="prose prose-purple max-w-none">
                            <p>
                                This Cookie Policy explains how Encanta Ltd ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                            </p>

                            <h2>1. What are cookies?</h2>
                            <p>
                                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                            </p>

                            <p>
                                Cookies set by the website owner (in this case, Encanta Ltd) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                            </p>

                            <h2>2. Why do we use cookies?</h2>
                            <p>
                                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our platform. Third parties serve cookies through our platform for analytics and other purposes.
                            </p>

                            <h2>3. Types of cookies we use</h2>
                            <p>
                                The specific types of first and third-party cookies served through our platform and the purposes they perform are described below:
                            </p>

                            <h3>3.1 Essential Cookies</h3>
                            <p>
                                These cookies are strictly necessary to provide you with services available through our platform and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the platform, you cannot refuse them without impacting how our platform functions.
                            </p>

                            <h3>3.2 Performance and Functionality Cookies</h3>
                            <p>
                                These cookies are used to enhance the performance and functionality of our platform but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                            </p>

                            <h3>3.3 Analytics and Customization Cookies</h3>
                            <p>
                                These cookies collect information that is used either in aggregate form to help us understand how our platform is being used or how effective our marketing campaigns are, or to help us customize our platform for you in order to enhance your experience.
                            </p>

                            <h3>3.4 Targeting Cookies</h3>
                            <p>
                                These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
                            </p>

                            <h2>4. How can you control cookies?</h2>
                            <p>
                                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our platform.
                            </p>

                            <p>
                                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our platform though your access to some functionality and areas may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
                            </p>

                            <p>
                                In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-purple-800 hover:text-purple-700" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-purple-800 hover:text-purple-700" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.com</a>.
                            </p>

                            <h2>5. How often will we update this Cookie Policy?</h2>
                            <p>
                                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                            </p>

                            <p>
                                The date at the top of this Cookie Policy indicates when it was last updated.
                            </p>

                            <h2>6. Where can you get further information?</h2>
                            <p>
                                If you have any questions about our use of cookies or other technologies, please email us at privacy@encanta.io or contact us at:
                            </p>

                            <p>
                                Encanta Ltd<br />
                                123 Innovation Street<br />
                                London, EC1A 1BB<br />
                                United Kingdom
                            </p>
                        </div>

                        <div className="mt-12 border-t border-gray-200 pt-8">
                            <p className="text-gray-600 text-sm">
                                For more information about how we protect your privacy, please see our <Link href="/privacy" className="text-purple-800 hover:text-purple-700">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 