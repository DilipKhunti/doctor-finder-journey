
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

type DaySchedule = {
  isAvailable: boolean;
  timeSlots: TimeSlot[];
};

type WeeklySchedule = {
  [key: string]: DaySchedule;
};

const DoctorAvailability = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const initialSchedule: WeeklySchedule = daysOfWeek.reduce((acc, day) => {
    acc[day] = {
      isAvailable: day !== "Sunday",
      timeSlots: [],
    };
    return acc;
  }, {} as WeeklySchedule);
  
  const [schedule, setSchedule] = useState<WeeklySchedule>(initialSchedule);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const { toast } = useToast();

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    return time;
  });

  const handleDayToggle = (day: string, isAvailable: boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable,
        timeSlots: isAvailable ? prev[day].timeSlots : [],
      },
    }));
  };

  const handleAddTimeSlot = () => {
    if (!startTime || !endTime) {
      toast({
        title: "Missing time",
        description: "Please select both start and end time",
        variant: "destructive",
      });
      return;
    }

    if (startTime >= endTime) {
      toast({
        title: "Invalid time range",
        description: "End time must be after start time",
        variant: "destructive",
      });
      return;
    }

    // Check for overlapping slots
    const isOverlapping = schedule[selectedDay].timeSlots.some(
      (slot) => 
        (startTime >= slot.startTime && startTime < slot.endTime) || 
        (endTime > slot.startTime && endTime <= slot.endTime) ||
        (startTime <= slot.startTime && endTime >= slot.endTime)
    );

    if (isOverlapping) {
      toast({
        title: "Time slot overlap",
        description: "This time slot overlaps with an existing one",
        variant: "destructive",
      });
      return;
    }

    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime,
      endTime,
    };

    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        timeSlots: [...prev[selectedDay].timeSlots, newTimeSlot].sort((a, b) => 
          a.startTime.localeCompare(b.startTime)
        ),
      },
    }));

    toast({
      title: "Time slot added",
      description: `Added ${startTime} - ${endTime} to ${selectedDay}`,
    });

    // Reset selection
    setStartTime("");
    setEndTime("");
  };

  const handleRemoveTimeSlot = (day: string, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter((slot) => slot.id !== slotId),
      },
    }));

    toast({
      title: "Time slot removed",
      description: `Removed time slot from ${day}`,
    });
  };

  const handleSaveSchedule = () => {
    // In a real implementation, this would save the schedule to a backend service
    toast({
      title: "Schedule saved",
      description: "Your availability has been saved successfully",
    });
  };

  const formatTime = (time: string) => {
    const [hourStr, minuteStr] = time.split(":");
    const hour = parseInt(hourStr);
    const minute = minuteStr;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute} ${period}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Manage Availability</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Day Selector */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Days</CardTitle>
                  <CardDescription>
                    Set your available days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`${day}-switch`}
                            checked={schedule[day].isAvailable}
                            onCheckedChange={(checked) => handleDayToggle(day, checked)}
                          />
                          <Label htmlFor={`${day}-switch`}>{day}</Label>
                        </div>
                        
                        <Badge variant={schedule[day].isAvailable ? "default" : "outline"}>
                          {schedule[day].isAvailable 
                            ? `${schedule[day].timeSlots.length} Slots` 
                            : "Unavailable"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Time Slots */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Time Slots</CardTitle>
                  <CardDescription>
                    Set your available time slots for each day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Day Selector */}
                    <div className="space-y-2">
                      <Label>Select Day</Label>
                      <Select 
                        value={selectedDay} 
                        onValueChange={setSelectedDay}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day} disabled={!schedule[day].isAvailable}>
                              {day} {!schedule[day].isAvailable && "(Unavailable)"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Time Slot Add */}
                    {schedule[selectedDay].isAvailable && (
                      <div className="border p-4 rounded-md space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Select 
                              value={startTime} 
                              onValueChange={setStartTime}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {timeOptions.map((time) => (
                                  <SelectItem key={`start-${time}`} value={time}>
                                    {formatTime(time)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>End Time</Label>
                            <Select 
                              value={endTime} 
                              onValueChange={setEndTime}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {timeOptions.map((time) => (
                                  <SelectItem 
                                    key={`end-${time}`} 
                                    value={time} 
                                    disabled={startTime && time <= startTime}
                                  >
                                    {formatTime(time)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleAddTimeSlot} 
                          className="w-full"
                          disabled={!startTime || !endTime}
                        >
                          Add Time Slot
                        </Button>
                      </div>
                    )}
                    
                    {/* Display Time Slots */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        {selectedDay} Time Slots
                      </h3>
                      
                      {schedule[selectedDay].isAvailable ? (
                        schedule[selectedDay].timeSlots.length > 0 ? (
                          <div className="space-y-2">
                            {schedule[selectedDay].timeSlots.map((slot) => (
                              <div 
                                key={slot.id} 
                                className="flex items-center justify-between bg-secondary/20 p-3 rounded-md"
                              >
                                <span className="font-medium">
                                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleRemoveTimeSlot(selectedDay, slot.id)}
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <p>No time slots added for {selectedDay}</p>
                            <p className="text-sm mt-2">Add time slots above</p>
                          </div>
                        )
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>Not available on {selectedDay}</p>
                          <p className="text-sm mt-2">Toggle availability to add time slots</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <Button size="lg" onClick={handleSaveSchedule}>
                  Save Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorAvailability;
