import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.fatfinger.fun/tokens/trending', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 30 }
    });

    if (!response.ok) {
      throw new Error(`FatFinger API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch trending tokens',
      result: []
    }, { status: 500 });
  }
} 