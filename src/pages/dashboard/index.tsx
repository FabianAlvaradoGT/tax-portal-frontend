import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/global-config'

import { DashboardView } from 'src/sections/dashboard/index'

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.appName}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardView title="Dashboard 🚀" />
    </>
  )
}
