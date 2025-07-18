// Test Supabase connection and database setup
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables!');
    console.log('Please check your .env.local file contains:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('NEXT_PUBLIC_SERVICE_ROLE=your_service_role_key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testDatabaseConnection() {
    try {
        console.log('🔍 Testing Supabase connection...');
        
        // Test basic connection
        const { data: connectionTest, error: connectionError } = await supabase
            .from('messages')
            .select('count')
            .limit(1);

        if (connectionError) {
            if (connectionError.code === '42P01') {
                console.error('❌ Tables not found! Please run the database setup first.');
                console.log('\n📋 To fix this:');
                console.log('1. Go to your Supabase project dashboard');
                console.log('2. Navigate to SQL Editor');
                console.log('3. Copy and paste the contents of supabase-setup.sql');
                console.log('4. Run the SQL script');
                return false;
            }
            throw connectionError;
        }

        console.log('✅ Database connection successful!');

        // Test messages table
        const { data: messages, error: messagesError } = await supabase
            .from('messages')
            .select('*')
            .limit(5);

        if (messagesError) throw messagesError;
        
        console.log(`✅ Messages table working! Found ${messages.length} messages.`);

        // Test online_users table
        const { data: users, error: usersError } = await supabase
            .from('online_users')
            .select('*')
            .limit(5);

        if (usersError) throw usersError;
        
        console.log(`✅ Online users table working! Found ${users.length} online users.`);

        console.log('\n🎉 All tests passed! Your Supabase setup is working correctly.');
        return true;

    } catch (error) {
        console.error('❌ Database test failed:', error.message);
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Check your environment variables in .env.local');
        console.log('2. Verify your Supabase project is active');
        console.log('3. Run the supabase-setup.sql script in your Supabase SQL Editor');
        console.log('4. Check your Supabase project permissions');
        return false;
    }
}

// Run the test
testDatabaseConnection().then(success => {
    process.exit(success ? 0 : 1);
}); 