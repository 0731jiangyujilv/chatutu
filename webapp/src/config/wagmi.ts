import { http, createConfig } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    injected(),
    ...(WALLETCONNECT_PROJECT_ID
      ? [walletConnect({ projectId: WALLETCONNECT_PROJECT_ID })]
      : []),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
