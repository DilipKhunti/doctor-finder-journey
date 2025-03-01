import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Placeholder doctor data
  const doctor = {
    id: doctorId || "1",
    name: "Dr. Vikram Sharma",
    specialization: "Cardiologist",
    experience: 15,
    fees: 1200,
    address: "Apex Hospital, Andheri West, Mumbai",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };
  
  // Placeholder available time slots
  const availableSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", 
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];
  
  const handleSlotSelection = (slot: string) => {
    setSelectedSlot(slot);
  };
  
  const handleBookAppointment = () => {
    // Logic to book the appointment would go here
    alert(`Appointment booked with ${doctor.name} on ${selectedDate?.toDateString()} at ${selectedSlot}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <User size={18} className="mt-0.5 text-muted-foreground" />
                    <p>{doctor.experience} years of experience</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="mt-0.5 text-muted-foreground" />
                    <p>{doctor.address}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={18} className="mt-0.5 text-muted-foreground" />
                    <p>Consultation Fee: ₹{doctor.fees}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>
                  Choose your preferred date and time slot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={18} className="text-primary" />
                      <h3 className="font-medium">Select Date</h3>
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="border rounded-md p-2"
                      disabled={(date) => {
                        // Disable past dates and weekends in this example
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0;
                      }}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-primary" />
                      <h3 className="font-medium">Select Time Slot</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
                       "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", 
                       "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"].map((slot) => (
                        <Badge
                          key={slot}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          className={`cursor-pointer p-2 text-center ${
                            selectedSlot === slot ? "bg-primary" : ""
                          }`}
                          onClick={() => handleSlotSelection(slot)}
                        >
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Reason for Visit</h3>
                  <Textarea 
                    placeholder="Briefly describe your symptoms or reason for consultation"
                    rows={4}
                  />
                </div>
                
                <Button 
                  className="mt-6 w-full md:w-auto"
                  disabled={!selectedDate || !selectedSlot}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppointment;
