import React from 'react'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from 'react-hot-toast'
import { Layout } from '../components'

import '../styles/globals.css'
import { StateContext } from '../context/StateContext'

function MyApp({ Component, pageProps, session }) {
    return (

        <StateContext>
          <SessionProvider session={session}>
            <Layout>
              <Toaster /> 
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </StateContext>
    )
}

export default MyApp
