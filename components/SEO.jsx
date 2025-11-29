import React from 'react';
import Head from 'next/head';

const SEO = ({ title, description, image, slug }) => {
    const siteName = 'Bigls Blog';
    const defaultDescription = 'A modern blog exploring technology and design.';
    const currentUrl = `https://bigls-blog.com/${slug || ''}`;

    return (
        <Head>
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Open Graph */}
            <meta property="og:title" content={title || siteName} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteName} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {image && <meta name="twitter:image" content={image} />}
        </Head>
    );
};

export default SEO;
