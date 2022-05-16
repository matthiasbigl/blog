import React, {useEffect} from "react";
import {useUser} from "@auth0/nextjs-auth0";

import {Loader} from "../components";
import {useRouter} from "next/router";
import Image from "next/image";
import {TextField} from "@mui/material";

const Profile = () => {

    //get the users data from the auth0 api
    const {user, error, isLoading} = useUser();
    const router = useRouter();
    console.log(user);

    useEffect(() => {
        if (!user) {
            router.push("/api/auth/login").then(r => {
                console.log(r);

            });
        }
        //if there is an error redirect to the login page
        if (error) {
            router.push("/api/auth/login");
        }

        //if the user is loading show the loader
        if (isLoading) {
            return <Loader/>;
        }
    }, []);

    //if the user is logged in show the profile page
    if (user) {
        return (
            <div className="container mx-auto px-10 mb-8 ">
                <div className='text-zinc-200 bg-zinc-800 shadow-lg rounded-lg p-8 pb-12 mb-8 mt-8'>
                    <div className='md:grid-cols-2 grid-cols-1 grid place-items-center'>
                        <div className="col-span-1">
                            <img
                                src={user.picture}
                                width={100}
                                height={100}
                                className=  "
                                            rounded-full
                                            border-2 border-zinc-200
                                            mb-8
                                            md:place-self-end
                                            md:mr-2
                                   "
                            />
                        </div>

                        <div className="
                                        col-span-1
                                        md:place-self-start
                                        md:mr-2
                                        "
                        >
                            <h1 className="text-2xl font-bold">
                                {user.nickname}
                            </h1>
                            <p className="text-zinc-200">
                                {user.email}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    //if the user is not logged in show the login page
    else {
        return <div>You are not logged in</div>;
    }


}
export default Profile;


