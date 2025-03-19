
import { useEffect, useState } from 'react';

export function useScrollFadeIn(threshold = 0.1) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold,
      }
    );

    observer.observe(ref);
    return () => {
      observer.disconnect();
    };
  }, [ref, hasAnimated, threshold]);

  return [setRef, hasAnimated ? 'fade-in-up' : 'opacity-0'];
}

export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    observer.observe(ref);
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return [setRef, isVisible];
}

export function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elementTop = ref.getBoundingClientRect().top + scrollY;
      const relativeScroll = scrollY - elementTop;
      setOffset(relativeScroll * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);

  return [setRef, `translateY(${offset}px)`];
}
