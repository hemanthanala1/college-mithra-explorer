
import { Link } from 'react-router-dom';
import { GraduationCap, Instagram, Twitter, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 opacity-90 hover:opacity-100">
              <GraduationCap className="h-6 w-6" />
              <span className="font-semibold text-xl tracking-tight">CollegeMithra</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              Helping students find their perfect college match with comprehensive information, reviews, and comparisons.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/colleges" className="text-slate-400 hover:text-white transition-colors">
                  Explore Colleges
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-slate-400 hover:text-white transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/exams" className="text-slate-400 hover:text-white transition-colors">
                  Entrance Exams
                </Link>
              </li>
              <li>
                <Link to="/rankings" className="text-slate-400 hover:text-white transition-colors">
                  College Rankings
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-white transition-colors">
                  Student Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-slate-400 hover:text-white transition-colors">
                  Admission Guide
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="text-slate-400 hover:text-white transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/career-guide" className="text-slate-400 hover:text-white transition-colors">
                  Career Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe</h3>
            <p className="text-slate-400 text-sm mb-4">
              Get the latest updates, news, and offers directly in your inbox.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-slate-500"
              />
              <Button size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} College Mithra. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
