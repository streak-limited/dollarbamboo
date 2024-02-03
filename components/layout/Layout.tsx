import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import Header from '../header'
import store from '../../store/index'
import Footer from '../footer'
import { ToastContainer } from 'react-toastify'
import { useLanguage } from '../../hooks/useLanguage'
import NextNProgress from 'nextjs-progressbar'
import Providers from '@/utils/providers'
import {
  createClientComponentClient,
  createServerComponentClient,
  Session,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthProvider } from '@/utils/authProvider'

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string>('')
  const supabase = createClientComponentClient()

  const { locale } = useLanguage()

  useEffect(() => {
    // Replace this with your async function to fetch session and user data
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (session) setSession(session)
      setSession(session)

      setUser(user)
    }

    fetchData()
  }, [])

  // console.log('session', session)
  // console.log('user', user)
  return (
    <Provider store={store}>
      <Providers>
        <AuthProvider accessToken={accessToken}>
          <ThemeProvider enableSystem={true} attribute="class">
            <Head>
              <title>ZiShop</title>
            </Head>
            <div className="flex flex-col min-h-[100vh]">
              <NextNProgress height={7} />
              <Header />
              <main className="flex-grow  md:mt-40">{children}</main>
              <Footer />
            </div>
            <ToastContainer
              autoClose={2000}
              hideProgressBar={true}
              rtl={locale === 'en' ? false : true}
              position={locale === 'en' ? 'top-right' : 'top-left'}
            />
          </ThemeProvider>
        </AuthProvider>
      </Providers>
    </Provider>
  )
}

export default Layout
