
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">About DocFinder</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg mb-4">
              DocFinder is a doctor discovery platform designed to simplify the process of finding and 
              booking appointments with doctors. Our mission is to connect patients with the right 
              healthcare professionals quickly and efficiently.
            </p>
            <p className="text-lg mb-4">
              Founded in 2023, we started with a simple idea: make healthcare more accessible by 
              removing the barriers between patients and doctors. Today, we're proud to serve 
              the urban Indian population, starting with Mumbai, with plans to expand across India 
              and eventually globally.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team at work" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <Card className="mb-12 border-primary/20 shadow-lg">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-primary">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              We envision a world where everyone has easy access to quality healthcare. 
              By leveraging technology, we aim to create a seamless connection between patients 
              and healthcare providers, making the journey to better health simpler for everyone.
            </p>
          </CardContent>
        </Card>
        
        <h2 className="text-2xl font-bold mb-6 text-primary">Why Choose DocFinder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-secondary/20 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-secondary/5">
              <CardTitle className="text-xl text-secondary">Smart Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our platform uses advanced technology to match your symptoms with 
                the most relevant doctors, ensuring you find the right specialist for your needs.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-accent/5">
              <CardTitle className="text-xl text-accent">Verified Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                All doctors on our platform undergo a rigorous verification process, 
                ensuring you receive care only from qualified and authenticated medical professionals.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-xl text-primary">Easy Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Book appointments with just a few clicks. No more long waiting times 
                on phone calls or standing in queues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
