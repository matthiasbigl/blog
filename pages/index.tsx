import type {NextPage} from 'next'
import Head from 'next/head'
import {PostCard, PostWidget, Categories} from "../components";
import Image from 'next/image'
import {getPosts} from "../services";



// @ts-ignore
export default function Home({posts}){
    return (
        <div className="container mx-auto px-10 mb-8 ">
            <Head>
                <title>Bigl Blog</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className={'lg:col-span-8 col-span-1'}>
                    {posts.map((post) => (
                        <PostCard key={post.title} post={post.node}/>
                    ))}
                </div>

                <div className={'lg:col-span-4 col-span-1'}>
                    <div className={'lg:sticky relative top-8'}>
                        <PostWidget slug={null}/>
                        <Categories/>
                    </div>

                </div>
            </div>

        </div>

    )
}
export async function getStaticProps() {
    const posts = (await getPosts())||[];
    return {
        props: {
            posts
        }
    }
}


