import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://klik.finance/api/ecosystem-stats', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data to match our expected format
    const transformedData = {
      totalMarketcap: data.totalMarketcap || 0,
      tokenCount: data.tokenCount || 0,
      totalLiquidity: data.totalLiquidity || 0,
      totalVolume: data.totalVolume || 0,
      rewards_distributed: data.rewards_distributed || 0,
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching Klik Finance data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
} 