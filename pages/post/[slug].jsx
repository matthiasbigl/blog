import React from "react";
import {getPosts, getPostDetails} from "../../services/";

import {PostDetail, Categories, PostWidget, Author, Comment, CommentForm} from "../../components";

const PostDetails = ({post}) => {
    console.log(post);
    console.log(post.slug);
    console.log(post.categories);
   //print all of the category to the console


    return (<div className={'container mx-auto px-10 mb-8 text-zinc-200'}>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentForm slug={post.slug}/>
                <Comment slug={post.slug}/>
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className={'relative lg:sticky top-8'}>
                    <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                    <Categories/>

                </div>

            </div>
        </div>
    </div>)
}
export default PostDetails;

export async function getStaticProps({params}) {
    const data = await getPostDetails(params.slug);
    return {
        props: {
            post: data,
        }
    }
}

export async function getStaticPaths() {
    const data = await getPosts();
    return {
        paths: data.map(({node: {slug}}) => ({
            params: {
                slug
            }
        })),
        fallback: false
    }

}
