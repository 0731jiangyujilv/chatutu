export const BET_FACTORY_ADDRESS = '0x65F971b490c9f5afcE465b9eEfCEFC91d25483c6' as const
export const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as const

export const ERC20_ABI = [
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
] as const

export const BET_ABI = [
  {
    type: 'function',
    name: 'deposit',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancel',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'hasDeposited',
    inputs: [{ name: 'participant', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'participant1',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'participant2',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'amount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'status',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getBetInfo',
    inputs: [],
    outputs: [
      {
        name: 'info',
        type: 'tuple',
        components: [
          { name: 'participant1', type: 'address' },
          { name: 'participant2', type: 'address' },
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'priceFeed', type: 'address' },
          { name: 'startPrice', type: 'int256' },
          { name: 'endPrice', type: 'int256' },
          { name: 'startTime', type: 'uint256' },
          { name: 'endTime', type: 'uint256' },
          { name: 'status', type: 'uint8' },
          { name: 'winner', type: 'address' },
          { name: 'feeBps', type: 'uint256' },
          { name: 'feeRecipient', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const

// BetStatus matching the Solidity contract
export const BetStatus = {
  Created: 0,
  Locked: 1,
  Settled: 2,
  Cancelled: 3,
} as const

export function betStatusLabel(status: number): string {
  switch (status) {
    case BetStatus.Created: return 'Awaiting Deposits'
    case BetStatus.Locked: return 'Locked'
    case BetStatus.Settled: return 'Settled'
    case BetStatus.Cancelled: return 'Cancelled'
    default: return 'Unknown'
  }
}
