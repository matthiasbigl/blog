
import Head from 'next/head'
import {PostCard, PostWidget, Categories} from "../components";
import {getPosts} from "../services";




export default function Home({ posts }){
    return (
        <div className="container mx-auto px-10 mb-8 ">
            <Head>
                <title>Bigl Blog</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="A blog about software development and programming and personal random thoughts"
                />
                <meta
                    name="keywords"
                    content="software development, programming, web development, javascript, react, python, django, nextjs, gatsby, nodejs, expressjs, mongodb, postgresql, mysql, sqlite, docker, kubernetes, aws, azure, gcp, google cloud, cloud computing, serverless, microservices, devops, ci/cd, agile, scrum, kanban, tdd, bdd, ddd, clean code, clean architecture, design patterns, algorithms, data structures, data science, machine learning, artificial intelligence, deep learning, neural networks, big data, data engineering, data analytics, data visualization, business intelligence, business analytics, business analysis, business intellig, matthias bigl, htl hollabrunn,htl hl,htl-hl"
                />
                <meta name="author" content="Matthias Bigl"/>
                <meta name="robots" content="index, follow"/>

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
//get the ininitial data
export async function getServerSideProps() {
    const posts = (await getPosts())||[];
    return {
        props: {
            posts
        }
    }
}
//test


