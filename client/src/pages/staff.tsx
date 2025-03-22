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
import { Search, Plus, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@shared/schema";

export default function Staff() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: staffMembers, isLoading } = useQuery<User[]>({
    queryKey: ["/api/staff"],
  });

  const filteredStaff = staffMembers?.filter(staff => 
    staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getInitials(name: string) {
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Staff Management</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-700">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <a href="#" className="hover:text-gray-700">Staff</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add Staff</span>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>View and manage all staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search staff..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                      <TableHead>Name</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff && filteredStaff.length > 0 ? (
                      filteredStaff.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{getInitials(staff.fullName)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{staff.fullName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{staff.username}</TableCell>
                          <TableCell>{staff.email}</TableCell>
                          <TableCell>
                            <Badge variant={staff.role === 'admin' ? 'destructive' : 'secondary'}>
                              {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          {searchQuery
                            ? "No staff members found matching your search criteria"
                            : "No staff members found. Add staff to get started."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {filteredStaff && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredStaff.length} of {staffMembers?.length} staff members
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
