import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
// @ts-ignore
import {getCategories} from '../services'



const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        })
    }, []);

    return (
        <div className='container mx-auto px-10 mb-8 text-zinc-200'>
            <div className='border-b w-full inline-block border-blue-500 py-8'>
                <div className='md:float-left block'>
                    <Link href='/'>
                     <span className='cursor-pointer font-bold text-4xl'>
                         Bigls Blog
                     </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>

                    <div className= 'display: md:flex float-right align-middle text-zinc-200 font-semibold cursor-pointer'>
                        {categories.map((category) => (
                            <Link href={`/category/${category.slug}`} key={category.slug}>
                            <span
                                className={'ml-4 '}
                                >
                                {category.name}
                            </span>
                            </Link>

                        ))}

                        <div className={'self-end ml-4'}>

                        </div>

                    </div>




                </div>

            </div>
        </div>
    );
}
export default Header;
