
import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';

const PostCard = ({ post }) => {
    const hasImage = Boolean(post?.featuredImage?.url);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="relative group mb-8"
        >
            {/* Glow frame */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-20 group-hover:opacity-100 transition duration-500 blur-lg group-hover:blur-xl"></div>

            <div className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-md overflow-hidden shadow-lg">

                {/* Image Section (only if image exists) */}
                {hasImage && (
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                        <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-60"></div>
                    </div>
                )}

                {/* Content Section */}
                <div className="p-6 lg:p-8">
                    {/* Meta Info */}
                    <div className="flex items-center mb-4 text-sm text-light-muted dark:text-dark-muted space-x-4">
                        <div className="flex items-center">
                            <img
                                alt={post.author.name}
                                className="w-6 h-6 rounded-full mr-2 object-cover border border-light-border dark:border-dark-border"
                                src={post.author.photo.url}
                            />
                            <span>{post.author.name}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary dark:text-dark-muted" />
                            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <Link href={`/post/${post.slug}`}>
                        <h1 className="text-2xl lg:text-3xl font-bold text-light-text dark:text-dark-text mb-4 hover:text-primary dark:hover:text-dark-muted transition-colors duration-300 cursor-pointer leading-tight">
                            {post.title}
                        </h1>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-light-text/80 dark:text-dark-text/80 text-base lg:text-lg font-light leading-relaxed mb-6 line-clamp-3 font-serif">
                        {post.excerpt}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                        <Link href={`/post/${post.slug}`}>
                            <span className="inline-flex items-center text-primary dark:text-dark-muted font-semibold hover:opacity-80 transition-opacity cursor-pointer group/link">
                                Read Article
                                <svg
                                    className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PostCard;
