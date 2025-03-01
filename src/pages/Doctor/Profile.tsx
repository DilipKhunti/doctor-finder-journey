
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Gynecologist",
  "Neurologist",
  "Ophthalmologist",
  "Orthopedic Surgeon",
  "Pediatrician",
  "Psychiatrist",
  "Radiologist",
  "Urologist",
  "General Physician",
  "Other",
];

const DoctorProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    fees: "",
    address: "",
    bio: "",
    education: "",
    registrationNumber: "",
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.specialization || 
        !formData.experience || !formData.fees || !formData.address || !formData.registrationNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!profilePicture) {
      toast({
        title: "Profile picture required",
        description: "Please upload a profile picture",
        variant: "destructive",
      });
      return;
    }
    
    if (documents.length === 0) {
      toast({
        title: "Documents required",
        description: "Please upload your medical license and other relevant documents",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would submit the form data to a backend service
    toast({
      title: "Profile submitted",
      description: "Your profile has been submitted for verification. We'll notify you once it's approved.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Doctor Profile</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Provide your basic information. This will be visible to patients.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Picture Upload */}
                    <div className="md:w-1/3 flex flex-col items-center space-y-4">
                      <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                        {profilePicturePreview ? (
                          <img 
                            src={profilePicturePreview} 
                            alt="Profile preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <p className="text-sm text-muted-foreground">Profile Picture</p>
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          id="profile-picture"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfilePictureChange}
                        />
                        <Label 
                          htmlFor="profile-picture" 
                          className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        >
                          Upload Photo
                        </Label>
                      </div>
                    </div>
                    
                    {/* Basic Details */}
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name*</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. Full Name"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email*</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="doctor@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number*</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 XXXXX XXXXX"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Write a brief description about yourself and your practice..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>
                    Provide details about your professional background and practice.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization*</Label>
                      <Select 
                        value={formData.specialization} 
                        onValueChange={(value) => handleSelectChange(value, "specialization")}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience*</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        min="0"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g., 10"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fees">Consultation Fees (₹)*</Label>
                      <Input
                        id="fees"
                        name="fees"
                        type="number"
                        min="0"
                        value={formData.fees}
                        onChange={handleInputChange}
                        placeholder="e.g., 500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Medical Registration Number*</Label>
                      <Input
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., MCI-123456"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Education & Qualifications</Label>
                    <Textarea
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      placeholder="e.g., MBBS - Xyz Medical College (2010), MD - ABC University (2014)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Clinic/Hospital Address*</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your clinic or hospital address"
                      rows={3}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Document Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Verification</CardTitle>
                  <CardDescription>
                    Upload your medical license and other relevant documents for verification.
                    All documents will be reviewed by our team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <input
                        type="file"
                        id="documents"
                        multiple
                        className="hidden"
                        onChange={handleDocumentsChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <Label 
                        htmlFor="documents" 
                        className="cursor-pointer block"
                      >
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF, JPG or PNG (max 10MB per file)
                            </p>
                          </div>
                        </div>
                      </Label>
                      
                      {documents.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm font-medium">Selected Documents:</p>
                          <ul className="text-sm text-muted-foreground text-left max-h-32 overflow-y-auto">
                            {documents.map((doc, index) => (
                              <li key={index} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {doc.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Required documents:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Medical registration certificate / license</li>
                        <li>Photo ID proof (Aadhar, PAN, etc.)</li>
                        <li>Degree certificates</li>
                        <li>Any additional qualification certificates</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit for Verification
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground text-center">
                <p>
                  Your profile will be reviewed by our team for verification.
                  This process usually takes 24-48 hours.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfile;
