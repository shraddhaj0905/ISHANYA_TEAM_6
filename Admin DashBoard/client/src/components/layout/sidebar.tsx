import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  School,
  FileText,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "./header";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: Home, current: location === "/" },
    { name: "Students", href: "/students", icon: School, current: location === "/students" },
    { name: "Staff", href: "/staff", icon: Users, current: location === "/staff" },
    { name: "Admissions", href: "/admissions", icon: FileText, current: location === "/admissions" },
    { name: "Reports", href: "/reports", icon: BarChart3, current: location === "/reports" },
    { name: "Settings", href: "/settings", icon: Settings, current: location === "/settings" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white shadow-lg transform transition-transform duration-200",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-primary/20">
          <span className="text-xl font-bold">NGO Management</span>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={closeSidebar}
            >
              <a
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                  item.current
                    ? "bg-primary-foreground/20 text-white"
                    : "text-white/70 hover:bg-primary-foreground/10 hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-primary/20">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/70 hover:text-white hover:bg-primary-foreground/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("min-h-screen transition-all duration-200", isMobile ? "pl-0" : "lg:pl-64")}>
        <Header />
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
