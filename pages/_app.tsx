import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {  Session } from '@supabase/auth-helpers-react'
import Layout from '../components/Layout'
import { Analytics } from '@vercel/analytics/react';
import Mixpanel from 'mixpanel-browser'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {

  Mixpanel.init('006ee96e319317290e4d00678575c899')

  return (
    <div className="bg-white">
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
    </div>
  )
}

export default MyApp
