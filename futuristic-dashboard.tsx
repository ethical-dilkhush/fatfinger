"use client"

import { useState, useEffect } from "react"
import { Zap, TrendingUp, Users, Globe, Activity, Cpu, Database, Shield, Rocket, Eye, Target } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Glowing orb component
function GlowingOrb({ size = "w-32 h-32", color = "bg-cyan-500" }) {
  return <div className={`${size} ${color} rounded-full blur-xl opacity-20 animate-pulse absolute`} />
}

// Liquid progress component
function LiquidProgress({ value, color = "cyan" }: { value: number; color?: string }) {
  return (
    <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r from-${color}-400 to-${color}-600 rounded-full transition-all duration-1000 ease-out relative`}
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 group-hover:border-cyan-400/50 transition-all duration-300" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Icon className={`w-8 h-8 text-${color}-400`} />
          <div className={`text-xs px-2 py-1 bg-${color}-400/20 text-${color}-400 rounded-full`}>{trend}</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white mb-1">{value}</div>
          <div className="text-sm text-gray-400">{title}</div>
        </div>
      </div>
    </div>
  )
}

// Circular progress with glow
function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = "cyan",
}: {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-700"
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
          <div className="text-2xl font-bold text-white">{value}%</div>
          <div className="text-xs text-gray-400">Performance</div>
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
            <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="url(#waveGradient)" className="animate-pulse" />
        <path
          d="M0,60 Q100,30 200,60 T400,60"
          stroke="rgb(34, 211, 238)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    </div>
  )
}

export default function FuturisticDashboard() {
  const [activeMetric, setActiveMetric] = useState(0)
  const totalUsers = useAnimatedCounter(47832)
  const revenue = useAnimatedCounter(892456)
  const performance = useAnimatedCounter(94)

  const metrics = [
    { icon: Users, title: "Active Users", value: totalUsers.toLocaleString(), trend: "+12.5%", color: "cyan" },
    { icon: TrendingUp, title: "Revenue", value: `$${revenue.toLocaleString()}`, trend: "+8.2%", color: "purple" },
    { icon: Activity, title: "Performance", value: `${performance}%`, trend: "+2.1%", color: "green" },
    { icon: Globe, title: "Global Reach", value: "156", trend: "+5.7%", color: "orange" },
  ]

  const systemMetrics = [
    { label: "CPU Usage", value: 67, color: "cyan" },
    { label: "Memory", value: 84, color: "purple" },
    { label: "Storage", value: 45, color: "green" },
    { label: "Network", value: 92, color: "orange" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <FloatingParticles />

      {/* Glowing orbs */}
      <GlowingOrb size="w-96 h-96" color="bg-cyan-500" />
      <div className="absolute top-1/4 right-1/4">
        <GlowingOrb size="w-64 h-64" color="bg-purple-500" />
      </div>
      <div className="absolute bottom-1/4 left-1/3">
        <GlowingOrb size="w-48 h-48" color="bg-green-500" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800/50 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                NEXUS CONTROL
              </h1>
              <p className="text-sm text-gray-400">Advanced Analytics Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-cyan-400 hover:bg-cyan-400/10 border border-cyan-400/30">
              <Shield className="w-4 h-4 mr-2" />
              Secure Mode
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6 space-y-8">
        {/* Hero Metrics - Asymmetrical Layout */}
        <div className="grid grid-cols-12 gap-6 h-96">
          {/* Large featured metric */}
          <div className="col-span-5 row-span-2">
            <Card className="h-full bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-8 h-full flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5" />
                <div className="relative z-10 text-center">
                  <div className="mb-6">
                    <CircularProgress value={94} size={160} strokeWidth={12} />
                  </div>
                  <h3 className="text-xl text-gray-300 mb-2">System Health</h3>
                  <p className="text-sm text-gray-500">All systems operational</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metric cards */}
          <div className="col-span-7 grid grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300"
                onMouseEnter={() => setActiveMetric(index)}
              >
                <HexagonCard {...metric} />
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Data Visualization */}
        <div className="grid grid-cols-12 gap-6">
          {/* Wave chart */}
          <div className="col-span-8">
            <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Real-time Analytics</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-400">Live</span>
                  </div>
                </div>
                <WaveChart />
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {["Visitors", "Conversions", "Revenue", "Engagement"].map((label, index) => (
                    <div key={label} className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {[2847, 1234, 5678, 892][index].toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System metrics */}
          <div className="col-span-4">
            <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">System Metrics</h3>
                <div className="space-y-6">
                  {systemMetrics.map((metric, index) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{metric.label}</span>
                        <span className="text-sm font-semibold text-white">{metric.value}%</span>
                      </div>
                      <LiquidProgress value={metric.value} color={metric.color} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Floating Cards */}
        <div className="relative">
          <div className="grid grid-cols-12 gap-6">
            {/* Activity Feed */}
            <div className="col-span-4 transform rotate-1">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 hover:rotate-0 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-cyan-400" />
                    Activity Feed
                  </h3>
                  <div className="space-y-3">
                    {[
                      { action: "New user registered", time: "2m ago", icon: Users },
                      { action: "System backup completed", time: "15m ago", icon: Database },
                      { action: "Security scan finished", time: "1h ago", icon: Shield },
                      { action: "Performance optimized", time: "2h ago", icon: Rocket },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800/30 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-cyan-400" />
                        <div className="flex-1">
                          <div className="text-sm text-white">{item.action}</div>
                          <div className="text-xs text-gray-400">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="col-span-4 transform -rotate-1">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 hover:rotate-0 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-400" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Deploy", icon: Rocket, color: "cyan" },
                      { label: "Monitor", icon: Eye, color: "purple" },
                      { label: "Backup", icon: Database, color: "green" },
                      { label: "Secure", icon: Shield, color: "orange" },
                    ].map((action, index) => (
                      <Button
                        key={action.label}
                        variant="ghost"
                        className={`h-16 flex flex-col items-center justify-center space-y-1 border border-${action.color}-400/30 hover:bg-${action.color}-400/10 text-${action.color}-400 transition-all duration-300 hover:scale-105`}
                      >
                        <action.icon className="w-5 h-5" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Overview */}
            <div className="col-span-4 transform rotate-1">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 hover:rotate-0 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Cpu className="w-5 h-5 mr-2 text-green-400" />
                    Status Overview
                  </h3>
                  <div className="space-y-4">
                    {[
                      { service: "API Gateway", status: "Online", uptime: "99.9%" },
                      { service: "Database", status: "Online", uptime: "99.8%" },
                      { service: "CDN", status: "Online", uptime: "100%" },
                      { service: "Analytics", status: "Online", uptime: "99.7%" },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white">{service.service}</div>
                          <div className="text-xs text-gray-400">{service.uptime} uptime</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400">{service.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
