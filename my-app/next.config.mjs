/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['i.postimg.cc', 'lh3.googleusercontent.com']
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/blog',
          permanent: true, // This indicates a 308 permanent redirect
        },
      ]
    },
  };
  
  export default nextConfig;