#!/usr/bin/env node

// Test script for NEXUS TRADE API endpoints
const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🚀 Testing NEXUS TRADE API Endpoints...\n');

  // Test 1: Market Metrics
  console.log('📊 Testing Market Metrics API...');
  try {
    const response = await fetch(`${BASE_URL}/market-metrics`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Market Metrics API - SUCCESS');
      console.log(`   Trading Volume: ${data.data.tradingVolume}%`);
      console.log(`   Market Cap: ${data.data.marketCap}%`);
      console.log(`   Active Pairs: ${data.data.activePairs}%`);
      console.log(`   Network Health: ${data.data.networkHealth}%`);
      console.log(`   Transaction Count: ${data.data.transactionCount}%`);
      console.log(`   Wallet Holdings: ${data.data.walletHoldings}%`);
      console.log(`   Comment Count: ${data.data.commentCount}%`);
      console.log(`   Total Tokens: ${data.data.rawData.totalTokens}`);
      console.log(`   Source: ${data.source}`);
    } else {
      console.log('⚠️  Market Metrics API - FALLBACK DATA');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ Market Metrics API - FAILED');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n');

  // Test 2: Trading Data
  console.log('📈 Testing Trading Data API...');
  try {
    const response = await fetch(`${BASE_URL}/trading-data`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Trading Data API - SUCCESS');
      console.log(`   Buy Volume: ${data.data.buyVolume}`);
      console.log(`   Sell Volume: ${data.data.sellVolume}`);
      console.log(`   Pairs (1h): ${data.data.pairs.toLocaleString()}`);
      console.log(`   Comment Count: ${data.data.commentCount.toLocaleString()}`);
      console.log(`   Transactions: ${data.data.transactions.toLocaleString()}`);
      console.log(`   Wallet Holdings: ${data.data.walletHoldings}`);
      console.log(`   Source: ${data.source}`);
    } else {
      console.log('⚠️  Trading Data API - FALLBACK DATA');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ Trading Data API - FAILED');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n');

  // Test 3: Test Metrics
  console.log('🔍 Testing API Connection...');
  try {
    const response = await fetch(`${BASE_URL}/test-metrics`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Test API - SUCCESS');
      console.log(`   API Status: ${data.apiStatus}`);
      console.log(`   Total Tokens: ${data.totalTokens}`);
      console.log(`   Sample Data: ${data.sampleData.length} tokens`);
      
      if (data.sampleData.length > 0) {
        console.log('\n   Sample Token:');
        const token = data.sampleData[0];
        console.log(`     Symbol: ${token.symbol}`);
        console.log(`     Name: ${token.name}`);
        console.log(`     Volume: $${token.volumeUSD}`);
        console.log(`     Market Cap: $${token.marketcap}`);
        console.log(`     Trend: ${token.volumeUSD1hChange}`);
      }
    } else {
      console.log('❌ Test API - FAILED');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ Test API - FAILED');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n');

  // Test 4: Direct MintLP API
  console.log('🌐 Testing Direct MintLP Connection...');
  try {
    const response = await fetch('https://api.mintlp.io/v1/fun?sortBy=NEW&state=NOT_GRADUATED&blockchainSymbol=SOL&page=1&pageSize=5');
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      console.log('✅ Direct MintLP API - SUCCESS');
      console.log(`   Total Tokens Available: ${data.data.length}`);
      console.log(`   First Token: ${data.data[0].symbol} (${data.data[0].name})`);
    } else {
      console.log('⚠️  Direct MintLP API - NO DATA');
    }
  } catch (error) {
    console.log('❌ Direct MintLP API - FAILED');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n✨ API Testing Complete!\n');
}

// Run the test
testAPI().catch(console.error); 