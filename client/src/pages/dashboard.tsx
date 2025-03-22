import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/sidebar";
import StatCard from "@/components/dashboard/stat-card";
import ChartContainer from "@/components/dashboard/chart-container";
import ActivityFeed from "@/components/dashboard/activity-feed";
import QuickActions from "@/components/dashboard/quick-actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { School, Users, CheckSquare, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user
  });

  const { data: activityLogs, isLoading: isLoadingLogs } = useQuery({
    queryKey: ["/api/activity-logs"],
    enabled: !!user
  });

  const currentDate = new Date();
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-700">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <a href="#" className="hover:text-gray-700">Dashboard</a>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {isLoadingStats ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <Skeleton className="h-9 w-9 rounded mb-4" />
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-7 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatCard 
              title="Total Students" 
              value={stats?.totalStudents || 0} 
              icon={<School />} 
              trend={{
                value: 12,
                label: "increase",
                isPositive: true
              }}
              color="bg-blue-600"
            />
            <StatCard 
              title="Total Staff" 
              value={stats?.totalStaff || 0} 
              icon={<Users />} 
              trend={{
                value: 3,
                label: "increase",
                isPositive: true
              }}
              color="bg-green-600"
            />
            <StatCard 
              title="New Admissions" 
              value={stats?.totalAdmissions || 0} 
              icon={<CheckSquare />} 
              trend={{
                value: 5,
                label: "decrease",
                isPositive: false
              }}
              color="bg-blue-400"
            />
            <StatCard 
              title="Pending Applications" 
              value={Math.floor(Math.random() * 30)} 
              icon={<Clock />} 
              trend={{
                value: 8,
                label: "increase",
                isPositive: false
              }}
              color="bg-orange-500"
            />
          </>
        )}
      </div>

      {/* Charts & Data */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <ChartContainer 
          title="Enrollment Trend" 
          subtitle="12-month student enrollment data"
          chartType="line"
        />
        <ChartContainer 
          title="Student Demographics" 
          subtitle="Distribution by gender, age, and location"
          chartType="pie"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed activityLogs={activityLogs || []} isLoading={isLoadingLogs} />
        </div>
        <div className="space-y-6">
          <QuickActions />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
              <p className="text-sm text-muted-foreground">Next 7 days</p>
            </CardHeader>
            <CardContent className="divide-y">
              <div className="py-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary/20 rounded-md flex items-center justify-center text-primary font-medium">
                    <span className="text-sm">{currentDate.getDate() + 2}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Staff Meeting</p>
                    <p className="text-xs text-muted-foreground">10:00 AM - Conference Room</p>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-md flex items-center justify-center text-green-700 font-medium">
                    <span className="text-sm">{currentDate.getDate() + 4}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Board Review</p>
                    <p className="text-xs text-muted-foreground">2:00 PM - Main Office</p>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-md flex items-center justify-center text-orange-700 font-medium">
                    <span className="text-sm">{currentDate.getDate() + 7}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Admission Deadline</p>
                    <p className="text-xs text-muted-foreground">All Day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
