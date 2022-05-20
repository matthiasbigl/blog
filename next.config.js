/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: ["media.graphassets.com", "sfkp.ch"],
        source: '/blog/:slug',


        dangerouslyAllowSVG: true
    },
    reactStrictMode: true,
}
