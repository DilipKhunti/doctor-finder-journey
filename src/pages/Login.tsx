
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const { toast } = useToast();

  const handleSendOtp = () => {
    // In a real implementation, this would communicate with a backend service
    if (activeTab === "email" && !email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    if (activeTab === "phone" && !phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "OTP sent",
      description: `A verification code has been sent to your ${activeTab === "email" ? "email" : "phone"}`,
    });
    
    setIsOtpSent(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast({
        title: "OTP required",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would validate the OTP with a backend service
    toast({
      title: "Login successful",
      description: "You have been logged in successfully",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login to DocFinder</CardTitle>
            <CardDescription>
              Enter your email or phone number to receive a one-time password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="email" 
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setIsOtpSent(false);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isOtpSent}
                      />
                    </div>
                    
                    {isOtpSent && (
                      <div className="space-y-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter the 6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                        />
                      </div>
                    )}
                    
                    {!isOtpSent ? (
                      <Button 
                        type="button" 
                        className="w-full" 
                        onClick={handleSendOtp}
                      >
                        Send Verification Code
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Button type="submit" className="w-full">
                          Login
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setIsOtpSent(false);
                            setOtp("");
                          }}
                        >
                          Resend Code
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="phone">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isOtpSent}
                      />
                    </div>
                    
                    {isOtpSent && (
                      <div className="space-y-2">
                        <Label htmlFor="phone-otp">Verification Code</Label>
                        <Input
                          id="phone-otp"
                          type="text"
                          placeholder="Enter the 6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                        />
                      </div>
                    )}
                    
                    {!isOtpSent ? (
                      <Button 
                        type="button" 
                        className="w-full" 
                        onClick={handleSendOtp}
                      >
                        Send Verification Code
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <Button type="submit" className="w-full">
                          Login
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            setIsOtpSent(false);
                            setOtp("");
                          }}
                        >
                          Resend Code
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center w-full">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-muted-foreground text-xs text-center w-full">
              By logging in, you agree to our{" "}
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
