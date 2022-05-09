import React from 'react';
import {useState, useEffect} from "react";
import {getRecentPosts, getSimilarPosts} from "../services";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";



const PostWidget = ({categories, slug}) => {

    const [relatedPosts, setRelatedPosts] = useState([])


    function renderImages(post) {
        let image;
        if (post.featuredImage) {
            image = post.featuredImage.url

        } else {
            image = "https://sfkp.ch/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
        }
        return (
            <div className={"w-16 flex-none"}>
                <Image
                    alt={post.title}
                    height="60px"
                    width="60px"
                    className={" align-middle rounded-full "}
                    src={image}
                />
            </div>
        )
    }

    useEffect(() => {

        //check if slug exists
        if (slug) {
            console.log(slug);
            getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts().then((result) => setRelatedPosts(result))
        }

    }, [slug]);
    return (
        <div className="text-zinc-200 bg-zinc-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {slug ? 'Related Poste' : 'Recent Posts'}
            </h3>
            {
                relatedPosts.map((post) => (
                    <div key={post.title} className={"flex  items-center w-full mb-4"}>
                        {
                            renderImages(post)
                        }
                        <div className="flex-grow ml-4">
                            <p className="font-xs">
                                {moment(post.createdAt).format('MMM Do YYYY')}
                            </p>
                            <Link
                                key={post.title}
                                href={`/post/${post.slug}`}
                                className={"text-md"}
                            >
                                {post.title}
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
export default PostWidget;
