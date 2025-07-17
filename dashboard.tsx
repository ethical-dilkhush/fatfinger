"use client"
import { TrendingUp, Download, BarChart3, Users, Calendar, Settings, BookOpen, HelpCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Reports",
    icon: BarChart3,
    isActive: true,
  },
  {
    title: "Library",
    icon: BookOpen,
  },
  {
    title: "People",
    icon: Users,
  },
  {
    title: "Activities",
    icon: Calendar,
  },
]

const supportItems = [
  {
    title: "Get Started",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    icon: Settings,
  },
]

const weakestTopics = [
  {
    name: "Food Safety",
    percentage: 74,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Compliance Basics Procedures",
    percentage: 52,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Company Networking",
    percentage: 36,
    image: "/placeholder.svg?height=40&width=40",
  },
]

const strongestTopics = [
  {
    name: "Covid Protocols",
    percentage: 95,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Cyber Security Basics",
    percentage: 92,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Social Media Policies",
    percentage: 89,
    image: "/placeholder.svg?height=40&width=40",
  },
]

const userLeaderboard = [
  {
    name: "Jesse Thomas",
    points: 637,
    percentage: 98,
    rank: 1,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Thisal Mathiyazhagan",
    points: 637,
    percentage: 89,
    rank: 2,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const groupLeaderboard = [
  {
    name: "Houston Facility",
    points: 52,
    percentage: 97,
    rank: 1,
  },
  {
    name: "Test Group",
    points: 52,
    percentage: 95,
    rank: 2,
  },
]

const activityData = [
  { month: "JAN", value: 150 },
  { month: "FEB", value: 180 },
  { month: "MAR", value: 170 },
  { month: "APR", value: 280 },
  { month: "MAY", value: 320 },
  { month: "JUN", value: 250 },
  { month: "JUL", value: 280 },
  { month: "AUG", value: 150 },
  { month: "SEP", value: 300 },
  { month: "OCT", value: 350 },
  { month: "NOV", value: 380 },
  { month: "DEC", value: 420 },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="text-red-600 font-bold text-xl tracking-wider">TESLA</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} className="w-full justify-start">
                    <a href="#" className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-sm font-medium">Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full justify-start">
                    <a href="#" className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function ActivityChart() {
  const maxValue = Math.max(...activityData.map((d) => d.value))

  return (
    <div className="flex items-end justify-between h-32 gap-1">
      {activityData.map((data, index) => (
        <div key={data.month} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="bg-blue-500 rounded-sm w-full min-w-[8px] transition-all"
            style={{
              height: `${(data.value / maxValue) * 100}%`,
              minHeight: "4px",
            }}
          />
          <span className="text-xs text-muted-foreground">{data.month}</span>
        </div>
      ))}
    </div>
  )
}

function TrendLine({ trend = "up" }: { trend?: "up" | "down" }) {
  return (
    <div className="h-8 w-16 relative">
      <svg className="w-full h-full" viewBox="0 0 64 32">
        <path
          d={trend === "up" ? "M0,24 Q16,20 32,16 Q48,12 64,8" : "M0,8 Q16,12 32,16 Q48,20 64,24"}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-blue-500"
        />
      </svg>
    </div>
  )
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-2xl font-semibold">Reports</h1>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-6">
              {/* Filters */}
              <div className="flex gap-4">
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">Timeframe: All-time</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-week">Last Week</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-people">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="People" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-people">People: All</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-topics">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-topics">Topic: All</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Top Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      27<span className="text-lg text-muted-foreground">/80</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Questions Answered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3,298</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Av. Session Length</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2m 34s</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                      Activity
                      <span className="text-xs">Month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivityChart />
                  </CardContent>
                </Card>
              </div>

              {/* Knowledge Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Starting Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">64%</div>
                      <TrendLine trend="up" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Current Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold">86%</div>
                      <TrendLine trend="up" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Knowledge Gain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-green-600">+34%</div>
                      <TrendLine trend="up" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Topics and Leaderboards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weakest Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Weakest Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {weakestTopics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Image
                          src={topic.image || "/placeholder.svg"}
                          alt={topic.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{topic.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={topic.percentage} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{topic.percentage}%</span>
                            <span className="text-sm text-muted-foreground">Correct</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Strongest Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Strongest Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {strongestTopics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Image
                          src={topic.image || "/placeholder.svg"}
                          alt={topic.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{topic.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={topic.percentage} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{topic.percentage}%</span>
                            <span className="text-sm text-muted-foreground">Correct</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* User Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">User Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userLeaderboard.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.points} Points • {user.percentage}% Correct
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{user.rank}</span>
                          {user.rank === 1 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 bg-red-500 rounded-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Groups Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Groups Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {groupLeaderboard.map((group, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{group.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {group.points} Points / User • {group.percentage}% Correct
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{group.rank}</span>
                          {group.rank === 1 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 bg-red-500 rounded-sm flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
