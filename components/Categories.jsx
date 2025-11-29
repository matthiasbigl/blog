import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        });
    }, []);

    return (
        <div className="bg-light-card dark:bg-dark-card shadow-lg rounded-md p-8 mb-8 pb-12 border border-light-border dark:border-dark-border">
            <h3 className="text-xl mb-8 font-semibold border-b border-light-border dark:border-dark-border pb-4 text-light-text dark:text-dark-text">
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer block pb-3 mb-3 text-light-text dark:text-dark-text hover:text-primary dark:hover:text-dark-muted transition-colors">
                        {
                            category.name.length > 20 ? category.name.substring(0, 20) + '...' : category.name
                        }
                    </span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
