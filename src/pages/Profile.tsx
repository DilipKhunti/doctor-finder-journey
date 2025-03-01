
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Settings } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  
  // Placeholder user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, India",
    medicalHistory: "No significant medical history",
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User size={64} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>
                  <Button className="mt-4 w-full">Edit Profile Picture</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">Personal Info</span>
                </TabsTrigger>
                <TabsTrigger value="medical" className="flex items-center gap-2">
                  <History size={16} />
                  <span className="hidden sm:inline">Medical History</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details here
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={userData.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={userData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={userData.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue={userData.address} />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>
                      Your medical information is private and secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="medical-history">Medical History</Label>
                      <Textarea 
                        id="medical-history" 
                        rows={6}
                        defaultValue={userData.medicalHistory} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input id="allergies" placeholder="e.g., Penicillin, Peanuts" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea 
                        id="medications" 
                        placeholder="List any medications you're currently taking"
                      />
                    </div>
                    <Button>Save Medical Information</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                    
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-medium mb-2">Delete Account</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
