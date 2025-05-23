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
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

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

const COLORS = ["#34D399", "#3B82F6"];

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

  // Prepare bar chart data (group by month)
  const currentYear = new Date().getFullYear();
  const monthlyEvents = Array(12).fill(0);

  validEvents?.forEach((event) => {
    const eventDate = event?.startDate ? new Date(event.startDate) : null;
    if (eventDate?.getFullYear() === currentYear) {
      const month = eventDate.getMonth();
      monthlyEvents[month]++;
    }
  });

  const barChartData = [
    { month: "Jan", events: monthlyEvents[0] },
    { month: "Feb", events: monthlyEvents[1] },
    { month: "Mar", events: monthlyEvents[2] },
    { month: "Apr", events: monthlyEvents[3] },
    { month: "May", events: monthlyEvents[4] },
    { month: "Jun", events: monthlyEvents[5] },
    { month: "Jul", events: monthlyEvents[6] },
    { month: "Aug", events: monthlyEvents[7] },
    { month: "Sep", events: monthlyEvents[8] },
    { month: "Oct", events: monthlyEvents[9] },
    { month: "Nov", events: monthlyEvents[10] },
    { month: "Dec", events: monthlyEvents[11] },
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
          ? format(new Date(event.startDate), "yyyy-MM-dd")
          : "N/A",
        type: (event?.fee || 0) > 0 ? "Paid" : "Free",
        fee: event?.fee || 0,
      })) || [];

  const eventSummary = [
    { title: "Total Events", value: totalEvents },
    { title: "Upcoming Events", value: upcomingEvents },
    { title: "Revenue", value: `$${revenue}` },
    { title: "Users Registered", value: totalUsers },
  ];

  return (
    <div className="grid gap-6 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {eventSummary.map((item) => (
          <Card key={item.title} className="shadow-md">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {item.value}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Monthly Events ({currentYear})</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#3B82F6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Event Type Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
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
              <Tooltip formatter={(value) => [`${value} events`, "Count"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Events Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents?.length > 0 ? (
                recentEvents.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell className="text-right">
                      ${event.fee.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
