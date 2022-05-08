import "../styles/globals.scss";
import type { AppProps } from 'next/app'
import React, {useEffect,useState} from "react";
import {Layout} from "../components";
import {UserContext } from "../components/UserContext"

function MyApp({ Component, pageProps }: AppProps) {


    return(
        // @ts-ignore
      <UserContext.Provider value={"hello world from context"}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </UserContext.Provider>


  );
}

export default MyApp
