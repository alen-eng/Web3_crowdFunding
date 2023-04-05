import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import network from './utils/network'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ThirdwebProvider desiredChainId={80001}>
    <Component {...pageProps} />
  </ThirdwebProvider>
  )
}
