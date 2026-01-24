/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's3.us-west-2.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.notion.so',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.notion.so',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;