import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCategories } from '../services';
import { ThemeToggle, Search } from './';
import { Search as SearchIcon } from 'lucide-react';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'top-0 border-b border-light-border dark:border-dark-border bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md' : 'top-0 bg-transparent border-b border-transparent'}`}
        >
            <div className="container mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="md:float-left block">
                        <Link href="/">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer font-sans font-bold text-3xl tracking-tighter text-light-text dark:text-dark-text hover:text-primary dark:hover:text-dark-muted transition-colors duration-300"
                            >
                                Bigls Blog
                            </motion.span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        {categories.map((category, i) => (
                            <Link key={category.slug} href={`/category/${category.slug}`}>
                                <motion.span
                                    custom={i}
                                    variants={navItemVariants}
                                    whileHover={{ scale: 1.05, color: "#534b52" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative cursor-pointer align-middle text-light-muted dark:text-dark-muted font-medium transition-colors text-sm uppercase tracking-widest hover:text-light-text dark:hover:text-dark-text"
                                >
                                    {category.name}
                                </motion.span>
                            </Link>
                        ))}

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-md hover:bg-light-card dark:hover:bg-white/5 transition-colors text-light-text dark:text-dark-text"
                            aria-label="Search"
                        >
                            <SearchIcon size={20} />
                        </button>

                        <ThemeToggle />
                    </div>
                </div>
            </div>
            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </motion.div>
    );
};

export default Header;
