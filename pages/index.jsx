import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { PostCard, Categories, PostWidget, FeaturedPosts, Loader } from '../components';
import { getPosts } from '../services';
import SEO from '../components/SEO';
import { useInView } from 'react-intersection-observer';

const Home = ({ initialPosts, pageInfo }) => {
    const [posts, setPosts] = useState(initialPosts || []);
    const [hasNextPage, setHasNextPage] = useState(pageInfo?.hasNextPage || false);
    const [loading, setLoading] = useState(false);
    const { ref, inView } = useInView();

    const loadMorePosts = async () => {
        if (loading || !hasNextPage) return;

        setLoading(true);
        try {
            // Skip the current number of posts
            const result = await getPosts(posts.length, 8);

            setPosts((prev) => [...prev, ...result.edges]);
            setHasNextPage(result.pageInfo.hasNextPage);
        } catch (error) {
            console.error("Error loading more posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView && hasNextPage) {
            loadMorePosts();
        }
    }, [inView, hasNextPage]);

    return (
        <div className="bg-light-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
            <SEO
                title="Technology & Development Blog"
                description="Welcome to Bigl's Blog by Matthias Bigl - Your source for insightful articles on technology, software development, web development, and innovation. Join Bigl on a journey through the tech world."
                tags={['Matthias Bigl', 'Bigl', 'tech blog', 'software development', 'web development', 'programming', 'technology blog']}
            />
            <div className="container mx-auto px-2 lg:px-8 mb-8">

                {/* Featured Posts Section */}
                <div className="mb-12 mt-8">
                    <FeaturedPosts posts={posts.map(p => p.node)} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8 border-b border-light-border dark:border-dark-border pb-4">
                            Latest Articles by Matthias Bigl
                        </h1>

                        {posts.map((post, index) => (
                            <PostCard key={`${post.node.slug}-${index}`} post={post.node} />
                        ))}

                        {/* Loading Trigger */}
                        {hasNextPage && (
                            <div ref={ref} className="flex justify-center py-8">
                                {loading ? <Loader /> : <span className="text-light-muted dark:text-dark-muted">Loading more...</span>}
                            </div>
                        )}

                        {!hasNextPage && posts.length > 0 && (
                            <div className="text-center py-8 text-light-muted dark:text-dark-muted">
                                You've reached the end!
                            </div>
                        )}
                    </div>

                    <div className="col-span-1 lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <PostWidget />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const result = (await getPosts(0, 12)) || {};

    return {
        props: {
            initialPosts: result.edges || [],
            pageInfo: result.pageInfo || { hasNextPage: false }
        },
        revalidate: 60, // Revalidate every 60 seconds
    };
}