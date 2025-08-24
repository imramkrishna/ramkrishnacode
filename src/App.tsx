import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Database, Server, Globe, User, Send, Menu, X, Zap, Twitter, Calendar, Award, Briefcase, GraduationCap } from 'lucide-react';

// Personal Information from Resume
const personalInfo = {
  name: "RAM KRISHNA YADAV",
  title: "FULL STACK ENGINEER",
  email: "itsramky234@gmail.com",
  phone: "+977-9703577211",
  location: "Nepal",
  github: "https://github.com/imramkrishna",
  linkedin: "https://www.linkedin.com/in/ramkrishnaprofile/",
  twitter: "https://x.com/ramkrishnacode", // Add your Twitter profile
  portfolio: "https://ramkrishnacode.tech/",
  profileImage: "./download.jpeg",
  summary: "Full Stack Engineer specializing in scalable web application development. Delivered production-ready applications with proven performance optimization and enhanced user experience. Proficient in modern JavaScript frameworks, RESTful APIs, cloud infrastructure (AWS, Azure), and deployment platforms (Vercel, BPS hosting). Experienced in end-to-end application lifecycle from development to production deployment."
};

// Resume Data
const skills = {
  "Frontend": ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML5", "SEO Optimization"],
  "Backend": ["Node.js", "Express.js", "Python", "GraphQL", "JWT", "RESTful API"],
  "Database": ["MongoDB", "PostgreSQL", "MySQL"],
  "Deployment": ["Vercel", "Microsoft Azure", "VPS Hosting"],
  "Tools": ["Git", "Figma", "WebSockets"]
};

const projects = [
  {
    title: "XCodeGen-AI Assistant",
    tech: "React.js, Node.js, Express.js, MongoDB, TypeScript, Llama, Gemini, Mistral",
    description: "Developed a specialized AI assistant designed to streamline software development workflows. XCodeGen features both Developer Mode and Chat Mode to generate code, documentation, and project structures. Integrated a custom inbuilt file system, enabling direct file-level modifications by the LLM without requiring manual file uploads.",
    link: "https://x-code-gen.vercel.app/",
    category: "Web/AI",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "ChessOnline - Multiplayer Chess Game",
    tech: "React.js, Node.js, Express.js, WebSocket, MongoDB, Tailwind CSS, TypeScript",
    description: "Developed a real-time multiplayer chess platform enabling seamless online gameplay with instant move synchronization and low-latency communication through WebSocket technology. Built an interactive, responsive chessboard interface using React.js featuring drag-and-drop functionality.",
    link: "https://chess-online-five.vercel.app/",
    category: "Gaming",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "WMS-Warehouse Management System",
    tech: "React, TypeScript, Node.js, Express.js, PostgreSQL, Tailwind CSS, JWT",
    description: "Developed a comprehensive warehouse management system with real-time inventory tracking, order management, and supplier management capabilities. Built responsive dashboard with live analytics, multi-warehouse support, and role-based access control.",
    link: "https://warehouse-management-system-lovat.vercel.app/",
    category: "Enterprise",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Games Hub Web Application",
    tech: "Next.js, JavaScript, HTML Canvas, Tailwind CSS, Shadcn/ui, TypeScript",
    description: "Developed a responsive, cross-platform gaming web application integrating Flappy Bird, Snake, and Tetris using Next.js, JavaScript, HTML Canvas, Tailwind CSS, and Shadcn/ui. The app features optimized rendering and smooth real-time game performance.",
    link: "https://games-nine-murex.vercel.app/",
    category: "Gaming",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "ChatConnect- Realtime Chat App",
    tech: "React, Node.js, WebSocket, Express",
    description: "Developed a real-time chat application leveraging WebSockets, Node.js, Express.js, and React.js to enable instant, bi-directional communication across users. Designed and implemented scalable server-side architecture with Node and Express.",
    link: "https://chatconnectfrontend.vercel.app/",
    category: "Social",
    gradient: "from-indigo-500 to-purple-500"
  }
];

const experience = [
  {
    company: "Blue Fox Pvt. Ltd.",
    position: "Full Stack Developer",
    duration: "2024 - Present",
    isCurrentRole: false,
    type: "work",
    responsibilities: [
      "Work as a Full Stack Engineer specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js), Next.js, and database management",
      "Build real-world projects like food delivery and restaurant-booking applications, handling everything from frontend design to backend logic",
      "Ensure seamless user experiences, scalable architecture, and efficient code to deliver high-quality solutions"
    ]
  },
  {
    company: "Blue Fox Pvt. Ltd.",
    position: "NextJs MERN Stack Intern",
    duration: "2024-2025",
    isCurrentRole: false,
    type: "work",
    responsibilities: [
      "As a Software Development Intern, I had the opportunity to work on two key projects: Restro Pro System and Food Delivery System",
      "Both systems were developed using the MERN stack and Next.js, providing real-time, responsive, and scalable web applications for the food service industry"
    ]
  },
  {
    company: "Tribhuvan University, Institute of Engineering",
    position: "Computer Engineering Degree",
    duration: "2024 - 2029",
    isCurrentRole: true,
    type: "education",
    responsibilities: [
      "Specialized in software engineering with focus on web development and database systems"
    ]
  }
];

// const education = [
//   {
//     degree: "Bachelor in Computer Engineering",
//     institution: "Tribhuvan University, IOE Purwanchal Campus, Dharan",
//     duration: "Oct 2024-2028",
//     status: "(working while pursuing bachelors)"
//   }
// ];

// Mobile-optimized Animation variants - only GPU-accelerated properties
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Faster for mobile
      delayChildren: 0.1,
    },
  },
};

// Simplified mobile animations - GPU accelerated only
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10 // Reduced movement
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2, // Much faster
    },
  },
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://portfoliobackend-ukd5.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadCV = () => {
    // Open the existing PDF file in a new tab
    window.open('/cv.pdf', '_blank');
  };  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Simplified animated background for mobile performance - single element instead of multiple */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-full rounded-full -top-1/2 -left-1/2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
          animate={{
            scale: [1, 1.02, 1] // Minimal animation
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 z-50 w-full border-b bg-white/5 backdrop-blur-xl border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="px-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo - Responsive text size */}
            <motion.div
              className="text-lg font-bold text-transparent sm:text-xl md:text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ram Krishna
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden space-x-4 md:space-x-6 lg:space-x-8 md:flex">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 lg:px-4 py-2 rounded-full transition-all duration-300 relative text-sm lg:text-base ${activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/20"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Social Links - Hide on smaller tablets, show on desktop */}
            <div className="items-center hidden space-x-3 lg:space-x-4 lg:flex">
              {[
                { href: personalInfo.github, icon: Github, label: "GitHub" },
                { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: personalInfo.twitter, icon: Twitter, label: "Twitter" }
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-2 text-gray-400 transition-all rounded-full lg:p-3 bg-white/5 hover:bg-white/10 hover:text-white group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <motion.div
                    className="absolute px-2 py-1 text-xs text-white transition-opacity transform -translate-x-1/2 bg-gray-900 rounded opacity-0 -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {label}
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button - Larger touch target */}
            <motion.button
              className="p-3 text-white rounded-lg md:hidden bg-white/5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Improved spacing and touch targets */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="border-t md:hidden bg-gray-900/95 backdrop-blur-lg border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-h-screen px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex w-full px-6 py-4 text-left text-white transition-colors rounded-xl hover:bg-white/10 text-lg font-medium min-h-[56px] items-center"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <div className="flex justify-center pt-6 space-x-6">
                  {[
                    { href: personalInfo.github, icon: Github, label: "GitHub" },
                    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn" },
                    { href: personalInfo.twitter, icon: Twitter, label: "Twitter" }
                  ].map(({ href, icon: Icon, label }, index) => (
                    <motion.a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 text-gray-400 transition-colors rounded-full bg-white/10 hover:text-white min-w-[56px] min-h-[56px] flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      aria-label={label}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative flex items-center justify-center min-h-screen px-3 pt-16 sm:pt-20 sm:px-4">
        <motion.div
          className="z-10 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image - Responsive sizing */}
          <motion.div
            className="mb-6 sm:mb-8 will-change-[transform]"
            variants={itemVariants}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 p-1.5 sm:p-2 mx-auto mb-6 sm:mb-8 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <div className="w-full h-full overflow-hidden rounded-full shadow-inner">
                <img
                  src={personalInfo.profileImage}
                  alt="Ram Krishna Yadav"
                  className="object-cover w-full h-full rounded-full"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="items-center justify-center hidden w-full h-full bg-gradient-to-br from-slate-900 to-gray-800">
                  <User className="w-16 h-16 text-white sm:w-20 sm:h-20 md:w-24 md:h-24" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Name with Gradient Text - Responsive typography */}
          <motion.h1
            className="mb-4 text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl"
            variants={itemVariants}
          >
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
              Ram Krishna
            </span>
          </motion.h1>

          {/* Title with Typewriter Effect - Responsive sizing */}
          <motion.h2
            className="mb-6 text-lg font-light text-blue-400 sm:mb-8 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            variants={itemVariants}
          >
            {personalInfo.title}
          </motion.h2>

          {/* Description - Responsive typography and spacing */}
          <motion.p
            className="max-w-2xl px-4 mx-auto mb-8 text-sm leading-relaxed text-gray-300 sm:max-w-3xl lg:max-w-4xl sm:mb-12 sm:text-base md:text-lg lg:text-xl sm:px-0"
            variants={itemVariants}
          >
            {personalInfo.summary}
          </motion.p>

          {/* CTA Buttons - Improved mobile layout */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 px-4 sm:gap-6 sm:px-0 sm:flex-row"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 overflow-hidden font-semibold text-white rounded-full shadow-2xl group bg-gradient-to-r from-blue-600 to-purple-600 min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span className="text-sm sm:text-base">Explore My Work</span>
                <ExternalLink className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={handleDownloadCV}
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 overflow-hidden font-semibold text-white rounded-full shadow-2xl group bg-gradient-to-r from-green-600 to-emerald-600 min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:scale-110" />
                <span className="text-sm sm:text-base">View CV</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold text-blue-400 transition-all border-2 border-blue-500 rounded-full hover:bg-blue-500/10 backdrop-blur-sm group min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span className="text-sm sm:text-base">Get In Touch</span>
                <Send className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Hide on small screens */}
        <motion.div
          className="absolute hidden transform -translate-x-1/2 bottom-6 sm:bottom-10 left-1/2 sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative px-3 py-16 sm:px-4 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">About Me</h2>
            <motion.div
              className="w-20 h-1 mx-auto sm:w-24 lg:w-32 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: "5rem" }}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="p-4 border shadow-2xl sm:p-6 lg:p-8 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex flex-col items-start mb-6 sm:flex-row sm:items-center">
                <motion.div
                  className="flex items-center justify-center w-12 h-12 mb-4 rounded-full sm:w-16 sm:h-16 sm:mb-0 sm:mr-6 bg-gradient-to-r from-blue-500 to-purple-500"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <User className="w-6 h-6 text-white sm:w-8 sm:h-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">My Journey</h3>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-gray-300 sm:mb-8 sm:text-base lg:text-lg">
                {personalInfo.summary}
              </p>

              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {[
                  { icon: MapPin, label: "Location", value: personalInfo.location, color: "text-blue-400" },
                  { icon: Mail, label: "Email", value: personalInfo.email, color: "text-purple-400" },
                  { icon: Calendar, label: "Status", value: "Available for hire", color: "text-green-400" },
                  { icon: Award, label: "Experience", value: "2+ Years", color: "text-yellow-400" }
                ].map(({ icon: Icon, label, value, color }, index) => (
                  <motion.div
                    key={label}
                    className="flex items-center p-3 space-x-3 transition-all rounded-lg sm:p-4 sm:rounded-xl bg-white/5 hover:bg-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 sm:text-sm">{label}</p>
                      <p className="text-sm font-medium text-white truncate sm:text-base">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative px-3 py-16 sm:px-4 sm:py-20 lg:py-24 bg-black/20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">Experience</h2>
            <motion.div
              className="w-20 h-1 mx-auto sm:w-24 lg:w-32 bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: "5rem" }}
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="relative p-4 mb-6 overflow-hidden border shadow-2xl sm:p-6 lg:p-8 sm:mb-8 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-white/10"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
              >
                {/* Current role highlight */}
                {exp.isCurrentRole && (
                  <div className="absolute top-0 right-0 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm bg-gradient-to-r from-green-500 to-emerald-500 rounded-bl-xl sm:rounded-bl-2xl rounded-tr-2xl sm:rounded-tr-3xl">
                    Current Role
                  </div>
                )}

                <div className="flex flex-col mb-4 sm:flex-row sm:items-start sm:justify-between sm:mb-6">
                  <div className="flex items-start mb-4 space-x-3 sm:space-x-4 sm:mb-0">
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex-shrink-0 ${exp.isCurrentRole
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : exp.type === 'education'
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        } flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {exp.type === 'education' ? (
                        <GraduationCap className="w-6 h-6 text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      ) : (
                        <Briefcase className="w-6 h-6 text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-lg font-bold leading-tight text-white sm:text-xl lg:text-2xl">{exp.position}</h3>
                      <p className={`text-sm sm:text-base font-semibold ${exp.isCurrentRole
                        ? 'text-green-400'
                        : exp.type === 'education'
                          ? 'text-blue-400'
                          : 'text-purple-400'
                        }`}>{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex justify-end sm:justify-start">
                    <span className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ${exp.isCurrentRole
                      ? 'bg-green-500/20 text-green-300'
                      : exp.type === 'education'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-white/10 text-gray-400'
                      }`}>
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <motion.div
                      key={respIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: (index * 0.2) + (respIndex * 0.1) }}
                    >
                      <div className={`w-2 h-2 flex-shrink-0 ${exp.isCurrentRole
                        ? 'bg-green-400'
                        : exp.type === 'education'
                          ? 'bg-blue-400'
                          : 'bg-purple-400'
                        } rounded-full mt-2`} />
                      <p className="text-sm leading-relaxed text-gray-300 sm:text-base">{resp}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-3 py-16 sm:px-4 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">Featured Projects</h2>
            <p className="px-4 mb-4 text-base text-gray-300 sm:mb-6 sm:text-lg lg:text-xl sm:px-0">Showcasing my latest work and innovations</p>
            <motion.div
              className="w-20 h-1 mx-auto sm:w-24 lg:w-32 bg-gradient-to-r from-blue-500 to-teal-500"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: "5rem" }}
            />
          </motion.div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="relative p-4 overflow-hidden transition-all border shadow-2xl sm:p-5 lg:p-6 group bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-white/10 hover:bg-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
              >
                {/* Project gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Category badge */}
                <motion.div
                  className="absolute px-2 py-1 text-xs text-gray-300 rounded-full sm:px-3 top-3 sm:top-4 right-3 sm:right-4 bg-white/10 backdrop-blur-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                >
                  {project.category}
                </motion.div>

                {/* Project icon */}
                <motion.div
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${project.gradient} mb-4 sm:mb-6 flex items-center justify-center`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code className="w-6 h-6 text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </motion.div>

                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3 className="pr-2 text-lg font-bold leading-tight text-white transition-colors sm:text-xl group-hover:text-blue-400">
                    {project.title}
                  </h3>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 text-blue-400 transition-colors border rounded-full sm:p-3 hover:text-blue-300 bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 hover:border-blue-400/50"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.link, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label={`View ${project.title} live project`}
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                </div>

                <p className="mb-3 text-xs font-medium leading-relaxed text-blue-400 sm:mb-4 sm:text-sm">
                  {project.tech}
                </p>

                <p className="mb-4 text-xs leading-relaxed text-gray-300 sm:mb-6 sm:text-sm line-clamp-4">
                  {project.description}
                </p>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-3 sm:px-4 py-2.5 sm:py-3 space-x-2 text-xs sm:text-sm font-semibold text-white transition-all border rounded-lg cursor-pointer bg-blue-600/80 hover:bg-blue-600 border-blue-500/50 hover:border-blue-400 min-h-[40px] sm:min-h-[44px]"
                  whileHover={{ scale: 1.02, x: 0 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>View Live Project</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* More Projects Button */}
          <motion.div
            className="flex justify-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-4 overflow-hidden text-base font-bold text-white border-2 border-transparent rounded-full shadow-2xl sm:px-12 sm:py-5 sm:text-lg group bg-gradient-to-r from-indigo-600 to-purple-600 hover:border-purple-400/50"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Github className="w-5 h-5 transition-transform duration-300 sm:w-6 sm:h-6 group-hover:rotate-12" />
                <span>More Projects</span>
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </span>

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />

              {/* Sparkle effect */}
              <motion.div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-3 py-16 sm:px-4 sm:py-20 lg:py-24 bg-black/20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">Technical Skills</h2>
            <p className="px-4 mb-4 text-base text-gray-300 sm:mb-6 sm:text-lg lg:text-xl sm:px-0">Technologies and tools I work with</p>
            <motion.div
              className="w-20 h-1 mx-auto sm:w-24 lg:w-32 bg-gradient-to-r from-green-500 to-blue-500"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: "5rem" }}
            />
          </motion.div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => {
              const categoryIcons = {
                "Frontend": Code,
                "Backend": Server,
                "Database": Database,
                "Deployment": Globe,
                "Tools": Zap
              };

              const categoryColors = {
                "Frontend": "from-blue-500 to-cyan-500",
                "Backend": "from-green-500 to-emerald-500",
                "Database": "from-purple-500 to-pink-500",
                "Deployment": "from-orange-500 to-red-500",
                "Tools": "from-yellow-500 to-orange-500"
              };

              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code;
              const gradient = categoryColors[category as keyof typeof categoryColors] || "from-gray-500 to-gray-600";

              return (
                <motion.div
                  key={category}
                  className="p-4 transition-all border shadow-2xl sm:p-6 lg:p-8 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-white/10 hover:bg-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                  whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="flex items-center mb-6 sm:mb-8">
                    <motion.div
                      className={`bg-gradient-to-r ${gradient} p-3 sm:p-4 rounded-xl sm:rounded-2xl mr-3 sm:mr-4 flex-shrink-0`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-white sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">{category}</h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {skillList.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: (categoryIndex * 0.2) + (skillIndex * 0.1)
                        }}
                      >
                        <div className="flex items-center justify-between p-3 transition-all rounded-lg sm:p-4 sm:rounded-xl bg-white/5 hover:bg-white/10 group-hover:scale-105">
                          <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white sm:text-base">
                            {skill}
                          </span>
                          <div className="flex space-x-1">
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${gradient}`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.3,
                                  delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + (i * 0.05)
                                }}
                                whileHover={{ scale: 1.5 }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-3 py-16 sm:px-4 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">Let's Work Together</h2>
            <p className="px-4 mb-4 text-base text-gray-300 sm:mb-6 sm:text-lg lg:text-xl sm:px-0">Ready to bring your ideas to life? Let's discuss your next project.</p>
            <motion.div
              className="w-20 h-1 mx-auto sm:w-24 lg:w-32 bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: "5rem" }}
            />
          </motion.div>

          <div className="grid items-start max-w-6xl gap-6 mx-auto sm:gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              className="p-4 border shadow-2xl sm:p-6 lg:p-8 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-white/10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
            >
              <h3 className="mb-6 text-2xl font-bold text-white sm:mb-8 sm:text-3xl">Get In Touch</h3>

              <div className="mb-8 space-y-4 sm:mb-12 sm:space-y-6">
                {[
                  { icon: Mail, label: "Email", value: personalInfo.email, color: "text-blue-400" },
                  { icon: Phone, label: "Phone", value: personalInfo.phone, color: "text-green-400" },
                  { icon: MapPin, label: "Location", value: personalInfo.location, color: "text-purple-400" }
                ].map(({ icon: Icon, label, value, color }, index) => (
                  <motion.div
                    key={label}
                    className="flex items-center p-3 space-x-3 transition-all rounded-lg cursor-pointer sm:p-4 sm:space-x-4 group sm:rounded-xl hover:bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <motion.div
                      className="flex-shrink-0 p-3 rounded-full sm:p-4 bg-gradient-to-r from-blue-500 to-purple-500"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-5 h-5 text-white sm:w-6 sm:h-6" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 sm:text-sm">{label}</p>
                      <p className={`font-medium text-sm sm:text-base ${color} truncate`}>{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t sm:pt-8 border-white/10">
                <h4 className="mb-4 text-lg font-semibold text-white sm:mb-6 sm:text-xl">Connect With Me</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  {[
                    { href: personalInfo.github, icon: Github, label: "GitHub", color: "hover:bg-gray-600" },
                    { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-600" },
                    { href: personalInfo.twitter, icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" }
                  ].map(({ href, icon: Icon, label, color }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-white/10 p-3 sm:p-4 rounded-full transition-all group relative ${color} min-w-[48px] min-h-[48px] flex items-center justify-center`}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-5 h-5 text-gray-400 transition-colors sm:w-6 sm:h-6 group-hover:text-white" />
                      <motion.div
                        className="absolute px-2 py-1 text-xs text-white transition-opacity transform -translate-x-1/2 bg-gray-900 rounded-lg opacity-0 sm:px-3 sm:text-sm -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        {label}
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="p-4 border shadow-2xl sm:p-6 lg:p-8 bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border-white/10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)" }}
            >
              <h3 className="mb-6 text-2xl font-bold text-white sm:mb-8 sm:text-3xl">Send Message</h3>

              {submitStatus === 'success' && (
                <motion.div
                  className="p-3 mb-4 text-sm text-green-300 border sm:p-4 sm:mb-6 sm:text-base bg-green-500/20 border-green-500/30 rounded-xl sm:rounded-2xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="p-3 mb-4 text-sm text-red-300 border sm:p-4 sm:mb-6 sm:text-base bg-red-500/20 border-red-500/30 rounded-xl sm:rounded-2xl"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Error sending message. Please try again or contact me directly.
                </motion.div>
              )}

              <form className="space-y-4 sm:space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {[
                    { field: 'Name', name: 'name', type: 'text' },
                    { field: 'Email', name: 'email', type: 'email' }
                  ].map(({ field, name, type }, index) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <label className="block mb-2 text-sm font-medium text-white sm:text-base">{field}</label>
                      <motion.input
                        name={name}
                        type={type}
                        value={formData[name as keyof typeof formData]}
                        onChange={handleInputChange}
                        placeholder={`Your ${field.toLowerCase()}`}
                        required
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-400 transition-all border bg-white/5 border-white/20 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[44px]"
                        whileFocus={{ scale: 1.02 }}
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Subject</label>
                  <motion.input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project discussion"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-400 transition-all border bg-white/5 border-white/20 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[44px]"
                    whileFocus={{ scale: 1.02 }}
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Message</label>
                  <motion.textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-400 transition-all border resize-none bg-white/5 border-white/20 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
                    whileFocus={{ scale: 1.02 }}
                    disabled={isSubmitting}
                  ></motion.textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex items-center justify-center w-full py-3 sm:py-4 space-x-2 overflow-hidden font-semibold text-white transition-all shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl hover:shadow-2xl group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-sm sm:text-base">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:translate-x-1" />
                        <span className="text-sm sm:text-base">Send Message</span>
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative px-3 py-12 overflow-hidden border-t sm:px-4 sm:py-16 lg:py-20 bg-gradient-to-b from-black/40 via-gray-900/80 to-black border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20" />
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 mb-8 sm:gap-10 lg:gap-12 sm:mb-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <motion.div
              className="text-center sm:col-span-2 lg:col-span-2 sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3
                className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                  Ram Krishna Yadav
                </span>
              </motion.h3>
              <p className="max-w-lg mx-auto mb-4 text-sm leading-relaxed text-gray-300 sm:mb-6 sm:text-base lg:text-lg sm:mx-0">
                Full Stack Engineer passionate about creating innovative web solutions.
                Transforming ideas into exceptional digital experiences with modern technologies.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 sm:items-start sm:justify-start">
                <motion.div
                  className="flex items-center space-x-2 text-sm text-gray-400 sm:text-base"
                  whileHover={{ scale: 1.05, color: "#ffffff" }}
                >
                  <MapPin className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Nepal</span>
                </motion.div>
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center space-x-2 text-sm text-gray-400 transition-colors hover:text-blue-400 sm:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Available for hire</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="mb-6 text-xl font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <motion.li key={item.id}>
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className="block text-left text-gray-400 transition-colors hover:text-white"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services/Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="mb-6 text-xl font-semibold text-white">Technologies</h4>
              <ul className="space-y-3">
                {['React.js & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'TypeScript', 'Cloud Deployment'].map((tech) => (
                  <motion.li
                    key={tech}
                    className="text-gray-400 transition-colors hover:text-white"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Media & Contact */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex mb-6 space-x-6 md:mb-0">
                {[
                  { href: personalInfo.github, icon: Github, label: "GitHub", color: "hover:text-gray-300" },
                  { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
                  { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email", color: "hover:text-green-400" }
                ].map(({ href, icon: Icon, label, color }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 rounded-full bg-white/5 text-gray-400 ${color} transition-all border border-white/10 hover:border-white/30`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                    <motion.div
                      className="absolute px-3 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-gray-900 border rounded-lg opacity-0 -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap border-white/20"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      {label}
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              <div className="text-center md:text-right">
                <p className="mb-2 text-gray-400">
                  © 2025 Ram Krishna Yadav. All rights reserved.
                </p>
                <p className="text-sm text-gray-500">
                  Built with ❤️ using React, TypeScript, Tailwind CSS & Framer Motion
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '147, 51, 234'}, ${Math.random() * 0.5 + 0.1})`,
              }}
              animate={{
                y: [0, -Math.random() * 200 - 50, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, Math.random() * 0.8 + 0.2, 0],
                scale: [0, Math.random() + 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </motion.footer>
    </div>
  );
}

export default App;
