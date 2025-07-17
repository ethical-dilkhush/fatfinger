# FATFINGER INFO API Documentation

## Overview
This API integrates with FatFinger API to provide real-time market metrics for the FatFinger Info dashboard.

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Market Metrics
**GET** `/api/market-metrics`

Fetches and calculates real-time market metrics from FatFinger API endpoints.

#### Data Sources:
- **Main API**: `https://api.fatfinger.fun/stats`
- **Price API**: `https://api.fatfinger.fun/network/info/price`

#### Response Format:
```json
{
  "success": true,
  "data": {
    "totalVolume": 1200.5,
    "dexVolume": 800.3,
    "curveVolume": 400.2,
    "totalTrade": 5500.0,
    "dexTrade": 2000.0,
    "curveTrade": 3500.0,
    "avgTradeSize": 180.5,
    "avgDexTrade": 250.2,
    "avgCurveTrade": 150.8,
    "totalUsers": 2500,
    "dexTokens": 10,
    "totalLaunch": 120,
    "bondingPercentage": 4.1,
    "tvl": 150.8,
    "totalRevenue": 18.5,
    "dexRevenue": 3.2,
    "curveRevenue": 9.8,
    "rawData": {
      "price": 0.385,
      "multiplier": 0.77,
      "originalStats": {...}
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "FatFinger API"
}
```

#### Metric Calculations:

All volume, trade count, average trade size, TVL, and revenue metrics are calculated using the formula:
**`Original Value × Price`**

Where:
- `Original Value` = Value from FatFinger stats API
- `Price` = Current price from FatFinger price API (e.g., 0.384959)

#### 17 Metrics Breakdown:

**Volume Metrics** (multiplied by price):
1. **Total Volume**: `tradeVolumes.combined.all × price`
2. **DEX Volume**: `tradeVolumes.dex.all × price`
3. **Total Curve Volume**: `tradeVolumes.curve.all × price`

**Trade Count Metrics** (direct data - NO multiplication):
4. **Total Trades**: `tradeCounts.combined.all`
5. **Total DEX Trades**: `tradeCounts.dex.all`
6. **Total Curve Trades**: `tradeCounts.curve.all`

**Average Trade Size Metrics** (multiplied by price):
7. **Average Trade Size**: `avgTradeSize.combined × price`
8. **Average DEX Trade**: `avgTradeSize.dex × price`
9. **Average Curve Trade**: `avgTradeSize.curve × price`

**Direct Metrics** (no multiplication):
10. **Total Users**: `usersCount`
11. **Total DEX Tokens**: `dexTokensCount`
12. **Total Launches**: `launchpadTokensCount`
13. **Bonding Percentage**: `bondedPercentage`

**TVL and Revenue Metrics** (multiplied by price):
14. **Total Value Locked (TVL)**: `tvl.total × price`
15. **Total Revenue**: `approxRevenues.total × price`
16. **Total DEX Revenue**: `approxRevenues.dex × price`
17. **Total Curve Revenue**: `approxRevenues.curve × price`

#### Number Formatting:
- Numbers ≥ 1B: Displayed as X.XB (e.g., 1.2B)
- Numbers ≥ 1M: Displayed as X.XM (e.g., 850.5M)
- Numbers ≥ 1K: Displayed as X.XK (e.g., 125.3K)
- Numbers < 1K: Displayed as whole numbers

### 2. Trading Data
**GET** `/api/trading-data`

Fetches real-time trading data with formatted values for the trading dashboard.

#### Response Format:
```json
{
  "success": true,
  "data": {
    "buyVolume": "$1.5M",
    "sellVolume": "$1.3M",
    "pairs": 25,
    "commentCount": 143,
    "transactions": 892,
    "walletHoldings": "$1.2M",
    "rawData": {
      "totalBuyVolume": 1500000,
      "totalSellVolume": 1300000,
      "totalPairs": 25,
      "totalCommentCount": 143,
      "totalTransactions": 892,
      "totalWalletHoldings": 1200000
    }
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "MintLP API"
}
```

### 3. Test Metrics
**GET** `/api/test-metrics`

Test endpoint to verify MintLP API connection and view sample data.

#### Response Format:
```json
{
  "success": true,
  "message": "MintLP API connection successful",
  "totalTokens": 850,
  "sampleData": [...],
  "apiStatus": "Connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 4. Klik Stats
**GET** `/api/klik-stats`

Fetches ecosystem statistics from Klik Finance API.

#### Response Format:
```json
{
  "totalMarketcap": 0,
  "tokenCount": 0,
  "totalLiquidity": 0,
  "totalVolume": 0,
  "rewards_distributed": 0
}
```

## Frontend Integration

### React Hook Usage:
```typescript
const [dashboardMetrics, setDashboardMetrics] = useState({})
const [loading, setLoading] = useState(false)

const fetchMarketMetrics = async () => {
  setLoading(true)
  const response = await fetch('/api/market-metrics')
  const result = await response.json()
  
  if (result.success) {
    setDashboardMetrics(result.data)
  }
  setLoading(false)
}
```

### Dashboard Cards:
The dashboard displays all 17 metrics in a responsive grid layout with:
- Color-coded icons for each metric type
- Formatted values with appropriate suffixes (K, M, B)
- Hover effects and animations
- Real-time updates every 30 seconds

### Auto-refresh:
```typescript
useEffect(() => {
  fetchMarketMetrics()
  const interval = setInterval(fetchMarketMetrics, 30000)
  return () => clearInterval(interval)
}, [])
```

## Error Handling

### Fallback Data:
If the FatFinger API fails, the system returns fallback data with all 17 metrics:
```json
{
  "success": false,
  "error": "Failed to fetch FatFinger metrics",
  "data": {
    "totalVolume": 1200.5,
    "dexVolume": 800.3,
    "curveVolume": 400.2,
    // ... all 17 metrics with fallback values
  },
  "source": "Fallback Data"
}
```

## Rate Limiting
- API responses are cached for 30 seconds
- Frontend auto-refreshes every 30 seconds
- Manual refresh button available

## Development

### Testing the API:
```bash
# Test market metrics
curl http://localhost:3000/api/market-metrics

# Test trading data
curl http://localhost:3000/api/trading-data

# Test connection
curl http://localhost:3000/api/test-metrics

# Test klik stats
curl http://localhost:3000/api/klik-stats
```

### Environment Variables:
No environment variables required for basic functionality.

## Security Notes
- All API calls are server-side only
- No sensitive data exposed to client
- Rate limiting prevents API abuse
- Fallback data ensures dashboard always displays content

## Performance
- Response time: ~200-500ms
- Cache duration: 30 seconds
- Auto-refresh: 30 seconds
- Error recovery: Automatic fallback

## API Flow
1. **Market Metrics Endpoint**: Fetches data from both FatFinger stats and price APIs
2. **Price Calculation**: Multiplies relevant metrics by 2 × current price
3. **Number Formatting**: Formats large numbers with appropriate suffixes
4. **Response**: Returns structured data with all 17 metrics
5. **Dashboard Display**: Shows metrics in responsive card layout
6. **Auto-refresh**: Updates every 30 seconds for real-time data 