import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {  Session } from '@supabase/auth-helpers-react'
import Layout from '../components/Layout'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {

  return (
    <div className="bg-white">
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </div>
  )
}

export default MyApp
