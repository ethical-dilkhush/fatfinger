import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch messages
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch messages'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      messages: data || []
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch messages'
    }, { status: 500 });
  }
}

// POST - Send message
export async function POST(request: NextRequest) {
  try {
    const { message, wallet_address } = await request.json();
    
    // Validate input
    if (!message || !wallet_address) {
      return NextResponse.json({
        success: false,
        error: 'Message and wallet address are required'
      }, { status: 400 });
    }
    
    // Validate message length
    if (message.length > 500) {
      return NextResponse.json({
        success: false,
        error: 'Message too long (max 500 characters)'
      }, { status: 400 });
    }
    
    // Create new message
    const newMessage = {
      message: message.trim(),
      wallet_address: wallet_address.toLowerCase(),
    };
    
    // Insert message into Supabase
    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([newMessage])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to send message'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: data
    });
    
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send message'
    }, { status: 500 });
  }
} 