import React from 'react';
import {useState, useEffect} from "react";
import {getCategories} from "../services";
import Link from "next/link";


const Categories = () => {
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        } )
    },[]);


    return (
        <div className="text-zinc-200 bg-zinc-800 shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Categories
            </h3>
            {
                categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className='cursor-pointer block pb-3 mb-3'>
                            {category.name}
                        </span>
                    </Link>))

            }
        </div>
    );
}
export default Categories;
