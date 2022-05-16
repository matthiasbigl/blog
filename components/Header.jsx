import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
// @ts-ignore
import {getCategories} from '../services'
import Button from '@mui/material/Button';
import {useUser} from "@auth0/nextjs-auth0";
import {Avatar} from "@mui/material";


const Header = () => {
    const [categories, setCategories] = useState([]);
    const {user, error, isLoading} = useUser();

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        })
    }, []);

    function renderAvatar() {
        if (user) {
            return (
                <Link href={'/profile'}>
                    <Avatar alt={user.name} src={user.picture}
                            className={'ml-3.5 cursor-pointer '}/>

                </Link>

            )
        } else {
            return (
                <Link href="/api/auth/login">
                    <Button variant="contained" size="medium" className={'bg-blue-500 '}>
                        Login
                    </Button>
                </Link>
            )
        }

    }


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
                <div
                    className='hidden md:float-left md:contents '>

                    <div className=' float-right align-baseline'>
                        <div>
                            {categories.map((category) => (
                                <Link href={`/category/${category.slug}`} key={category.slug}>
                            <span
                                className={'ml-4 md:float-right mt-2 align-middle text-zinc-200 font font-semibold'}>

                                {category.name}
                            </span>
                                </Link>

                            ))}
                            <div>
                                {renderAvatar()}
                            </div>

                        </div>
                    </div>

                </div>




            </div>

        </div>
    );
}
export default Header;
