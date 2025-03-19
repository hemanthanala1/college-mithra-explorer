
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollFadeIn } from '@/lib/animations';
import CollegeCard from '@/components/CollegeCard';
import { colleges } from '@/lib/data';

const FeaturedColleges = () => {
  const [setRef, className] = useScrollFadeIn(0.2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    const newPosition = direction === 'left' 
      ? Math.max(scrollPosition - scrollAmount, 0)
      : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-16 relative overflow-hidden" ref={setRef as any}>
      <div className="container px-4 md:px-6">
        <div className={`space-y-6 ${className}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Colleges
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Explore top colleges in India with the best academic excellence, infrastructure, and placement records.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div 
            ref={scrollRef} 
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {colleges.map((college) => (
              <div 
                key={college.id} 
                className="min-w-[300px] md:min-w-[350px] snap-start"
              >
                <CollegeCard college={college} featured={college.ranking <= 3} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
