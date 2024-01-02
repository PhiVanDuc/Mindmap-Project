/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true
            }
        ]
    },
    env: {
        API: process.env.API
    }
}

module.exports = nextConfig
