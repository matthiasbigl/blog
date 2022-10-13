import "../styles/globals.scss";
import type { AppProps } from 'next/app'
import React, {useEffect,useState} from "react";
import {Layout} from "../components";
import {UserContext } from "../components/UserContext"
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {

    return(
        // @ts-ignore
        <>
            // @ts-ignore
            <Head>
                <meta name="google-site-verification" content="AE4xTqjFEokU4TUV2f-qhOq_IDtXIsxOrGTKe15HNO4"/>
            </Head><Layout>
            <Component {...pageProps} />
        </Layout></>


  );
}

export default MyApp
