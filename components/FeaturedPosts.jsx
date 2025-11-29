import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Calendar, Clock } from 'lucide-react';

const FeaturedPosts = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    const featuredPosts = posts.slice(0, 3);

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-8">Featured Posts</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/post/${post.slug}`}
                        className="group"
                    >
                        <article className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-light-bg dark:bg-dark-bg">
                                {post.featuredImage?.url ? (
                                    <img
                                        src={post.featuredImage.url}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-light-muted dark:text-dark-muted">
                                        <span className="text-4xl">📝</span>
                                    </div>
                                )}
                                {/* Category badge */}
                                {post.categories?.[0] && (
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                            {post.categories[0].name}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Meta info */}
                                <div className="flex items-center gap-4 text-sm text-light-muted dark:text-dark-muted mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {moment(post.createdAt).format('MMM DD, YYYY')}
                                    </span>
                                    {post.readTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                {post.excerpt && (
                                    <p className="text-light-text/70 dark:text-dark-text/70 text-sm line-clamp-3 mb-4 flex-grow">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Author */}
                                {post.author && (
                                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-light-border dark:border-dark-border">
                                        <img
                                            src={post.author.photo?.url}
                                            alt={post.author.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-sm font-medium text-light-text dark:text-dark-text">
                                            {post.author.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedPosts;