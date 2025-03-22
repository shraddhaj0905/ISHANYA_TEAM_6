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
import { Search, Plus, Copy, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AdmissionForm } from "@shared/schema";
import { AdmissionFormGenerator } from "@/components/admissions/admission-form-generator";
import { useToast } from "@/hooks/use-toast";

export default function Admissions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFormGenerator, setShowFormGenerator] = useState(false);
  const { toast } = useToast();
  
  const { data: admissionForms, isLoading } = useQuery<AdmissionForm[]>({
    queryKey: ["/api/admission-forms"],
  });

  const filteredForms = admissionForms?.filter(form => 
    form.formName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.uniqueCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyLinkToClipboard = (code: string) => {
    const url = `${window.location.origin}/admission/${code}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "The admission form link has been copied to clipboard."
    });
  };

  return (
    <MainLayout>
      {showFormGenerator && (
        <AdmissionFormGenerator onClose={() => setShowFormGenerator(false)} />
      )}
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Admissions</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-700">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <a href="#" className="hover:text-gray-700">Admissions</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            className="flex items-center gap-1"
            onClick={() => setShowFormGenerator(true)}
          >
            <Plus size={16} />
            <span>Generate Admission Link</span>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Admission Forms</CardTitle>
          <CardDescription>Manage admission forms and application links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search forms..."
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
                      <TableHead>Form Name</TableHead>
                      <TableHead>Grade Level</TableHead>
                      <TableHead>Unique Code</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredForms && filteredForms.length > 0 ? (
                      filteredForms.map((form) => {
                        const isExpired = new Date(form.expiryDate) < new Date();
                        return (
                          <TableRow key={form.id}>
                            <TableCell className="font-medium">{form.formName}</TableCell>
                            <TableCell>{form.gradeLevel}</TableCell>
                            <TableCell>
                              <code className="bg-gray-100 px-2 py-1 rounded">{form.uniqueCode}</code>
                            </TableCell>
                            <TableCell>{format(new Date(form.expiryDate), 'PP')}</TableCell>
                            <TableCell>
                              <Badge variant={isExpired ? 'destructive' : 'success'}>
                                {isExpired ? 'Expired' : 'Active'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => copyLinkToClipboard(form.uniqueCode)}
                                  disabled={isExpired}
                                  title="Copy link"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  disabled={isExpired}
                                  title="View form"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          {searchQuery
                            ? "No forms found matching your search criteria"
                            : "No admission forms created. Generate a new form to get started."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {filteredForms && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredForms.length} of {admissionForms?.length} admission forms
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
