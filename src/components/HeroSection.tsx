
import { useState } from 'react';
import { Search, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { courses, cities } from '@/lib/data';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('college');

  return (
    <div className="relative min-h-[600px] md:min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background gradient with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-300/30 filter blur-3xl animate-float"></div>
          <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-indigo-300/20 filter blur-3xl animation-delay-200 animate-float"></div>
          <div className="absolute -bottom-[10%] left-[30%] w-[30%] h-[30%] rounded-full bg-purple-300/20 filter blur-3xl animation-delay-400 animate-float"></div>
        </div>
      </div>

      <div className="container px-4 md:px-6 z-10 pt-20">
        <div className="text-center max-w-3xl mx-auto fade-in-up">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Find your perfect college
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Discover & Compare
            <span className="text-gradient block mt-2">Top Colleges in India</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore 20,000+ colleges, read reviews, check rankings, and find the right college that matches your aspirations.
          </p>

          <div className="bg-white shadow-soft rounded-xl overflow-hidden transition-transform hover:shadow-medium">
            <Tabs defaultValue="college" onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 h-14 bg-muted/30">
                <TabsTrigger value="college" className="data-[state=active]:bg-white h-full rounded-none">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Colleges</span>
                </TabsTrigger>
                <TabsTrigger value="course" className="data-[state=active]:bg-white h-full rounded-none">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Courses</span>
                </TabsTrigger>
                <TabsTrigger value="city" className="data-[state=active]:bg-white h-full rounded-none">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Cities</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="p-1">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`Search for ${activeTab === 'college' ? 'colleges' : activeTab === 'course' ? 'courses' : 'cities'}...`}
                    className="flex-1 pl-10 py-6 text-base rounded-lg border-0 shadow-none focus-visible:ring-0"
                  />
                  <Button size="lg" className="absolute right-1">
                    Search
                  </Button>
                </div>

                <TabsContent value="college" className="mt-1 px-3 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {['Top Colleges', 'Engineering', 'Management', 'Medical', 'Design'].map((item) => (
                      <Button 
                        key={item} 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full bg-muted/40 border-muted/60"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="course" className="mt-1 px-3 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {courses.slice(0, 5).map((course) => (
                      <Button 
                        key={course} 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full bg-muted/40 border-muted/60"
                      >
                        {course}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="city" className="mt-1 px-3 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {cities.slice(0, 5).map((city) => (
                      <Button 
                        key={city.id} 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full bg-muted/40 border-muted/60"
                      >
                        {city.name}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Popular searches: MBA, Engineering, Medical, Design, Computer Science
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
