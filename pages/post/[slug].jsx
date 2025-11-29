import React from 'react';
import { useRouter } from 'next/router';
import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentForm, Loader } from '../../components';
import { AdjacentPosts } from '../../sections';
import SEO from '../../components/SEO';

const PostDetails = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.featuredImage.url}
                slug={`post/${post.slug}`}
            />
            <div className="container mx-auto px-4 lg:px-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
                        <Author author={post.author} />
                        <CommentForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-24">
                            <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetails;

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
    return {
        props: {
            post: data,
        },
    };
}

export async function getStaticPaths() {
    const posts = await getPosts();
    return {
        paths: posts.edges.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    };
}
