import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'Newly Created';
    const view = searchParams.get('view') || 'grid';
    const page = searchParams.get('page') || '1';
    
    const response = await fetch(`https://api.fatfinger.fun/tokens/search?sortBy=${encodeURIComponent(sortBy)}&view=${view}&page=${page}`, {
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
    console.error('Error fetching tokens:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tokens',
      result: []
    }, { status: 500 });
  }
} 