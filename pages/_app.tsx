import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'


export default function App({ Component, pageProps }: AppProps) {
  return (
  <ThirdwebProvider activeChain={'mumbai'}>
    <Component {...pageProps} />
  </ThirdwebProvider>
  )
}
