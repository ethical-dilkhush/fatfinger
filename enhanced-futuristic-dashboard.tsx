"use client"

import { useState, useEffect } from "react"
import {
  Zap,
  TrendingUp,
  Users,
  Globe,
  Activity,
  BarChart3,
  DollarSign,
  GraduationCap,
  Clock,
  Sparkles,
  Home,
  Copy,
  ExternalLink,
  Link,
  Twitter,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"


// Navigation items with crypto/trading focus
const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    isActive: true,
    description: "Overview & Analytics",
    color: "cyan",
  },
  {
    title: "Volume",
    icon: BarChart3,
    isActive: false,
    description: "Trading Volume",
    color: "purple",
  },
  {
    title: "Market Cap",
    icon: DollarSign,
    isActive: false,
    description: "Market Capitalization",
    color: "green",
  },
  {
    title: "Graduated",
    icon: GraduationCap,
    isActive: false,
    description: "Graduated Tokens",
    color: "orange",
  },
  {
    title: "Last Trade",
    icon: Clock,
    isActive: false,
    description: "Recent Trades",
    color: "pink",
  },
  {
    title: "Fresh",
    icon: Sparkles,
    isActive: false,
    description: "New Listings",
    color: "blue",
  },
  {
    title: "Pump Soon",
    icon: TrendingUp,
    isActive: false,
    description: "Trending Up",
    color: "yellow",
  },
]

// Animated counter hook
function useAnimatedCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return count
}

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number
    left: number
    top: number
    animationDelay: number
    animationDuration: number
  }>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Generate particles only on client side
    const particleData = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
    }))
    setParticles(particleData)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Enhanced Sidebar Component
function EnhancedSidebar({ isOpen, activeItem, setActiveItem }: { isOpen: boolean, activeItem: number, setActiveItem: (index: number) => void }) {

  return (
    <aside 
      id="default-sidebar" 
      className={`fixed top-28 md:top-24 left-0 z-40 w-64 h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)] transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 bg-gradient-to-b from-black via-yellow-950/20 to-black backdrop-blur-xl border-r border-yellow-900/20`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 md:px-4 py-4 md:py-6 overflow-y-auto">
        <ul className="space-y-1 md:space-y-2 font-medium">
          {navigationItems.map((item, index) => (
            <li key={item.title}>
              <button
                onClick={() => setActiveItem(index)}
                className={`
                  flex items-center w-full p-2 md:p-3 text-white rounded-lg group transition-all duration-300
                  ${
                    activeItem === index
                      ? `bg-gradient-to-r from-${item.color}-400/25 to-${item.color}-600/25 text-${item.color}-400`
                      : "hover:bg-yellow-900/20 hover:text-yellow-400"
                  }
                `}
              >
                <item.icon
                  className={`
                    w-4 h-4 md:w-5 md:h-5 transition duration-75
                    ${activeItem === index ? `text-${item.color}-400` : "text-gray-300 group-hover:text-yellow-400"}
                  `}
                />
                <span className="ms-2 md:ms-3 text-sm md:text-base">{item.title}</span>
                {/* Active indicator */}
                {activeItem === index && (
                  <div className="ml-auto">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Status indicator - Responsive */}
        <div className="mt-4 md:mt-6 mx-1 md:mx-2 p-2 md:p-3 bg-gradient-to-r from-yellow-400/15 to-yellow-600/15 rounded-lg md:rounded-xl transition-all duration-500">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full" />
            <span className="text-xs font-medium text-yellow-400">Markets Online</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">All systems operational</div>
        </div>
      </div>
    </aside>
  )
}

// Glowing orb component
function GlowingOrb({ size = "w-32 h-32", color = "bg-cyan-500" }) {
  return <div className={`${size} ${color} rounded-full blur-xl opacity-15 animate-pulse absolute`} />
}

// Liquid progress component
function LiquidProgress({ value, color = "cyan" }: { value: number; color?: string }) {
  return (
    <div className="relative w-full h-2 bg-amber-900 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full transition-all duration-1000 ease-out relative`}
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-white/25 animate-pulse rounded-full" />
      </div>
    </div>
  )
}

// Hexagon metric card
function HexagonCard({
  icon: Icon,
  title,
  value,
  trend,
  color = "cyan",
}: {
  icon: any
  title: string
  value: string
  trend: string
  color?: string
}) {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 to-yellow-950/80 backdrop-blur-lg rounded-2xl border border-amber-800/70 group-hover:border-yellow-400/60 transition-all duration-300" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Icon className={`w-8 h-8 text-${color}-400`} />
          <div className={`text-xs px-2 py-1 bg-${color}-400/25 text-${color}-400 rounded-full`}>{trend}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          <div className="text-sm text-gray-200">{title}</div>
        </div>
      </div>
    </div>
  )
}

// Circular progress with glow - Responsive
function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = "cyan",
  responsive = false,
}: {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  responsive?: boolean
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-amber-900"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`text-${color}-400 transition-all duration-1000 ease-out drop-shadow-lg`}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px rgb(34 211 238 / 0.6))`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`${size < 100 ? 'text-base' : size < 140 ? 'text-lg' : 'text-xl'} font-bold text-white`}>
            {value}%
          </div>
          <div className="text-xs text-gray-400">
            Performance
          </div>
        </div>
      </div>
    </div>
    )
}

// Wave animation component
function WaveChart() {
  return (
    <div className="relative h-32 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(251, 191, 36)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="url(#waveGradient)" className="animate-pulse" />
        <path
          d="M0,60 Q100,30 200,60 T400,60"
          stroke="rgb(251, 191, 36)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    </div>
  )
}

// Token Card Component
function TokenCard({ token, onCopyMintAddress }: { 
  token: {
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
  },
  onCopyMintAddress: (address: string) => void
}) {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const created = new Date(dateString)
    const diffInMs = now.getTime() - created.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}M ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toFixed(0)
  }



  return (
    <Card 
      className="w-full bg-gradient-to-br from-amber-950/80 to-yellow-950/80 backdrop-blur-lg rounded-2xl border border-amber-800/70 hover:border-yellow-400/60 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-900/20 cursor-pointer"
      onClick={() => window.open(`https://fatfinger.fun/app/token/${token.id}`, '_blank')}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
              {token.icon ? (
                <img src={token.icon} alt={token.symbol} className="w-6 h-6 sm:w-8 sm:h-8 rounded" />
              ) : (
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">{token.symbol}</h3>
              <p className="text-xs sm:text-sm text-gray-300 truncate">{token.name}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopyMintAddress(token.mintAddress);
            }}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all duration-200 flex-shrink-0"
            title="Copy mint address"
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {token.description && (
          <p className="text-xs text-gray-400 mb-2 sm:mb-3 line-clamp-2">{token.description}</p>
        )}

        <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
          {token.website && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(token.website, '_blank');
              }}
              className="p-1 sm:p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-all duration-200"
              title="Website"
            >
              <Link className="w-3 h-3" />
            </button>
          )}
          {token.x && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(token.x, '_blank');
              }}
              className="p-1 sm:p-1.5 text-gray-400 hover:text-sky-400 hover:bg-sky-400/10 rounded transition-all duration-200"
              title="Twitter/X"
            >
              <Twitter className="w-3 h-3" />
            </button>
          )}
          {token.telegram && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(token.telegram, '_blank');
              }}
              className="p-1 sm:p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-all duration-200"
              title="Telegram"
            >
              <MessageCircle className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div>
            <p className="text-xs text-gray-400">Market Cap</p>
            <p className="text-xs sm:text-sm font-semibold text-white">${formatNumber(token.marketcap)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Trade</p>
            <p className="text-xs sm:text-sm font-semibold text-white">{formatNumber(token.volumeCount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Volume</p>
            <p className="text-xs sm:text-sm font-semibold text-white">${formatNumber(token.volumeUSD)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Created</p>
            <p className="text-xs sm:text-sm font-semibold text-white">{formatTimeAgo(token.createdAt)}</p>
          </div>
        </div>


      </CardContent>
    </Card>
  )
}

// Pagination Component
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number, 
  totalPages: number, 
  onPageChange: (page: number) => void 
}) {
  const getVisiblePages = () => {
    // Show fewer pages on mobile
    const isMobile = window.innerWidth < 640;
    const delta = isMobile ? 1 : 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8 px-4 sm:px-0">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-950/80 to-yellow-950/80 border border-amber-800/70 text-white hover:border-yellow-400/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
            page === currentPage
              ? 'bg-gradient-to-br from-yellow-400/25 to-yellow-600/25 text-yellow-400 border border-yellow-400/60'
              : page === '...'
              ? 'bg-transparent text-gray-400 cursor-default'
              : 'bg-gradient-to-br from-amber-950/80 to-yellow-950/80 border border-amber-800/70 text-white hover:border-yellow-400/60'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-950/80 to-yellow-950/80 border border-amber-800/70 text-white hover:border-yellow-400/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}

// Volume Page Component
function VolumePage({ tokens, loading, onCopyMintAddress, currentPage, totalPages, onPageChange, totalTokens }: { 
  tokens: Array<any>,
  loading: boolean,
  onCopyMintAddress: (address: string) => void,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalTokens: number
}) {
  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      {/* Marquee Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 to-yellow-950/50 backdrop-blur-xl border border-amber-800/50 rounded-lg p-2 sm:p-3 md:p-4">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-yellow-400 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                              🚧 We are working diligently to develop FatFinger Info's real-time trading volume statistics, which will be available soon. 🚧
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Based on Volume
        </h2>
        {!loading && (
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {totalPages > 1 ? (
              <>
                <span className="hidden sm:inline">Page {currentPage} of {totalPages} • Showing {tokens.length} of {totalTokens} tokens</span>
                <span className="sm:hidden">Page {currentPage}/{totalPages} • {tokens.length} tokens</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Showing {tokens.length} tokens</span>
                <span className="sm:hidden">{tokens.length} tokens</span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {/* Skeleton Loading Cards */}
          <div className="w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-lg rounded-2xl border border-amber-800/50 p-3 sm:p-4 animate-pulse">
                  {/* Header skeleton */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 bg-yellow-400/20 rounded w-16 sm:w-20 mb-1"></div>
                        <div className="h-2 sm:h-3 bg-yellow-400/10 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="mb-2 sm:mb-3">
                    <div className="h-2 bg-yellow-400/10 rounded w-full mb-1"></div>
                    <div className="h-2 bg-yellow-400/10 rounded w-3/4"></div>
                  </div>

                  {/* Social buttons skeleton */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                  </div>

                  {/* Metrics skeleton */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-2 bg-yellow-400/10 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-yellow-400/20 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Cards Grid */}
      {!loading && (
        <div className="w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {tokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onCopyMintAddress={onCopyMintAddress}
            />
                      ))}
          </div>
        </div>
      )}

      {/* No Tokens Message */}
      {!loading && tokens.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
          <p className="text-gray-400 text-sm sm:text-base">No tokens available at the moment.</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && tokens.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

// Market Cap Page Component
function MarketCapPage({ tokens, loading, onCopyMintAddress, currentPage, totalPages, onPageChange, totalTokens }: { 
  tokens: Array<any>,
  loading: boolean,
  onCopyMintAddress: (address: string) => void,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalTokens: number
}) {
  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      {/* Marquee Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 to-yellow-950/50 backdrop-blur-xl border border-amber-800/50 rounded-lg p-2 sm:p-3 md:p-4">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-yellow-400 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                              🚧 We are working diligently to develop FatFinger Info's real-time market cap analytics, which will be available soon. 🚧
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Based on Market Cap
        </h2>
        {!loading && (
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {totalPages > 1 ? (
              <>
                <span className="hidden sm:inline">Page {currentPage} of {totalPages} • Showing {tokens.length} of {totalTokens} tokens</span>
                <span className="sm:hidden">Page {currentPage}/{totalPages} • {tokens.length} tokens</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Showing {tokens.length} tokens</span>
                <span className="sm:hidden">{tokens.length} tokens</span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {/* Skeleton Loading Cards */}
          <div className="w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-lg rounded-2xl border border-amber-800/50 p-3 sm:p-4 animate-pulse">
                  {/* Header skeleton */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 bg-yellow-400/20 rounded w-16 sm:w-20 mb-1"></div>
                        <div className="h-2 sm:h-3 bg-yellow-400/10 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="mb-2 sm:mb-3">
                    <div className="h-2 bg-yellow-400/10 rounded w-full mb-1"></div>
                    <div className="h-2 bg-yellow-400/10 rounded w-3/4"></div>
                  </div>

                  {/* Social buttons skeleton */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                  </div>

                  {/* Metrics skeleton */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-2 bg-yellow-400/10 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-yellow-400/20 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Cards Grid */}
      {!loading && (
        <div className="w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {tokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onCopyMintAddress={onCopyMintAddress}
            />
                      ))}
          </div>
        </div>
      )}

      {/* No Tokens Message */}
      {!loading && tokens.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
          <p className="text-gray-400 text-sm sm:text-base">No tokens available at the moment.</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && tokens.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

// Graduated Page Component
function GraduatedPage({ tokens, loading, onCopyMintAddress, currentPage, totalPages, onPageChange, totalTokens }: { 
  tokens: Array<any>,
  loading: boolean,
  onCopyMintAddress: (address: string) => void,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalTokens: number
}) {
  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      {/* Marquee Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 to-yellow-950/50 backdrop-blur-xl border border-amber-800/50 rounded-lg p-2 sm:p-3 md:p-4">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-yellow-400 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                              🎓 We are working diligently to develop FatFinger Info's real-time graduated token analytics, which will be available soon. 🎓
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Graduated Tokens
        </h2>
        {!loading && (
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {totalPages > 1 ? (
              <>
                <span className="hidden sm:inline">Page {currentPage} of {totalPages} • Showing {tokens.length} of {totalTokens} tokens</span>
                <span className="sm:hidden">Page {currentPage}/{totalPages} • {tokens.length} tokens</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Showing {tokens.length} tokens</span>
                <span className="sm:hidden">{tokens.length} tokens</span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {/* Skeleton Loading Cards */}
          <div className="w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-lg rounded-2xl border border-amber-800/50 p-3 sm:p-4 animate-pulse">
                  {/* Header skeleton */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 bg-yellow-400/20 rounded w-16 sm:w-20 mb-1"></div>
                        <div className="h-2 sm:h-3 bg-yellow-400/10 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="mb-2 sm:mb-3">
                    <div className="h-2 bg-yellow-400/10 rounded w-full mb-1"></div>
                    <div className="h-2 bg-yellow-400/10 rounded w-3/4"></div>
                  </div>

                  {/* Social buttons skeleton */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                  </div>

                  {/* Metrics skeleton */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-2 bg-yellow-400/10 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-yellow-400/20 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Cards Grid */}
      {!loading && (
        <div className="w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {tokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onCopyMintAddress={onCopyMintAddress}
            />
                      ))}
          </div>
        </div>
      )}

      {/* No Tokens Message */}
      {!loading && tokens.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
          <p className="text-gray-400 text-sm sm:text-base">
            {currentPage > 1 
              ? `No graduated tokens found on page ${currentPage}.` 
              : 'No graduated tokens available at the moment.'}
          </p>
          {currentPage > 1 && (
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Try going back to page 1 or an earlier page to see graduated tokens.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && (tokens.length > 0 || currentPage > 1) && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

// Last Trade Page Component
function LastTradePage({ tokens, loading, onCopyMintAddress, currentPage, totalPages, onPageChange, totalTokens }: { 
  tokens: Array<any>,
  loading: boolean,
  onCopyMintAddress: (address: string) => void,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalTokens: number
}) {
  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      {/* Marquee Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 to-yellow-950/50 backdrop-blur-xl border border-amber-800/50 rounded-lg p-2 sm:p-3 md:p-4">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-yellow-400 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
              ⚡ Real-time trade monitoring - tokens with recent trade count increases appear first by recency! 📊
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Recent Trades
        </h2>
        {!loading && (
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {totalPages > 1 ? (
              <>
                <span className="hidden sm:inline">Page {currentPage} of {totalPages} • Showing {tokens.length} of {totalTokens} tokens</span>
                <span className="sm:hidden">Page {currentPage}/{totalPages} • {tokens.length} tokens</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Showing {tokens.length} tokens</span>
                <span className="sm:hidden">{tokens.length} tokens</span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {/* Skeleton Loading Cards */}
          <div className="w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-lg rounded-2xl border border-amber-800/50 p-3 sm:p-4 animate-pulse">
                  {/* Header skeleton */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 bg-yellow-400/20 rounded w-16 sm:w-20 mb-1"></div>
                        <div className="h-2 sm:h-3 bg-yellow-400/10 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="mb-2 sm:mb-3">
                    <div className="h-2 bg-yellow-400/10 rounded w-full mb-1"></div>
                    <div className="h-2 bg-yellow-400/10 rounded w-3/4"></div>
                  </div>

                  {/* Social buttons skeleton */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                  </div>

                  {/* Metrics skeleton */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-2 bg-yellow-400/10 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-yellow-400/20 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Cards Grid */}
      {!loading && (
        <div className="w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {tokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onCopyMintAddress={onCopyMintAddress}
            />
                      ))}
          </div>
        </div>
      )}

      {/* No Tokens Message */}
      {!loading && tokens.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
          <p className="text-gray-400 text-sm sm:text-base">No recent trades available at the moment.</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && tokens.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

// Fresh page component
function FreshPage({ tokens, loading, onCopyMintAddress, currentPage, totalPages, onPageChange, totalTokens }: { 
  tokens: Array<any>,
  loading: boolean,
  onCopyMintAddress: (address: string) => void,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalTokens: number
}) {
  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      {/* Marquee Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 to-yellow-950/50 backdrop-blur-xl border border-amber-800/50 rounded-lg p-2 sm:p-3 md:p-4">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-yellow-400 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                              ✨ FatFinger Info's fresh token discovery engine - spotting the newest launches before they moon! 🚀
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Fresh Launches
        </h2>
        {!loading && (
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {totalPages > 1 ? (
              <>
                <span className="hidden sm:inline">Page {currentPage} of {totalPages} • Showing {tokens.length} of {totalTokens} tokens</span>
                <span className="sm:hidden">Page {currentPage}/{totalPages} • {tokens.length} tokens</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Showing {tokens.length} tokens</span>
                <span className="sm:hidden">{tokens.length} tokens</span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {/* Skeleton Loading Cards */}
          <div className="w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-lg rounded-2xl border border-amber-800/50 p-3 sm:p-4 animate-pulse">
                  {/* Header skeleton */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 bg-yellow-400/20 rounded w-16 sm:w-20 mb-1"></div>
                        <div className="h-2 sm:h-3 bg-yellow-400/10 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="mb-2 sm:mb-3">
                    <div className="h-2 bg-yellow-400/10 rounded w-full mb-1"></div>
                    <div className="h-2 bg-yellow-400/10 rounded w-3/4"></div>
                  </div>

                  {/* Social buttons skeleton */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                  </div>

                  {/* Metrics skeleton */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-2 bg-yellow-400/10 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-yellow-400/20 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

            {/* Token Cards Grid */}
      {!loading && (
        <div className="w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {tokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onCopyMintAddress={onCopyMintAddress}
            />
                      ))}
          </div>
        </div>
      )}

      {/* No Tokens Message */}
      {!loading && tokens.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
          <p className="text-gray-400 text-sm sm:text-base">No tokens available at the moment.</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && tokens.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

// Pump Soon page component
function PumpSoonPage({ tokens, loading, onCopyMintAddress, currentPage, totalPages, onPageChange, totalTokens }: { 
  tokens: Array<any>,
  loading: boolean,
  onCopyMintAddress: (address: string) => void,
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  totalTokens: number
}) {
  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      {/* Marquee Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/50 to-yellow-950/50 backdrop-blur-xl border border-amber-800/50 rounded-lg p-2 sm:p-3 md:p-4">
        <div className="marquee">
          <div className="marquee-content">
            <span className="text-yellow-400 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
              🚀 Pump Soon Detection - tokens that are both newly created AND trending! Double signal for potential moonshots! 📈
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
          Pump Soon Signals
        </h2>
        {!loading && (
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            {totalPages > 1 ? (
              <>
                <span className="hidden sm:inline">Page {currentPage} of {totalPages} • Showing {tokens.length} of {totalTokens} tokens</span>
                <span className="sm:hidden">Page {currentPage}/{totalPages} • {tokens.length} tokens</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Showing {tokens.length} tokens</span>
                <span className="sm:hidden">{tokens.length} tokens</span>
              </>
            )}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {/* Skeleton Loading Cards */}
          <div className="w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="w-full bg-gradient-to-br from-amber-950/40 to-yellow-950/40 backdrop-blur-lg rounded-2xl border border-amber-800/50 p-3 sm:p-4 animate-pulse">
                  {/* Header skeleton */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-3 sm:h-4 bg-yellow-400/20 rounded w-16 sm:w-20 mb-1"></div>
                        <div className="h-2 sm:h-3 bg-yellow-400/10 rounded w-24 sm:w-32"></div>
                      </div>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="mb-2 sm:mb-3">
                    <div className="h-2 bg-yellow-400/10 rounded w-full mb-1"></div>
                    <div className="h-2 bg-yellow-400/10 rounded w-3/4"></div>
                  </div>

                  {/* Social buttons skeleton */}
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                    <div className="w-5 h-5 bg-yellow-400/20 rounded"></div>
                  </div>

                  {/* Metrics skeleton */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-2 bg-yellow-400/10 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-yellow-400/20 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Cards Grid */}
      {!loading && (
        <div className="w-full px-2 sm:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {tokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onCopyMintAddress={onCopyMintAddress}
            />
                      ))}
          </div>
        </div>
      )}

      {/* No Tokens Message */}
      {!loading && tokens.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
          <p className="text-gray-400 text-sm sm:text-base">
            {currentPage > 1 
              ? `No pump soon tokens found on page ${currentPage}.` 
              : 'No tokens available at the moment.'}
          </p>
          {currentPage > 1 && (
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Try going back to page 1 or an earlier page to see pump soon tokens.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && (tokens.length > 0 || currentPage > 1) && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

export default function EnhancedFuturisticDashboard() {
  const [activeNavItem, setActiveNavItem] = useState(0)
  
  // Custom navigation handler that resets Last Trade state when switching tabs and refreshes data
  const handleNavigation = (index: number) => {
    setActiveNavItem(index)
    
    // Close sidebar on mobile when navigating
    setSidebarOpen(false)
    
    // Scroll to top when navigating to a new tab
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Refresh data for the selected tab
    switch (index) {
      case 0: // Dashboard
        fetchMarketMetrics()
        fetchTradingData()
        break
      case 1: // Volume
        setVolumeCurrentPage(1) // Reset to page 1
        setVolumeInitialLoading(true)
        fetchAllTokens(1)
        break
      case 2: // Market Cap
        setMarketCapCurrentPage(1) // Reset to page 1
        setMarketCapInitialLoading(true)
        fetchAllMarketCapTokens(1)
        break
      case 3: // Graduated
        setGraduatedCurrentPage(1) // Reset to page 1
        setGraduatedInitialLoading(true)
        fetchAllGraduatedTokens(1)
        break
      case 4: // Last Trade
        setLastTradeCurrentPage(1) // Reset to page 1
        setLastTradeInitialLoading(true)
        setTradeIncreaseTimestamps(new Map())
        setPreviousTradeCounts(new Map())
        fetchAllLastTradeTokens(1, false)
        break
      case 5: // Fresh
        setFreshCurrentPage(1) // Reset to page 1
        setFreshInitialLoading(true)
        fetchAllFreshTokens(1)
        break
      case 6: // Pump Soon
        setPumpSoonCurrentPage(1) // Reset to page 1
        setPumpSoonInitialLoading(true)
        fetchAllPumpSoonTokens()
        break
      default:
        break
    }
  }
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [tradingLoading, setTradingLoading] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)
  const [contractAddress] = useState("coming soon")
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const [systemMetrics, setSystemMetrics] = useState([
    { label: "Trading Volume", value: 0, color: "cyan" },
    { label: "Market Cap", value: 0, color: "purple" },
    { label: "Active Pairs", value: 0, color: "green" },
    { label: "Network Health", value: 0, color: "orange" },
    { label: "Transaction Count", value: 0, color: "blue" },
    { label: "Wallet Holdings", value: 0, color: "pink" },
    { label: "Comment Count", value: 0, color: "amber" },
  ])

  const [tradingData, setTradingData] = useState({
    buyVolume: "0",
    sellVolume: "0",
    pairs: 0,
    commentCount: 0,
    transactions: 0,
    walletHoldings: "0"
  })

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyMintAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      // Optional: Show success message
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Helper function to fetch SUI price
  const fetchSuiPrice = async (): Promise<number> => {
    try {
      const response = await fetch('/api/sui-price');
      const data = await response.json();
      return data.price || 0.377216; // fallback price
    } catch (error) {
      console.error('Error fetching SUI price:', error);
      return 0.377216; // fallback price
    }
  };

  // Trading Performance Monitoring Functions
  const measureLatency = async (url: string = '/api/market-metrics'): Promise<number> => {
    try {
      const startTime = performance.now()
      const response = await fetch(url, { 
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        }
      })
      const endTime = performance.now()
      
      if (response.ok) {
        // Try to parse JSON to ensure it's a valid response
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          return Math.round(endTime - startTime)
        }
      }
      
      return 999
    } catch (error) {
      console.error('Latency measurement failed:', error)
      return 999
    }
  }

  const measureAPIResponseTime = async (): Promise<number> => {
    try {
      const startTime = performance.now()
      await fetch('/api/market-metrics')
      const endTime = performance.now()
      return Math.round(endTime - startTime)
    } catch (error) {
      console.error('API response time measurement failed:', error)
      return 999
    }
  }

  const estimateNetworkSpeed = async (): Promise<{download: number, upload: number}> => {
    try {
      // Test download speed with local API endpoint
      const testEndpoint = '/api/market-metrics'
      const startTime = performance.now()
      const response = await fetch(testEndpoint)
      const endTime = performance.now()
      
      if (response.ok) {
        const contentLength = response.headers.get('content-length')
        const bytes = contentLength ? parseInt(contentLength) : 1024
        const duration = (endTime - startTime) / 1000 // seconds
        const downloadSpeed = Math.round((bytes * 8) / duration / 1024) // Kbps
        
        return {
          download: Math.min(downloadSpeed, 10000), // Cap at 10 Mbps
          upload: Math.round(downloadSpeed * 0.8) // Estimate upload as 80% of download
        }
      }
      
      return { download: 0, upload: 0 }
    } catch (error) {
      console.error('Network speed estimation failed:', error)
      return { download: 0, upload: 0 }
    }
  }

  const checkTradingPerformance = async () => {
    try {
      setNetworkHealth(prev => ({ ...prev, status: 'Checking...' }))
      
      // Measure network metrics
      const [latency, apiResponseTime, networkSpeed] = await Promise.all([
        measureLatency(),
        measureAPIResponseTime(),
        estimateNetworkSpeed()
      ])

      // Calculate packet loss simulation (based on latency)
      const packetLoss = latency > 500 ? Math.round(Math.random() * 5) : 0

      // Calculate overall health score
      const latencyScore = Math.max(0, 100 - (latency / 10)) // 0-100 based on latency
      const apiScore = Math.max(0, 100 - (apiResponseTime / 20)) // 0-100 based on API response
      const speedScore = Math.min(100, (networkSpeed.download / 100) * 100) // 0-100 based on speed
      const overallHealth = Math.round((latencyScore + apiScore + speedScore) / 3)

      // Determine status
      let status = 'Excellent'
      if (overallHealth < 40) status = 'Poor'
      else if (overallHealth < 60) status = 'Fair'
      else if (overallHealth < 80) status = 'Good'

      setNetworkHealth({
        latency,
        downloadSpeed: networkSpeed.download,
        uploadSpeed: networkSpeed.upload,
        packetLoss,
        apiResponseTime,
        overallHealth,
        status,
        lastUpdated: new Date().toLocaleTimeString()
      })
    } catch (error) {
      console.error('Network health check failed:', error)
      setNetworkHealth(prev => ({
        ...prev,
        status: 'Error',
        lastUpdated: new Date().toLocaleTimeString()
      }))
    }
  }

  // Calculate market sentiment based on all 17 metrics
  const calculateMarketSentiment = (metrics: any) => {
    try {
      // Baseline values for comparison (these can be adjusted based on historical data)
      const baselines = {
        totalVolume: 100000,      // $100K baseline
        totalTrade: 1000,         // 1000 trades baseline
        totalUsers: 500,          // 500 users baseline
        tvl: 10000,              // $10K TVL baseline
        totalRevenue: 1000,       // $1K revenue baseline
        dexTokens: 5,            // 5 tokens baseline
        totalLaunch: 50,         // 50 launches baseline
        bondingPercentage: 2,     // 2% bonding baseline
        avgTradeSize: 50         // $50 average trade baseline
      }

      // Calculate individual metric scores (0-100)
      const volumeScore = Math.min(100, (metrics.totalVolume / baselines.totalVolume) * 30)
      const tradeScore = Math.min(100, (metrics.totalTrade / baselines.totalTrade) * 25)
      const userScore = Math.min(100, (metrics.totalUsers / baselines.totalUsers) * 20)
      const tvlScore = Math.min(100, (metrics.tvl / baselines.tvl) * 15)
      const revenueScore = Math.min(100, (metrics.totalRevenue / baselines.totalRevenue) * 10)
      
      // Weighted sentiment calculation
      const sentimentScore = (
        (volumeScore * 0.25) +           // Volume activity (25% weight)
        (tradeScore * 0.20) +            // Trade activity (20% weight)
        (userScore * 0.20) +             // User engagement (20% weight)
        (tvlScore * 0.20) +              // TVL health (20% weight)
        (revenueScore * 0.15)            // Revenue flow (15% weight)
      )

      // Additional factors
      const diversityBonus = Math.min(10, (metrics.dexTokens + metrics.totalLaunch) / 10)
      const bondingBonus = Math.min(5, metrics.bondingPercentage)
      const avgTradeBonus = Math.min(5, (metrics.avgTradeSize / baselines.avgTradeSize) * 5)

      // Final sentiment score (0-100)
      const finalScore = Math.min(100, Math.max(0, sentimentScore + diversityBonus + bondingBonus + avgTradeBonus))
      
      return Math.round(finalScore)
    } catch (error) {
      console.error('Error calculating market sentiment:', error)
      return 50 // Default neutral sentiment
    }
  }

  const fetchMarketMetrics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/market-metrics')
      const data = await response.json()
      
      if (data.success && data.data) {
        const metrics = data.data
        
        // Helper function to format large numbers with suffix
        const formatLargeNumber = (num: number) => {
          if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) // Keep 1 decimal for billions
          } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) // Keep 1 decimal for millions
          } else if (num >= 1000) {
            return (num / 1000).toFixed(1) // Keep 1 decimal for thousands
          }
          return num.toFixed(0)
        }

        const formatLargeNumberSuffix = (num: number) => {
          if (num >= 1000000000) return 'B'
          if (num >= 1000000) return 'M'
          if (num >= 1000) return 'K'
          return ''
        }

        // Calculate system metrics based on data values (convert to percentage for progress bars)
        const totalVolumeValue = metrics.totalVolume > 0 ? Math.min(98, Math.round((metrics.totalVolume / 1000) * 100)) : 0
        const totalTradeValue = metrics.totalTrade > 0 ? Math.min(98, Math.round((metrics.totalTrade / 1000) * 100)) : 0
        const totalTVLValue = metrics.tvl > 0 ? Math.min(98, Math.round((metrics.tvl / 1000) * 100)) : 0
        const usersValue = metrics.totalUsers > 0 ? Math.min(98, Math.round((metrics.totalUsers / 5000) * 100)) : 0
        const dexTokensValue = metrics.dexTokens > 0 ? Math.min(100, Math.round((metrics.dexTokens / 50) * 100)) : 0
        const launchpadValue = metrics.totalLaunch > 0 ? Math.min(98, Math.round((metrics.totalLaunch / 200) * 100)) : 0
        const revenueValue = metrics.totalRevenue > 0 ? Math.min(98, Math.round((metrics.totalRevenue / 50) * 100)) : 0
        
        // Update system metrics with new data
        setSystemMetrics([
          { 
            label: "Total Volume", 
            value: totalVolumeValue, 
            color: "cyan" 
          },
          { 
            label: "Total Trade", 
            value: totalTradeValue, 
            color: "purple" 
          },
          { 
            label: "Total TVL", 
            value: totalTVLValue, 
            color: "green" 
          },
          { 
            label: "Total Users", 
            value: usersValue, 
            color: "orange" 
          },
          { 
            label: "DEX Tokens", 
            value: dexTokensValue, 
            color: "blue" 
          },
          { 
            label: "Launchpad Tokens", 
            value: launchpadValue, 
            color: "pink" 
          },
          { 
            label: "Total Revenue", 
            value: revenueValue, 
            color: "amber" 
          },
        ])

        // Debug logging for verification
        console.log('📊 FatFinger Metrics:', {
          raw: metrics,
          formatted: {
            totalVolume: `${formatLargeNumber(metrics.totalVolume)}${formatLargeNumberSuffix(metrics.totalVolume)}`,
            totalTrade: `${formatLargeNumber(metrics.totalTrade)}${formatLargeNumberSuffix(metrics.totalTrade)}`,
            tvl: `${formatLargeNumber(metrics.tvl)}${formatLargeNumberSuffix(metrics.tvl)}`,
            totalUsers: metrics.totalUsers,
            dexTokens: metrics.dexTokens,
            totalLaunch: metrics.totalLaunch,
            totalRevenue: `${formatLargeNumber(metrics.totalRevenue)}${formatLargeNumberSuffix(metrics.totalRevenue)}`
          }
        })

        setDashboardMetrics({
          // Volume metrics
          totalVolume: metrics.totalVolume,
          totalVolumeFormatted: formatLargeNumber(metrics.totalVolume),
          totalVolumeSuffix: formatLargeNumberSuffix(metrics.totalVolume),
          dexVolume: metrics.dexVolume,
          dexVolumeFormatted: formatLargeNumber(metrics.dexVolume),
          dexVolumeSuffix: formatLargeNumberSuffix(metrics.dexVolume),
          curveVolume: metrics.curveVolume,
          curveVolumeFormatted: formatLargeNumber(metrics.curveVolume),
          curveVolumeSuffix: formatLargeNumberSuffix(metrics.curveVolume),
          
          // Trade metrics (raw numbers)
          totalTrade: metrics.totalTrade,
          dexTrade: metrics.dexTrade,
          curveTrade: metrics.curveTrade,
          
          // Average trade size metrics
          avgTradeSize: metrics.avgTradeSize,
          avgTradeSizeFormatted: formatLargeNumber(metrics.avgTradeSize),
          avgTradeSizeSuffix: formatLargeNumberSuffix(metrics.avgTradeSize),
          avgDexTrade: metrics.avgDexTrade,
          avgDexTradeFormatted: formatLargeNumber(metrics.avgDexTrade),
          avgDexTradeSuffix: formatLargeNumberSuffix(metrics.avgDexTrade),
          avgCurveTrade: metrics.avgCurveTrade,
          avgCurveTradeFormatted: formatLargeNumber(metrics.avgCurveTrade),
          avgCurveTradeSuffix: formatLargeNumberSuffix(metrics.avgCurveTrade),
          
          // Direct metrics
          totalUsers: metrics.totalUsers,
          totalUsersFormatted: formatLargeNumber(metrics.totalUsers),
          totalUsersSuffix: formatLargeNumberSuffix(metrics.totalUsers),
          dexTokens: metrics.dexTokens,
          totalLaunch: metrics.totalLaunch,
          bondingPercentage: metrics.bondingPercentage,
          
          // TVL and Revenue metrics
          tvl: metrics.tvl,
          tvlFormatted: formatLargeNumber(metrics.tvl),
          tvlSuffix: formatLargeNumberSuffix(metrics.tvl),
          totalRevenue: metrics.totalRevenue,
          totalRevenueFormatted: formatLargeNumber(metrics.totalRevenue),
          totalRevenueSuffix: formatLargeNumberSuffix(metrics.totalRevenue),
          dexRevenue: metrics.dexRevenue,
          dexRevenueFormatted: formatLargeNumber(metrics.dexRevenue),
          dexRevenueSuffix: formatLargeNumberSuffix(metrics.dexRevenue),
          curveRevenue: metrics.curveRevenue,
          curveRevenueFormatted: formatLargeNumber(metrics.curveRevenue),
          curveRevenueSuffix: formatLargeNumberSuffix(metrics.curveRevenue),
          
          // Legacy compatibility
          totalLiquidity: metrics.tvl,
          totalLiquidityFormatted: formatLargeNumber(metrics.tvl),
          totalLiquiditySuffix: formatLargeNumberSuffix(metrics.tvl),
          tokenCount: metrics.dexTokens + metrics.totalLaunch,
          rewards_distributed: metrics.totalRevenue,
          rewardsFormatted: formatLargeNumber(metrics.totalRevenue),
          rewardsSuffix: formatLargeNumberSuffix(metrics.totalRevenue),
          networkHealth: Math.min(95, Math.round(metrics.bondingPercentage * 10)),
          usersCount: metrics.totalUsers,
          usersCountFormatted: formatLargeNumber(metrics.totalUsers),
          usersCountSuffix: formatLargeNumberSuffix(metrics.totalUsers),
          tradeCount: metrics.totalTrade,
          tradeCountFormatted: formatLargeNumber(metrics.totalTrade),
          tradeCountSuffix: formatLargeNumberSuffix(metrics.totalTrade),
          
          // Market sentiment analysis
          marketSentiment: calculateMarketSentiment(metrics)
        })
      }
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Error fetching FatFinger metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTradingData = async () => {
    try {
      setTradingLoading(true)
      
      // Fetch data from all three FatFinger API endpoints via proxy and SUI price
      const [gainersResponse, losersResponse, newListingsResponse, suiPrice] = await Promise.all([
        fetch('/api/tokens?sortBy=Price+(High+to+Low)&view=grid&page=1'),
        fetch('/api/tokens?sortBy=Price+(Low+to+High)&view=grid&page=1'),
        fetch('/api/tokens?sortBy=Newly+Created&view=grid&page=1'),
        fetchSuiPrice()
      ])
      
      const [gainersData, losersData, newListingsData] = await Promise.all([
        gainersResponse.json(),
        losersResponse.json(),
        newListingsResponse.json()
      ])
      
      // Process Top Gainers (highest price tokens)
      const topGainers = gainersData.result?.slice(0, 5).map((token: any) => ({
        tokenAddress: token.tokenAddress,
        ticker: token.ticker,
        name: token.name,
        image: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
        price: parseFloat(token.price || '0') * suiPrice,
        marketCap: parseFloat(token.marketCap || '0') * suiPrice,
        volume: parseFloat(token.volume?.all || '0') * suiPrice,
        priceChange: parseFloat(token.priceChange?.['1h'] || '0')
      })) || []
      
      // Process Top Losers (lowest price tokens)
      const topLosers = losersData.result?.slice(0, 5).map((token: any) => ({
        tokenAddress: token.tokenAddress,
        ticker: token.ticker,
        name: token.name,
        image: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
        price: parseFloat(token.price || '0') * suiPrice,
        marketCap: parseFloat(token.marketCap || '0') * suiPrice,
        volume: parseFloat(token.volume?.all || '0') * suiPrice,
        priceChange: parseFloat(token.priceChange?.['1h'] || '0')
      })) || []
      
      // Process New Listings (newly created tokens)
      const newListings = newListingsData.result?.slice(0, 5).map((token: any) => ({
        tokenAddress: token.tokenAddress,
        ticker: token.ticker,
        name: token.name,
        image: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
        price: parseFloat(token.price || '0') * suiPrice,
        marketCap: parseFloat(token.marketCap || '0') * suiPrice,
        volume: parseFloat(token.volume?.all || '0') * suiPrice,
        priceChange: parseFloat(token.priceChange?.['1h'] || '0')
      })) || []
      
      setTradingActivity({
        topGainers,
        topLosers,
        newListings
      })
      
    } catch (error) {
      console.error('Error fetching FatFinger trading data:', error)
    } finally {
      setTradingLoading(false)
    }
  }

  // Fetch all tokens for Volume page
  const fetchAllTokens = async (page: number = 1) => {
    try {
      // Use pagination loading for all page changes (initial loading is set in useEffect)
      if (page !== 1) {
        setVolumeLoading(true)
      }
      
      const [tokenResponse, suiPrice] = await Promise.all([
        fetch(`/api/tokens?sortBy=Newly+Created&view=grid&page=${page}`),
        fetchSuiPrice()
      ])
      
      const data = await tokenResponse.json()
      
      if (data && data.result && Array.isArray(data.result)) {
        const formattedTokens = data.result.map((token: any) => ({
          id: token.tokenAddress,
          symbol: token.ticker,
          name: token.name,
          description: token.description || '',
          icon: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
          website: token.socials?.website || '',
          x: token.socials?.twitter ? `https://twitter.com/${token.socials.twitter}` : '',
          telegram: token.socials?.telegram ? `https://t.me/${token.socials.telegram}` : '',
          mintAddress: token.tokenAddress,
          marketcap: parseFloat(token.marketCap || '0') * suiPrice,
          volumeUSD: parseFloat(token.volume?.all || '0') * suiPrice,
          volumeCount: token.tradeCount?.all || 0,
          progressPercent: (token.progress || 0) * 100,
          createdAt: token.createdAt || new Date().toISOString()
        }))
        
        // Sort by volume (highest first)
        formattedTokens.sort((a: any, b: any) => b.volumeUSD - a.volumeUSD)
        
        setAllTokens(formattedTokens)
        setVolumeHasMore(data.hasMore || false)
        setVolumeCurrentPage(page)
        
        // Calculate total pages based on API response
        if (data.hasMore) {
          // If there are more pages, show current page + 1
          setVolumeTotalPages(page + 1)
        } else {
          // If no more pages, current page is the last page
          setVolumeTotalPages(page)
        }
      }
    } catch (error) {
      console.error('Error fetching volume tokens:', error)
    } finally {
      setVolumeInitialLoading(false)
      setVolumeLoading(false)
    }
  }

  // Fetch all tokens for Market Cap page
  const fetchAllMarketCapTokens = async (page: number = 1) => {
    try {
      // Use pagination loading for all page changes (initial loading is set in useEffect)
      if (page !== 1) {
        setMarketCapLoading(true)
      }
      
      const [tokenResponse, suiPrice] = await Promise.all([
        fetch(`/api/tokens?sortBy=Market+Cap+(High+to+Low)&view=grid&page=${page}`),
        fetchSuiPrice()
      ])
      
      const data = await tokenResponse.json()
      
      if (data && data.result && Array.isArray(data.result)) {
        const formattedTokens = data.result.map((token: any) => ({
          id: token.tokenAddress,
          symbol: token.ticker,
          name: token.name,
          description: token.description || '',
          icon: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
          website: token.socials?.website || '',
          x: token.socials?.twitter ? `https://twitter.com/${token.socials.twitter}` : '',
          telegram: token.socials?.telegram ? `https://t.me/${token.socials.telegram}` : '',
          mintAddress: token.tokenAddress,
          marketcap: parseFloat(token.marketCap || '0') * suiPrice,
          volumeUSD: parseFloat(token.volume?.all || '0') * suiPrice,
          volumeCount: token.tradeCount?.all || 0,
          progressPercent: (token.progress || 0) * 100,
          createdAt: token.createdAt || new Date().toISOString()
        }))
        
        // Sort by market cap (highest first)
        formattedTokens.sort((a: any, b: any) => b.marketcap - a.marketcap)
        
        setAllMarketCapTokens(formattedTokens)
        setMarketCapHasMore(data.hasMore || false)
        setMarketCapCurrentPage(page)
        
        // Calculate total pages based on API response
        if (data.hasMore) {
          // If there are more pages, show current page + 1
          setMarketCapTotalPages(page + 1)
        } else {
          // If no more pages, current page is the last page
          setMarketCapTotalPages(page)
        }
      }
    } catch (error) {
      console.error('Error fetching market cap tokens:', error)
    } finally {
      setMarketCapInitialLoading(false)
      setMarketCapLoading(false)
    }
  }

  // Fetch all tokens for Graduated page
  const fetchAllGraduatedTokens = async (page: number = 1) => {
    try {
      // Use pagination loading for all page changes (initial loading is set in useEffect)
      if (page !== 1) {
        setGraduatedLoading(true)
      }
      
      const [tokenResponse, suiPrice] = await Promise.all([
        fetch(`/api/tokens?sortBy=Progress+(High+to+Low)&view=grid&page=${page}`),
        fetchSuiPrice()
      ])
      
      const data = await tokenResponse.json()
      
      if (data && data.result && Array.isArray(data.result)) {
        // Filter tokens to only show those with progress = 100 (graduated)
        const graduatedTokens = data.result.filter((token: any) => token.progress === 100)
        
        const formattedTokens = graduatedTokens.map((token: any) => ({
          id: token.tokenAddress,
          symbol: token.ticker,
          name: token.name,
          description: token.description || '',
          icon: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
          website: token.socials?.website || '',
          x: token.socials?.twitter ? `https://twitter.com/${token.socials.twitter}` : '',
          telegram: token.socials?.telegram ? `https://t.me/${token.socials.telegram}` : '',
          mintAddress: token.tokenAddress,
          marketcap: parseFloat(token.marketCap || '0') * suiPrice,
          volumeUSD: parseFloat(token.volume?.all || '0') * suiPrice,
          volumeCount: token.tradeCount?.all || 0,
          progressPercent: (token.progress || 0) * 100,
          createdAt: token.createdAt || new Date().toISOString()
        }))
        
        // Sort by creation date (newest first)
        formattedTokens.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        
        setAllGraduatedTokens(formattedTokens)
        setGraduatedHasMore(data.hasMore || false)
        setGraduatedCurrentPage(page)
        
        // Calculate total pages based on API response - always allow next page if API has more
        if (data.hasMore) {
          setGraduatedTotalPagesState(page + 1)
        } else {
          setGraduatedTotalPagesState(page)
        }
      }
    } catch (error) {
      console.error('Error fetching graduated tokens:', error)
    } finally {
      setGraduatedInitialLoading(false)
      setGraduatedLoading(false)
    }
  }

  // Fetch all tokens for Last Trade page
  const fetchAllLastTradeTokens = async (page: number = 1, isRealTimeUpdate: boolean = false) => {
    try {
      // Use pagination loading for all page changes (initial loading is set in useEffect)
      if (page !== 1 && !isRealTimeUpdate) {
        setLastTradeLoading(true)
      }
      
      // Use a different API endpoint for Last Trade - sort by trading activity
      const [tokenResponse, suiPrice] = await Promise.all([
        fetch(`/api/tokens?sortBy=Volume+(High+to+Low)&view=grid&page=${page}`),
        fetchSuiPrice()
      ])
      
      const data = await tokenResponse.json()
      
      if (data && data.result && Array.isArray(data.result)) {
        const formattedTokens = data.result.map((token: any) => ({
          id: token.tokenAddress,
          symbol: token.ticker,
          name: token.name,
          description: token.description || '',
          icon: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
          website: token.socials?.website || '',
          x: token.socials?.twitter ? `https://twitter.com/${token.socials.twitter}` : '',
          telegram: token.socials?.telegram ? `https://t.me/${token.socials.telegram}` : '',
          mintAddress: token.tokenAddress,
          marketcap: parseFloat(token.marketCap || '0') * suiPrice,
          volumeUSD: parseFloat(token.volume?.all || '0') * suiPrice,
          volumeCount: token.tradeCount?.all || 0,
          progressPercent: (token.progress || 0) * 100,
          createdAt: token.createdAt || new Date().toISOString()
        }))
        
        // For real-time updates, compare trade counts and sort by recent trading activity
        // Show tokens with increasing tradeCount.all first, sorted by recency of increase
        if (isRealTimeUpdate) {
          const currentTime = Date.now()
          const currentTradeCounts = new Map<string, number>()
          const updatedTimestamps = new Map<string, number>(tradeIncreaseTimestamps)
          const tokensWithIncreasedTrades: any[] = []
          const tokensWithoutIncreasedTrades: any[] = []
          
          formattedTokens.forEach((token: any) => {
            const currentCount = token.volumeCount
            const previousCount = previousTradeCounts.get(token.id) || 0
            currentTradeCounts.set(token.id, currentCount)
            
            if (currentCount > previousCount) {
              // Token has increased trade count - record the timestamp
              const increaseAmount = currentCount - previousCount
              updatedTimestamps.set(token.id, currentTime)
              
              tokensWithIncreasedTrades.push({
                ...token,
                lastTradeIncrease: increaseAmount,
                tradeIncreaseTime: currentTime
              })
            } else {
              // Check if token had a previous increase
              const previousIncreaseTime = tradeIncreaseTimestamps.get(token.id)
              if (previousIncreaseTime) {
                tokensWithoutIncreasedTrades.push({
                  ...token,
                  tradeIncreaseTime: previousIncreaseTime
                })
              } else {
                tokensWithoutIncreasedTrades.push(token)
              }
            }
          })
          
          // Sort tokens with increased trades by recency (most recent first)
          tokensWithIncreasedTrades.sort((a: any, b: any) => b.tradeIncreaseTime - a.tradeIncreaseTime)
          
          // Sort other tokens by their previous increase time (most recent first), then by creation date
          tokensWithoutIncreasedTrades.sort((a: any, b: any) => {
            if (a.tradeIncreaseTime && b.tradeIncreaseTime) {
              return b.tradeIncreaseTime - a.tradeIncreaseTime
            }
            if (a.tradeIncreaseTime) return -1
            if (b.tradeIncreaseTime) return 1
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          
          // Combine: tokens with increased trades first, then others
          const sortedTokens = [...tokensWithIncreasedTrades, ...tokensWithoutIncreasedTrades]
          
          setAllLastTradeTokens(sortedTokens)
          setPreviousTradeCounts(currentTradeCounts)
          setTradeIncreaseTimestamps(updatedTimestamps)
        } else {
          // For initial load and pagination, sort by volume (trading activity)
          formattedTokens.sort((a: any, b: any) => b.volumeUSD - a.volumeUSD)
          setAllLastTradeTokens(formattedTokens)
          
          // Update trade counts for future real-time comparisons
          const currentTradeCounts = new Map<string, number>()
          formattedTokens.forEach((token: any) => {
            currentTradeCounts.set(token.id, token.volumeCount)
          })
          setPreviousTradeCounts(currentTradeCounts)
        }
        
        setLastTradeHasMore(data.hasMore || false)
        setLastTradeCurrentPage(page)
        
        // Calculate total pages based on API response
        if (data.hasMore) {
          setLastTradeTotalPagesState(page + 1)
        } else {
          setLastTradeTotalPagesState(page)
        }
      }
    } catch (error) {
      console.error('Error fetching last trade tokens:', error)
    } finally {
      setLastTradeInitialLoading(false)
      setLastTradeLoading(false)
    }
  }

  // Fetch all tokens for Fresh page
  const fetchAllFreshTokens = async (page: number = 1) => {
    try {
      // Use pagination loading for all page changes (initial loading is set in useEffect)
      if (page !== 1) {
        setFreshLoading(true)
      }
      
      const [tokenResponse, suiPrice] = await Promise.all([
        fetch(`/api/tokens?sortBy=Newly+Created&view=grid&page=${page}`),
        fetchSuiPrice()
      ])
      
      const data = await tokenResponse.json()
      
      if (data && data.result && Array.isArray(data.result)) {
        const formattedTokens = data.result.map((token: any) => ({
          id: token.tokenAddress,
          symbol: token.ticker,
          name: token.name,
          description: token.description || '',
          icon: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
          website: token.socials?.website || '',
          x: token.socials?.twitter ? `https://twitter.com/${token.socials.twitter}` : '',
          telegram: token.socials?.telegram ? `https://t.me/${token.socials.telegram}` : '',
          mintAddress: token.tokenAddress,
          marketcap: parseFloat(token.marketCap || '0') * suiPrice,
          volumeUSD: parseFloat(token.volume?.all || '0') * suiPrice,
          volumeCount: token.tradeCount?.all || 0,
          progressPercent: (token.progress || 0) * 100,
          createdAt: token.createdAt || new Date().toISOString()
        }))
        
        // Sort by creation date (newest first) - Fresh tab shows newly created tokens
        formattedTokens.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        
        setAllFreshTokens(formattedTokens)
        setFreshHasMore(data.hasMore || false)
        setFreshCurrentPage(page)
        
        // Calculate total pages based on API response
        if (data.hasMore) {
          setFreshTotalPagesState(page + 1)
        } else {
          setFreshTotalPagesState(page)
        }
      }
    } catch (error) {
      console.error('Error fetching fresh tokens:', error)
    } finally {
      setFreshInitialLoading(false)
      setFreshLoading(false)
    }
  }

  // Fetch all tokens for Pump Soon page - tokens that appear in both trending and newly created APIs
  const fetchAllPumpSoonTokens = async () => {
    try {
      setPumpSoonInitialLoading(true)
      
      // Fetch trending tokens and SUI price first
      const [trendingResponse, suiPrice] = await Promise.all([
        fetch('/api/tokens/trending'),
        fetchSuiPrice()
      ])
      
      const trendingData = await trendingResponse.json()
      
      console.log('Pump Soon - Trending Data:', trendingData)
      
      // Create a map of trending tokens for quick lookup
      const trendingTokensMap = new Map()
      if (trendingData && trendingData.result && Array.isArray(trendingData.result)) {
        trendingData.result.forEach((token: any) => {
          trendingTokensMap.set(token.tokenAddress, {
            priceChange: token.priceChange,
            isTrending: true
          })
        })
      }
      
      console.log('Pump Soon - Trending tokens map size:', trendingTokensMap.size)
      
      // Fetch all newly created tokens (all pages)
      const allNewlyCreatedTokens: any[] = []
      let page = 1
      let hasMore = true
      
      while (hasMore) {
        const newlyCreatedResponse = await fetch(`/api/tokens?sortBy=Newly+Created&view=grid&page=${page}`)
        const newlyCreatedData = await newlyCreatedResponse.json()
        
        if (newlyCreatedData && newlyCreatedData.result && Array.isArray(newlyCreatedData.result)) {
          allNewlyCreatedTokens.push(...newlyCreatedData.result)
          hasMore = newlyCreatedData.hasMore || false
          page++
        } else {
          hasMore = false
        }
      }
      
      console.log('Pump Soon - Total newly created tokens fetched:', allNewlyCreatedTokens.length)
      
      // Find tokens that appear in both APIs
      const matchingTokens: any[] = []
      allNewlyCreatedTokens.forEach((token: any) => {
        const trendingInfo = trendingTokensMap.get(token.tokenAddress)
        if (trendingInfo) {
          // This token appears in both APIs - add it to matching tokens
          matchingTokens.push({
            id: token.tokenAddress,
            symbol: token.ticker,
            name: token.name,
            description: token.description || '',
            icon: token.image ? `https://gateway.pinata.cloud/ipfs/${token.image}` : '',
            website: token.socials?.website || '',
            x: token.socials?.twitter ? `https://twitter.com/${token.socials.twitter}` : '',
            telegram: token.socials?.telegram ? `https://t.me/${token.socials.telegram}` : '',
            mintAddress: token.tokenAddress,
            marketcap: parseFloat(token.marketCap || '0') * suiPrice,
            volumeUSD: parseFloat(token.volume?.all || '0') * suiPrice,
            volumeCount: token.tradeCount?.all || 0,
            progressPercent: (token.progress || 0) * 100,
            createdAt: token.createdAt || new Date().toISOString(),
            priceChange: trendingInfo.priceChange || 0,
            isTrending: trendingInfo.isTrending
          })
        }
      })
      
      // Sort by price change (highest first) - trending tokens with best performance
      matchingTokens.sort((a, b) => (b.priceChange || 0) - (a.priceChange || 0))
      
      console.log('Pump Soon - Matching tokens found:', matchingTokens.length)
      console.log('Pump Soon - Matching tokens:', matchingTokens)
      
      // Store all tokens for client-side pagination
      setAllPumpSoonTokensComplete(matchingTokens)
      
      // Calculate total pages for client-side pagination
      const totalPages = Math.ceil(matchingTokens.length / pumpSoonItemsPerPage)
      setPumpSoonTotalPagesState(totalPages)
      
      // Reset to page 1 and set initial paginated tokens
      setPumpSoonCurrentPage(1)
      const paginatedTokens = matchingTokens.slice(0, pumpSoonItemsPerPage)
      setAllPumpSoonTokens(paginatedTokens)
      
    } catch (error) {
      console.error('Error fetching pump soon tokens:', error)
    } finally {
      setPumpSoonInitialLoading(false)
      setPumpSoonLoading(false)
    }
  }

  // Fetch data on component mount and set up interval
  useEffect(() => {
    if (activeNavItem === 0) { // Dashboard
    fetchMarketMetrics()
    fetchTradingData()
    checkTradingPerformance()
    }
    
    // Only update Dashboard metrics every 30 seconds, not Volume page
    const metricsInterval = setInterval(() => {
      if (activeNavItem === 0) fetchMarketMetrics()
    }, 30000)
    const tradingInterval = setInterval(() => {
      if (activeNavItem === 0) fetchTradingData()
    }, 30000)
    const networkInterval = setInterval(() => {
      if (activeNavItem === 0) checkTradingPerformance()
    }, 30000)
    
    return () => {
      clearInterval(metricsInterval)
      clearInterval(tradingInterval)
      clearInterval(networkInterval)
    }
  }, [activeNavItem])

  // Fetch all tokens only on initial component mount (page load/refresh)
  useEffect(() => {
    // Set initial loading state first
    setVolumeInitialLoading(true)
    setMarketCapInitialLoading(true)
    setGraduatedInitialLoading(true)
    setLastTradeInitialLoading(true)
    setFreshInitialLoading(true)
    setPumpSoonInitialLoading(true)
    fetchAllTokens(1)
    fetchAllMarketCapTokens(1)
    fetchAllGraduatedTokens(1)
    fetchAllLastTradeTokens(1, false)
    fetchAllFreshTokens(1)
    fetchAllPumpSoonTokens()
  }, []) // Empty dependency array means this runs only once on mount

  const [dashboardMetrics, setDashboardMetrics] = useState({
    // Volume metrics
    totalVolume: 0,
    totalVolumeFormatted: "0",
    totalVolumeSuffix: "",
    dexVolume: 0,
    dexVolumeFormatted: "0",
    dexVolumeSuffix: "",
    curveVolume: 0,
    curveVolumeFormatted: "0",
    curveVolumeSuffix: "",
    
    // Trade metrics (raw numbers - no formatting)
    totalTrade: 0,
    dexTrade: 0,
    curveTrade: 0,
    
    // Average trade size metrics
    avgTradeSize: 0,
    avgTradeSizeFormatted: "0",
    avgTradeSizeSuffix: "",
    avgDexTrade: 0,
    avgDexTradeFormatted: "0",
    avgDexTradeSuffix: "",
    avgCurveTrade: 0,
    avgCurveTradeFormatted: "0",
    avgCurveTradeSuffix: "",
    
    // Direct metrics
    totalUsers: 0,
    totalUsersFormatted: "0",
    totalUsersSuffix: "",
    dexTokens: 0,
    totalLaunch: 0,
    bondingPercentage: 0,
    
    // TVL and Revenue metrics
    tvl: 0,
    tvlFormatted: "0",
    tvlSuffix: "",
    totalRevenue: 0,
    totalRevenueFormatted: "0",
    totalRevenueSuffix: "",
    dexRevenue: 0,
    dexRevenueFormatted: "0",
    dexRevenueSuffix: "",
    curveRevenue: 0,
    curveRevenueFormatted: "0",
    curveRevenueSuffix: "",
    
    // Legacy compatibility
    totalLiquidity: 0,
    totalLiquidityFormatted: "0",
    totalLiquiditySuffix: "",
    tokenCount: 0,
    rewards_distributed: 0,
    rewardsFormatted: "0",
    rewardsSuffix: "",
    networkHealth: 0,
    usersCount: 0,
    usersCountFormatted: "0",
    usersCountSuffix: "",
    tradeCount: 0,
    tradeCountFormatted: "0",
    tradeCountSuffix: "",
    
    // Market sentiment analysis
    marketSentiment: 0
  })

  const [networkHealth, setNetworkHealth] = useState({
    latency: 0,
    downloadSpeed: 0,
    uploadSpeed: 0,
    packetLoss: 0,
    apiResponseTime: 0,
    overallHealth: 0,
    status: 'Checking...',
    lastUpdated: ''
  })

  const [tradingActivity, setTradingActivity] = useState<{
    topGainers: Array<{tokenAddress: string, ticker: string, name: string, image?: string, price: number, marketCap: number, volume: number, priceChange?: number}>,
    topLosers: Array<{tokenAddress: string, ticker: string, name: string, image?: string, price: number, marketCap: number, volume: number, priceChange?: number}>,
    newListings: Array<{tokenAddress: string, ticker: string, name: string, image?: string, price: number, marketCap: number, volume: number, priceChange?: number}>
  }>({
    topGainers: [],
    topLosers: [],
    newListings: []
  })

  // Volume page state
  const [allTokens, setAllTokens] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
  }>>([])
  const [volumeLoading, setVolumeLoading] = useState(false)
  const [volumeInitialLoading, setVolumeInitialLoading] = useState(false)
  const [volumeCurrentPage, setVolumeCurrentPage] = useState(1)
  const [volumeHasMore, setVolumeHasMore] = useState(false)
  const [volumeTotalPages, setVolumeTotalPages] = useState(1)
  
  // Market Cap page state
  const [allMarketCapTokens, setAllMarketCapTokens] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
  }>>([])
  const [marketCapLoading, setMarketCapLoading] = useState(false)
  const [marketCapInitialLoading, setMarketCapInitialLoading] = useState(false)
  const [marketCapHasMore, setMarketCapHasMore] = useState(false)
  const [marketCapTotalPages, setMarketCapTotalPages] = useState(1)
  
  // Graduated page state
  const [allGraduatedTokens, setAllGraduatedTokens] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
  }>>([])
  const [graduatedLoading, setGraduatedLoading] = useState(false)
  const [graduatedInitialLoading, setGraduatedInitialLoading] = useState(false)
  const [graduatedHasMore, setGraduatedHasMore] = useState(false)
  const [graduatedTotalPagesState, setGraduatedTotalPagesState] = useState(1)
  
  // Last Trade page state
  const [allLastTradeTokens, setAllLastTradeTokens] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
    lastTradeIncrease?: number;
    tradeIncreaseTime?: number;
  }>>([])
  const [lastTradeLoading, setLastTradeLoading] = useState(false)
  const [lastTradeInitialLoading, setLastTradeInitialLoading] = useState(false)
  const [lastTradeHasMore, setLastTradeHasMore] = useState(false)
  const [lastTradeTotalPagesState, setLastTradeTotalPagesState] = useState(1)
  const [previousTradeCounts, setPreviousTradeCounts] = useState<Map<string, number>>(new Map())
  const [tradeIncreaseTimestamps, setTradeIncreaseTimestamps] = useState<Map<string, number>>(new Map())
  
  // Fresh page state
  const [allFreshTokens, setAllFreshTokens] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
  }>>([])
  const [freshLoading, setFreshLoading] = useState(false)
  const [freshInitialLoading, setFreshInitialLoading] = useState(false)
  const [freshHasMore, setFreshHasMore] = useState(false)
  const [freshTotalPagesState, setFreshTotalPagesState] = useState(1)
  
  // Pump Soon page state
  const [allPumpSoonTokens, setAllPumpSoonTokens] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
    priceChange?: number;
    isTrending?: boolean;
  }>>([])
  const [pumpSoonLoading, setPumpSoonLoading] = useState(false)
  const [pumpSoonInitialLoading, setPumpSoonInitialLoading] = useState(false)
  const [pumpSoonHasMore, setPumpSoonHasMore] = useState(false)
  const [pumpSoonTotalPagesState, setPumpSoonTotalPagesState] = useState(1)
  
  // Additional state for client-side pagination
  const [allPumpSoonTokensComplete, setAllPumpSoonTokensComplete] = useState<Array<{
    id: string;
    symbol: string;
    name: string;
    description?: string;
    icon?: string;
    website?: string;
    x?: string;
    telegram?: string;
    mintAddress: string;
    marketcap: number;
    volumeUSD: number;
    volumeCount: number;
    progressPercent: number;
    createdAt: string;
    priceChange?: number;
    isTrending?: boolean;
  }>>([])
  const [pumpSoonItemsPerPage] = useState(20)
  
  // Pagination state
  const [marketCapCurrentPage, setMarketCapCurrentPage] = useState(1)
  const [graduatedCurrentPage, setGraduatedCurrentPage] = useState(1)
  const [lastTradeCurrentPage, setLastTradeCurrentPage] = useState(1)
  const [freshCurrentPage, setFreshCurrentPage] = useState(1)
  const [pumpSoonCurrentPage, setPumpSoonCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20) // 20 tokens per page for other tabs

  const metrics = [
    { icon: BarChart3, title: "Trade Volume (All)", value: `$${dashboardMetrics.totalVolumeFormatted}${dashboardMetrics.totalVolumeSuffix}`, trend: "+12.5%", color: "cyan" },
    { icon: Activity, title: "Total TVL", value: `$${dashboardMetrics.totalLiquidityFormatted}${dashboardMetrics.totalLiquiditySuffix}`, trend: "+8.2%", color: "purple" },
    { icon: Globe, title: "Total Tokens", value: dashboardMetrics.tokenCount.toLocaleString(), trend: "+2.1%", color: "green" },
    { icon: Users, title: "Users Count", value: `${dashboardMetrics.usersCountFormatted}${dashboardMetrics.usersCountSuffix}`, trend: "+5.7%", color: "orange" },
    { icon: Zap, title: "Total Revenue", value: `$${dashboardMetrics.rewardsFormatted}${dashboardMetrics.rewardsSuffix}`, trend: "+3.4%", color: "yellow" },
  ]

  // Pagination calculations for Volume (server-side pagination)
  const totalPages = volumeTotalPages
  const paginatedTokens = allTokens // API already returns paginated data

  // Pagination calculations for Market Cap (server-side pagination)
  const marketCapTotalPagesCalc = marketCapTotalPages
  const paginatedMarketCapTokens = allMarketCapTokens // API already returns paginated data

  // Pagination calculations for Graduated (server-side pagination)
  const graduatedTotalPages = graduatedTotalPagesState
  const paginatedGraduatedTokens = allGraduatedTokens // API already returns paginated data

  // Pagination calculations for Last Trade (server-side pagination)
  const lastTradeTotalPages = lastTradeTotalPagesState
  const paginatedLastTradeTokens = allLastTradeTokens // API already returns paginated data

  // Pagination calculations for Fresh (server-side pagination)
  const freshTotalPages = freshTotalPagesState
  const paginatedFreshTokens = allFreshTokens // API already returns paginated data

  // Pagination calculations for Pump Soon (client-side pagination)
  const pumpSoonTotalPages = pumpSoonTotalPagesState
  const paginatedPumpSoonTokens = allPumpSoonTokens // Client-side paginated data

  const handlePageChange = (page: number) => {
    // Fetch new data from API for the requested page
    fetchAllTokens(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMarketCapPageChange = (page: number) => {
    // Fetch new data from API for the requested page
    fetchAllMarketCapTokens(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGraduatedPageChange = (page: number) => {
    // Fetch new data from API for the requested page
    fetchAllGraduatedTokens(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLastTradePageChange = (page: number) => {
    // Reset timestamp state when changing pages
    setTradeIncreaseTimestamps(new Map())
    setPreviousTradeCounts(new Map())
    
    // Fetch new data from API for the requested page
    fetchAllLastTradeTokens(page, false)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFreshPageChange = (page: number) => {
    // Fetch new data from API for the requested page
    fetchAllFreshTokens(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePumpSoonPageChange = (page: number) => {
    // Client-side pagination - slice the complete tokens array
    const startIndex = (page - 1) * pumpSoonItemsPerPage
    const endIndex = startIndex + pumpSoonItemsPerPage
    const paginatedTokens = allPumpSoonTokensComplete.slice(startIndex, endIndex)
    
    setAllPumpSoonTokens(paginatedTokens)
    setPumpSoonCurrentPage(page)
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Set up 5-second interval for real-time Last Trade updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Only fetch real-time updates if we're on the Last Trade tab (activeNavItem === 4)
      if (activeNavItem === 4) {
        fetchAllLastTradeTokens(lastTradeCurrentPage, true)
      }
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [activeNavItem, lastTradeCurrentPage]) // Re-run when tab or page changes

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/25 via-amber-950/10 to-transparent" />
      <FloatingParticles />

      {/* Glowing orbs - Responsive sizing */}
      <GlowingOrb size="w-48 h-48 md:w-72 lg:w-96 md:h-72 lg:h-96" color="bg-yellow-500" />
      <div className="absolute top-1/4 right-1/4">
        <GlowingOrb size="w-32 h-32 md:w-48 lg:w-64 md:h-48 lg:h-64" color="bg-amber-500" />
      </div>
      <div className="absolute bottom-1/4 left-1/3">
        <GlowingOrb size="w-24 h-24 md:w-36 lg:w-48 md:h-36 lg:h-48" color="bg-yellow-600" />
      </div>
      <div className="absolute top-1/2 left-1/2">
        <GlowingOrb size="w-16 h-16 md:w-24 lg:w-32 md:h-24 lg:h-32" color="bg-amber-400" />
      </div>

      {/* Unified Header - Full Width - Fixed - Fully Responsive */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-4 md:px-6 md:py-6 backdrop-blur-lg bg-gradient-to-r from-black via-yellow-900/30 to-black w-full border-b border-yellow-900/20">
        <div className="flex items-center justify-between w-full">
          {/* Left Side - Brand */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
              className="inline-flex items-center p-1.5 md:p-2 text-sm text-yellow-400 rounded-lg lg:hidden hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center">
                <img src="/ff.png" alt="FatFinger Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                                      FatFinger Info
                </h1>
                <p className="text-xs md:text-sm text-amber-300">FatFinger Analytics</p>
              </div>
            </div>
          </div>

          {/* Center - Contract Address - Responsive */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-800/50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-yellow-600/30">
            <span className="text-xs md:text-sm text-gray-300 font-mono">{contractAddress}</span>
            <button
              onClick={copyToClipboard}
              className="p-1 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded transition-all duration-200"
              title="Copy contract address"
            >
              <Copy className="w-3 h-3 md:w-4 md:h-4" />
            </button>
            {copied && (
              <span className="text-xs text-green-400 ml-2 animate-fade-in">Copied!</span>
            )}
          </div>

          {/* Right Side - Social Media Links - Responsive */}
          <div className="flex items-center space-x-1 md:space-x-3">
            {/* Twitter */}
            <a 
              href="https://x.com/Fatfinger_Info" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200"
              title="Twitter"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            {/* Telegram */}
            <a 
              href="https://t.me/fatfingerinfo" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
              title="Telegram"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            
            {/* Dexscreener */}
            <a 
              href="#" 
              className="p-1.5 md:p-2 text-gray-300 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all duration-200"
              title="Dexscreener"
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Contract Address Row */}
        <div className="flex md:hidden items-center justify-center space-x-2 mt-3 pt-3 border-t border-yellow-900/20">
          <span className="text-xs text-gray-300 font-mono">{contractAddress}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded transition-all duration-200"
            title="Copy contract address"
          >
            <Copy className="w-3 h-3" />
          </button>
          {copied && (
            <span className="text-xs text-green-400 ml-2 animate-fade-in">Copied!</span>
          )}
        </div>
      </header>

      <div className="min-h-screen flex flex-col pt-28 md:pt-24">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Content Below Header */}
        <div className="flex flex-1">
          <EnhancedSidebar isOpen={sidebarOpen} activeItem={activeNavItem} setActiveItem={handleNavigation} />
          <div className="pt-2 md:pt-6 p-1 sm:p-2 md:p-4 lg:ml-64 flex-1 w-full">
            <div className="flex flex-col w-full">
              {/* Main Content - Fully Responsive */}
              <main className="relative z-10 p-2 sm:p-3 md:p-6 space-y-3 sm:space-y-4 md:space-y-8 bg-gradient-to-br from-black/70 via-amber-950/30 to-black/70 backdrop-blur-sm min-h-screen w-full">
                                  {/* Conditional Page Rendering */}
                  {activeNavItem === 1 ? (
                    <VolumePage 
                      tokens={paginatedTokens} 
                      loading={volumeInitialLoading} 
                      onCopyMintAddress={copyMintAddress}
                      currentPage={volumeCurrentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalTokens={volumeHasMore ? (volumeCurrentPage * 18) + 18 : (volumeCurrentPage - 1) * 18 + allTokens.length}
                    />
                  ) : activeNavItem === 2 ? (
                    <MarketCapPage 
                      tokens={paginatedMarketCapTokens} 
                      loading={marketCapInitialLoading} 
                      onCopyMintAddress={copyMintAddress}
                      currentPage={marketCapCurrentPage}
                      totalPages={marketCapTotalPagesCalc}
                      onPageChange={handleMarketCapPageChange}
                      totalTokens={marketCapHasMore ? (marketCapCurrentPage * 18) + 18 : (marketCapCurrentPage - 1) * 18 + allMarketCapTokens.length}
                    />
                  ) : activeNavItem === 3 ? (
                    <GraduatedPage 
                      tokens={paginatedGraduatedTokens} 
                      loading={graduatedInitialLoading} 
                      onCopyMintAddress={copyMintAddress}
                      currentPage={graduatedCurrentPage}
                      totalPages={graduatedTotalPages}
                      onPageChange={handleGraduatedPageChange}
                      totalTokens={graduatedHasMore ? (graduatedCurrentPage * 18) + 18 : (graduatedCurrentPage - 1) * 18 + allGraduatedTokens.length}
                    />
                  ) : activeNavItem === 4 ? (
                    <LastTradePage 
                      tokens={paginatedLastTradeTokens} 
                      loading={lastTradeInitialLoading} 
                      onCopyMintAddress={copyMintAddress}
                      currentPage={lastTradeCurrentPage}
                      totalPages={lastTradeTotalPages}
                      onPageChange={handleLastTradePageChange}
                      totalTokens={lastTradeHasMore ? (lastTradeCurrentPage * 18) + 18 : (lastTradeCurrentPage - 1) * 18 + allLastTradeTokens.length}
                    />
                  ) : activeNavItem === 5 ? (
                    <FreshPage 
                      tokens={paginatedFreshTokens} 
                      loading={freshInitialLoading} 
                      onCopyMintAddress={copyMintAddress}
                      currentPage={freshCurrentPage}
                      totalPages={freshTotalPages}
                      onPageChange={handleFreshPageChange}
                      totalTokens={freshHasMore ? (freshCurrentPage * 18) + 18 : (freshCurrentPage - 1) * 18 + allFreshTokens.length}
                    />
                  ) : activeNavItem === 6 ? (
                    <PumpSoonPage 
                      tokens={paginatedPumpSoonTokens} 
                      loading={pumpSoonInitialLoading} 
                      onCopyMintAddress={copyMintAddress}
                      currentPage={pumpSoonCurrentPage}
                      totalPages={pumpSoonTotalPages}
                      onPageChange={handlePumpSoonPageChange}
                      totalTokens={allPumpSoonTokensComplete.length}
                    />
                  ) : (
                <>
                {/* Dashboard Metrics Grid - All 17 Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  
                  {/* 1. Total Volume */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-cyan-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                          <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">Total Volume</span>
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                          ${dashboardMetrics.totalVolumeFormatted}{dashboardMetrics.totalVolumeSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 2. DEX Volume */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-blue-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="w-5 h-5 text-blue-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">DEX Volume</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.dexVolumeFormatted}{dashboardMetrics.dexVolumeSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 3. Total Curve Volume */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-purple-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Curve Volume</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.curveVolumeFormatted}{dashboardMetrics.curveVolumeSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 4. Total Trades */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-green-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Trades</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.totalTrade.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 5. Total DEX Trades */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-orange-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-5 h-5 text-orange-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total DEX Trades</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.dexTrade.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 6. Total Curve Trades */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-pink-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Zap className="w-5 h-5 text-pink-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Curve Trades</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.curveTrade.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 7. Avg Trade Size */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-yellow-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <DollarSign className="w-5 h-5 text-yellow-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Avg Trade Size</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.avgTradeSizeFormatted}{dashboardMetrics.avgTradeSizeSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 8. Average DEX Trade */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-indigo-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Users className="w-5 h-5 text-indigo-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Average DEX Trade</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.avgDexTradeFormatted}{dashboardMetrics.avgDexTradeSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 9. Avg Curve Trade */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-teal-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <GraduationCap className="w-5 h-5 text-teal-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Avg Curve Trade</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.avgCurveTradeFormatted}{dashboardMetrics.avgCurveTradeSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 10. Total Users */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-red-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Users className="w-5 h-5 text-red-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Users</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.totalUsers.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 11. Total DEX Tokens */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-emerald-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-5 h-5 text-emerald-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total DEX Tokens</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.dexTokens}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 12. Total Launches */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-violet-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="w-5 h-5 text-violet-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Launches</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.totalLaunch}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 13. Bonding Percentage */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-lime-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Link className="w-5 h-5 text-lime-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Bonding Percentage</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {dashboardMetrics.bondingPercentage.toFixed(2)}%
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                          <div 
                            className="bg-lime-400 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(dashboardMetrics.bondingPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 14. Total Value Locked (TVL) */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-sky-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="w-5 h-5 text-sky-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">TVL</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.tvlFormatted}{dashboardMetrics.tvlSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 15. Total Revenue */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-rose-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <DollarSign className="w-5 h-5 text-rose-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Revenue</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.totalRevenueFormatted}{dashboardMetrics.totalRevenueSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 16. Total DEX Revenue */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-amber-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <BarChart3 className="w-5 h-5 text-amber-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total DEX Revenue</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.dexRevenueFormatted}{dashboardMetrics.dexRevenueSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 17. Total Curve Revenue */}
                  <div>
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-fuchsia-400/60 transition-all duration-300">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="w-5 h-5 text-fuchsia-400" />
                          <span className="text-sm text-gray-400 uppercase tracking-wide">Total Curve Revenue</span>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                          ${dashboardMetrics.curveRevenueFormatted}{dashboardMetrics.curveRevenueSuffix}
                        </div>
                      </CardContent>
                    </Card>
                  </div>



                </div>

                {/* Market Sentiment Analysis */}
                <div className="mb-6">
                  <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-emerald-400/60 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Market Sentiment Analysis</h3>
                        <p className="text-xs sm:text-sm text-gray-400">AI-powered analysis of all 17 metrics</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sentiment Score */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className="w-24 h-24 mx-auto flex items-center justify-center">
                              <CircularProgress 
                                value={dashboardMetrics.marketSentiment || 0} 
                                size={96} 
                                strokeWidth={8} 
                                responsive={false}
                                color={
                                  (dashboardMetrics.marketSentiment || 0) >= 80 ? 'emerald' :
                                  (dashboardMetrics.marketSentiment || 0) >= 60 ? 'yellow' :
                                  (dashboardMetrics.marketSentiment || 0) >= 40 ? 'orange' : 'red'
                                }
                              />
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {dashboardMetrics.marketSentiment || 0}%
                          </div>
                          <div className="text-sm text-gray-400">Overall Sentiment</div>
                        </div>

                        {/* Sentiment Description */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                              (dashboardMetrics.marketSentiment || 0) >= 80 ? 'bg-emerald-500/20' :
                              (dashboardMetrics.marketSentiment || 0) >= 60 ? 'bg-yellow-500/20' :
                              (dashboardMetrics.marketSentiment || 0) >= 40 ? 'bg-orange-500/20' : 'bg-red-500/20'
                            }`}>
                              {(dashboardMetrics.marketSentiment || 0) >= 80 ? (
                                <TrendingUp className="w-8 h-8 text-emerald-400" />
                              ) : (dashboardMetrics.marketSentiment || 0) >= 60 ? (
                                <BarChart3 className="w-8 h-8 text-yellow-400" />
                              ) : (dashboardMetrics.marketSentiment || 0) >= 40 ? (
                                <Activity className="w-8 h-8 text-orange-400" />
                              ) : (
                                <Zap className="w-8 h-8 text-red-400" />
                              )}
                            </div>
                          </div>
                          <div className={`text-lg font-bold mb-1 ${
                            (dashboardMetrics.marketSentiment || 0) >= 80 ? 'text-emerald-400' :
                            (dashboardMetrics.marketSentiment || 0) >= 60 ? 'text-yellow-400' :
                            (dashboardMetrics.marketSentiment || 0) >= 40 ? 'text-orange-400' : 'text-red-400'
                          }`}>
                            {(dashboardMetrics.marketSentiment || 0) >= 80 ? 'Very Bullish' :
                             (dashboardMetrics.marketSentiment || 0) >= 60 ? 'Bullish' :
                             (dashboardMetrics.marketSentiment || 0) >= 40 ? 'Neutral' : 'Bearish'}
                          </div>
                          <div className="text-sm text-gray-400">Market Mood</div>
                        </div>

                        {/* Key Metrics Summary */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className="text-sm text-gray-400 mb-2">Key Drivers</div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-300">Volume Activity</span>
                                <span className={`${
                                  (dashboardMetrics.totalVolume || 0) > 500000 ? 'text-emerald-400' :
                                  (dashboardMetrics.totalVolume || 0) > 200000 ? 'text-yellow-400' : 'text-orange-400'
                                }`}>
                                  {(dashboardMetrics.totalVolume || 0) > 500000 ? 'High' :
                                   (dashboardMetrics.totalVolume || 0) > 200000 ? 'Medium' : 'Low'}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-300">User Growth</span>
                                <span className={`${
                                  (dashboardMetrics.totalUsers || 0) > 2000 ? 'text-emerald-400' :
                                  (dashboardMetrics.totalUsers || 0) > 1000 ? 'text-yellow-400' : 'text-orange-400'
                                }`}>
                                  {(dashboardMetrics.totalUsers || 0) > 2000 ? 'Strong' :
                                   (dashboardMetrics.totalUsers || 0) > 1000 ? 'Moderate' : 'Weak'}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-300">TVL Health</span>
                                <span className={`${
                                  (dashboardMetrics.tvl || 0) > 50000 ? 'text-emerald-400' :
                                  (dashboardMetrics.tvl || 0) > 20000 ? 'text-yellow-400' : 'text-orange-400'
                                }`}>
                                  {(dashboardMetrics.tvl || 0) > 50000 ? 'Excellent' :
                                   (dashboardMetrics.tvl || 0) > 20000 ? 'Good' : 'Fair'}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-300">Revenue Flow</span>
                                <span className={`${
                                  (dashboardMetrics.totalRevenue || 0) > 5000 ? 'text-emerald-400' :
                                  (dashboardMetrics.totalRevenue || 0) > 2000 ? 'text-yellow-400' : 'text-orange-400'
                                }`}>
                                  {(dashboardMetrics.totalRevenue || 0) > 5000 ? 'Strong' :
                                   (dashboardMetrics.totalRevenue || 0) > 2000 ? 'Stable' : 'Developing'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Trading Performance - Full Width */}
                <div className="mb-6">
                  <Card className="min-h-[320px] bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70 hover:border-yellow-400/60 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Trading Performance</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={checkTradingPerformance}
                            className="p-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded transition-all duration-200"
                            title="Refresh trading performance"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                          <div className={`w-3 h-3 rounded-full ${
                            networkHealth.overallHealth >= 80 ? 'bg-emerald-400' :
                            networkHealth.overallHealth >= 60 ? 'bg-yellow-400' :
                            networkHealth.overallHealth >= 40 ? 'bg-orange-400' : 'bg-red-400'
                          } animate-pulse`} />
                          <span className="text-sm text-gray-300">Live</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Overall Health Score */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className="w-20 h-20 mx-auto flex items-center justify-center">
                              <CircularProgress 
                                value={networkHealth.overallHealth} 
                                size={80} 
                                strokeWidth={8} 
                                responsive={false}
                                color={
                                  networkHealth.overallHealth >= 80 ? 'emerald' :
                                  networkHealth.overallHealth >= 60 ? 'yellow' :
                                  networkHealth.overallHealth >= 40 ? 'orange' : 'red'
                                }
                              />
                            </div>
                          </div>
                          <div className="text-xl font-bold text-white mb-1">
                            {networkHealth.overallHealth}%
                          </div>
                          <div className="text-sm text-gray-400">Platform Score</div>
                          <div className={`text-sm font-medium mt-1 ${
                            networkHealth.overallHealth >= 80 ? 'text-emerald-400' :
                            networkHealth.overallHealth >= 60 ? 'text-yellow-400' :
                            networkHealth.overallHealth >= 40 ? 'text-orange-400' : 'text-red-400'
                          }`}>
                            {networkHealth.status}
                          </div>
                        </div>

                        {/* Latency */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                              <Activity className="w-8 h-8 text-blue-400" />
                            </div>
                          </div>
                          <div className="text-lg font-bold text-white mb-1">
                            {networkHealth.latency}ms
                          </div>
                          <div className="text-sm text-gray-400">Order Speed</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {networkHealth.latency < 100 ? 'Excellent' :
                             networkHealth.latency < 300 ? 'Good' :
                             networkHealth.latency < 500 ? 'Fair' : 'Poor'}
                          </div>
                        </div>

                        {/* Download Speed */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center">
                              <TrendingUp className="w-8 h-8 text-cyan-400" />
                            </div>
                          </div>
                          <div className="text-lg font-bold text-white mb-1">
                            {networkHealth.downloadSpeed > 1000 ? 
                              `${(networkHealth.downloadSpeed / 1000).toFixed(1)}M` : 
                              `${networkHealth.downloadSpeed}K`}
                          </div>
                          <div className="text-sm text-gray-400">Market Feed</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {networkHealth.downloadSpeed > 1000 ? 'Fast' :
                             networkHealth.downloadSpeed > 500 ? 'Good' :
                             networkHealth.downloadSpeed > 100 ? 'Fair' : 'Slow'}
                          </div>
                        </div>

                        {/* API Response Time */}
                        <div className="text-center">
                          <div className="mb-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
                              <Zap className="w-8 h-8 text-purple-400" />
                            </div>
                          </div>
                          <div className="text-lg font-bold text-white mb-1">
                            {networkHealth.apiResponseTime}ms
                          </div>
                          <div className="text-sm text-gray-400">Data Sync</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {networkHealth.apiResponseTime < 200 ? 'Fast' :
                             networkHealth.apiResponseTime < 500 ? 'Good' :
                             networkHealth.apiResponseTime < 1000 ? 'Fair' : 'Slow'}
                          </div>
                        </div>
                      </div>

                      {/* Additional Network Info */}
                      <div className="mt-6 pt-4 border-t border-amber-800/30">
                        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-400">
                          <div>
                            <span className="mr-2">Trade Broadcast:</span>
                            <span className="text-white">
                              {networkHealth.uploadSpeed > 1000 ? 
                                `${(networkHealth.uploadSpeed / 1000).toFixed(1)}M` : 
                                `${networkHealth.uploadSpeed}K`}
                            </span>
                          </div>
                          <div>
                            <span className="mr-2">Signal Strength:</span>
                            <span className="text-white">{100 - networkHealth.packetLoss}%</span>
                          </div>
                          <div>
                            <span className="mr-2">Last Check:</span>
                            <span className="text-white">{networkHealth.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Section - Trading Activity - Responsive */}
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div className="col-span-1">
                    <Card className="bg-gradient-to-br from-amber-950/70 to-yellow-950/70 backdrop-blur-xl border border-amber-800/70">
                      <CardContent className="p-4 md:p-6">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 md:mb-6">Recent Trading Activity</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                          {/* Top Gainers */}
                                                      <div className="space-y-2 sm:space-y-3">
                            <h4 className="text-sm sm:text-base md:text-lg font-medium text-gray-200">Top Gainers</h4>
                                                          {tradingActivity.topGainers.slice(0, 5).map((token, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 sm:p-3 bg-amber-950/50 rounded-lg hover:bg-amber-950/70 transition-colors cursor-pointer"
                                  onClick={() => window.open(`https://fatfinger.fun/app/token/${token.tokenAddress}`, '_blank')}
                                >
                                <div className="flex items-center gap-3">
                                  {token.image && (
                                    <img 
                                      src={token.image} 
                                      alt={token.name} 
                                      className="w-8 h-8 rounded-full"
                                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-sm md:text-base text-white font-medium">{token.ticker}</span>
                                    <span className="text-xs text-gray-300">{token.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-green-400">${token.marketCap >= 1000000 ? (token.marketCap / 1000000).toFixed(1) + 'M' : token.marketCap >= 1000 ? (token.marketCap / 1000).toFixed(1) + 'K' : token.marketCap.toFixed(0)}</span>
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Top Losers */}
                          <div className="space-y-3">
                            <h4 className="text-base md:text-lg font-medium text-gray-200">Top Losers</h4>
                            {tradingActivity.topLosers.slice(0, 5).map((token, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-amber-950/50 rounded-lg hover:bg-amber-950/70 transition-colors cursor-pointer"
                                onClick={() => window.open(`https://fatfinger.fun/app/token/${token.tokenAddress}`, '_blank')}
                              >
                                <div className="flex items-center gap-3">
                                  {token.image && (
                                    <img 
                                      src={token.image} 
                                      alt={token.name} 
                                      className="w-8 h-8 rounded-full"
                                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-sm md:text-base text-white font-medium">{token.ticker}</span>
                                    <span className="text-xs text-gray-300">{token.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-red-400">${token.marketCap >= 1000000 ? (token.marketCap / 1000000).toFixed(1) + 'M' : token.marketCap >= 1000 ? (token.marketCap / 1000).toFixed(1) + 'K' : token.marketCap.toFixed(0)}</span>
                                  <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* New Listings */}
                          <div className="space-y-3">
                            <h4 className="text-base md:text-lg font-medium text-gray-200">New Listings</h4>
                            {tradingActivity.newListings.slice(0, 5).map((token, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-amber-950/50 rounded-lg hover:bg-amber-950/70 transition-colors cursor-pointer"
                                onClick={() => window.open(`https://fatfinger.fun/app/token/${token.tokenAddress}`, '_blank')}
                              >
                                <div className="flex items-center gap-3">
                                  {token.image && (
                                    <img 
                                      src={token.image} 
                                      alt={token.name} 
                                      className="w-8 h-8 rounded-full"
                                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                                    />
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-sm md:text-base text-white font-medium">{token.ticker}</span>
                                    <span className="text-xs text-gray-300">{token.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-yellow-400">${token.marketCap >= 1000000 ? (token.marketCap / 1000000).toFixed(1) + 'M' : token.marketCap >= 1000 ? (token.marketCap / 1000).toFixed(1) + 'K' : token.marketCap.toFixed(0)}</span>
                                  <ExternalLink className="w-4 h-4 text-yellow-400" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                </>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
