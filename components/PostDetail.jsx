import React from 'react';
import moment from 'moment';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { ScrollProgress } from './';
import { Calendar } from 'lucide-react';

const PostDetail = ({ post }) => {
    return (
        <>
            <ScrollProgress />
            <div className="bg-light-card dark:bg-dark-card rounded-md lg:p-12 pb-12 mb-8 shadow-lg border border-light-border dark:border-dark-border">
                <div className="relative overflow-hidden shadow-md mb-6 rounded-t-md lg:rounded-md h-96">
                    <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className="object-cover h-full w-full rounded-t-md lg:rounded-md shadow-lg"
                    />
                </div>
                <div className="px-4 lg:px-0">
                    <div className="flex items-center mb-8 w-full">
                        <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                            <img
                                alt={post.author.name}
                                className="align-middle rounded-full w-[30px] h-[30px] border border-light-border dark:border-dark-border"
                                src={post.author.photo.url}
                            />
                            <p className="inline align-middle text-light-muted dark:text-dark-muted ml-2 text-lg font-medium">{post.author.name}</p>
                        </div>
                        <div className="font-medium text-light-muted dark:text-dark-muted flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-primary dark:text-dark-muted" />
                            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                        </div>
                    </div>
                    <h1 className="mb-8 text-4xl font-bold text-light-text dark:text-dark-text tracking-tight">{post.title}</h1>

                    <div className="rich-text-content prose prose-lg max-w-none prose-headings:font-sans prose-p:font-serif prose-p:text-light-text/80 dark:prose-p:text-dark-text/80 prose-headings:text-light-text dark:prose-headings:text-dark-text prose-a:text-primary dark:prose-a:text-dark-muted">
                        <RichText
                            content={post.content.raw}
                            renderers={{
                                h1: ({ children }) => (
                                    <h1 className="text-4xl font-bold mb-6 mt-8 text-light-text dark:text-dark-text">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-3xl font-bold mb-5 mt-7 text-light-text dark:text-dark-text">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-2xl font-semibold mb-4 mt-6 text-light-text dark:text-dark-text">{children}</h3>
                                ),
                                h4: ({ children }) => (
                                    <h4 className="text-xl font-semibold mb-4 mt-5 text-light-text dark:text-dark-text">{children}</h4>
                                ),
                                h5: ({ children }) => (
                                    <h5 className="text-lg font-semibold mb-3 mt-4 text-light-text dark:text-dark-text">{children}</h5>
                                ),
                                h6: ({ children }) => (
                                    <h6 className="text-base font-semibold mb-3 mt-4 text-light-text dark:text-dark-text">{children}</h6>
                                ),
                                p: ({ children }) => (
                                    <p className="mb-6 text-light-text/80 dark:text-dark-text/80 leading-relaxed font-serif">{children}</p>
                                ),
                                a: ({ children, href, openInNewTab }) => (
                                    <a
                                        href={href}
                                        target={openInNewTab ? '_blank' : '_self'}
                                        rel={openInNewTab ? 'noopener noreferrer' : undefined}
                                        className="text-primary dark:text-dark-muted hover:opacity-80 underline transition-opacity"
                                    >
                                        {children}
                                    </a>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside mb-6 space-y-2 text-light-text/80 dark:text-dark-text/80 font-serif">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside mb-6 space-y-2 text-light-text/80 dark:text-dark-text/80 font-serif">{children}</ol>
                                ),
                                li: ({ children }) => (
                                    <li className="text-light-text/80 dark:text-dark-text/80 ml-4">{children}</li>
                                ),
                                code_block: ({ children }) => (
                                    <pre className="bg-light-bg dark:bg-dark-bg rounded-md p-4 mb-6 overflow-x-auto border border-light-border dark:border-dark-border">
                                        <code className="text-primary dark:text-dark-muted text-sm font-mono">{children}</code>
                                    </pre>
                                ),
                                code: ({ children }) => (
                                    <code className="bg-light-bg dark:bg-dark-bg text-primary dark:text-dark-muted px-2 py-1 rounded-sm text-sm font-mono border border-light-border dark:border-dark-border">
                                        {children}
                                    </code>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-primary dark:border-dark-muted pl-4 py-2 mb-6 italic text-light-muted dark:text-dark-muted bg-light-bg dark:bg-dark-bg rounded-r-md">
                                        {children}
                                    </blockquote>
                                ),
                                img: ({ src, altText, title, width, height }) => (
                                    <img
                                        src={src}
                                        alt={altText || title || ''}
                                        title={title}
                                        width={width}
                                        height={height}
                                        className="rounded-md shadow-lg my-8 w-full object-cover"
                                    />
                                ),
                                bold: ({ children }) => (
                                    <strong className="font-bold text-light-text dark:text-dark-text">{children}</strong>
                                ),
                                italic: ({ children }) => (
                                    <em className="italic">{children}</em>
                                ),
                                underline: ({ children }) => (
                                    <u className="underline">{children}</u>
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
