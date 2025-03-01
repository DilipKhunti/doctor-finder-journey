
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Search as SearchIcon, MapPin, Star, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock data for search results
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Aisha Patel",
    specialty: "Cardiologist",
    experience: 15,
    location: "Bandra, Mumbai",
    fee: 1500,
    rating: 4.8,
    reviews: 124,
    nextAvailable: "Today",
    image: "https://source.unsplash.com/random/300x300/?doctor&seed=1",
  },
  {
    id: 2,
    name: "Dr. Rahul Sharma",
    specialty: "Dermatologist",
    experience: 10,
    location: "Andheri, Mumbai",
    fee: 1200,
    rating: 4.7,
    reviews: 98,
    nextAvailable: "Tomorrow",
    image: "https://source.unsplash.com/random/300x300/?doctor&seed=2",
  },
  {
    id: 3,
    name: "Dr. Preeti Singh",
    specialty: "Pediatrician",
    experience: 12,
    location: "Juhu, Mumbai",
    fee: 1000,
    rating: 4.9,
    reviews: 156,
    nextAvailable: "Today",
    image: "https://source.unsplash.com/random/300x300/?doctor&seed=3",
  },
  {
    id: 4,
    name: "Dr. Vikram Mehta",
    specialty: "Orthopedic",
    experience: 20,
    location: "Dadar, Mumbai",
    fee: 1800,
    rating: 4.6,
    reviews: 201,
    nextAvailable: "Thursday",
    image: "https://source.unsplash.com/random/300x300/?doctor&seed=4",
  },
  {
    id: 5,
    name: "Dr. Neha Kapoor",
    specialty: "Gynecologist",
    experience: 8,
    location: "Malad, Mumbai",
    fee: 1300,
    rating: 4.5,
    reviews: 87,
    nextAvailable: "Friday",
    image: "https://source.unsplash.com/random/300x300/?doctor&seed=5",
  },
  {
    id: 6,
    name: "Dr. Suresh Patel",
    specialty: "ENT Specialist",
    experience: 15,
    location: "Borivali, Mumbai",
    fee: 1100,
    rating: 4.7,
    reviews: 132,
    nextAvailable: "Today",
    image: "https://source.unsplash.com/random/300x300/?doctor&seed=6",
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockDoctors);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast({
        title: "Please enter your symptoms",
        description: "Describe your symptoms to find the right doctor for you.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would search using OpenAI's API
    toast({
      title: "Searching for doctors...",
      description: "Here are the recommended doctors based on your symptoms.",
    });

    // For now, just filter the mock data by specialty (case insensitive)
    const filteredResults = mockDoctors.filter(doctor => 
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults.length > 0 ? filteredResults : mockDoctors);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Find the Right Doctor</h1>
          <p className="text-muted-foreground mb-8">
            Describe your symptoms and we'll match you with the right specialists
          </p>
          
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Describe your symptoms (e.g., 'I have a persistent cough and fever')"
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-1.5 top-1.5 py-5"
              >
                Search
              </Button>
            </div>
          </form>
          
          <div className="mb-8">
            <Tabs defaultValue="all">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Doctors</TabsTrigger>
                <TabsTrigger value="cardiologist">Cardiologists</TabsTrigger>
                <TabsTrigger value="dermatologist">Dermatologists</TabsTrigger>
                <TabsTrigger value="pediatrician">Pediatricians</TabsTrigger>
                <TabsTrigger value="orthopedic">Orthopedics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="space-y-6">
                  {searchResults.map((doctor) => (
                    <Card key={doctor.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 h-48 md:h-auto">
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 md:w-3/4 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                  <p className="text-primary font-medium">{doctor.specialty}</p>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                  <span className="font-bold">{doctor.rating}</span>
                                  <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  <span>{doctor.experience} years experience</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{doctor.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>Next Available: <span className="text-primary font-medium">{doctor.nextAvailable}</span></span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-6">
                              <div>
                                <Label>Consultation Fee</Label>
                                <p className="text-xl font-bold">₹{doctor.fee}</p>
                              </div>
                              <div className="space-x-3">
                                <Button variant="outline" asChild>
                                  <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
                                </Button>
                                <Button asChild>
                                  <Link to={`/booking/${doctor.id}`}>Book Appointment</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="cardiologist" className="mt-0">
                <div className="space-y-6">
                  {searchResults
                    .filter(doctor => doctor.specialty.toLowerCase() === "cardiologist")
                    .map((doctor) => (
                      <Card key={doctor.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-48 md:h-auto">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6 md:w-3/4 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                    <span className="font-bold">{doctor.rating}</span>
                                    <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                                  </div>
                                </div>
                                
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{doctor.experience} years experience</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{doctor.location}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Next Available: <span className="text-primary font-medium">{doctor.nextAvailable}</span></span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-6">
                                <div>
                                  <Label>Consultation Fee</Label>
                                  <p className="text-xl font-bold">₹{doctor.fee}</p>
                                </div>
                                <div className="space-x-3">
                                  <Button variant="outline" asChild>
                                    <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
                                  </Button>
                                  <Button asChild>
                                    <Link to={`/booking/${doctor.id}`}>Book Appointment</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {searchResults.filter(doctor => doctor.specialty.toLowerCase() === "cardiologist").length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">No cardiologists found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Similar content for other tabs, using the same pattern */}
              <TabsContent value="dermatologist" className="mt-0">
                <div className="space-y-6">
                  {searchResults
                    .filter(doctor => doctor.specialty.toLowerCase() === "dermatologist")
                    .map((doctor) => (
                      /* Same card structure as above */
                      <Card key={doctor.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-48 md:h-auto">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6 md:w-3/4 flex flex-col justify-between">
                              {/* ... same content as above ... */}
                              <div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                    <span className="font-bold">{doctor.rating}</span>
                                    <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                                  </div>
                                </div>
                                
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{doctor.experience} years experience</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{doctor.location}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Next Available: <span className="text-primary font-medium">{doctor.nextAvailable}</span></span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-6">
                                <div>
                                  <Label>Consultation Fee</Label>
                                  <p className="text-xl font-bold">₹{doctor.fee}</p>
                                </div>
                                <div className="space-x-3">
                                  <Button variant="outline" asChild>
                                    <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
                                  </Button>
                                  <Button asChild>
                                    <Link to={`/booking/${doctor.id}`}>Book Appointment</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {searchResults.filter(doctor => doctor.specialty.toLowerCase() === "dermatologist").length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">No dermatologists found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="pediatrician" className="mt-0">
                <div className="space-y-6">
                  {searchResults
                    .filter(doctor => doctor.specialty.toLowerCase() === "pediatrician")
                    .map((doctor) => (
                      /* Same card structure as above */
                      <Card key={doctor.id} className="overflow-hidden">
                        {/* ... same content as above ... */}
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-48 md:h-auto">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6 md:w-3/4 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                    <span className="font-bold">{doctor.rating}</span>
                                    <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                                  </div>
                                </div>
                                
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{doctor.experience} years experience</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{doctor.location}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Next Available: <span className="text-primary font-medium">{doctor.nextAvailable}</span></span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-6">
                                <div>
                                  <Label>Consultation Fee</Label>
                                  <p className="text-xl font-bold">₹{doctor.fee}</p>
                                </div>
                                <div className="space-x-3">
                                  <Button variant="outline" asChild>
                                    <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
                                  </Button>
                                  <Button asChild>
                                    <Link to={`/booking/${doctor.id}`}>Book Appointment</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {searchResults.filter(doctor => doctor.specialty.toLowerCase() === "pediatrician").length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">No pediatricians found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="orthopedic" className="mt-0">
                <div className="space-y-6">
                  {searchResults
                    .filter(doctor => doctor.specialty.toLowerCase() === "orthopedic")
                    .map((doctor) => (
                      /* Same card structure as above */
                      <Card key={doctor.id} className="overflow-hidden">
                        {/* ... same content as above ... */}
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 h-48 md:h-auto">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-6 md:w-3/4 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                    <span className="font-bold">{doctor.rating}</span>
                                    <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                                  </div>
                                </div>
                                
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span>{doctor.experience} years experience</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{doctor.location}</span>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>Next Available: <span className="text-primary font-medium">{doctor.nextAvailable}</span></span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-6">
                                <div>
                                  <Label>Consultation Fee</Label>
                                  <p className="text-xl font-bold">₹{doctor.fee}</p>
                                </div>
                                <div className="space-x-3">
                                  <Button variant="outline" asChild>
                                    <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
                                  </Button>
                                  <Button asChild>
                                    <Link to={`/booking/${doctor.id}`}>Book Appointment</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {searchResults.filter(doctor => doctor.specialty.toLowerCase() === "orthopedic").length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">No orthopedic specialists found</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
