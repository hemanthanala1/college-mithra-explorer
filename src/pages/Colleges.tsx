
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, 
  Sliders, 
  X, 
  ChevronDown, 
  ChevronRight,
  Check,
  ChevronLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CollegeCard from '@/components/CollegeCard';
import { colleges, states, courses, facilities } from '@/lib/data';

const Colleges = () => {
  const location = useLocation();
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('ranking');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterColleges();
  };

  const filterColleges = () => {
    // Simulating filtering logic
    setLoading(true);
    setTimeout(() => {
      let results = [...colleges];
      
      if (searchTerm) {
        results = results.filter(college => 
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (sortBy === 'ranking') {
        results.sort((a, b) => a.ranking - b.ranking);
      } else if (sortBy === 'rating') {
        results.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'fees_low') {
        results.sort((a, b) => a.fees.min - b.fees.min);
      } else if (sortBy === 'fees_high') {
        results.sort((a, b) => b.fees.min - a.fees.min);
      }
      
      setFilteredColleges(results);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parse URL params for initial filtering
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const courseParam = params.get('course');
    
    if (cityParam) {
      setSearchTerm(cityParam);
    }
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let results = [...colleges];
      
      if (cityParam) {
        results = results.filter(college => 
          college.location.city.toLowerCase() === cityParam.toLowerCase()
        );
      }
      
      if (courseParam) {
        results = results.filter(college => 
          college.courses.some(course => 
            course.toLowerCase() === courseParam.toLowerCase()
          )
        );
      }
      
      setFilteredColleges(results);
      setLoading(false);
    }, 800);
  }, [location.search]);

  useEffect(() => {
    filterColleges();
  }, [sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="bg-blue-50 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Colleges in India</h1>
                <p className="text-muted-foreground mt-1">
                  {filteredColleges.length} colleges found
                </p>
              </div>

              <div className="w-full md:w-auto">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search colleges..."
                    className="pl-9 w-full md:w-[300px] bg-white"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <X className="h-4 w-4" /> : <Sliders className="h-4 w-4" />}
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">Sort by:</span>
              <Select defaultValue={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranking">Ranking: Low to High</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="fees_low">Fees: Low to High</SelectItem>
                  <SelectItem value="fees_high">Fees: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div 
              className={`lg:w-1/4 space-y-6 lg:block ${
                showFilters ? 'block' : 'hidden'
              }`}
            >
              <div className="bg-white rounded-lg border p-5 shadow-soft">
                <h3 className="font-medium mb-4">Filter Results</h3>
                <Separator className="mb-4" />

                <Accordion type="multiple" defaultValue={["location", "courses", "fees"]}>
                  <AccordionItem value="location">
                    <AccordionTrigger className="py-3">Location</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {states.slice(0, 8).map((state, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox id={`state-${index}`} />
                            <label 
                              htmlFor={`state-${index}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {state}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="courses">
                    <AccordionTrigger className="py-3">Courses</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {courses.slice(0, 8).map((course, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox id={`course-${index}`} />
                            <label 
                              htmlFor={`course-${index}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {course}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fees">
                    <AccordionTrigger className="py-3">Fees</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {["Below ₹1 Lakh", "₹1-3 Lakhs", "₹3-5 Lakhs", "₹5-10 Lakhs", "Above ₹10 Lakhs"].map((range, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox id={`fee-${index}`} />
                            <label 
                              htmlFor={`fee-${index}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {range}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="facilities">
                    <AccordionTrigger className="py-3">Facilities</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {facilities.slice(0, 8).map((facility, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox id={`facility-${index}`} />
                            <label 
                              htmlFor={`facility-${index}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {facility}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator className="my-4" />
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>

            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : filteredColleges.length === 0 ? (
                <div className="bg-white rounded-lg border p-12 text-center shadow-soft">
                  <h3 className="text-xl font-semibold mb-2">No Colleges Found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={() => {
                    setSearchTerm('');
                    setSortBy('ranking');
                    filterColleges();
                  }}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredColleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}

                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="h-9 w-9">1</Button>
                      <Button variant="outline" className="h-9 w-9">2</Button>
                      <Button variant="outline" className="h-9 w-9">3</Button>
                      <span>...</span>
                      <Button variant="outline" className="h-9 w-9">10</Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Colleges;
