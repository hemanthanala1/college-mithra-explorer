
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeIn } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';
import { cities } from '@/lib/data';

const CityExplorer = () => {
  const [setRef, className] = useScrollFadeIn(0.2);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-secondary/50" ref={setRef as any}>
      <div className="container px-4 md:px-6">
        <div className={`space-y-10 ${className}`}>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Explore Colleges by City
            </h2>
            <p className="text-muted-foreground">
              Find the best colleges in your city or explore educational opportunities across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link 
                key={city.id}
                to={`/colleges?city=${city.name}`}
                className="group relative overflow-hidden rounded-xl h-64 transition-all duration-300 hover:shadow-medium"
                onMouseEnter={() => setHoveredId(city.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 z-10" />
                <img 
                  src={city.image}
                  alt={city.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === city.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white">
                  <h3 className="text-xl font-semibold">{city.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm opacity-90">{city.count} Colleges</span>
                    <div className="flex items-center text-sm font-medium">
                      Explore
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityExplorer;
