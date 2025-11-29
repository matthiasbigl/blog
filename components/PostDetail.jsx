import React from 'react';
import moment from 'moment';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { ScrollProgress } from './';
import { Calendar } from 'lucide-react';

const PostDetail = ({ post }) => {
    return (
        <>
            <ScrollProgress />
            <div className="lg:bg-light-card lg:dark:bg-dark-card lg:rounded-md lg:shadow-lg lg:border lg:border-light-border lg:dark:border-dark-border mb-8">
                {post.featuredImage && (
                    <div className="relative overflow-hidden mb-6 lg:rounded-t-md rounde">
                        <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            className="object-cover w-full max-h-[500px] lg:max-h-[600px]"
                        />
                    </div>
                )}
                <div className="px-4 lg:px-12 pb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <div className="flex items-center">
                            <img
                                alt={post.author.name}
                                className="rounded-full w-[30px] h-[30px] border border-light-border dark:border-dark-border"
                                src={post.author.photo.url}
                            />
                            <p className="text-light-muted dark:text-dark-muted ml-2 text-lg font-medium">{post.author.name}</p>
                        </div>
                        <div className="font-medium text-light-muted dark:text-dark-muted flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-primary dark:text-dark-muted" />
                            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                        </div>
                    </div>

                    <h1 className="mb-8 text-4xl font-bold text-light-text dark:text-dark-text tracking-tight">{post.title}</h1>

                    <article className="prose prose-lg max-w-none dark:prose-invert">
                        <RichText content={post.content.raw} />
                    </article>
                </div>
            </div>
        </>
    );
};

export default PostDetail;