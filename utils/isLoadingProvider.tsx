'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
// import supabase from "@/lib/supbase";
import { Session } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
//Step 1: Create a context
export const IsLoadingContext = createContext<any>({
  // dateRange: [
  //     {
  //         startDate: new Date(),
  //         endDate: undefined,
  //         key: "selection",
  //     },
  // ],
  // setDateRange: () => {},
})

//Step 2: Create a provider
export const IsLoadingProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <IsLoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </IsLoadingContext.Provider>
  )
}

// Step 3: Create a hook to use the context
export const useIsLoading = () => {
  const context = useContext(IsLoadingContext)
  if (context === undefined) {
    throw new Error('useIsloading must be used within an IsLoadingProvider')
  }
  return context
}
