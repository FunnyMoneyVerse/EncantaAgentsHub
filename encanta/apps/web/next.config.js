/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    },
    experimental: {
        serverActions: true,
    },
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/overview',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig; 