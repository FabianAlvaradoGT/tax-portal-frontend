// Dashboard.tsx
import type { ReactNode } from 'react'
import type { UseQueryResult, QueryObserverResult } from '@tanstack/react-query'

import { useContext, createContext } from 'react'

import { useCompany, type Company, useTypesForms, type TypeForms } from './dashboardService'

// ----------------------------------------------------------------------------------------------------
interface DashboardProps {
  company: UseQueryResult<Company[], Error>
  typesForms: UseQueryResult<TypeForms[], Error>
}

// ----------------------------------------------------------------------------------------------------

export function DashboardProvider({ children }: { children: ReactNode }) {
  const company = useCompany()
  const typesForms = useTypesForms()

  const value: DashboardProps = {
    company,
    typesForms,
  }

  return <Dashboard.Provider value={value}>{children}</Dashboard.Provider>
}

const Dashboard = createContext<DashboardProps>({
  company: createDefaultUseQueryResult<Company[]>([]),
  typesForms: createDefaultUseQueryResult<TypeForms[]>([]),
})

export function useDashboard() {
  const context = useContext(Dashboard)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

// ----------------------------------------------------------------------------------------------------
export function createDefaultUseQueryResult<T>(defaultData: T): UseQueryResult<T, Error> {
  const defaultCompanyQuery: UseQueryResult<T, Error> = {
    data: defaultData,
    error: null,
    status: 'success', // o 'idle'
    fetchStatus: 'idle',
    isError: false,
    isFetched: false,
    isFetchedAfterMount: false,
    isFetching: false,
    isLoading: false,
    isLoadingError: false,
    isPaused: false,
    isPlaceholderData: false,
    isRefetchError: false,
    isRefetching: false,
    isStale: false,
    isSuccess: true,
    isPending: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    errorUpdateCount: 0,
    isInitialLoading: false,
    refetch: async () =>
      ({
        ...defaultCompanyQuery,
      }) as QueryObserverResult<T, Error>,
    promise: Promise.resolve(defaultData),
  }
  return defaultCompanyQuery
}
