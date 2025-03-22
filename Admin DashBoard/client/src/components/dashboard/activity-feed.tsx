import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityLog } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Bell,
  UserPlus, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Mail,
  LogIn,
  LogOut
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityFeedProps {
  activityLogs: ActivityLog[];
  isLoading: boolean;
}

export default function ActivityFeed({ activityLogs, isLoading }: ActivityFeedProps) {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case "CREATE_STUDENT":
      case "REGISTER":
        return <UserPlus className="text-green-600" />;
      case "CREATE_ADMISSION_FORM":
        return <FileText className="text-blue-500" />;
      case "WARNING":
        return <AlertTriangle className="text-orange-500" />;
      case "VERIFICATION":
        return <CheckCircle className="text-green-600" />;
      case "SCHEDULE":
        return <Calendar className="text-purple-600" />;
      case "NOTIFICATION":
        return <Bell className="text-blue-500" />;
      case "EMAIL":
        return <Mail className="text-blue-600" />;
      case "LOGIN":
        return <LogIn className="text-blue-500" />;
      case "LOGOUT":
        return <LogOut className="text-gray-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex justify-between items-center">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground">Latest system updates and activities</p>
        </div>
        <Button variant="link" size="sm" className="text-primary">View all</Button>
      </CardHeader>
      <CardContent className="divide-y">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="py-4 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))
        ) : activityLogs.length > 0 ? (
          activityLogs.map((log) => (
            <div key={log.id} className="py-4 flex items-center justify-between hover:bg-gray-50 px-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getActivityIcon(log.action)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{log.description}</p>
                  <p className="text-xs text-gray-500">{log.action.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">
            No recent activity to display
          </div>
        )}
      </CardContent>
    </Card>
  );
}
