import React from 'react';
import { Github, Linkedin, Contact, Rss } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border mt-12 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <span className="font-bold font-sans text-xl tracking-tighter text-light-text dark:text-dark-text">
                            Bigl's Blog
                        </span>
                        <p className="text-sm text-light-muted dark:text-dark-muted mt-2 max-w-md">
                            Personal blog by <strong>Matthias Bigl</strong> (Bigl) — Exploring technology, 
                            software development, and innovation.
                        </p>
                        <p className="text-sm text-light-muted dark:text-dark-muted mt-2">
                            © {new Date().getFullYear()} Matthias Bigl. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-xs text-light-muted dark:text-dark-muted mb-3 uppercase tracking-wider">
                            Connect with Matthias Bigl
                        </span>
                        <div className="flex space-x-6">
                            <a 
                                href="/feed.xml" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-light-muted dark:text-dark-muted hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                title="RSS Feed - Subscribe to Bigl's Blog"
                                aria-label="Subscribe to RSS Feed"
                            >
                                <Rss size={20} />
                            </a>

                            <a 
                                href="https://portfolio.bigls.net" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-white transition-colors"
                                title="Matthias Bigl Portfolio"
                                aria-label="Visit Matthias Bigl's Portfolio"
                            >
                                <Contact size={20} />
                            </a>

                            <a 
                                href="https://github.com/matthiasbigl" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-white transition-colors"
                                title="Matthias Bigl GitHub"
                                aria-label="Visit Matthias Bigl's GitHub"
                            >
                                <Github size={20} />
                            </a>

                            <a 
                                href="https://www.linkedin.com/in/matthias-bigl-061a5419a/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-white transition-colors"
                                title="Matthias Bigl LinkedIn"
                                aria-label="Connect with Matthias Bigl on LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* SEO-friendly footer text */}
                <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border text-center">
                    <p className="text-xs text-light-muted dark:text-dark-muted">
                        Bigl's Blog is the personal technology blog of Matthias Bigl, 
                        featuring articles on software development, web technologies, and tech insights.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
