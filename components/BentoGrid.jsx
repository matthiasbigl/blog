import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

// Helper to generate a consistent gradient based on string
const stringToGradient = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c1 = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    const c2 = ((hash * 2) & 0x00FFFFFF).toString(16).toUpperCase();
    return `linear-gradient(135deg, #${"00000".substring(0, 6 - c1.length) + c1}, #${"00000".substring(0, 6 - c2.length) + c2})`;
};

const BentoGrid = ({ posts }) => {
    if (!posts || posts.length === 0) return null;

    // We'll take up to 5 posts for the grid
    const gridPosts = posts.slice(0, 5);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 auto-rows-[300px]">
            {gridPosts.map((post, index) => {
                // Determine span based on index for visual variety
                let spanClass = '';
                if (index === 0) spanClass = 'md:col-span-2 md:row-span-2';
                else if (index === 1) spanClass = 'md:col-span-1 md:row-span-2';
                else if (index === 2) spanClass = 'md:col-span-1 md:row-span-1';
                else spanClass = 'md:col-span-1 md:row-span-1';

                const hasImage = post.featuredImage?.url;

                return (
                    <motion.div
                        key={post.slug}
                        className={`relative group overflow-hidden rounded-md cursor-pointer ${spanClass} shadow-md border border-light-border dark:border-dark-border`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 0.99 }}
                    >
                        <Link href={`/post/${post.slug}`}>
                            <div className="absolute inset-0 w-full h-full">
                                {hasImage ? (
                                    <img
                                        src={post.featuredImage.url}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        style={{ background: stringToGradient(post.title) }}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent opacity-90 transition-opacity duration-300" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end h-full">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center space-x-2 mb-2 text-xs font-medium text-dark-muted">
                                        <span className="bg-dark-bg/80 px-2 py-1 rounded-sm backdrop-blur-sm border border-dark-border">
                                            {post.categories[0]?.name || 'Blog'}
                                        </span>
                                        <span className="flex items-center text-dark-text/80">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {moment(post.createdAt).format('MMM DD')}
                                        </span>
                                    </div>
                                    <h3 className={`font-bold text-dark-text leading-tight mb-2 ${index === 0 ? 'text-3xl' : 'text-xl'} text-shadow-sm`}> {/* added text shadow */}
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center text-dark-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                        <span className="mr-2">Read Article</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BentoGrid;
