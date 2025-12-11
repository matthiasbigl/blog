import React, { useEffect, useState } from 'react';
import { Layout } from '../components';
import 'react-multi-carousel/lib/styles.css';
import '../styles/globals.scss';
import Head from 'next/head';

// Theme Context
export const ThemeContext = React.createContext({
    theme: 'dark',
    toggleTheme: () => { },
});

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Head>
                {/* Google Site Verification */}
                <meta name="google-site-verification" content="AE4xTqjFEokU4TUV2f-qhOq_IDtXIsxOrGTKe15HNO4" />
                
                {/* Global Meta Tags for SEO */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                
                {/* Favicon and Icons */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                
                {/* Theme Colors */}
                <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
                <meta name="theme-color" content="#f8f9fa" media="(prefers-color-scheme: light)" />
                <meta name="msapplication-TileColor" content="#1a1a2e" />
                
                {/* Primary SEO - Targeting "Matthias Bigl" and "Bigl" */}
                <meta name="author" content="Matthias Bigl" />
                <meta name="creator" content="Matthias Bigl" />
                <meta name="publisher" content="Matthias Bigl" />
                <meta name="copyright" content="Matthias Bigl" />
                
                {/* Additional SEO Signals */}
                <meta name="format-detection" content="telephone=no" />
                <meta name="application-name" content="Bigl's Blog" />
                <meta name="apple-mobile-web-app-title" content="Bigl's Blog" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="mobile-web-app-capable" content="yes" />
                
                {/* DNS Prefetch for Performance */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="dns-prefetch" href="//media.graphassets.com" />
                
                {/* Preconnect for Critical Resources */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                
                {/* RSS Feed - Auto-discovery for browsers and feed readers */}
                <link 
                    rel="alternate" 
                    type="application/rss+xml" 
                    title="Bigl's Blog - Matthias Bigl RSS Feed" 
                    href="https://bigls-blog.com/feed.xml" 
                />
                
                {/* AI/LLM Discovery Files */}
                <link rel="author" href="https://bigls-blog.com/llms.txt" />
                <link rel="me" href="https://github.com/matthiasbigl" />
                <link rel="me" href="https://www.linkedin.com/in/matthias-bigl-061a5419a/" />
            </Head>
            <Layout>
                <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Lora', serif;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Space Grotesk', sans-serif;
          }
        `}</style>
                <Component {...pageProps} />
            </Layout>
        </ThemeContext.Provider>
    );
}

export default MyApp;
