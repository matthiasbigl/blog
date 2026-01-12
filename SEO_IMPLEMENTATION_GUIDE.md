# Comprehensive SEO Implementation Guide

A high-level summary of SEO optimizations for Next.js blogs/websites, including traditional SEO, AI/LLM discoverability, and structured data.

---

## 📋 Table of Contents

1. [SEO Component](#1-seo-component)
2. [Global Meta Tags (_app.tsx)](#2-global-meta-tags)
3. [Document Structure (_document.tsx)](#3-document-structure)
4. [Structured Data (JSON-LD)](#4-structured-data-json-ld)
5. [Static Files](#5-static-files)
6. [Dynamic Feeds](#6-dynamic-feeds)
7. [Next.js Configuration](#7-nextjs-configuration)
8. [AI/LLM Discoverability](#8-aillm-discoverability)
9. [Checklist](#9-implementation-checklist)

---

## 1. SEO Component

Create a reusable `<SEO />` component for page-level meta tags.

### Props
```typescript
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  slug?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}
```

### Key Meta Tags
```html
<!-- Primary -->
<title>{title} | {siteName}</title>
<meta name="description" content="..." />
<meta name="keywords" content="..." />
<meta name="author" content="..." />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="..." />

<!-- Open Graph -->
<meta property="og:type" content="website|article" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
<meta property="og:site_name" content="..." />

<!-- Article-specific OG -->
<meta property="article:published_time" content="..." />
<meta property="article:modified_time" content="..." />
<meta property="article:author" content="..." />
<meta property="article:tag" content="..." />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@handle" />
<meta name="twitter:creator" content="@handle" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

---

## 2. Global Meta Tags

Add to `_app.tsx` inside `<Head>`:

```html
<!-- Verification -->
<meta name="google-site-verification" content="..." />

<!-- Charset & Viewport -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Favicon & Icons -->
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Theme Colors -->
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#f8f9fa" media="(prefers-color-scheme: light)" />

<!-- Author Info -->
<meta name="author" content="Your Name" />
<meta name="creator" content="Your Name" />
<meta name="publisher" content="Your Name" />

<!-- App Names -->
<meta name="application-name" content="Site Name" />
<meta name="apple-mobile-web-app-title" content="Site Name" />

<!-- RSS Feed Auto-Discovery -->
<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />

<!-- Identity Links -->
<link rel="me" href="https://github.com/username" />
<link rel="me" href="https://linkedin.com/in/username" />

<!-- Performance -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

---

## 3. Document Structure

Create `_document.tsx`:

```tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Font preloads */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 4. Structured Data (JSON-LD)

Add to SEO component via `<script type="application/ld+json">`:

### Person Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "alternateName": "Nickname",
  "url": "https://yoursite.com",
  "sameAs": [
    "https://github.com/username",
    "https://linkedin.com/in/username"
  ],
  "jobTitle": "Your Title"
}
```

### Website Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Site Name",
  "url": "https://yoursite.com",
  "description": "...",
  "author": { "@type": "Person", "name": "..." },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yoursite.com/search?q={search_term}",
    "query-input": "required name=search_term"
  }
}
```

### Article Schema (for blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "description": "...",
  "image": "...",
  "url": "...",
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-02",
  "author": { "@type": "Person", "name": "..." },
  "publisher": { "@type": "Person", "name": "..." }
}
```

---

## 5. Static Files

### `/public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml

Disallow: /api/
Disallow: /_next/

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

### `/public/site.webmanifest`
```json
{
  "name": "Site Name",
  "short_name": "Site",
  "description": "...",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#1a1a2e",
  "icons": [...]
}
```

### `/public/humans.txt`
```
/* TEAM */
Author: Your Name
Site: https://yoursite.com
GitHub: https://github.com/username

/* SITE */
Standards: HTML5, CSS3
Software: Next.js, React
```

---

## 6. Dynamic Feeds

### Sitemap (`/pages/sitemap.xml.jsx`)
```jsx
export async function getServerSideProps({ res }) {
  const posts = await getPosts();
  const sitemap = generateSitemap(posts);
  
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(sitemap);
  res.end();
  
  return { props: {} };
}
```

### RSS Feed (`/pages/feed.xml.jsx`)
```jsx
export async function getServerSideProps({ res }) {
  const posts = await getPosts();
  const feed = generateRssFeed(posts);
  
  res.setHeader('Content-Type', 'application/rss+xml');
  res.setHeader('Cache-Control', 'public, s-maxage=900');
  res.write(feed);
  res.end();
  
  return { props: {} };
}
```

RSS Feed Structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="..." xmlns:dc="...">
  <channel>
    <title>Site Name</title>
    <link>https://yoursite.com</link>
    <description>...</description>
    <language>en</language>
    <lastBuildDate>...</lastBuildDate>
    <atom:link href=".../feed.xml" rel="self" type="application/rss+xml"/>
    <ttl>60</ttl>
    
    <item>
      <title>Post Title</title>
      <link>...</link>
      <guid isPermaLink="true">...</guid>
      <description>...</description>
      <pubDate>...</pubDate>
      <dc:creator>Author Name</dc:creator>
      <category>...</category>
    </item>
  </channel>
</rss>
```

---

## 7. Next.js Configuration

### `next.config.js`
```js
module.exports = {
  // Remove X-Powered-By header
  poweredByHeader: false,
  
  // Consistent URLs
  trailingSlash: false,
  
  // Compression
  compress: true,
  
  // Security & caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
```

---

## 8. AI/LLM Discoverability

### `/public/llms.txt`
Markdown-formatted file for AI systems:
```markdown
# Site Name
> Description of your site for AI systems.

## About the Author
- **Name:** Your Name
- **Website:** https://yoursite.com
- **GitHub:** https://github.com/username

## Content Overview
Topics covered, content types, etc.

## Keywords
keyword1, keyword2, keyword3
```

### `/public/ai.txt`
Machine-readable AI policy:
```ini
[identity]
name = Your Name
type = Person

[site]
name = Site Name
description = ...

[ai_policy]
training_allowed = yes
indexing_allowed = yes
citation_required = preferred
```

### AI Meta Tags (in SEO component)
```html
<meta name="ai-content-declaration" content="human-authored" />
<meta name="ai-training" content="allowed" />
<meta name="ai-indexing" content="allowed" />
<meta name="citation_author" content="Your Name" />
<meta name="citation_title" content="Page Title" />
<meta name="citation_public_url" content="https://..." />
```

---

## 9. Implementation Checklist

### Files to Create
- [ ] `components/SEO.jsx` - Reusable SEO component
- [ ] `pages/_document.tsx` - HTML lang attribute
- [ ] `pages/sitemap.xml.jsx` - Dynamic sitemap
- [ ] `pages/feed.xml.jsx` - RSS feed
- [ ] `public/robots.txt` - Crawler instructions
- [ ] `public/site.webmanifest` - PWA manifest
- [ ] `public/humans.txt` - Human-readable credits
- [ ] `public/llms.txt` - AI discovery file
- [ ] `public/ai.txt` - AI policy file

### Files to Modify
- [ ] `pages/_app.tsx` - Global meta tags, RSS link
- [ ] `next.config.js` - Headers, security
- [ ] `components/Header.jsx` - Brand consistency
- [ ] `components/Footer.jsx` - Author info, RSS link

### Assets to Create
- [ ] `/public/og-image.png` - 1200x630px social image
- [ ] `/public/favicon.ico` - Favicon
- [ ] `/public/apple-touch-icon.png` - 180x180px
- [ ] `/public/icon-192.png` - PWA icon
- [ ] `/public/icon-512.png` - PWA icon

### External Steps
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate RSS with [W3C Feed Validator](https://validator.w3.org/feed/)
- [ ] Test OG tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Quick Reference: Target Keywords Strategy

To rank for a personal name (e.g., "Your Name"):

1. **Title Format:** `{Page} | Site Name - Your Name`
2. **Include name in:** descriptions, author tags, footer, structured data
3. **Use alternate names:** if you have a nickname, add `alternateName` to Person schema
4. **Link social profiles:** `rel="me"` links + `sameAs` in schema
5. **Consistent branding:** same name format across all pages

---

*Last Updated: December 2024*
