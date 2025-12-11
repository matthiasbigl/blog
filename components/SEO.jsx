import React from 'react';
import Head from 'next/head';

const SEO = ({ title, description, image, slug, article, publishedTime, modifiedTime, tags }) => {
    // Brand-focused naming for SEO
    const siteName = 'Matthias Bigl | Bigl\'s Blog';
    const siteTitle = 'Bigl\'s Blog';
    const authorName = 'Matthias Bigl';
    const defaultDescription = 'Personal blog by Matthias Bigl (Bigl) - Exploring technology, software development, design, and innovation. Follow Bigl\'s journey through the tech world.';
    const siteUrl = 'https://bigls-blog.com';
    const currentUrl = `${siteUrl}/${slug || ''}`;
    const defaultImage = `${siteUrl}/og-image.png`;
    const twitterHandle = '@matthiasbigl';
    
    // Keywords for SEO
    const defaultKeywords = 'Matthias Bigl, Bigl, Matthias Bigl blog, Bigl blog, tech blog, software development, web development, programming, technology';
    
    // Generate full title
    const fullTitle = title 
        ? `${title} | ${siteTitle} - Matthias Bigl` 
        : `${siteTitle} - Matthias Bigl | Technology & Development Blog`;

    // Structured Data - Person Schema for author branding
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Matthias Bigl",
        "alternateName": "Bigl",
        "url": siteUrl,
        "sameAs": [
            "https://github.com/matthiasbigl",
            "https://www.linkedin.com/in/matthias-bigl-061a5419a/",
            "https://portfolio.bigls.net"
        ],
        "jobTitle": "Software Developer",
        "knowsAbout": ["Software Development", "Web Development", "Technology", "Design"]
    };

    // Structured Data - Website Schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteName,
        "alternateName": ["Bigl's Blog", "Matthias Bigl Blog"],
        "url": siteUrl,
        "description": defaultDescription,
        "author": {
            "@type": "Person",
            "name": "Matthias Bigl",
            "alternateName": "Bigl"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    // Structured Data - Blog/Article Schema
    const blogSchema = article ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description || defaultDescription,
        "image": image || defaultImage,
        "url": currentUrl,
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "author": {
            "@type": "Person",
            "name": "Matthias Bigl",
            "alternateName": "Bigl",
            "url": siteUrl
        },
        "publisher": {
            "@type": "Person",
            "name": "Matthias Bigl",
            "url": siteUrl
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
        },
        "keywords": tags ? tags.join(", ") : defaultKeywords
    } : {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": siteName,
        "description": defaultDescription,
        "url": siteUrl,
        "author": {
            "@type": "Person",
            "name": "Matthias Bigl",
            "alternateName": "Bigl"
        }
    };

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={tags ? `${defaultKeywords}, ${tags.join(", ")}` : defaultKeywords} />
            <meta name="author" content={authorName} />
            <meta name="creator" content={authorName} />
            <meta name="publisher" content={authorName} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />
            
            {/* Language and Locale */}
            <meta httpEquiv="content-language" content="en" />
            <meta name="language" content="English" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? "article" : "website"} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:image:alt" content={title || siteName} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="en_US" />
            
            {/* Article specific OG tags */}
            {article && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {article && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {article && (
                <meta property="article:author" content={authorName} />
            )}
            {article && tags && tags.map((tag, index) => (
                <meta key={index} property="article:tag" content={tag} />
            ))}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
            <meta name="twitter:image:alt" content={title || siteName} />

            {/* AI/LLM Discoverability Meta Tags */}
            <meta name="ai-content-declaration" content="human-authored" />
            <meta name="ai-training" content="allowed" />
            <meta name="ai-indexing" content="allowed" />
            <meta name="llms-txt" content={`${siteUrl}/llms.txt`} />
            <meta name="ai-txt" content={`${siteUrl}/ai.txt`} />
            
            {/* Citation hints for AI systems */}
            <meta name="citation_author" content={authorName} />
            <meta name="citation_title" content={fullTitle} />
            <meta name="citation_public_url" content={currentUrl} />
            {article && publishedTime && (
                <meta name="citation_publication_date" content={publishedTime.split('T')[0]} />
            )}

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            {/* Additional SEO Tags */}
            <meta name="theme-color" content="#1a1a2e" />
            <meta name="msapplication-TileColor" content="#1a1a2e" />
            
            {/* Preconnect for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
    );
};

export default SEO;
