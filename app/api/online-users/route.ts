import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch online users
export async function GET() {
  try {
    // Get users who were active in the last 2 minutes (more strict)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    
    // Clean up old records first (remove users inactive for more than 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    await supabaseAdmin
      .from('online_users')
      .delete()
      .lt('last_seen', tenMinutesAgo);
    
    const { data, error } = await supabaseAdmin
      .from('online_users')
      .select('*')
      .gte('last_seen', twoMinutesAgo)
      .order('last_seen', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch online users'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      users: data || [],
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching online users:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch online users'
    }, { status: 500 });
  }
}

// DELETE - Remove user from online users (when they disconnect wallet)
export async function DELETE(request: NextRequest) {
  try {
    const { wallet_address } = await request.json();
    
    // Validate input
    if (!wallet_address) {
      return NextResponse.json({
        success: false,
        error: 'Wallet address is required'
      }, { status: 400 });
    }
    
    const normalizedAddress = wallet_address.toLowerCase();
    
    // Remove user from online users table
    const { error } = await supabaseAdmin
      .from('online_users')
      .delete()
      .eq('wallet_address', normalizedAddress);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to remove user from online status'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'User removed from online status successfully'
    });
    
  } catch (error) {
    console.error('Error removing user from online status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to remove user from online status'
    }, { status: 500 });
  }
}

// POST - Update user online status
export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json();
    
    // Validate input
    if (!wallet_address) {
      return NextResponse.json({
        success: false,
        error: 'Wallet address is required'
      }, { status: 400 });
    }
    
    const normalizedAddress = wallet_address.toLowerCase();
    
    // Upsert user online status
    const { data, error } = await supabaseAdmin
      .from('online_users')
      .upsert({
        wallet_address: normalizedAddress,
        last_seen: new Date().toISOString()
      }, {
        onConflict: 'wallet_address'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to update online status'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Online status updated successfully',
      data: data
    });
    
  } catch (error) {
    console.error('Error updating online status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update online status'
    }, { status: 500 });
  }
} 