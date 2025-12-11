/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: ["media.graphassets.com", "sfkp.ch"],
        dangerouslyAllowSVG: true
    },
    reactStrictMode: true,
    
    // SEO-friendly configuration
    poweredByHeader: false, // Remove X-Powered-By header for security
    
    // Trailing slashes for consistent URLs
    trailingSlash: false,
    
    // Compression for better performance
    compress: true,
    
    // Headers for SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                // Cache static assets for better performance
                source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
    
    // Redirects for SEO (add any legacy URL redirects here)
    async redirects() {
        return [
            // Example: redirect old URLs to new ones
            // {
            //     source: '/old-path',
            //     destination: '/new-path',
            //     permanent: true,
            // },
        ];
    },
}
