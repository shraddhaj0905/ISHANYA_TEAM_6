import { useState } from "react";
import MainLayout from "@/components/layout/sidebar";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileDown, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Student } from "@shared/schema";
import { format } from "date-fns";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: students, isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const filteredStudents = students?.filter(student => 
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Students</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-700">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <a href="#" className="hover:text-gray-700">Students</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add Student</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <FileDown size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Student Management</CardTitle>
          <CardDescription>View and manage all students in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Admission Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents && filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.admissionNumber}</TableCell>
                          <TableCell>{student.fullName}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.gender}</TableCell>
                          <TableCell>{student.parentName}</TableCell>
                          <TableCell>{student.parentContact}</TableCell>
                          <TableCell>{format(new Date(student.createdAt), 'PP')}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          {searchQuery
                            ? "No students found matching your search criteria"
                            : "No students found. Add a student to get started."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {filteredStudents && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredStudents.length} of {students?.length} students
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
