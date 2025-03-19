
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, users } from '@/lib/data';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToWishlist: (collegeId: string) => void;
  removeFromWishlist: (collegeId: string) => void;
  isInWishlist: (collegeId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just check if the email exists in our mock data
    // In a real app, you would verify credentials against a backend
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      toast.success('Login successful');
      setIsLoading(false);
      return true;
    }
    
    toast.error('Invalid email or password');
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      toast.error('Email already in use');
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      wishlist: [],
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    // In a real app, you would send this to a backend
    // For demo purposes, we'll just add it to our users array (Note: this won't persist on page refresh)
    users.push(newUser);
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast.success('Account created successfully');
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
  };

  const addToWishlist = (collegeId: string) => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }

    if (user.wishlist.includes(collegeId)) {
      toast.info('College already in wishlist');
      return;
    }

    const updatedUser = {
      ...user,
      wishlist: [...user.wishlist, collegeId]
    };

    // Update local state
    setUser(updatedUser);
    
    // Update mock data
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (collegeId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      wishlist: user.wishlist.filter(id => id !== collegeId)
    };

    // Update local state
    setUser(updatedUser);
    
    // Update mock data
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (collegeId: string): boolean => {
    return user ? user.wishlist.includes(collegeId) : false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
