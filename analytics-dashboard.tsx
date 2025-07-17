"use client"

import { Search, Bell, MessageCircle, BarChart3, Calendar, Settings, Folder, Grid3X3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Grid3X3,
    isActive: true,
  },
  {
    title: "Calendar",
    icon: Calendar,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Pitch",
    icon: Folder,
  },
  {
    title: "Settings",
    icon: Settings,
  },
]

const trafficData = [
  { day: "Mon", value: 10000, color: "bg-pink-400" },
  { day: "Tue", value: 18000, color: "bg-green-400" },
  { day: "Wed", value: 22000, color: "bg-red-400" },
  { day: "Thu", value: 8000, color: "bg-pink-300" },
  { day: "Fri", value: 15000, color: "bg-green-300" },
  { day: "Sat", value: 20000, color: "bg-pink-300" },
  { day: "Sun", value: 12000, color: "bg-green-300" },
]

const engagementData = [
  { platform: "Google", value: "134k" },
  { platform: "Facebook", value: "130k" },
  { platform: "Instagram", value: "120k" },
  { platform: "Snapchat", value: "118k" },
  { platform: "Tiktok", value: "115k" },
  { platform: "Youtube", value: "107k" },
  { platform: "WhatsApp", value: "089k" },
]

const deviceData = [
  { device: "Mobile", percentage: 45, color: "bg-pink-400" },
  { device: "Web App", percentage: 35, color: "bg-green-400" },
  { device: "Tablet", percentage: 20, color: "bg-red-400" },
]

const viewerAgeData = [
  { range: "00-18", value: 15, color: "bg-pink-400" },
  { range: "18-25", value: 25, color: "bg-green-400" },
  { range: "26-35", value: 35, color: "bg-red-400" },
  { range: "36-45", value: 20, color: "bg-pink-300" },
  { range: "46-55", value: 15, color: "bg-green-300" },
  { range: "55+", value: 10, color: "bg-pink-300" },
]

function TrendLine({ trend = "up" }: { trend?: "up" | "down" }) {
  return (
    <div className="h-6 w-12 relative">
      <svg className="w-full h-full" viewBox="0 0 48 24">
        <path
          d={trend === "up" ? "M0,20 Q12,16 24,12 Q36,8 48,4" : "M0,4 Q12,8 24,12 Q36,16 48,20"}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-green-400"
        />
      </svg>
    </div>
  )
}

function CircularChart() {
  const radius = 80
  const strokeWidth = 8
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI

  const segments = [
    { percentage: 30, color: "stroke-pink-400", offset: 0 },
    { percentage: 25, color: "stroke-green-400", offset: 30 },
    { percentage: 25, color: "stroke-red-400", offset: 55 },
    { percentage: 20, color: "stroke-yellow-400", offset: 80 },
  ]

  return (
    <div className="relative w-40 h-40">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-gray-700"
        />
        {segments.map((segment, index) => {
          const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`
          const strokeDashoffset = -((segment.offset / 100) * circumference)

          return (
            <circle
              key={index}
              stroke="currentColor"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className={segment.color}
              strokeLinecap="round"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">174k</div>
        <div className="text-sm text-gray-400">Views</div>
      </div>
    </div>
  )
}

function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-800 bg-gray-900">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="text-white font-semibold">analytics.</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <a href="#" className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-sm text-gray-300 mb-2">Get 10% off for all features!</div>
            <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-medium">Upgrade Now</Button>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Light</span>
          <Switch />
          <span className="text-white">Dark</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex flex-col">
              {/* Header */}
              <header className="flex h-16 items-center justify-between border-b border-gray-800 px-6 bg-gray-900">
                <div className="flex items-center gap-4 flex-1">
                  <SidebarTrigger className="lg:hidden text-white" />
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search anything"
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">UIFly.com</span>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 p-6 space-y-6 bg-gray-900">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Hi, Benjamin!</h1>
                    <p className="text-gray-400">Congratulations. You got a great response today.</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      Blog
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      Platform
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      Forum
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Top Metrics */}
                  <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Real time users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-white">60.7k</div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              +125%
                            </Badge>
                            <TrendLine trend="up" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Visits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-white">40.2k</div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              +125%
                            </Badge>
                            <TrendLine trend="up" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Visit Duration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-white">36h 52m</div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              +125%
                            </Badge>
                            <TrendLine trend="up" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Circular Chart */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <CircularChart />
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-400 rounded-full" />
                            <span className="text-gray-400">Pakistan</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-gray-400">China</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            <span className="text-gray-400">Canada</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                            <span className="text-gray-400">America</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Traffic Channel */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-white">Traffic Channel</CardTitle>
                        <div className="flex gap-4 text-sm">
                          <button className="text-white border-b-2 border-white pb-1">Hotline</button>
                          <button className="text-gray-400">Balance</button>
                          <button className="text-gray-400">Total</button>
                          <button className="text-gray-400">Weekly</button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between h-48 gap-2">
                        {trafficData.map((data, index) => {
                          const maxValue = Math.max(...trafficData.map((d) => d.value))
                          const height = (data.value / maxValue) * 100

                          return (
                            <div key={data.day} className="flex flex-col items-center gap-2 flex-1">
                              <div className="text-xs text-gray-400">
                                {data.value >= 1000 ? `${(data.value / 1000).toFixed(0)}k` : data.value}
                              </div>
                              <div
                                className={`${data.color} rounded-t-lg w-full transition-all`}
                                style={{ height: `${height}%`, minHeight: "8px" }}
                              />
                              <span className="text-xs text-gray-400">{data.day}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Views From Devices */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Views From Devices</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        {deviceData.map((device, index) => (
                          <div
                            key={device.device}
                            className={`${device.color} h-3 rounded-full`}
                            style={{ width: `${device.percentage}%` }}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        {deviceData.map((device, index) => (
                          <div key={device.device} className="flex items-center gap-2">
                            <div className={`w-2 h-2 ${device.color} rounded-full`} />
                            <span className="text-gray-400">{device.device}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Engagements */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Engagements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        {engagementData.map((item, index) => (
                          <div key={item.platform} className="text-center">
                            <div className="text-xl font-bold text-white">{item.value}</div>
                            <div className="text-xs text-gray-400">{item.platform}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Viewers */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-white">Viewers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between h-24 gap-2">
                        {viewerAgeData.map((data, index) => {
                          const maxValue = Math.max(...viewerAgeData.map((d) => d.value))
                          const height = (data.value / maxValue) * 100

                          return (
                            <div key={data.range} className="flex flex-col items-center gap-2 flex-1">
                              <div
                                className={`${data.color} rounded-full w-4`}
                                style={{ height: `${height}%`, minHeight: "8px" }}
                              />
                              <span className="text-xs text-gray-400">{data.range}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
