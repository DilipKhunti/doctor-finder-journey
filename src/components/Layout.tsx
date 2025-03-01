
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            DocFinder
          </Link>
          
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/search" className="hover:text-primary">
              Find a Doctor
            </Link>
            <Link to="/doctors" className="hover:text-primary">
              For Doctors
            </Link>
            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            <Button asChild variant="outline" className="ml-2">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          
          <button 
            className="md:hidden text-2xl" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={cn(
            "md:hidden absolute w-full bg-background border-b z-50 transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-64 py-4" : "max-h-0 overflow-hidden"
          )}
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/search" className="hover:text-primary" onClick={toggleMenu}>
              Find a Doctor
            </Link>
            <Link to="/doctors" className="hover:text-primary" onClick={toggleMenu}>
              For Doctors
            </Link>
            <Link to="/about" className="hover:text-primary" onClick={toggleMenu}>
              About Us
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button asChild variant="outline">
                <Link to="/login" onClick={toggleMenu}>Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DocFinder</h3>
              <p className="text-muted-foreground">
                Find the right doctor for your health needs with ease.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="/search" className="text-muted-foreground hover:text-primary">Find Doctors</Link></li>
                <li><Link to="/doctors" className="text-muted-foreground hover:text-primary">For Doctors</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DocFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
