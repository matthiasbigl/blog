import React from 'react';
import {Header} from "./";
import Image from "next/image";

// @ts-ignore
const Author = ({author}) => {
    return (
        <div className={'text-center relative mt-20 mb-8 p-12 rounded-lg bg-zinc-800 '}>

            <div className={'absolute left-0 right-0 -top-14'}>
                <Image alt={author.name}

                       unoptimized
                     height={"100px"}
                     width={"100px"}
                     src={author.photo.url}
                     className={'align-middle rounded-full'}

                />

            </div>
            <h3 className='text-zinc-200 my-4 text-2xl font-bold'>
                {author.name}
            </h3>
            <q className={'text-zinc-200 text-lg italic'}>
                {author.bio}
            </q>



        </div>
    );
}
export default Author;
