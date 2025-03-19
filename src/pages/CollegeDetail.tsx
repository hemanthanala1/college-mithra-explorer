
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Globe, 
  Clock, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Building,
  Users,
  GraduationCap,
  BookOpen,
  Award,
  Heart,
  BriefcaseBusiness,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { colleges } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import type { College } from '@/lib/data';

const CollegeDetail = () => {
  const { id } = useParams<{id: string}>();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist, user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call
    setTimeout(() => {
      const foundCollege = colleges.find(c => c.id === id) || null;
      setCollege(foundCollege);
      setLoading(false);
    }, 500);

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]);

  const handleWishlistToggle = () => {
    if (!college) return;
    
    if (isInWishlist(college.id)) {
      removeFromWishlist(college.id);
    } else {
      addToWishlist(college.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The college you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/colleges">
              <Button>Browse All Colleges</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const isWishlisted = user ? isInWishlist(college.id) : false;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16 bg-blue-50">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <Link to="/colleges" className="text-muted-foreground hover:text-foreground">Colleges</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <span className="text-foreground font-medium truncate">{college.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 animate-scale-in">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{college.name}</h1>
              <div className="flex items-center mt-2 text-sm">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{college.location.city}, {college.location.state}</span>
                <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                  <span className="font-medium">{college.rating}/5</span>
                  <span className="text-muted-foreground ml-1">({college.reviews} reviews)</span>
                </div>
                {college.naac && (
                  <>
                    <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
                    <Badge variant="outline">NAAC {college.naac}</Badge>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {user && (
                <Button 
                  variant={isWishlisted ? "default" : "outline"} 
                  className={isWishlisted ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-white" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              )}
              <Button>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={`sticky top-0 z-20 bg-white border-b transform transition-transform duration-300 ${
        scrolled ? 'translate-y-0 shadow-sm' : '-translate-y-full'
      }`}>
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between py-2">
            <h2 className="font-medium truncate">{college.name}</h2>
            <div className="flex items-center gap-2">
              {user && (
                <Button 
                  size="sm" 
                  variant={isWishlisted ? "default" : "outline"}
                  className={isWishlisted ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`mr-2 h-3 w-3 ${isWishlisted ? "fill-white" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
              )}
              <Button size="sm">Apply Now</Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 space-y-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-soft">
                <div className="h-64 md:h-96 relative">
                  <img 
                    src={college.image} 
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white border-0">
                    RANK #{college.ranking}
                  </Badge>
                  {college.nirf && (
                    <Badge className="absolute top-4 right-4 bg-amber-500 text-white border-0">
                      NIRF RANK #{college.nirf}
                    </Badge>
                  )}
                </div>

                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="p-1">
                  <TabsList className="w-full grid grid-cols-5 bg-gray-50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                    <TabsTrigger value="placements">Placements</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <div className="p-6">
                    <TabsContent value="overview" className="mt-0 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">About {college.name}</h3>
                        <p className="text-gray-700 leading-relaxed">{college.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <Building className="h-5 w-5 mr-2 text-primary" />
                              <CardTitle className="text-base">Established</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-lg font-medium">{college.established}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <Globe className="h-5 w-5 mr-2 text-primary" />
                              <CardTitle className="text-base">Website</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <a 
                              href={`https://${college.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {college.website}
                            </a>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                              <CardTitle className="text-base">Courses Offered</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-lg font-medium">{college.courses.length}+</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <Users className="h-5 w-5 mr-2 text-primary" />
                              <CardTitle className="text-base">Student Reviews</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-lg font-medium">{college.reviews.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      </div>

                      {college.awards && college.awards.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Awards & Recognition</h3>
                          <div className="grid grid-cols-1 gap-3">
                            {college.awards.map((award, index) => (
                              <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                                <Award className="h-6 w-6 text-yellow-600 mr-3" />
                                <span>{award}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {college.accreditation && college.accreditation.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Accreditation</h3>
                          <div className="flex flex-wrap gap-2">
                            {college.accreditation.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-sm">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="courses" className="mt-0 space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Courses & Fees</h3>
                      
                      <div className="space-y-4">
                        {college.courses.map((course, index) => (
                          <Card key={index}>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                  <CardTitle className="text-lg">{course}</CardTitle>
                                </div>
                                <Badge variant="outline">
                                  {["2 Years", "3 Years", "4 Years", "5 Years"][Math.floor(Math.random() * 4)]}
                                </Badge>
                              </div>
                              <CardDescription>
                                {["Undergraduate", "Postgraduate", "Diploma", "Certificate"][Math.floor(Math.random() * 4)]} Program
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-sm text-muted-foreground">Per Semester Fee</div>
                                  <div className="text-lg font-medium">
                                    {formatAmount(college.fees.perSemester || college.fees.min / 2)}
                                  </div>
                                </div>
                                <Button size="sm">Course Details</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="facilities" className="mt-0 space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Campus Facilities</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {college.facilities.map((facility, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <Check className="h-4 w-4 text-primary" />
                              </div>
                              <span>{facility}</span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="placements" className="mt-0 space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Placement Information</h3>
                      
                      {college.placements ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex items-center">
                                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                                  <CardTitle className="text-base">Average Package</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-xl font-bold text-green-600">
                                  {formatAmount(college.placements.averagePackage || 0)}/year
                                </p>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex items-center">
                                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                                  <CardTitle className="text-base">Highest Package</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-xl font-bold text-green-600">
                                  {formatAmount(college.placements.highestPackage || 0)}/year
                                </p>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex items-center">
                                  <Users className="h-5 w-5 mr-2 text-green-600" />
                                  <CardTitle className="text-base">Placement Rate</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-xl font-bold text-green-600">
                                  {college.placements.placementPercentage || 0}%
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                          
                          {college.placements.topRecruiters && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3">Top Recruiters</h4>
                              <div className="flex flex-wrap gap-2">
                                {college.placements.topRecruiters.map((company, index) => (
                                  <Badge key={index} variant="outline" className="bg-gray-50">
                                    <BriefcaseBusiness className="h-3 w-3 mr-1" />
                                    {company}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-muted p-6 rounded-lg text-center">
                          <p className="text-muted-foreground">Placement information not available for this college.</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="mt-0 space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-gray-50 rounded-lg p-6 text-center flex-shrink-0 w-full md:w-56">
                          <div className="text-5xl font-bold text-primary mb-2">{college.rating}</div>
                          <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < Math.floor(college.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">
                            Based on {college.reviews} reviews
                          </div>
                          <Button className="w-full">Write a Review</Button>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center">
                            <div className="w-28 flex justify-end pr-3">
                              <div className="flex items-center">
                                <span className="text-sm mr-1">5</span>
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <Progress value={80} className="h-2" />
                            </div>
                            <div className="w-12 text-right text-sm text-muted-foreground">80%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-28 flex justify-end pr-3">
                              <div className="flex items-center">
                                <span className="text-sm mr-1">4</span>
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <Progress value={12} className="h-2" />
                            </div>
                            <div className="w-12 text-right text-sm text-muted-foreground">12%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-28 flex justify-end pr-3">
                              <div className="flex items-center">
                                <span className="text-sm mr-1">3</span>
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <Progress value={5} className="h-2" />
                            </div>
                            <div className="w-12 text-right text-sm text-muted-foreground">5%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-28 flex justify-end pr-3">
                              <div className="flex items-center">
                                <span className="text-sm mr-1">2</span>
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <Progress value={2} className="h-2" />
                            </div>
                            <div className="w-12 text-right text-sm text-muted-foreground">2%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-28 flex justify-end pr-3">
                              <div className="flex items-center">
                                <span className="text-sm mr-1">1</span>
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <Progress value={1} className="h-2" />
                            </div>
                            <div className="w-12 text-right text-sm text-muted-foreground">1%</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">admissions@{college.website}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Website</span>
                    <a 
                      href={`https://${college.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {college.website}
                    </a>
                  </div>
                  <Button className="w-full mt-2">Request Callback</Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Fee Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tuition Fee (per year)</span>
                    <span className="font-medium">{formatAmount(college.fees.min)} - {formatAmount(college.fees.max)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Per Semester</span>
                    <span className="font-medium">{formatAmount(college.fees.perSemester || college.fees.min/2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Hostel Fee</span>
                    <span className="font-medium">₹80,000 - ₹1.2 Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Application Fee</span>
                    <span className="font-medium">₹1,500</span>
                  </div>
                  <Button variant="outline" className="w-full mt-2">Download Brochure</Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Key Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Application Start</span>
                    <span className="font-medium">15 Dec, 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Application Deadline</span>
                    <span className="font-medium">30 May, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Academic Session</span>
                    <span className="font-medium">Aug, 2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollegeDetail;
