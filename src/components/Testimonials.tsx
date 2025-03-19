
import { useState, useEffect } from 'react';
import { QuoteIcon } from 'lucide-react';
import { useScrollFadeIn } from '@/lib/animations';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/data';

const Testimonials = () => {
  const [setRef, className] = useScrollFadeIn(0.2);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white" ref={setRef as any}>
      <div className="container px-4 md:px-6">
        <div className={`${className}`}>
          <div className="max-w-4xl mx-auto relative">
            <QuoteIcon className="absolute text-muted-foreground/10 h-20 w-20 -top-10 -left-10 hidden md:block" />

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                What Our Students Say
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Hear from students who found their dream colleges through College Mithra.
              </p>
            </div>

            <div className="relative flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 h-72 md:h-96 relative overflow-hidden rounded-2xl">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-110'
                    }`}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="w-full md:w-2/3">
                <div className="relative h-[300px]">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeIndex 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8'
                      }`}
                    >
                      <div className="text-lg md:text-xl leading-relaxed text-gray-700 italic mb-8">
                        "{testimonial.quote}"
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                          <div className="text-sm text-primary">{testimonial.college}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full mx-1 transition-all ${
                        index === activeIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
