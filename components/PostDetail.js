import React from 'react';
import {Header} from "./";
import moment from "moment";
import parse from "html-react-parser";
import Image from "next/image";
import {RichText} from "@graphcms/rich-text-react-renderer";


// @ts-ignore
const PostDetail = ({post}) => {

    console.log(post.content)
    function renderImage() {
        if (post.featuredImage) {
            return (
                <div className='relative overflow-hidden shadow-md mb-6'>
                    <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className='object-top h-full w-full rounded-t-lg lg:rounded-b-lg'
                    />

                </div>)
        }
    }

    return (
        <div className={'bg-zinc-800 shadow-lg rounded-lg lg:p-8 pb-12 mb-8'}>
            {renderImage()}
            <div className='px-4 lg:px-0'>
                <div className={'flex items-center mb-8 w-full'}>
                    <div className='flex items-center mb-4 lg:mb-0 lg:w-auto mr-8'>
                        <Image
                            alt={post.author.name}
                            height="40px"
                            width="40px"
                            className={'align-middle rounded-full mr-2'}
                            src={post.author.photo.url}

                        />
                        <p className='inline align-middle ml-2 text-lg'>
                            {post.author.name}
                        </p>
                    </div>
                    <div className='font-medium '>
                        <svg className="inline align-middle w-8 h-8 " fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span className='inline align-middle ml-2 text-lg'>
                        {moment(post.publishedAt).format('MMMM Do YYYY')}
                    </span>
                    </div>
                </div>
                <h1 className='mb-8 text-3xl font-semibold'>
                    {post.title}
                </h1>
                <RichText
                    content={post.content.raw}
                    renderers={{
                        p: ({ children }) => (
                            <p className='text-fuchsia-50 text-xl tracking-wider'>
                                {children}
                            </p>
                        ),
                        ol: ({ children }) => (
                            <ol className='list-decimal text-fuchsia-300 ml-6 my-5 text-2xl tracking-wide'>
                                {children}
                            </ol>
                        ),
                        blockquote: ({ children }) => (
                            <div className='flex mt-10 mb-12'>
                                <div className='h-content w-3 bg-white mr-6'></div>
                                <div className='text-fuchsia-50 text-4xl tracking-wide'>
                                    {children}
                                </div>
                            </div>
                        ),
                        ul: ({ children }) => (
                            <ul className='list-disc text-fuchsia-500 text-3xl ml-6 my-5 tracking-wide'>
                                {children}
                            </ul>
                        ),
                    }}
                />
            </div>
        </div>
    );
}
export default PostDetail;
