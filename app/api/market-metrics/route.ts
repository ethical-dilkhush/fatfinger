import { NextResponse } from 'next/server';

// Interface for FatFinger API response
interface FatFingerStatsResponse {
  success: boolean;
  data: {
    updatedAt: string;
    tradeVolumes: {
      combined: {
        '1d': number;
        '3d': number;
        '7d': number;
        all: number;
      };
      dex: {
        '1d': number;
        '3d': number;
        '7d': number;
        all: number;
      };
      curve: {
        '1d': number;
        '3d': number;
        '7d': number;
        all: number;
      };
    };
    tradeCounts: {
      combined: {
        '1d': number;
        '3d': number;
        '7d': number;
        all: number;
      };
      dex: {
        '1d': number;
        '3d': number;
        '7d': number;
        all: number;
      };
      curve: {
        '1d': number;
        '3d': number;
        '7d': number;
        all: number;
      };
    };
    avgTradeSize: {
      combined: number;
      dex: number;
      curve: number;
    };
    usersCount: number;
    dexTokensCount: number;
    launchpadTokensCount: number;
    bondedPercentage: number;
    tvl: {
      total: number;
      breakdown: Record<string, number>;
      avgLiquidityPerPool: number;
    };
    approxRevenues: {
      dex: number;
      curve: number;
    total: number;
    };
  };
}

interface FatFingerPriceResponse {
  success: boolean;
  price: number;
}

interface MarketMetrics {
  // Volume metrics (multiplied by price) - returns raw calculated values
  totalVolume: number;
  dexVolume: number;
  curveVolume: number;
  
  // Trade count metrics (direct data - no multiplication)
  totalTrade: number;
  dexTrade: number;
  curveTrade: number;
  
  // Average trade size metrics (multiplied by price) - returns raw calculated values
  avgTradeSize: number;
  avgDexTrade: number;
  avgCurveTrade: number;
  
  // Direct metrics (no multiplication)
  totalUsers: number;
  dexTokens: number;
  totalLaunch: number;
  bondingPercentage: number;
  
  // TVL and Revenue metrics (multiplied by price) - returns raw calculated values
  tvl: number;
  totalRevenue: number;
  dexRevenue: number;
  curveRevenue: number;
  
  // Raw data for transparency
  rawData: {
    price: number;
    multiplier: number;
    originalStats: any;
  };
}

// Note: Dashboard handles formatting with K/M/B suffixes - API returns raw calculated values

export async function GET() {
  try {
    // Fetch data from FatFinger APIs
    const [statsResponse, priceResponse] = await Promise.all([
      fetch('https://api.fatfinger.fun/stats', {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 30 }
      }),
      fetch('https://api.fatfinger.fun/network/info/price', {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 30 }
      })
    ]);

    if (!statsResponse.ok || !priceResponse.ok) {
      throw new Error(`FatFinger API error: Stats ${statsResponse.status}, Price ${priceResponse.status}`);
    }

    const statsData: FatFingerStatsResponse = await statsResponse.json();
    const priceData: FatFingerPriceResponse = await priceResponse.json();

    if (!statsData.success || !priceData.success) {
      throw new Error('FatFinger API returned unsuccessful response');
    }

    const stats = statsData.data;
    const price = priceData.price;

    // Calculate metrics according to specifications - multiply by price ONLY where specified
    // Return RAW calculated values (don't format) - let dashboard handle formatting for K/M/B suffixes
    const metrics: MarketMetrics = {
      // Volume metrics (multiplied by price) - Cards 1-3
      totalVolume: Math.round((stats.tradeVolumes.combined.all * price) * 100) / 100,
      dexVolume: Math.round((stats.tradeVolumes.dex.all * price) * 100) / 100,
      curveVolume: Math.round((stats.tradeVolumes.curve.all * price) * 100) / 100,
      
      // Trade count metrics (direct data - NO multiplication) - Cards 4-6
      totalTrade: stats.tradeCounts.combined.all,
      dexTrade: stats.tradeCounts.dex.all,
      curveTrade: stats.tradeCounts.curve.all,
      
      // Average trade size metrics (multiplied by price) - Cards 7-9
      avgTradeSize: Math.round((stats.avgTradeSize.combined * price) * 100) / 100,
      avgDexTrade: Math.round((stats.avgTradeSize.dex * price) * 100) / 100,
      avgCurveTrade: Math.round((stats.avgTradeSize.curve * price) * 100) / 100,
      
      // Direct metrics (NO multiplication) - Cards 10-13
      totalUsers: stats.usersCount,
      dexTokens: stats.dexTokensCount,
      totalLaunch: stats.launchpadTokensCount,
      bondingPercentage: Math.round(stats.bondedPercentage * 100) / 100,
      
      // TVL and Revenue metrics (multiplied by price) - Cards 14-17
      tvl: Math.round((stats.tvl.total * price) * 100) / 100,
      totalRevenue: Math.round((stats.approxRevenues.total * price) * 100) / 100,
      dexRevenue: Math.round((stats.approxRevenues.dex * price) * 100) / 100,
      curveRevenue: Math.round((stats.approxRevenues.curve * price) * 100) / 100,
      
      // Raw data for transparency
      rawData: {
        price: price,
        multiplier: price,
        originalStats: stats
      }
    };

    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
      source: 'FatFinger API'
    });

  } catch (error) {
    console.error('Error fetching FatFinger metrics:', error);
    
    // Return fallback data in case of API failure
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch FatFinger metrics',
      data: {
        // Volume metrics
        totalVolume: 1200.5,
        dexVolume: 800.3,
        curveVolume: 400.2,
        
        // Trade count metrics
        totalTrade: 5500.0,
        dexTrade: 2000.0,
        curveTrade: 3500.0,
        
        // Average trade size metrics
        avgTradeSize: 180.5,
        avgDexTrade: 250.2,
        avgCurveTrade: 150.8,
        
        // Direct metrics
        totalUsers: 2500,
        dexTokens: 10,
        totalLaunch: 120,
        bondingPercentage: 4.1,
        
        // TVL and Revenue metrics
        tvl: 150.8,
        totalRevenue: 18.5,
        dexRevenue: 3.2,
        curveRevenue: 9.8,
        
        // Raw data
        rawData: {
          price: 0.385,
          multiplier: 0.385,
          originalStats: null
        }
      },
      timestamp: new Date().toISOString(),
      source: 'Fallback Data'
    }, { status: 500 });
  }
}

// Optional: Add POST method for manual refresh
export async function POST() {
  // Trigger a fresh fetch by calling GET
  return GET();
} 