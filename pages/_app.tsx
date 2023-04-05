import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import network from './utils/network'
import {ChainId} from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
    <Component {...pageProps} />
  </ThirdwebProvider>
  )
}
