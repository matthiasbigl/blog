import React from 'react';
import { Github, Twitter, Linkedin, Contact } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border mt-12 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold font-sans text-xl tracking-tighter text-light-text dark:text-dark-text">
                            Bigls Blog
                        </span>
                        <p className="text-sm text-light-muted dark:text-dark-muted mt-2">
                            © {new Date().getFullYear()} Matthias Bigl. All rights reserved.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="https://portfolio.bigls.net" target="_blank" rel="noopener noreferrer" className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-white transition-colors">
                            <Contact />
                        </a>

                        <a href="https://github.com/matthiasbigl" target="_blank" rel="noopener noreferrer" className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-white transition-colors">
                            <Github size={20} />
                        </a>

                        <a href="https://www.linkedin.com/in/matthias-bigl-061a5419a/" target="_blank" rel="noopener noreferrer" className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
