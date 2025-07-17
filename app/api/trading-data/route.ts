import { NextResponse } from 'next/server';
import { fetchWithSSL } from '@/lib/utils';

// Interface for MintLP API response
interface MintLPToken {
  id: string;
  symbol: string;
  name: string;
  volumeUSD: string;
  volumeUSD1h: string;
  buyVolumeUSD1h: string;
  sellVolumeUSD1h: string;
  volumeCount: number;
  marketcap: string;
  transactionCount1h: number;
  walletHoldings: string;
  commentCount: string;
  createdAt: string;
}

interface MintLPResponse {
  data: MintLPToken[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface TradingData {
  buyVolume: string;
  sellVolume: string;
  pairs: number;
  commentCount: number;
  transactions: number;
  walletHoldings: string;
  rawData: {
    totalBuyVolume: number;
    totalSellVolume: number;
    totalPairs: number;
    totalCommentCount: number;
    totalTransactions: number;
    totalWalletHoldings: number;
  };
}

// Helper function to safely convert string to number
const safeParseFloat = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Format large numbers to k, m format
const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toFixed(0);
  }
};

// Format currency values
const formatCurrency = (num: number): string => {
  if (num >= 1000000000) {
    return '$' + (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return '$' + (num / 1000).toFixed(1) + 'K';
  } else {
    return '$' + num.toFixed(2);
  }
};

export async function GET() {
  try {
    // Fetch data from MintLP API
    const response = await fetchWithSSL(
      'https://api.mintlp.io/v1/fun?sortBy=NEW&state=NOT_GRADUATED&blockchainSymbol=SOL&page=1&pageSize=1000',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache for 30 seconds to prevent excessive API calls
        next: { revalidate: 30 }
      }
    );

    if (!response.ok) {
      throw new Error(`MintLP API error: ${response.status}`);
    }

    const mintLPData: MintLPResponse = await response.json();
    const tokens = mintLPData.data;
    const pagination = mintLPData.pagination;

    // Calculate trading metrics
    const totalBuyVolume = tokens.reduce((sum, token) => sum + safeParseFloat(token.buyVolumeUSD1h), 0);
    const totalSellVolume = tokens.reduce((sum, token) => sum + safeParseFloat(token.sellVolumeUSD1h), 0);
    
    // Count tokens created in the last 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const totalPairs = tokens.filter(token => {
      const createdAt = new Date(token.createdAt);
      return createdAt >= oneHourAgo;
    }).length;
    
    const totalCommentCount = tokens.reduce((sum, token) => sum + parseInt(token.commentCount || '0'), 0);
    const totalTransactions = tokens.reduce((sum, token) => sum + (token.transactionCount1h || 0), 0);
    const totalWalletHoldings = tokens.reduce((sum, token) => sum + safeParseFloat(token.walletHoldings || '0'), 0);

    // Format the data
    const tradingData: TradingData = {
      buyVolume: formatCurrency(totalBuyVolume),
      sellVolume: formatCurrency(totalSellVolume),
      pairs: totalPairs,
      commentCount: totalCommentCount,
      transactions: totalTransactions,
      walletHoldings: formatCurrency(totalWalletHoldings),
      rawData: {
        totalBuyVolume: Math.round(totalBuyVolume * 100) / 100,
        totalSellVolume: Math.round(totalSellVolume * 100) / 100,
        totalPairs,
        totalCommentCount,
        totalTransactions,
        totalWalletHoldings: Math.round(totalWalletHoldings * 100) / 100,
      }
    };

    return NextResponse.json({
      success: true,
      data: tradingData,
      timestamp: new Date().toISOString(),
      source: 'MintLP API'
    });

  } catch (error) {
    console.error('Error fetching trading data:', error);
    
    // Return fallback data in case of API failure
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch trading data',
      data: {
        buyVolume: '$1.5M',
        sellVolume: '$1.3M',
        pairs: 25,
        commentCount: 143,
        transactions: 892,
        walletHoldings: '$1.2M',
        rawData: {
          totalBuyVolume: 1500000,
          totalSellVolume: 1300000,
          totalPairs: 25,
          totalCommentCount: 143,
          totalTransactions: 892,
          totalWalletHoldings: 1200000,
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