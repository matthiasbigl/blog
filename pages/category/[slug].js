import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';
import SEO from '../../components/SEO';

const CategoryPost = ({ posts, categoryName, categorySlug }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    const displayName = categoryName || router.query.slug;

    return (
        <>
            <SEO 
                title={`${displayName} Articles`}
                description={`Browse all ${displayName} articles by Matthias Bigl on Bigl's Blog. Discover insightful content about ${displayName} from Bigl.`}
                slug={`category/${categorySlug || router.query.slug}`}
                tags={[displayName, 'Matthias Bigl', 'Bigl', `${displayName} blog`]}
            />
            <div className="container mx-auto px-4 lg:px-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-8 border-b border-light-border dark:border-dark-border pb-4">
                            {displayName} Articles by Matthias Bigl
                        </h1>
                        {posts.map((post, index) => (
                            <PostCard key={index} post={post.node} />
                        ))}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-24">
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryPost;

export async function getStaticProps({ params }) {
    const posts = await getCategoryPost(params.slug);
    const categories = await getCategories();
    const category = categories.find(cat => cat.slug === params.slug);

    return {
        props: { 
            posts,
            categoryName: category?.name || params.slug,
            categorySlug: params.slug
        },
    };
}

export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
}
