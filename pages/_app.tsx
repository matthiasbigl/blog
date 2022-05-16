import "../styles/globals.scss";
import type { AppProps } from 'next/app'
import React, {useEffect,useState} from "react";
import {Layout} from "../components";
import {UserContext } from "../components/UserContext"
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {


    // @ts-ignore
    return(
        // @ts-ignore
      <UserProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </UserProvider>


  );
}

export default MyApp
