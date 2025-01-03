import 'src/global.css'

import { useEffect } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { usePathname } from 'src/routes/hooks'

import { themeConfig, ThemeProvider } from 'src/theme'

import { Snackbar } from 'src/components/snackbar'
import { ProgressBar } from 'src/components/progress-bar'
import { MotionLazy } from 'src/components/animate/motion-lazy'
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings'

import { AuthProvider } from 'src/auth/context/jwt'

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ children }: AppProps) {
  useScrollToTop()

  return (
    <AuthProvider>
      <SettingsProvider defaultSettings={defaultSettings}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider
            noSsr
            defaultMode={themeConfig.defaultMode}
            modeStorageKey={themeConfig.modeStorageKey}
          >
            <MotionLazy>
              <Snackbar />
              <ProgressBar />
              <SettingsDrawer defaultSettings={defaultSettings} />
              {children}
            </MotionLazy>
          </ThemeProvider>
        </QueryClientProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
