
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { courses } from '@/lib/data';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-semibold text-lg transition-all hover:opacity-80"
          >
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold tracking-tight">CollegeMithra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="group flex items-center hover:bg-transparent">
                  Courses
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 p-2">
                {courses.slice(0, 6).map((course, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={`/colleges?course=${course}`} className="cursor-pointer w-full">
                      {course}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link to="/courses" className="cursor-pointer w-full text-primary font-medium">
                    View All Courses
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/colleges" className="px-4 py-2 rounded-md transition-colors hover:bg-secondary">
              Colleges
            </Link>
            
            <Link to="/rankings" className="px-4 py-2 rounded-md transition-colors hover:bg-secondary">
              Rankings
            </Link>
            
            <Link to="/exams" className="px-4 py-2 rounded-md transition-colors hover:bg-secondary">
              Exams
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="rounded-full">Sign In</Button>
            <Button className="rounded-full">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-[60px] bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-6">
          <div className="flex flex-col space-y-3">
            <Link to="/colleges" className="px-3 py-2 hover:bg-secondary rounded-md">
              Colleges
            </Link>
            <Link to="/courses" className="px-3 py-2 hover:bg-secondary rounded-md">
              Courses
            </Link>
            <Link to="/rankings" className="px-3 py-2 hover:bg-secondary rounded-md">
              Rankings
            </Link>
            <Link to="/exams" className="px-3 py-2 hover:bg-secondary rounded-md">
              Exams
            </Link>
          </div>
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            <Button variant="outline" className="w-full justify-center">Sign In</Button>
            <Button className="w-full justify-center">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
