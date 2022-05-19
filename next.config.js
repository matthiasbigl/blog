/** @type {import('next').NextConfig} */
module.exports = {
  images:{
    domains: ["media.graphassets.com", "sfkp.ch"],


    dangerouslyAllowSVG: true
  },
  env: {
    NEXT_PUBLIC_GRAPHCMS_ENDPOINT:process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    GRAPHCMS_TOKEN: process.env.GRAPHCMS_TOKEN,
  },
  reactStrictMode: true,
}
