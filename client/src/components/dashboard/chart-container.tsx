import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

type ChartType = "bar" | "line" | "pie" | "doughnut";

interface ChartContainerProps {
  title: string;
  subtitle: string;
  chartType: ChartType;
}

export default function ChartContainer({
  title,
  subtitle,
  chartType,
}: ChartContainerProps) {
  // Sample data - in a real app this would come from the API
  const lineData = [
    { month: "Jan", students: 65 },
    { month: "Feb", students: 59 },
    { month: "Mar", students: 80 },
    { month: "Apr", students: 81 },
    { month: "May", students: 56 },
    { month: "Jun", students: 55 },
    { month: "Jul", students: 40 },
    { month: "Aug", students: 70 },
    { month: "Sep", students: 90 },
    { month: "Oct", students: 110 },
    { month: "Nov", students: 130 },
    { month: "Dec", students: 150 },
  ];

  const pieData = [
    { name: "Male", value: 400 },
    { name: "Female", value: 300 },
    { name: "Other", value: 30 },
  ];

  const barData = [
    { grade: "Grade 1", boys: 50, girls: 45 },
    { grade: "Grade 2", boys: 55, girls: 50 },
    { grade: "Grade 3", boys: 45, girls: 55 },
    { grade: "Grade 4", boys: 60, girls: 40 },
    { grade: "Grade 5", boys: 50, girls: 50 },
    { grade: "Grade 6", boys: 45, girls: 55 },
  ];

  const colors = ["#3F51B5", "#2E7D32", "#FF6D00", "#D32F2F", "#7B1FA2"];

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#3F51B5"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
      case "doughnut":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={chartType === "doughnut" ? 70 : 0}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="boys" fill="#3F51B5" />
              <Bar dataKey="girls" fill="#2E7D32" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
