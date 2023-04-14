import { AppProps } from 'next/app'
import NextHead from 'next/head'
import '../styles/index.css'
import React, {useEffect, useState} from "react";
import {supabase} from "../utils/supabase";
import {Session, User} from "@supabase/gotrue-js";
import {eraseCookie, getCookie, setCookie} from "../utils/cookie";
import {useRouter} from "next/router";

export const UserContext = React.createContext<User | null>(null);
// export const SessionContext = React.createContext<Session | null>(null);

export default function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then(({data: { user }, error}) => {
            setUser(user);
            if (error && error.status === 401) {
                router.push('/');
            }
        })
    }, [session])
    useEffect(() => {
      supabase.auth.onAuthStateChange((event, session) => {
          setSession(session);
          if (session) {
              // document.cookie = `_token=${session.access_token}; expires=${session.expires_in}; path=/`;
          } else {
              router.push('/');
          }
      })
    }, [])

  return (
      <>
          <NextHead>
              <meta name='viewport' content='with=device-width, initial-scale=1' />
          </NextHead>
          <UserContext.Provider value={user}>
            <Component {...pageProps} />
          </UserContext.Provider>
      </>
  )
}



