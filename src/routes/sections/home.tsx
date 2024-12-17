import type { RouteObject } from 'react-router'

import { Outlet } from 'react-router'
import { lazy, Suspense } from 'react'

import { CONFIG } from 'src/global-config'
import { DashboardLayout } from 'src/layouts/dashboard'

import { LoadingScreen } from 'src/components/loading-screen'

import { AuthGuard } from 'src/auth/guard'

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/home/home'))

// ----------------------------------------------------------------------

const homeLayout = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
)

export const homeRoutes: RouteObject[] = [
  {
    path: 'home',
    element: CONFIG.auth.skip ? homeLayout() : <AuthGuard>{homeLayout()}</AuthGuard>,
    children: [{ element: <IndexPage />, index: true }],
  },
]
