export const personalInfo = {
  name: 'OMKAR KIVADAR',
  role: 'ASPIRING SOFTWARE DEVELOPER',
  email: 'omkarmanjunathkivadar@gmail.com',
  phone: '+91 7829504966',
  linkedin: 'https://www.linkedin.com/in/omkar-kivadar-881551394',
  github: 'https://github.com/omkarkivadar-maker',
  instagram: 'https://www.instagram.com/omkar.kivadar/',
};

export const aboutText =
  'Motivated Electrical Engineering undergraduate with strong C++, Python, DSA, and OOP skills, experienced in developing software projects and applying efficient solutions to real-world problems. Eager to learn and contribute to challenging software engineering environments.';

export const aboutStatement = 'CURIOUS BY NATURE.';

export const aboutHighlights = [
  'Electrical Engineering undergraduate with a passion for software systems',
  'Strong foundation in C++, Python, Data Structures, and Object-Oriented Programming',
  'Experience building real-world projects from embedded systems to web applications',
  'Driven to solve complex engineering problems with clean, efficient code',
];

export interface SkillCategory {
  id: string;
  number: string;
  label: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    number: '01',
    label: 'PROGRAMMING',
    skills: ['C', 'C++', 'Python'],
  },
  {
    id: 'cs',
    number: '02',
    label: 'CORE COMPUTER SCIENCE',
    skills: ['OOP', 'DSA', 'STL', 'Operating Systems'],
  },
  {
    id: 'embedded',
    number: '03',
    label: 'EMBEDDED',
    skills: ['8051 Microcontroller'],
  },
  {
    id: 'tools',
    number: '04',
    label: 'TOOLS / TECHNOLOGIES',
    skills: ['Git', 'GitHub', 'OpenCV'],
  },
  {
    id: 'machine-learning',
    number: '05',
    label: 'MACHINE LEARNING',
    skills: ['Machine Learning', 'Supervised Learning', 'Model Evaluation'],
  },
  {
    id: 'artificial-intelligence',
    number: '06',
    label: 'ARTIFICIAL INTELLIGENCE',
    skills: ['Artificial Intelligence', 'Computer Vision', 'Pattern Recognition'],
  },
  {
    id: 'generative-ai',
    number: '07',
    label: 'GENERATIVE AI',
    skills: ['Generative AI', 'Prompt Engineering', 'Large Language Models'],
  },
  {
    id: 'leadership',
    number: '08',
    label: 'LEADERSHIP',
    skills: ['Team Leadership', 'Decision Making', 'Initiative'],
  },
  {
    id: 'collaboration',
    number: '09',
    label: 'COLLABORATION',
    skills: ['Teamwork', 'Effective Communication', 'Stakeholder Management'],
  },
  {
    id: 'professional',
    number: '10',
    label: 'PROFESSIONAL',
    skills: ['Analytical Thinking', 'Problem Solving', 'Adaptability'],
  },
];

export interface Certification {
  id: string;
  number: string;
  title: string;
  organization: string;
  platform: string;
}

export const certifications: Certification[] = [
  {
    id: 'jpmc',
    number: '01',
    title: 'Software Engineering Virtual Experience Program',
    organization: 'JPMorgan Chase & Co.',
    platform: 'Forage',
  },
  {
    id: 'deloitte',
    number: '02',
    title: 'Technology Virtual Experience Program',
    organization: 'Deloitte Australia',
    platform: 'Forage',
  },
];

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  result: string;
}

export const education: EducationItem[] = [
  {
    id: 'be',
    degree: 'B.E. Electrical and Electronics Engineering',
    institution: 'KLE Technological University, Hubballi',
    period: 'Oct 2023 – Present',
    result: 'CGPA: 7.56',
  },
  {
    id: 'puc',
    degree: 'Class XII – PUC PCMB',
    institution: 'Oriental PU Science College, Hubballi',
    period: '2021 – 2022',
    result: '86.5%',
  },
  {
    id: 'sslc',
    degree: 'Class X – SSLC',
    institution: 'S.J.S.S. English Medium School, Hubballi',
    period: '2021',
    result: '78.8%',
  },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  date: string;
  technologies: string[];
  description: string;
  achievement?: string;
  theme: string;
}

export const projects: Project[] = [
  {
    id: 'shopkart',
    number: '01',
    title: 'SHOPKART',
    subtitle: 'SHOPPING MANAGEMENT SYSTEM',
    date: 'June 2025',
    technologies: ['C++', 'OOP', 'LCS', 'LCP', 'Anagram'],
    description:
      'Modular shopping application with weighted search using LCS, LCP, and Anagram-based matching techniques.',
    theme: 'search',
  },
  {
    id: 'rtos',
    number: '02',
    title: 'RTOS-BASED SMART GRAIN DRYING SYSTEM',
    date: 'January 2026',
    technologies: ['ARM Cortex-M3', 'RTOS', 'Embedded C'],
    description:
      'Real-time environmental monitoring and automated fan/motor control system.',
    achievement: '2nd Place at TECH VISION 2026 national-level project expo.',
    theme: 'embedded',
  },
  {
    id: 'heart-rate',
    number: '03',
    title: 'CONTACTLESS HEART RATE MONITORING SYSTEM',
    date: 'March 2026',
    technologies: ['Python', 'OpenCV', 'PCA', 'FFT'],
    description:
      'Real-time contactless heart-rate monitoring using Haar Cascade face detection, ROI extraction, pulse-signal processing, PCA, and FFT.',
    theme: 'signal',
  },
  {
    id: 'file-diff',
    number: '04',
    title: 'VERSION BASED FILE DIFFERENCE ANALYZER',
    date: 'May 2026',
    technologies: ['C++', 'OOP', 'LCS', 'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'Poppler/pdftotext'],
    description:
      'Modular file comparison system with LCS-based difference visualization supporting TXT/PDF files and Node.js-C++ integration.',
    theme: 'diff',
  },
];

export const languages = ['English', 'Kannada', 'Hindi', 'Spanish (Basics)'];

export const hobbies = [
  'Competitive Programming',
  'Learning New Technologies',
  'Football & Volleyball',
  'Traveling',
];

export interface NavItem {
  id: string;
  number: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'home', number: '01', label: 'HOME' },
  { id: 'about', number: '02', label: 'ABOUT' },
  { id: 'skills', number: '03', label: 'SKILLS' },
  { id: 'experience', number: '04', label: 'EXPERIENCE' },
  { id: 'projects', number: '05', label: 'PROJECTS' },
  { id: 'contact', number: '06', label: 'CONTACT' },
];
