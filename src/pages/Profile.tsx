
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Heart, LogOut, User, Clock, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CollegeCard from '@/components/CollegeCard';
import { colleges, College } from '@/lib/data';

const Profile = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [wishlistedColleges, setWishlistedColleges] = useState<College[]>([]);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      navigate('/login');
    }
    
    // Get wishlisted colleges
    if (user) {
      const userWishlist = colleges.filter(college => 
        user.wishlist.includes(college.id)
      );
      setWishlistedColleges(userWishlist);
    }
  }, [user, isLoading, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect to login
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-20">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist ({user.wishlist.length})
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Recently Viewed
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="wishlist">
                <TabsList className="mb-6">
                  <TabsTrigger value="wishlist">
                    <Heart className="h-4 w-4 mr-2" />
                    My Wishlist
                  </TabsTrigger>
                  <TabsTrigger value="applications">
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Applications
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="wishlist" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Saved Colleges</h3>
                    <Badge variant="outline">{wishlistedColleges.length} colleges</Badge>
                  </div>
                  
                  {wishlistedColleges.length === 0 ? (
                    <div className="bg-muted/50 rounded-lg p-8 text-center">
                      <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium mb-2">No saved colleges yet</h4>
                      <p className="text-muted-foreground mb-4">
                        Start building your wishlist by saving colleges you're interested in.
                      </p>
                      <Link to="/colleges">
                        <Button>Explore Colleges</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistedColleges.map(college => (
                        <CollegeCard key={college.id} college={college} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="applications" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">My Applications</h3>
                    <Badge variant="outline">0 applications</Badge>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">No applications yet</h4>
                    <p className="text-muted-foreground mb-4">
                      Start your admission journey by applying to colleges of your choice.
                    </p>
                    <Link to="/colleges">
                      <Button>Apply Now</Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
