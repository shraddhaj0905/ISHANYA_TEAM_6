import MainLayout from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartContainer from "@/components/dashboard/chart-container";
import { Button } from "@/components/ui/button";
import { Download, FileText, Filter } from "lucide-react";

export default function Reports() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-700">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <a href="#" className="hover:text-gray-700">Reports</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <ChartContainer 
              title="Annual Overview" 
              subtitle="Student and staff growth over time"
              chartType="bar"
            />
            <ChartContainer 
              title="Resource Allocation" 
              subtitle="Distribution of resources by department"
              chartType="doughnut"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartContainer 
              title="Admission Trends" 
              subtitle="Monthly admission counts by grade level"
              chartType="line"
            />
            <ChartContainer 
              title="Staff Distribution" 
              subtitle="Distribution by role and department"
              chartType="pie"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <ChartContainer 
              title="Student Performance" 
              subtitle="Average performance by grade level"
              chartType="bar"
            />
            <ChartContainer 
              title="Student Demographics" 
              subtitle="Distribution by age, gender and location"
              chartType="pie"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Available Student Reports</CardTitle>
              <CardDescription>Download detailed student reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Student Enrollment Report</p>
                      <p className="text-sm text-muted-foreground">Complete enrollment data with demographics</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Academic Performance Report</p>
                      <p className="text-sm text-muted-foreground">Grade-wise performance analysis</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Attendance Summary</p>
                      <p className="text-sm text-muted-foreground">Monthly attendance patterns</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <ChartContainer 
              title="Staff Attendance" 
              subtitle="Monthly attendance rates"
              chartType="line"
            />
            <ChartContainer 
              title="Staff Roles" 
              subtitle="Distribution of staff by role"
              chartType="doughnut"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Available Staff Reports</CardTitle>
              <CardDescription>Download detailed staff reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Staff Directory</p>
                      <p className="text-sm text-muted-foreground">Complete staff listing with contact details</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Performance Evaluation</p>
                      <p className="text-sm text-muted-foreground">Staff performance metrics</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admissions" className="pt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <ChartContainer 
              title="Admission Sources" 
              subtitle="Where applicants are coming from"
              chartType="pie"
            />
            <ChartContainer 
              title="Admission Conversion" 
              subtitle="Application to enrollment conversion rates"
              chartType="bar"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Available Admission Reports</CardTitle>
              <CardDescription>Download detailed admission reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Admission Summary</p>
                      <p className="text-sm text-muted-foreground">Monthly and annual admission statistics</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Pending Applications</p>
                      <p className="text-sm text-muted-foreground">List of applications in process</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
