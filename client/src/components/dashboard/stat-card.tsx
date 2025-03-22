import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  color: string;
}

export default function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", color)}>
            <div className="text-white">{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-sm font-medium text-gray-500 truncate">{title}</div>
            <div className="text-lg font-semibold text-gray-900">{value.toLocaleString()}</div>
          </div>
        </div>
        
        {trend && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className={cn(
                "text-sm flex items-center",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span>{trend.value}% {trend.label}</span>
              </div>
              <div className="text-xs text-gray-500">From previous period</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
