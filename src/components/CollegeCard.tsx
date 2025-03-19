
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import type { College } from '@/lib/data';

interface CollegeCardProps {
  college: College;
  featured?: boolean;
}

const CollegeCard = ({ college, featured = false }: CollegeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <Card 
      className={`overflow-hidden hover-lift transition-all duration-300 ${
        featured ? 'border-primary/20 shadow-highlight' : 'border-muted/50 shadow-soft'
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <div 
          className={`absolute inset-0 bg-muted/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
        </div>
        <img
          src={college.image}
          alt={college.name}
          className={`object-cover w-full h-full transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-white border-0">
            Featured
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 bg-white/90 text-black backdrop-blur-sm border-0">
          Rank #{college.ranking}
        </Badge>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {college.name}
          </CardTitle>
          <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 mr-1" />
            {college.rating}
          </div>
        </div>
        <CardDescription className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {college.location.city}, {college.location.state}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {college.courses.slice(0, 3).map((course, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="rounded-full text-xs font-normal bg-secondary/50"
            >
              {course}
            </Badge>
          ))}
          {college.courses.length > 3 && (
            <Badge 
              variant="secondary" 
              className="rounded-full text-xs font-normal bg-secondary/50"
            >
              +{college.courses.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fees</span>
            <span className="font-medium">
              {formatAmount(college.fees.min)} - {formatAmount(college.fees.max)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reviews</span>
            <span className="font-medium">{college.reviews.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4">
          {college.facilities.slice(0, 3).map((facility, index) => (
            <div key={index} className="flex items-center text-xs text-muted-foreground">
              <Check className="h-3 w-3 mr-1 text-green-500" />
              {facility}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button variant="outline" size="sm" className="text-xs h-8">
          Apply Now
        </Button>
        <Link to={`/colleges/${college.id}`} className="group flex items-center text-sm text-primary font-medium">
          View Details
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
