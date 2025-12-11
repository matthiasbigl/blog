import { getPosts } from '../services';

const SITE_URL = 'https://bigls-blog.com';

function generateRssFeed(posts) {
    const feedItems = posts
        .map(({ node }) => {
            return `
        <item>
            <title><![CDATA[${node.title}]]></title>
            <link>${SITE_URL}/post/${node.slug}</link>
            <guid isPermaLink="true">${SITE_URL}/post/${node.slug}</guid>
            <description><![CDATA[${node.excerpt || ''}]]></description>
            <pubDate>${new Date(node.createdAt).toUTCString()}</pubDate>
            <dc:creator><![CDATA[Matthias Bigl]]></dc:creator>
            <author>matthias@bigls-blog.com (Matthias Bigl)</author>
            ${node.categories?.map(cat => `<category>${cat.name}</category>`).join('\n            ') || ''}
            ${node.featuredImage?.url ? `<enclosure url="${node.featuredImage.url}" type="image/jpeg" length="0" />` : ''}
        </item>`;
        })
        .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>Bigl's Blog - Matthias Bigl</title>
        <link>${SITE_URL}</link>
        <description>Personal technology blog by Matthias Bigl (Bigl) - Exploring software development, web technologies, and innovation.</description>
        <language>en</language>
        <managingEditor>matthias@bigls-blog.com (Matthias Bigl)</managingEditor>
        <webMaster>matthias@bigls-blog.com (Matthias Bigl)</webMaster>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
        <image>
            <url>${SITE_URL}/og-image.png</url>
            <title>Bigl's Blog - Matthias Bigl</title>
            <link>${SITE_URL}</link>
        </image>
        <copyright>Copyright ${new Date().getFullYear()} Matthias Bigl. All rights reserved.</copyright>
        <category>Technology</category>
        <category>Software Development</category>
        <category>Web Development</category>
        <ttl>60</ttl>
        ${feedItems}
    </channel>
</rss>`;
}

function RssFeed() {
    // getServerSideProps will handle the response
}

export async function getServerSideProps({ res }) {
    const postsResult = await getPosts(0, 50);
    const posts = postsResult?.edges || [];

    const feed = generateRssFeed(posts);

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    // Cache for 15 minutes, but allow stale content while revalidating
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');
    res.write(feed);
    res.end();

    return {
        props: {},
    };
}

export default RssFeed;
