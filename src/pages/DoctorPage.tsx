
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Star, Award, BookOpen, Stethoscope } from "lucide-react";

const DoctorPage = () => {
  const { doctorId } = useParams();
  
  // Placeholder doctor data
  const doctor = {
    id: doctorId || "1",
    name: "Dr. Vikram Sharma",
    specialization: "Cardiologist",
    experience: 15,
    fees: 1200,
    education: "MBBS, MD (Cardiology), DM (Cardiology)",
    languages: ["English", "Hindi", "Marathi"],
    address: "Apex Hospital, Andheri West, Mumbai",
    about: "Dr. Vikram Sharma is a highly skilled cardiologist with over 15 years of experience in treating heart-related conditions. He specializes in interventional cardiology and has performed more than 1000 successful procedures.",
    expertise: [
      "Coronary Artery Disease", 
      "Heart Failure", 
      "Cardiac Arrhythmias", 
      "Valvular Heart Disease"
    ],
    ratings: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    availableSlots: {
      today: ["09:00 AM", "10:00 AM", "11:30 AM"],
      tomorrow: ["09:30 AM", "02:00 PM", "04:30 PM"]
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{doctor.name}</h2>
                  <p className="text-muted-foreground">{doctor.specialization}</p>
                  
                  <div className="flex items-center mt-2">
                    <Star className="text-yellow-500 fill-yellow-500 w-4 h-4 mr-1" />
                    <span className="font-medium">{doctor.ratings}</span>
                    <span className="text-muted-foreground ml-1">({doctor.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="w-full mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <Award size={18} className="mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Experience</p>
                        <p className="text-muted-foreground">{doctor.experience} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <BookOpen size={18} className="mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Education</p>
                        <p className="text-muted-foreground">{doctor.education}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">{doctor.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Consultation Fee</p>
                        <p className="text-muted-foreground">₹{doctor.fees}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-6">
                    <Link to={`/book-appointment/${doctor.id}`}>Book Appointment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{doctor.about}</p>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Languages Spoken</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((language) => (
                          <Badge key={language} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Available Slots</CardTitle>
                    <CardDescription>
                      Book your appointment at your preferred time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar size={16} className="mr-2 text-primary" />
                          <h3 className="font-medium">Today</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {doctor.availableSlots.today.map((slot) => (
                            <Badge key={slot} variant="outline">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Calendar size={16} className="mr-2 text-primary" />
                          <h3 className="font-medium">Tomorrow</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {doctor.availableSlots.tomorrow.map((slot) => (
                            <Badge key={slot} variant="outline">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button asChild className="mt-4">
                      <Link to={`/book-appointment/${doctor.id}`}>View All Slots</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expertise" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas of Expertise</CardTitle>
                    <CardDescription>
                      Specialized treatments and conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctor.expertise.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <Stethoscope size={18} className="mt-0.5 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Procedures & Treatments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Stethoscope size={18} className="mt-0.5 text-primary" />
                        <span>Angiography & Angioplasty</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Stethoscope size={18} className="mt-0.5 text-primary" />
                        <span>Cardiac Rehabilitation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Stethoscope size={18} className="mt-0.5 text-primary" />
                        <span>Echocardiography</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Stethoscope size={18} className="mt-0.5 text-primary" />
                        <span>Stress Test</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                    <CardDescription>
                      Based on {doctor.reviewCount} reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`w-6 h-6 ${
                              star <= Math.floor(doctor.ratings) 
                                ? "text-yellow-500 fill-yellow-500" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold">{doctor.ratings}</span>
                      <span className="text-muted-foreground ml-2">out of 5</span>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Placeholder reviews */}
                      {[
                        { 
                          name: "Rahul M.", 
                          rating: 5, 
                          date: "2 weeks ago",
                          comment: "Dr. Sharma was extremely thorough and attentive. He explained everything clearly and answered all my questions. Highly recommend!"
                        },
                        { 
                          name: "Priya K.", 
                          rating: 4, 
                          date: "1 month ago",
                          comment: "Very knowledgeable doctor. The wait time was a bit long, but the consultation was worth it."
                        },
                        { 
                          name: "Amit S.", 
                          rating: 5, 
                          date: "2 months ago",
                          comment: "Excellent experience. Dr. Sharma diagnosed my condition accurately and the treatment has shown great results."
                        }
                      ].map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{review.name}</h4>
                            <span className="text-muted-foreground text-sm">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating 
                                    ? "text-yellow-500 fill-yellow-500" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
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

export default DoctorPage;
