"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  CalendarDays,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  MapPin,
  Globe,
  Clock,
  Star,
  Activity,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  fee: number;
  isPublic: boolean;
  type: "ONLINE" | "OFFLINE";
  isDeleted?: boolean;
}

interface User {
  id: string;
  createdAt: string;
  isDeleted?: boolean;
}

interface AdminDashboardOverviewProps {
  events?: Event[];
  users?: User[];
}

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"];
const GRADIENT_COLORS = {
  primary: "from-blue-500 to-blue-600",
  success: "from-emerald-500 to-emerald-600",
  warning: "from-amber-500 to-amber-600",
  purple: "from-purple-500 to-purple-600",
};

const AdminDashboardOverview = ({
  events = [],
  users = [],
}: AdminDashboardOverviewProps) => {
  // Filter out deleted
  const validEvents = events?.filter((event) => !event?.isDeleted) || [];
  const validUsers = users?.filter((user) => !user?.isDeleted) || [];
  
  // Calculate summary data with proper fallbacks
  const totalEvents = validEvents?.length || 0;
  const upcomingEvents =
    validEvents?.filter((event) => new Date(event?.startDate || 0) > new Date())
      ?.length || 0;
  const revenue =
    validEvents?.reduce((sum, event) => sum + (event?.fee || 0), 0) || 0;
  const totalUsers = validUsers?.length || 0;

  // Calculate additional metrics
  const onlineEvents = validEvents?.filter(event => event.type === "ONLINE")?.length || 0;
  const offlineEvents = validEvents?.filter(event => event.type === "OFFLINE")?.length || 0;
  const publicEvents = validEvents?.filter(event => event.isPublic)?.length || 0;
  const privateEvents = validEvents?.filter(event => !event.isPublic)?.length || 0;

  // Prepare bar chart data (group by month)
  const currentYear = new Date().getFullYear();
  const monthlyEvents = Array(12).fill(0);
  const monthlyRevenue = Array(12).fill(0);

  validEvents?.forEach((event) => {
    const eventDate = event?.startDate ? new Date(event.startDate) : null;
    if (eventDate?.getFullYear() === currentYear) {
      const month = eventDate.getMonth();
      monthlyEvents[month]++;
      monthlyRevenue[month] += event?.fee || 0;
    }
  });

  const barChartData = [
    { month: "Jan", events: monthlyEvents[0], revenue: monthlyRevenue[0] },
    { month: "Feb", events: monthlyEvents[1], revenue: monthlyRevenue[1] },
    { month: "Mar", events: monthlyEvents[2], revenue: monthlyRevenue[2] },
    { month: "Apr", events: monthlyEvents[3], revenue: monthlyRevenue[3] },
    { month: "May", events: monthlyEvents[4], revenue: monthlyRevenue[4] },
    { month: "Jun", events: monthlyEvents[5], revenue: monthlyRevenue[5] },
    { month: "Jul", events: monthlyEvents[6], revenue: monthlyRevenue[6] },
    { month: "Aug", events: monthlyEvents[7], revenue: monthlyRevenue[7] },
    { month: "Sep", events: monthlyEvents[8], revenue: monthlyRevenue[8] },
    { month: "Oct", events: monthlyEvents[9], revenue: monthlyRevenue[9] },
    { month: "Nov", events: monthlyEvents[10], revenue: monthlyRevenue[10] },
    { month: "Dec", events: monthlyEvents[11], revenue: monthlyRevenue[11] },
  ];

  // Prepare pie chart data (free vs paid events)
  const freeEvents =
    validEvents?.filter((event) => (event?.fee || 0) === 0)?.length || 0;
  const paidEvents =
    validEvents?.filter((event) => (event?.fee || 0) > 0)?.length || 0;

  const pieChartData = [
    { name: "Free Events", value: freeEvents },
    { name: "Paid Events", value: paidEvents },
  ];

  // Event type distribution
  const eventTypeData = [
    { name: "Online", value: onlineEvents },
    { name: "Offline", value: offlineEvents },
  ];

  // Event visibility distribution
  const visibilityData = [
    { name: "Public", value: publicEvents },
    { name: "Private", value: privateEvents },
  ];

  // Prepare recent events data (sorted by date)
  const recentEvents =
    [...validEvents]
      ?.sort((a, b) => {
        const dateA = a?.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b?.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA;
      })
      ?.slice(0, 5)
      ?.map((event) => ({
        name: event?.title || "Untitled Event",
        date: event?.startDate
          ? format(new Date(event.startDate), "MMM dd, yyyy")
          : "N/A",
        type: (event?.fee || 0) > 0 ? "Paid" : "Free",
        fee: event?.fee || 0,
        eventType: event?.type,
        isPublic: event?.isPublic,
        status: new Date(event?.startDate || 0) > new Date() ? "Upcoming" : "Past",
      })) || [];

  const eventSummary = [
    { 
      title: "Total Events", 
      value: totalEvents, 
      icon: CalendarDays, 
      gradient: GRADIENT_COLORS.primary,
      change: "+12%",
      changeType: "positive"
    },
    { 
      title: "Upcoming Events", 
      value: upcomingEvents, 
      icon: Clock, 
      gradient: GRADIENT_COLORS.success,
      change: "+8%",
      changeType: "positive"
    },
    { 
      title: "Total Revenue", 
      value: `$${revenue.toLocaleString()}`, 
      icon: DollarSign, 
      gradient: GRADIENT_COLORS.warning,
      change: "+23%",
      changeType: "positive"
    },
    { 
      title: "Registered Users", 
      value: totalUsers, 
      icon: Users, 
      gradient: GRADIENT_COLORS.purple,
      change: "+15%",
      changeType: "positive"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Welcome back! Here&apos;s what&apos;s happening with your events.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Activity className="w-4 h-4" />
            <span>Last updated: {format(new Date(), "MMM dd, HH:mm")}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventSummary.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {item.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {item.value}
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                    <span className="text-sm text-emerald-600 font-medium">
                      {item.change}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Bar Chart */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="w-5 h-5 text-blue-600" />
                <span>Monthly Events & Revenue ({currentYear})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="events" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Revenue Chart */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Revenue Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`$${value}`, 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      fill="url(#emeraldGradient)"
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pie Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Type Distribution */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              
              <CardTitle className="flex items-center space-x-2">
                <Pie className="w-5 h-5 text-purple-600" dataKey={""} />
                <span>Event Pricing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} events`, "Count"]} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Event Type Distribution */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-amber-600" />
                <span>Event Format</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[(index + 1) % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} events`, "Count"]} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Event Visibility Distribution */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-950 dark:to-red-950">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span>Event Visibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visibilityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {visibilityData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[(index + 2) % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [`${value} events`, "Count"]} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Events Table */}
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              <span>Recent Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800">
                    <TableHead className="font-semibold">Event Name</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Format</TableHead>
                    <TableHead className="font-semibold">Visibility</TableHead>
                    <TableHead className="text-right font-semibold">Fee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEvents?.length > 0 ? (
                    recentEvents.map((event, index) => (
                      <TableRow 
                        key={index} 
                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="truncate max-w-[200px]">{event.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          {event.date}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={event.status === "Upcoming" ? "default" : "secondary"}
                            className={`${
                              event.status === "Upcoming" 
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
                                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                            }`}
                          >
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`${
                              event.type === "Free" 
                                ? "border-green-200 text-green-800 bg-green-50" 
                                : "border-blue-200 text-blue-800 bg-blue-50"
                            }`}
                          >
                            {event.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {event.eventType === "ONLINE" ? (
                              <Globe className="w-4 h-4 text-blue-500" />
                            ) : (
                              <MapPin className="w-4 h-4 text-green-500" />
                            )}
                            <span className="text-sm">{event.eventType}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`${
                              event.isPublic 
                                ? "border-purple-200 text-purple-800 bg-purple-50" 
                                : "border-orange-200 text-orange-800 bg-orange-50"
                            }`}
                          >
                            {event.isPublic ? "Public" : "Private"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          <span className={`${event.fee > 0 ? "text-green-600" : "text-slate-500"}`}>
                            ${event.fee.toFixed(2)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center space-y-2">
                          <Calendar className="w-12 h-12 text-slate-300" />
                          <span className="text-slate-500">No events found</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Online Events</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{onlineEvents}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Offline Events</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{offlineEvents}</p>
              </div>
              <MapPin className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Public Events</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{publicEvents}</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Private Events</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{privateEvents}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
