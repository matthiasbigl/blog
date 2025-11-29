import React from 'react';
import { Header, MobileDock, Footer } from './';

const Layout = ({ children }) => (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen transition-colors duration-300 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 lg:px-8 mb-8 pt-24 flex-grow">
            {children}
        </main>
        <Footer />
        <MobileDock />
    </div>
);

export default Layout;
