import type { RouteObject } from 'react-router'

import { Outlet } from 'react-router'
import { lazy, Suspense } from 'react'

import { CONFIG } from 'src/global-config'
import { DashboardLayout } from 'src/layouts/dashboard'

import { LoadingScreen } from 'src/components/loading-screen'

import { AuthGuard } from 'src/auth/guard'

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/index'))

// ----------------------------------------------------------------------

const dashboardLayout = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
)

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [{ element: <IndexPage />, index: true }],
  },
]
