import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { shortenAddress } from '@/lib/utils'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-green-500/20 px-3 py-1.5 text-sm text-green-400 font-medium">
          {shortenAddress(address)}
        </div>
        <button
          onClick={() => disconnect()}
          className="rounded-lg bg-red-500/10 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="w-full rounded-xl bg-tg-button px-4 py-3 text-sm font-semibold text-tg-button-text hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? 'Connecting...' : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  )
}
