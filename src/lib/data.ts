export interface College {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  rating: number;
  reviews: number;
  ranking: number;
  fees: {
    min: number;
    max: number;
    perSemester?: number;
  };
  courses: string[];
  facilities: string[];
  image: string;
  description: string;
  established: number;
  website: string;
  placements?: {
    averagePackage?: number;
    highestPackage?: number;
    placementPercentage?: number;
    topRecruiters?: string[];
  };
  awards?: string[];
  accreditation?: string[];
  nirf?: number; // National Institutional Ranking Framework
  naac?: string; // National Assessment and Accreditation Council Grade
  isFeatured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  wishlist: string[]; // Array of college IDs
}

export interface City {
  id: string;
  name: string;
  state: string;
  count: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  college: string;
  image: string;
  quote: string;
  course: string;
  year: number;
}

export const colleges: College[] = [
  {
    id: "1",
    name: "MIT Institute of Technology",
    location: {
      city: "Mumbai",
      state: "Maharashtra"
    },
    rating: 4.8,
    reviews: 1243,
    ranking: 1,
    fees: {
      min: 200000,
      max: 300000,
      perSemester: 125000
    },
    courses: ["B.Tech Computer Science", "B.Tech Electronics", "M.Tech", "MBA", "Ph.D"],
    facilities: ["Library", "Sports Complex", "WiFi", "Hostel", "Cafeteria", "Labs", "Auditorium", "Gym"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "MIT Institute of Technology is one of the premier institutions known for academic excellence and research innovations. Established with a vision to provide quality education, the institute has grown into a center of excellence in engineering, technology, and management studies.",
    established: 1990,
    website: "www.mit-institute.edu",
    placements: {
      averagePackage: 1200000,
      highestPackage: 4500000,
      placementPercentage: 95,
      topRecruiters: ["Google", "Microsoft", "Amazon", "Infosys", "TCS"]
    },
    awards: ["Best Engineering Institute Award 2022", "Excellence in Research Award 2021"],
    accreditation: ["NAAC A++", "NBA Accredited"],
    nirf: 5,
    naac: "A++",
    isFeatured: true
  },
  {
    id: "2",
    name: "Delhi Universal College",
    location: {
      city: "Delhi",
      state: "Delhi"
    },
    rating: 4.7,
    reviews: 989,
    ranking: 2,
    fees: {
      min: 180000,
      max: 260000,
      perSemester: 90000
    },
    courses: ["B.Tech Computer Science", "B.Tech Civil Engineering", "BBA", "MBA Finance", "MBA Marketing", "B.Com"],
    facilities: ["Library", "Sports Complex", "WiFi", "Hostel", "Cafeteria", "Research Labs", "Conference Hall"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Delhi Universal College is devoted to excellence in teaching, learning, and research, and developing leaders across disciplines who make a positive difference in the world.",
    established: 1995,
    website: "www.duc.edu",
    placements: {
      averagePackage: 950000,
      highestPackage: 3800000,
      placementPercentage: 92,
      topRecruiters: ["Deloitte", "KPMG", "Amazon", "Wipro", "HCL"]
    },
    awards: ["Best Business School 2022", "Teaching Excellence Award 2021"],
    accreditation: ["NAAC A+", "UGC Approved"],
    nirf: 12,
    naac: "A+",
    isFeatured: true
  },
  {
    id: "3",
    name: "Bangalore Institute of Science",
    location: {
      city: "Bangalore",
      state: "Karnataka"
    },
    rating: 4.6,
    reviews: 1120,
    ranking: 3,
    fees: {
      min: 220000,
      max: 320000,
      perSemester: 110000
    },
    courses: ["B.Tech Computer Science", "B.Tech AI & ML", "M.Tech Data Science", "BCA", "MCA", "Ph.D Computer Science"],
    facilities: ["Library", "Labs", "WiFi", "Hostel", "Cafeteria", "Gym", "Incubation Center", "Conference Hall"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    description: "The Bangalore Institute of Science is recognized for its outstanding contribution to academics and research in the field of science and technology. With a strong emphasis on practical learning, the institute prepares students for real-world challenges.",
    established: 1988,
    website: "www.bis.edu",
    placements: {
      averagePackage: 1400000,
      highestPackage: 5000000,
      placementPercentage: 98,
      topRecruiters: ["Google", "Microsoft", "Adobe", "IBM", "Intel"]
    },
    awards: ["Best Research Institute 2022", "Innovation Excellence Award 2021"],
    accreditation: ["NAAC A++", "NBA Accredited"],
    nirf: 8,
    naac: "A++",
    isFeatured: true
  },
  {
    id: "4",
    name: "Chennai Advanced Management School",
    location: {
      city: "Chennai",
      state: "Tamil Nadu"
    },
    rating: 4.5,
    reviews: 876,
    ranking: 4,
    fees: {
      min: 250000,
      max: 350000,
      perSemester: 125000
    },
    courses: ["BBA", "MBA Finance", "MBA Marketing", "MBA HR", "PGDM", "Executive MBA"],
    facilities: ["Library", "Digital Labs", "WiFi", "Hostel", "Cafeteria", "Auditorium", "Business Incubator"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Chennai Advanced Management School is a premier business school offering world-class education in management and business studies. With a focus on case studies and experiential learning, it produces industry-ready professionals.",
    established: 1997,
    website: "www.cams.edu",
    placements: {
      averagePackage: 1100000,
      highestPackage: 3500000,
      placementPercentage: 94,
      topRecruiters: ["JP Morgan", "HDFC Bank", "ICICI Bank", "Deloitte", "EY"]
    },
    awards: ["Top Business School in South India 2022", "Corporate Excellence Award 2021"],
    accreditation: ["NAAC A", "AICTE Approved"],
    nirf: 15,
    naac: "A",
    isFeatured: false
  },
  {
    id: "5",
    name: "Pune Liberal Arts College",
    location: {
      city: "Pune",
      state: "Maharashtra"
    },
    rating: 4.4,
    reviews: 756,
    ranking: 5,
    fees: {
      min: 170000,
      max: 230000,
      perSemester: 85000
    },
    courses: ["BA Literature", "BA Economics", "MA Psychology", "BFA", "MFA", "B.Design"],
    facilities: ["Library", "Art Studios", "WiFi", "Hostel", "Cafeteria", "Exhibition Halls", "Performing Arts Center"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    description: "Pune Liberal Arts College is known for its innovative approach to arts education, blending traditional arts disciplines with modern technology and design thinking. The campus is designed to inspire creativity and critical thinking.",
    established: 2001,
    website: "www.plac.edu",
    placements: {
      averagePackage: 700000,
      highestPackage: 2000000,
      placementPercentage: 85,
      topRecruiters: ["Ogilvy", "MakeMyTrip", "Penguin Publishing", "HCL", "Cognizant"]
    },
    awards: ["Best Liberal Arts College 2022", "Creative Excellence Award 2021"],
    accreditation: ["NAAC A", "UGC Approved"],
    nirf: 22,
    naac: "A",
    isFeatured: false
  },
  {
    id: "6",
    name: "Hyderabad Engineering University",
    location: {
      city: "Hyderabad",
      state: "Telangana"
    },
    rating: 4.3,
    reviews: 920,
    ranking: 6,
    fees: {
      min: 210000,
      max: 290000,
      perSemester: 105000
    },
    courses: ["B.Tech Mechanical", "B.Tech Civil", "B.Tech Computer Science", "M.Tech", "B.Arch", "Ph.D"],
    facilities: ["Library", "Research Labs", "WiFi", "Hostel", "Cafeteria", "Sports", "Workshops", "Conference Hall"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Hyderabad Engineering University is renowned for its cutting-edge research and innovation in various engineering disciplines. The institution has strong industry connections that help students gain practical exposure and employment opportunities.",
    established: 1992,
    website: "www.heu.edu",
    placements: {
      averagePackage: 900000,
      highestPackage: 3000000,
      placementPercentage: 90,
      topRecruiters: ["L&T", "Tata Steel", "ONGC", "Bharat Petroleum", "ISRO"]
    },
    awards: ["Best Engineering Institute in South India 2022", "Research Excellence Award 2021"],
    accreditation: ["NAAC A+", "NBA Accredited"],
    nirf: 18,
    naac: "A+",
    isFeatured: false
  },
  {
    id: "7",
    name: "KL University",
    location: {
      city: "Guntur",
      state: "Andhra Pradesh"
    },
    rating: 4.5,
    reviews: 1050,
    ranking: 7,
    fees: {
      min: 180000,
      max: 280000,
      perSemester: 90000
    },
    courses: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Civil", "M.Tech", "MBA", "BBA", "Ph.D"],
    facilities: ["Central Library", "State-of-the-art Labs", "WiFi Campus", "Hostels", "Food Court", "Indoor Stadium", "Outdoor Sports", "Incubation Center"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    description: "KL University (KLU), officially Koneru Lakshmaiah Education Foundation, is a deemed university located in Vaddeswaram, Guntur district, Andhra Pradesh. Established in 1980, KL University has become one of the leading educational institutions known for quality education and research in engineering, management, and sciences.",
    established: 1980,
    website: "www.kluniversity.in",
    placements: {
      averagePackage: 850000,
      highestPackage: 3200000,
      placementPercentage: 92,
      topRecruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Amazon", "Capgemini"]
    },
    awards: ["AICTE-CII Best Industry-linked Institution Award", "QS I-GAUGE Diamond Rating"],
    accreditation: ["NAAC A++", "NBA Accredited", "UGC Autonomous"],
    nirf: 42,
    naac: "A++",
    isFeatured: true
  }
];

export const cities: City[] = [
  {
    id: "1",
    name: "Mumbai",
    state: "Maharashtra",
    count: 145,
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7"
  },
  {
    id: "2",
    name: "Delhi",
    state: "Delhi",
    count: 137,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5"
  },
  {
    id: "3",
    name: "Bangalore",
    state: "Karnataka",
    count: 120,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2"
  },
  {
    id: "4",
    name: "Chennai",
    state: "Tamil Nadu",
    count: 98,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220"
  },
  {
    id: "5",
    name: "Pune",
    state: "Maharashtra",
    count: 87,
    image: "https://images.unsplash.com/photo-1625730029752-38c95112bbc1"
  },
  {
    id: "6",
    name: "Hyderabad",
    state: "Telangana",
    count: 92,
    image: "https://images.unsplash.com/photo-1626014303757-6366ef55c4ab"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    college: "MIT Institute of Technology",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    quote: "Studying at MIT was a transformative experience. The faculty's expertise and the vibrant campus life prepared me well for my career in tech.",
    course: "B.Tech Computer Science",
    year: 2022
  },
  {
    id: "2",
    name: "Priya Patel",
    college: "Delhi Universal College",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    quote: "DUC provided me with countless opportunities to grow both academically and personally. The industry connections helped me secure a great job right after graduation.",
    course: "MBA Finance",
    year: 2021
  },
  {
    id: "3",
    name: "Vikram Reddy",
    college: "Bangalore Institute of Science",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    quote: "The research facilities at BIS are world-class. I got to work on cutting-edge projects that have real-world applications, which was incredible.",
    course: "M.Tech AI & ML",
    year: 2023
  }
];

export const courses = [
  "Engineering",
  "Management",
  "Medical",
  "Law",
  "Science",
  "Arts",
  "Commerce",
  "Computer Applications",
  "Design",
  "Architecture"
];

export const facilities = [
  "Hostel",
  "Sports Complex",
  "Library",
  "Cafeteria",
  "Gym",
  "WiFi",
  "Labs",
  "Auditorium",
  "Transport",
  "Medical Center"
];

export const states = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Kerala"
];

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    wishlist: ["1", "3"]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    wishlist: ["2", "5"]
  }
];
