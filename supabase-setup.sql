-- Supabase Chat System Database Setup
-- Run this SQL script in your Supabase SQL Editor

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

CREATE POLICY "Users can insert their own status" ON online_users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own status" ON online_users
    FOR UPDATE USING (true);

-- Insert a test message to verify the setup
INSERT INTO messages (message, wallet_address) VALUES 
('Welcome to FatFinger World Chat! 🚀', '0x0000000000000000000000000000000000000000');

-- Check if tables were created successfully
SELECT 'Tables created successfully!' as status;
SELECT COUNT(*) as message_count FROM messages;
SELECT COUNT(*) as online_user_count FROM online_users; 