// const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
      return [
          {
              // matching all API routes
              source: "/hooks/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "https://api.ip2location.io" },
                  { key: "Access-Control-Allow-Methods", value: "GET" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
    },

    transpilePackages: ['lucide-react'], 
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 's3-alpha-sig.figma.com',
              pathname: '**',
            },
            {
              protocol: 'https',
              hostname: 'cloud.appwrite.io',
              port: '',
              pathname: '**',
            },
          ],
        // domains: ['s3-alpha-sig.figma.com'],
    },
    // webpack: (config, { isServer }) => {
    //     config.resolve.alias['@public'] = path.join(__dirname, 'public');
    //     return config;
    //   },
}

module.exports = nextConfig
