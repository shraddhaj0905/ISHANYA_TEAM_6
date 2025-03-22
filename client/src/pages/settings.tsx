import { useState } from "react";
import MainLayout from "@/components/layout/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    admissions: true,
    system: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  const saveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const saveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-700">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <a href="#" className="hover:text-gray-700">Settings</a>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <Tabs defaultValue="profile" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {user?.fullName?.split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{user?.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      value={profileForm.fullName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      name="username"
                      value={profileForm.username}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="pt-2">
                  <Button onClick={saveProfile}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-notifications" className="text-base">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                    <Switch 
                      id="browser-notifications" 
                      checked={notificationSettings.browser}
                      onCheckedChange={(checked) => handleNotificationChange('browser', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admission-notifications" className="text-base">Admission Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications about new admissions and applications</p>
                    </div>
                    <Switch 
                      id="admission-notifications" 
                      checked={notificationSettings.admissions}
                      onCheckedChange={(checked) => handleNotificationChange('admissions', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="system-notifications" className="text-base">System Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notifications about system updates and maintenance</p>
                    </div>
                    <Switch 
                      id="system-notifications" 
                      checked={notificationSettings.system}
                      onCheckedChange={(checked) => handleNotificationChange('system', checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={saveNotifications}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>Update Password</Button>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">Configure 2FA</Button>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Active Sessions</h3>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">
                        This device • {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Active</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  Sign Out All Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
