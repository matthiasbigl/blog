import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { getPosts } from '../services';

const Search = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (isOpen && posts.length === 0) {
            // Fetch all posts for client-side filtering (optimization: fetch only titles/slugs if possible)
            getPosts(0, 100).then((result) => {
                setPosts(result.edges.map(edge => edge.node));
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredPosts([]);
        } else {
            const lowerQuery = query.toLowerCase();
            const results = posts.filter(post =>
                post.title.toLowerCase().includes(lowerQuery) ||
                post.categories.some(cat => cat.name.toLowerCase().includes(lowerQuery))
            );
            setFilteredPosts(results);
        }
    }, [query, posts]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="w-full max-w-2xl bg-light-card dark:bg-dark-card rounded-md shadow-2xl overflow-hidden border border-light-border dark:border-dark-border"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center p-4 border-b border-light-border dark:border-dark-border">
                        <SearchIcon className="text-light-muted dark:text-dark-muted w-6 h-6 mr-3" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full bg-transparent text-xl text-light-text dark:text-dark-text outline-none placeholder-light-muted dark:placeholder-dark-muted"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onClose} className="p-1 hover:bg-light-bg dark:hover:bg-white/10 rounded-md transition-colors">
                            <X className="text-light-muted dark:text-dark-muted w-6 h-6" />
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        {filteredPosts.length > 0 ? (
                            <div className="p-2">
                                {filteredPosts.map((post) => (
                                    <Link key={post.slug} href={`/post/${post.slug}`}>
                                        <div className="flex items-center p-3 hover:bg-light-bg dark:hover:bg-white/5 rounded-md cursor-pointer transition-colors group" onClick={onClose}>
                                            <div className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 mr-4">
                                                {post.featuredImage?.url ? (
                                                    <img
                                                        src={post.featuredImage.url}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-light-text dark:text-dark-text font-medium group-hover:text-primary dark:group-hover:text-dark-muted transition-colors">
                                                    {post.title}
                                                </h4>
                                                <span className="text-xs text-light-muted dark:text-dark-muted">
                                                    {post.categories[0]?.name}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : query ? (
                            <div className="p-8 text-center text-light-muted dark:text-dark-muted">
                                No results found for "{query}"
                            </div>
                        ) : (
                            <div className="p-8 text-center text-light-muted dark:text-dark-muted">
                                Type to search...
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Search;
