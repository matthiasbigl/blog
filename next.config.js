/** @type {import('next').NextConfig} */
module.exports = {
    async headers() {
        return [
            {
                source: '/api/:slug',
                headers: [
                    {
                        key: 'Authorization',
                        value: process.env.GRAPHCMS_TOKEN,
                    }
                ]
            }]
    },
    images: {
        domains: ["media.graphassets.com", "sfkp.ch"],
        source: '/blog/:slug',


        dangerouslyAllowSVG: true
    },
    reactStrictMode: true,
}
