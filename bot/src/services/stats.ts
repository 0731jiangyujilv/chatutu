import { prisma } from "../db"

export interface BetStats {
  activeBetsCount: number
  totalBetsCount: number
  totalVolume: string
  settledBetsCount: number
  cancelledBetsCount: number
}

export interface ActiveBetInfo {
  id: number
  asset: string
  amount: string
  status: string
  duration: number
  createdAt: Date
  p1Username: string | null
  p2Username: string | null
}

export interface HistoricalBetInfo {
  id: number
  asset: string
  amount: string
  status: string
  duration: number
  createdAt: Date
  startTime: Date | null
  endTime: Date | null
  p1Username: string | null
  p2Username: string | null
  winnerUsername: string | null
  startPrice: string | null
  endPrice: string | null
}

export async function getOverallStats(): Promise<BetStats> {
  const [activeBets, totalBets, settledBets, cancelledBets, volumeResult] = await Promise.all([
    prisma.bet.count({
      where: {
        status: { in: ["PROPOSED", "ACCEPTED", "CREATED", "DEPOSITING", "LOCKED"] },
      },
    }),
    prisma.bet.count(),
    prisma.bet.count({ where: { status: "SETTLED" } }),
    prisma.bet.count({ where: { status: "CANCELLED" } }),
    prisma.bet.aggregate({
      _sum: { amount: true },
      where: { status: { not: "CANCELLED" } },
    }),
  ])

  return {
    activeBetsCount: activeBets,
    totalBetsCount: totalBets,
    totalVolume: volumeResult._sum?.amount?.toString() || "0",
    settledBetsCount: settledBets,
    cancelledBetsCount: cancelledBets,
  }
}

export async function getActiveBets(limit: number = 10): Promise<ActiveBetInfo[]> {
  const bets = await prisma.bet.findMany({
    where: {
      status: { in: ["PROPOSED", "ACCEPTED", "CREATED", "DEPOSITING", "LOCKED"] },
    },
    include: {
      participant1: true,
      participant2: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  })

  return bets.map((bet) => ({
    id: bet.id,
    asset: bet.asset,
    amount: bet.amount.toString(),
    status: bet.status,
    duration: bet.duration,
    createdAt: bet.createdAt,
    p1Username: bet.participant1.username,
    p2Username: bet.participant2?.username || null,
  }))
}

export async function getHistoricalBets(limit: number = 20): Promise<HistoricalBetInfo[]> {
  const bets = await prisma.bet.findMany({
    where: {
      status: { in: ["SETTLED", "CANCELLED"] },
    },
    include: {
      participant1: true,
      participant2: true,
      winner: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  })

  return bets.map((bet) => ({
    id: bet.id,
    asset: bet.asset,
    amount: bet.amount.toString(),
    status: bet.status,
    duration: bet.duration,
    createdAt: bet.createdAt,
    startTime: bet.startTime,
    endTime: bet.endTime,
    p1Username: bet.participant1.username,
    p2Username: bet.participant2?.username || null,
    winnerUsername: bet.winner?.username || null,
    startPrice: bet.startPrice,
    endPrice: bet.endPrice,
  }))
}

export async function getActiveBetsWithWagers(): Promise<{
  bets: ActiveBetInfo[]
  totalWagered: string
}> {
  const bets = await getActiveBets(50)
  const totalWagered = bets.reduce((sum, bet) => {
    return sum + parseFloat(bet.amount)
  }, 0)

  return {
    bets,
    totalWagered: totalWagered.toFixed(2),
  }
}
