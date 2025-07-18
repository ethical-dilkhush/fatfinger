# 🚀 Quick Setup Guide - Fix Database Tables

You're getting errors because the Supabase database tables haven't been created yet. Here's how to fix it:

## ❌ Current Error
```
relation "public.messages" does not exist
```

## ✅ Quick Fix (5 minutes)

### Step 1: Create Your Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SERVICE_ROLE=your_service_role_key
```

**Where to find these values:**
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the **Project URL** → use for `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the **anon public** key → use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Copy the **service_role** key → use for `NEXT_PUBLIC_SERVICE_ROLE`

### Step 2: Create Database Tables
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click **Run** to execute the SQL script

### Step 3: Test Your Setup
```bash
npm install
npm run test-supabase
```

If successful, you should see:
```
✅ Database connection successful!
✅ Messages table working! Found 1 messages.
✅ Online users table working! Found 0 online users.
🎉 All tests passed!
```

### Step 4: Start Your App
```bash
npm run dev
```

## 🎯 What This Creates

**Messages Table:**
- Stores all chat messages
- Links messages to wallet addresses
- Includes timestamps

**Online Users Table:**
- Tracks active users
- Shows who's online in the last 5 minutes
- Updates automatically

## 📋 Troubleshooting

### Error: "Missing Supabase environment variables"
- Check your `.env.local` file exists
- Verify the environment variable names are correct
- Restart your development server

### Error: "Tables not found"
- Make sure you ran the SQL script in Supabase SQL Editor
- Check that both `messages` and `online_users` tables exist
- Verify your database permissions

### Error: "Authentication failed"
- Double-check your service role key
- Make sure you're using the correct Supabase project URL

## 🔧 Manual Table Creation (Alternative)

If the SQL script doesn't work, create tables manually:

1. Go to **Table Editor** in Supabase
2. Create **messages** table:
   - `id` (uuid, primary key)
   - `message` (text, required)
   - `wallet_address` (text, required)
   - `created_at` (timestamptz, default now())

3. Create **online_users** table:
   - `id` (uuid, primary key)
   - `wallet_address` (text, required, unique)
   - `last_seen` (timestamptz, default now())
   - `created_at` (timestamptz, default now())

## 🎉 After Setup

Your chat system will have:
- ✅ **View messages without wallet** - Anyone can see chat history
- ✅ **Send messages with wallet** - Connect MetaMask to participate
- ✅ **Persistent storage** - Messages saved permanently
- ✅ **Online user count** - See who's active
- ✅ **Real-time updates** - Messages refresh automatically

## 🚀 Next Steps

1. Test the World Chat feature
2. Try connecting/disconnecting your wallet
3. Send some test messages
4. Check the online user counter

Need help? The error messages in the terminal will guide you to the exact issue! 