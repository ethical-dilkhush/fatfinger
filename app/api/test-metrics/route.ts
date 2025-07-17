import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test direct API call to MintLP
    const response = await fetch(
      'https://api.mintlp.io/v1/fun?sortBy=NEW&state=NOT_GRADUATED&blockchainSymbol=SOL&page=1&pageSize=10', // Limited to 10 for testing
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`MintLP API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process and display sample data
    const sampleTokens = data.data?.slice(0, 5) || [];
    const processedSamples = sampleTokens.map((token: any) => ({
      symbol: token.symbol,
      name: token.name,
      volumeUSD: token.volumeUSD,
      volumeUSD1hChange: token.volumeUSD1hChange,
      marketcap: token.marketcap,
      progressPercent: token.progressPercent,
      transactionCount1h: token.transactionCount1h
    }));

    return NextResponse.json({
      success: true,
      message: 'MintLP API connection successful',
      totalTokens: data.data?.length || 0,
      sampleData: processedSamples,
      apiStatus: 'Connected',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error testing MintLP API:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      apiStatus: 'Failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 