import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle, Search } from './';

const MobileDock = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
        >
            <div className="flex items-center space-x-2 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg border border-light-border dark:border-dark-border px-4 py-2 rounded-md shadow-2xl">
                <Link href="/">
                    <div className="p-2 rounded-md hover:bg-light-bg dark:hover:bg-white/10 text-light-text dark:text-dark-text transition-colors">
                        <Home size={20} />
                    </div>
                </Link>

                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-md hover:bg-light-bg dark:hover:bg-white/10 text-light-text dark:text-dark-text transition-colors"
                >
                    <SearchIcon size={20} />
                </button>

                <div className="w-px h-6 bg-light-border dark:bg-white/10 mx-2"></div>

                <ThemeToggle />
            </div>

            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </motion.div>
    );
};

export default MobileDock;
