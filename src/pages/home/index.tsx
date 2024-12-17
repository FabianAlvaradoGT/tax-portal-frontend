import { Helmet } from 'react-helmet-async'

import { CONFIG } from 'src/global-config'

import { HomeView } from 'src/sections/home'

// ----------------------------------------------------------------------

const metadata = { title: `Home 🏠 - ${CONFIG.appName}` }

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeView title="Home 🏠" />
    </>
  )
}
