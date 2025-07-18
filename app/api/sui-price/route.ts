import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.fatfinger.fun/network/info/price', {
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
    console.error('Error fetching SUI price:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch SUI price',
      price: 0.377216 // fallback price
    }, { status: 500 });
  }
} 