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
        API_SERVER: process.env.API_SERVER
    }
}

module.exports = nextConfig
