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
                <meta name="google-site-verification" content="AE4xTqjFEokU4TUV2f-qhOq_IDtXIsxOrGTKe15HNO4" />
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
