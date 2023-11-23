'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Session } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from '@tanstack/react-query'

export const AuthContext = createContext({
  loading: true,
  session: {
    access_token: '',
    refresh_token: '',
    expires_in: 0,
    token_type: '',
  } as unknown as Session | undefined,
  auth: null as any,
  user: null as any,
})

export const AuthProvider = (props: { [x: string]: any; accessToken: any }) => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session>()
  const [auth, setAuth] = useState<any>()
  const [user, setUser] = useState<any>()

  const { accessToken, ...rest } = props

  const {
    data: userInfo,
    // isLoading: userInfoIsLoading,
    error: userInfoError,
  } = useQuery({
    queryKey: ['query-user-info-by-id-in-provider', auth?.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from(`users`)
          .select('*')
          .filter('id', 'eq', auth?.id)
          .single()

        if (!!error && session && !!session?.user?.app_metadata) {
          const { app_metadata } = session?.user

          if (app_metadata?.providers.includes('google') && !userInfo) {
            const { email, avatar_url, full_name } =
              session?.user?.user_metadata
            await supabase.from('users').insert({
              id: session?.user?.id,
              email,
              avatar_url,
              first_name: full_name,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
          }
        }

        // if (!!error && !session) {

        // }

        return data
      } catch (error) {
        // Handle the error appropriately, e.g., log it or throw a custom error
        console.error('Error fetching user data:', error)
        throw new Error('Failed to fetch user data')
      }
    },
    enabled: !!auth?.id,
  })
  // console.log("auth", !!auth?.id, auth?.id);
  // console.log("userInfoError", userInfoError);
  // console.log(`${user?.user_metadata.type}s`);

  // console.log("autProvider session", session);

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession()
      // console.log("sessiion", activeSession);
      // if (activeSession) {
      setSession(activeSession as Session)
      setAuth(activeSession?.user ?? null)
      // }
    }
    getActiveSession()

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh()
      }

      // console.log("onAuthStateChange event", event);
      // console.log("userInfo", userInfo);
      // console.log("currentSession", currentSession);

      setSession(currentSession as Session)
      setUser(userInfo ?? null)
      setAuth(currentSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [userInfo]) // Empty dependency array to run the effect only once

  const value = useMemo(() => {
    return {
      loading,
      session,
      auth,
      user,
    }
  }, [loading, session, auth, user])

  // console.log("auth value", value);

  // const value = {
  //     loading,
  //     user,
  //     session,
  // };

  // if (loading) {
  //     // You can show a loading indicator while checking the auth state
  //     return <div>Loading...</div>;
  // }

  return <AuthContext.Provider value={value} {...rest} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
