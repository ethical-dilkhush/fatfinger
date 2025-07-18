# Supabase Chat System Setup Guide

This guide will help you set up the Supabase integration for the persistent chat system.

## Prerequisites

1. A Supabase account (free tier is sufficient)
2. A Supabase project

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Wait for the project to be fully initialized

## Step 2: Database Setup

Execute the following SQL commands in your Supabase SQL editor:

```sql
-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    wallet_address TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create online_users table
CREATE TABLE online_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL UNIQUE,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_wallet_address ON messages(wallet_address);
CREATE INDEX idx_online_users_last_seen ON online_users(last_seen DESC);
CREATE INDEX idx_online_users_wallet_address ON online_users(wallet_address);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;

-- Create policies for messages table
CREATE POLICY "Messages are viewable by everyone" ON messages
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own messages" ON messages
    FOR INSERT WITH CHECK (true);

-- Create policies for online_users table
CREATE POLICY "Online users are viewable by everyone" ON online_users
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own status" ON online_users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own status" ON online_users
    FOR UPDATE USING (true);
```

## Step 3: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SERVICE_ROLE=your_supabase_service_role_key
```

To get these values:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL for `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the anon public key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Copy the service_role key for `NEXT_PUBLIC_SERVICE_ROLE`

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the World Chat section
3. Connect your MetaMask wallet
4. Send a test message
5. Check your Supabase database to confirm the message was stored

## Features

### Chat System
- **Persistent Messages**: All chat messages are stored in Supabase and persist across sessions
- **View Without Wallet**: Users can view chat messages without connecting a wallet
- **Send Messages**: Users must connect their MetaMask wallet to send messages
- **Real-time Updates**: Messages are refreshed every 3 seconds
- **Message Limit**: Messages are limited to 500 characters

### Online Users Tracking
- **Active Users**: Tracks users who were active in the last 2 minutes
- **Automatic Updates**: User status is updated every 30 seconds when connected
- **Online Counter**: Displays the number of currently online users
- **Auto Cleanup**: Inactive users are automatically removed after 10 minutes

## API Endpoints

### GET /api/chat
- Fetches the latest 50 messages
- No authentication required
- Returns messages in chronological order (oldest first)
- Chat auto-scrolls to bottom for new messages

### POST /api/chat
- Sends a new message
- Requires `message` and `wallet_address` in the request body
- Validates message length (max 500 characters)

### GET /api/online-users
- Fetches users active in the last 2 minutes
- Returns user count and list of online users
- Automatically cleans up users inactive for more than 10 minutes

### POST /api/online-users
- Updates user's last seen timestamp
- Requires `wallet_address` in the request body

### DELETE /api/online-users
- Removes user from online status (when disconnecting wallet)
- Requires `wallet_address` in the request body

## Security Considerations

1. **Row Level Security**: Enabled on all tables
2. **Wallet Verification**: Messages are tied to wallet addresses
3. **Input Validation**: Message length and content are validated
4. **Rate Limiting**: Consider implementing rate limiting in production

## Troubleshooting

1. **Connection Issues**: Check your environment variables
2. **Database Errors**: Verify your Supabase tables are created correctly
3. **Authentication Issues**: Ensure your service role key has the correct permissions
4. **CORS Issues**: Supabase should handle CORS automatically for your domain

## Next Steps

1. Consider adding user avatars or profiles
2. Implement message reactions or replies
3. Add message moderation features
4. Implement real-time subscriptions using Supabase Realtime
5. Add user roles and permissions 