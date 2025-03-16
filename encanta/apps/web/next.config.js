/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    },
    // Server Actions are enabled by default in Next.js 15
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/overview',
                permanent: true,
            },
        ];
    },
    // Use the new serverExternalPackages option instead of the deprecated serverComponentsExternalPackages
    serverExternalPackages: [],
    // Remove the deprecated devIndicators.buildActivity option
};

module.exports = nextConfig; 