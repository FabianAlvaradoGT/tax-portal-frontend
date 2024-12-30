import 'src/global.css'

import { useEffect } from 'react'

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

export default function App({ children }: AppProps) {
  useScrollToTop()

  return (
    <AuthProvider>
      <SettingsProvider defaultSettings={defaultSettings}>
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
