import { getPosts } from '../services';

const SITE_URL = 'https://bigls-blog.com';

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <!-- Homepage -->
    <url>
        <loc>${SITE_URL}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Blog Posts -->
    ${posts
        .map(({ node }) => {
            return `
    <url>
        <loc>${SITE_URL}/post/${node.slug}</loc>
        <lastmod>${node.updatedAt || node.createdAt}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
        ${node.featuredImage?.url ? `
        <image:image>
            <image:loc>${node.featuredImage.url}</image:loc>
            <image:title>${node.title}</image:title>
        </image:image>` : ''}
    </url>`;
        })
        .join('')}
</urlset>`;
}

function SiteMap() {
    // getServerSideProps will handle the response
}

export async function getServerSideProps({ res }) {
    // Fetch all posts
    const postsResult = await getPosts(0, 1000);
    const posts = postsResult?.edges || [];

    // Generate the XML sitemap
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
