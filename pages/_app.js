import '@/styles/globals.css'
import { IBM_Plex_Sans } from 'next/font/google'

import { StoreProvider } from '../contexts/store.context'

const font = IBM_Plex_Sans({ weight: ['100', '200', '300', '400', '500', '600', '700'], subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={ font.className }>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </main>
  )
}
