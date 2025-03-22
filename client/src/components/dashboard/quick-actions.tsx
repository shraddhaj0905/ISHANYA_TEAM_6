import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import {
  PlusCircle,
  UserPlus,
  BarChart2,
  Bell,
  ShieldCheck,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Generate Admission Form",
      icon: <PlusCircle className="text-primary mr-3 h-5 w-5" />,
      href: "/admissions",
    },
    {
      title: "Add New Staff",
      icon: <UserPlus className="text-green-600 mr-3 h-5 w-5" />,
      href: "/staff",
    },
    {
      title: "Generate Report",
      icon: <BarChart2 className="text-blue-500 mr-3 h-5 w-5" />,
      href: "/reports",
    },
    {
      title: "Send Notification",
      icon: <Bell className="text-orange-500 mr-3 h-5 w-5" />,
      href: "/settings?tab=notifications",
    },
    {
      title: "Manage Permissions",
      icon: <ShieldCheck className="text-amber-500 mr-3 h-5 w-5" />,
      href: "/settings?tab=security",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <a className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center">
                {action.icon}
                <span className="text-sm text-gray-700">{action.title}</span>
              </a>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
