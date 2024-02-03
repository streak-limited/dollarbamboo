'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { IsLoadingProvider } from './isLoadingProvider'
import { DateRangeProvider } from './dateRangeProvider'

type Props = {}

function Providers({ children }: React.PropsWithChildren<Props>) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  )

  return (
    <QueryClientProvider client={client}>
      <DateRangeProvider>
        <IsLoadingProvider>
          {children}

          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{ zIndex: 99999 }}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                // theme: {
                //     primary: "green",
                //     secondary: "black",
                // },
              },
            }}
          />
        </IsLoadingProvider>
      </DateRangeProvider>
    </QueryClientProvider>
  )
}

export default Providers
