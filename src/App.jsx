import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Send,
  ExternalLink,
  Info,
  Code,
  GraduationCap,
  Briefcase,
  TerminalSquare,
  Brain,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { db } from "./firebase.js";
import {
  ref,
  onValue,
  push,
  serverTimestamp,
  remove,
  update,
} from "firebase/database";

import boyCoding from "./assets/boy_coding.png";
import boyAi from "./assets/boy_ai.png";
import boySleeping from "./assets/boy_sleeping.png";
import boyHoodie from "./assets/boy_hoodie.png";
import ElderGuardAI from "./assets/ElderGuardAI.png";
import PrivaSeal from "./assets/PrivaSeal.png";
import AIInterviewCoach from "./assets/AIInterviewCoach.png";
import achievementInnovation from "./assets/achievement_innovation.jpg";
import achievementElderguard from "./assets/achievement_elderguard.jpg";
import achievementIit from "./assets/achievement_iit.jpg";
import achievementTrophy from "./assets/achievement_trophy.jpg";
import achievementNasaCert from "./assets/achievement_nasa_cert.jpg";
import achievementNasaNominee from "./assets/achievement_nasa_nominee.jpg";
import cert1 from "./assets/cert1.jpg";
import cert2 from "./assets/cert2.jpg";
import cert3 from "./assets/cert3.jpg";
import cert4 from "./assets/cert4.jpg";
import cert5 from "./assets/cert5.jpg";
import cert6 from "./assets/cert6.jpg";

const NavItem = ({ section, current, onClick }) => (
  <button
    onClick={() => onClick(section.id)}
    className={`px-4 py-2 font-heading text-xs tracking-widest transition-all ${current === section.id ? "text-neonGreen text-shadow-neon border-b-2 border-neonGreen" : "text-sageGreen hover:text-neonGreen"}`}
  >
    {section.label}
  </button>
);

const GlitchAvatar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const avatars = [boyCoding, boyAi, boySleeping, boyHoodie];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % avatars.length);
      }, 200);

      setTimeout(() => {
        setIsGlitching(false);
      }, 450);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center md:items-end z-10 p-2 mt-12 md:mt-0 flex-shrink-0 mx-auto md:ml-auto md:mr-0">
      <div className="font-heading text-neonGreen text-[10px] md:text-xs tracking-widest bg-darkGreen/80 border border-neonGreen/30 px-3 py-1.5 mb-4 shadow-[0_0_10px_rgba(57,255,20,0.1)] inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-neonGreen animate-pulse"></span>
        BASE_LOC: INDIA (IST)
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 border-neonGreen bg-darkGreen shadow-[0_0_15px_rgba(57,255,20,0.3)] group">
        <div
          className={`glitch-wrapper relative w-full h-full overflow-hidden border border-sageGreen/50 ${isGlitching ? "is-glitching" : ""}`}
        >
          <div className="glitch-img-container w-full h-full relative">
            <img
              src={avatars[currentIndex]}
              alt="avatar"
              className="w-full h-full object-cover"
            />

            {isGlitching && (
              <>
                <div
                  className="glitch-layer glitch-layer-1 absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${avatars[currentIndex]})` }}
                />
                <div
                  className="glitch-layer glitch-layer-2 absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${avatars[currentIndex]})` }}
                />
              </>
            )}
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px)",
              backgroundSize: "100% 4px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`relative w-full my-8 flex justify-between items-center transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 " + (index % 2 === 0 ? "-translate-x-12" : "translate-x-12")} md:flex-row flex-col ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
    >
      <div className="order-1 md:w-5/12 hidden md:block"></div>

      {/* Center timeline dot */}
      <div className="z-20 md:order-1 flex items-center shadow-neon bg-neonGreen w-4 h-4 rounded-full absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2"></div>

      {/* Card Content */}
      <div
        className={`order-1 border border-neonGreen shadow-neon bg-darkGreen/80 p-6 md:w-5/12 w-full ml-12 md:ml-0 rounded-md`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-heading text-neonGreen text-sm md:text-base leading-relaxed">
            {item.degree || item.title}
          </h3>
        </div>
        <h4 className="text-sageGreen font-body text-xl mb-2">
          {item.school || item.company || "Achievement"}
        </h4>
        <span className="inline-block bg-neonGreen/20 text-neonGreen px-2 py-1 text-xs font-body mb-4">
          {item.year}
        </span>
        <p className="text-sageGreen text-sm md:text-base font-body">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const Intro = ({ onComplete }) => {
  const [text, setText] = useState("00000");
  const [mounted, setMounted] = useState(false);
  const final = "APR_5";

  useEffect(() => {
    // Start fade in
    const mountTimer = setTimeout(() => setMounted(true), 100);

    let iteration = 0;
    let interval;
    // Delay binary effect slightly so the fade-in is visible first
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        setText((prev) =>
          prev
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return final[index];
              }
              return Math.random() > 0.5 ? "1" : "0";
            })
            .join(""),
        );

        if (iteration >= final.length) {
          clearInterval(interval);
          // Hold the fixed "APR_5"
          setTimeout(() => {
            onComplete();
          }, 3500); // 3.5s hold + ~1.5s decode = 5s total
        }
        iteration += 1 / 5; // Faster speed of deciphering
      }, 40);
    }, 800);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-darkGreen flex flex-col items-center justify-center crt z-[100] transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(57, 255, 20, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.15) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    >
      <div className="flex flex-col items-center animate-float scale-100 origin-center transition-transform duration-[3000ms] hover:scale-110">
        <div className="font-heading text-4xl md:text-5xl lg:text-6xl text-neonGreen text-shadow-neon tracking-widest mb-4">
          &lt;{text}/&gt;
        </div>
        <div className="font-body text-sageGreen text-sm md:text-base tracking-[0.3em] uppercase opacity-80 animate-pulse">
          portfolio loading...
        </div>
      </div>
    </div>
  );
};

const rings = [15, 25, 35, 45, 55, 70, 85];

const orbitNodes = (() => {
  const nodes = [];
  let idCounter = 0;

  rings.forEach((radius) => {
    // Both planets on the same ring must have the same speed and direction to never clash
    const speed = Math.random() * 60 + 20; // 20s to 80s orbit
    const reverse = true; // Revolve right to left

    // Create exactly 2 planets per axis
    for (let j = 0; j < 2; j++) {
      nodes.push({
        id: idCounter++,
        radius: radius,
        speed: speed,
        // Start one at 0 and one exactly halfway through the orbit (180 degrees)
        delay: j === 0 ? 0 : -(speed / 2),
        size: Math.random() * 1 + 0.8,
        opacity: Math.random() * 0.4 + 0.1,
        reverse: reverse,
      });
    }
  });

  return nodes;
})();

const OrbitBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-90"
    style={{ perspective: '1200px' }}>
    <div className="relative w-full h-full flex items-center justify-center"
      style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg)' }}>
      {/* Draw the Solar System concentric orbit rings */}
      {rings.map((radius, i) => (
        <div
          key={`ring-${i}`}
          className="absolute border border-sageGreen/30 rounded-full"
          style={{
            width: `${radius * 2}vw`,
            height: `${radius * 2}vw`,
            transform: 'translateZ(-1px)',
          }}
        />
      ))}

      {/* The roaming </>'s (planets) */}
      {orbitNodes.map((node) => (
        <div
          key={node.id}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            "--orbit-radius": `${node.radius}vw`,
            animation: `solar-orbit ${node.speed}s linear ${node.delay}s infinite ${node.reverse ? "reverse" : "normal"}`,
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
        >
          <div
            className="planet-circle pointer-events-auto flex items-center justify-center font-heading select-none transition-all duration-300 relative group"
            style={{
              fontSize: `${node.size * 0.9}rem`,
              width: `${node.size * 2.8}rem`,
              height: `${node.size * 2.8}rem`,
              color: `rgba(57, 255, 20, ${Math.min(node.opacity + 0.4, 1)})`,
              opacity: Math.min(node.opacity + 0.4, 1),
            }}
          >
            {/* 3D scrolling meridian lines that make the ball look like it's rotating on its surface */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-lighten"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 20%, rgba(57, 255, 20, 0.4) 20%, rgba(57, 255, 20, 0.4) 24%)',
                backgroundSize: '200% 100%',
                animation: `planet-pan ${node.speed * 0.4}s linear infinite`
              }}
            />

            {/* Overlaid static glossy 3D glare for spherical volume */}
            <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(57,255,20,0.25)_0%,transparent_60%)] group-hover:bg-[radial-gradient(circle_at_30%_30%,rgba(57,255,20,0.5)_0%,transparent_70%)] transition-colors duration-300 z-10" style={{ boxShadow: 'inset -8px -8px 16px rgba(0,0,0,0.95), inset 2px 2px 5px rgba(255,255,255,0.15)' }}></div>

            <div style={{ animation: `planet-spin ${node.speed * 0.4}s linear infinite` }} className="planet-text flex w-full h-full items-center justify-center relative z-20 transition-colors duration-300">
              &lt;/&gt;
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeTab, setActiveTab] = useState("projects");

  const [projLimit, setProjLimit] = useState(6);
  const [certLimit, setCertLimit] = useState(6);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("");
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState("");
  const [newLogName, setNewLogName] = useState("");
  const [logStatus, setLogStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    // if (!db) { setContactStatus('ERR: NO_DB_CONNECTION'); return; } // Commented out to allow form submission even without Firebase set up.
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus("ERR: INCOMPLETE_DATA");
      setTimeout(() => setContactStatus(""), 3000);
      return;
    }

    setContactStatus("SENDING...");
    try {
      // --- 1. OPTIONAL: Save to Firebase Database (you can keep this or remove it) ---
      if (db) {
        await push(ref(db, "messages"), {
          ...contactForm,
          timestamp: serverTimestamp(),
        }).catch((err) => console.log("Firebase Save Error (Ignoring):", err));
      }

      // --- 2. NEW: Send an actual Email via Formspree ---
      const res = await fetch("https://formspree.io/f/xjgagkzo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setContactStatus("SUCCESS: MESSAGE_SENT");
        setContactForm({ name: "", email: "", message: "" });
        setTimeout(() => setContactStatus(""), 5000);
      } else {
        setContactStatus("ERR: API_REJECTED");
        setTimeout(() => setContactStatus(""), 3000);
      }
    } catch (error) {
      setContactStatus("ERR: TRANSFER_FAILED");
      console.error(error);
      setTimeout(() => setContactStatus(""), 3000);
    }
  };

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    if (!db) {
      setLogStatus("ERR: NO_DB");
      return;
    }
    if (!newLog.trim()) return;

    setLogStatus("POSTING...");
    try {
      await push(ref(db, "public_logs"), {
        user: newLogName.trim() || "GUEST_" + Math.floor(Math.random() * 9999),
        text: newLog,
        timestamp: serverTimestamp(),
      });
      setNewLog("");
      setNewLogName("");
      setLogStatus("");
    } catch (error) {
      setLogStatus("ERR: POST_FAILED");
      console.error(error);
      setTimeout(() => setLogStatus(""), 3000);
    }
  };

  const handleDeleteLog = async (id) => {
    if (!db) return;
    try {
      await remove(ref(db, `public_logs/${id}`));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleHideLog = async (id, currentHidden) => {
    if (!db) return;
    try {
      await update(ref(db, `public_logs/${id}`), { hidden: !currentHidden });
    } catch (error) {
      console.error("Hide failed:", error);
    }
  };

  useEffect(() => {
    if (!db) return;
    const logsRef = ref(db, "public_logs");
    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logsArray = Object.entries(data)
          .map(([id, val]) => ({
            id,
            ...val,
          }))
          .sort((a, b) => {
            const timeA = a.timestamp || 0;
            const timeB = b.timestamp || 0;
            return timeB - timeA;
          });
        setLogs(logsArray);
      } else {
        setLogs([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Live Viewer setup
  const [viewers, setViewers] = useState(0);
  useEffect(() => {
    // Start randomly between 12 and 45 viewers
    setViewers(Math.floor(Math.random() * 33) + 12);

    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        // Fluctuate viewers slightly up or down to make it look "live"
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        let next = prev + change;
        if (next < 5) next = 5; // Bottom cap
        return next;
      });
    }, 3500);
    return () => clearInterval(viewerInterval);
  }, []);

  const sections = [
    { id: "hero", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "portfolio", label: "PORTFOLIO" },
    { id: "education", label: "EDUCATION" },
    { id: "experience", label: "WORK EXPERIENCE" },
    { id: "contact", label: "CONTACT" },
  ];

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let s of sections) {
        const element = document.getElementById(s.id);
        if (
          element &&
          element.offsetTop <= scrollPos &&
          element.offsetTop + element.offsetHeight > scrollPos
        ) {
          setActiveSection(s.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const eduData = [
    {
      school: "St. Thomas Boys' School,Khiderpore",
      degree: "Primary & Secondary School Education",
      year: "2011 - 2021",
      description:
        "Completed my primary and secondary education with a strong foundation in English and other subjects.",
    },
    {
      school: "St. Thomas Boys' School,Khiderpore",
      degree: "Higher Secondary Education",
      year: "2021 - 2023",
      description:
        "Completed my higher secondary education with a strong foundation in English, Maths and Computer Science.",
    },
    {
      school: "Swami Vivekananda Institute of Science and Technology",
      degree: "Bachelor of Technology (Computer Science and Engineering)",
      year: "2023 - 2027",
      description:
        "Currently pursuing a Bachelor of Technology in Computer Science and Engineering with a strong foundation in algorithms, data structures, Machine Learning, and Artificial Intelligence.",
    },
  ];

  const expData = [
    {
      title: "Cyber Security Internship",
      company: "Indian Cyber Security Solutions",
      year: "Jan 2026 - Feb 2026",
      description:
        "Conducted vulnerability assessment and penetration testing (VAPT) on web applications to identify security weaknesses. Used tools such as Nmap, Burp Suite, Wireshark, and Metasploit for reconnaissance, scanning, and basic exploit testing. Documented vulnerabilities and recommended mitigation strategies to improve system security.",
    },
    {
      title: "AI & Cloud Internship",
      company: "IBM Skillbuild Virtual Internship",
      year: "Dec 2025 - Jan 2026",
      description:
        "Gained hands-on experience with IBM Cloud services and tools. Developed practical skills through guided modules and projects focused on cloud computing, problem-solving, and real-world technology applications.",
    },
    {
      title: "Generative AI Internship",
      company: "EXCELR",
      year: "July 2025 - Aug 2025",
      description:
        "Worked on building and fine-tuning AI models for text and image generation. Getting practical experience in prompt engineering, LLMs, RAG, Langchain and integrating AI APIs into applications, able to develop real-world AI solutions.",
    },
    {
      title: "ML Internship",
      company: "Techshaksham (AICTE) initiative by MICROSOFT & SAP",
      year: "Dec 2024 - Jan 2025",
      description:
        "A joint CSR initiative of Microsoft & SAP. It provides a unique opportunity for skills enhancement of students in the field of AI. I have been working on \"SMS Spam Detection using NLP\" under multiple Mentors for 4 weeks.",
    },
  ];

  const achievData = [
    {
      title: "Innovation Award",
      desc: "Recognized for innovative excellence at INNOVENTION 2024, showcasing cutting-edge solutions.",
      img: achievementInnovation,
    },
    {
      title: "ElderGuardAI Showcase",
      desc: "Presenting ElderGuardAI, an AI-powered safety system designed to protect and monitor the elderly.",
      img: achievementElderguard,
    },
    {
      title: "IIT Kharagpur Journey",
      desc: "A momentous visit to the Indian Institute of Technology, Kharagpur, exploring the roots of engineering excellence.",
      img: achievementIit,
    },
    {
      title: "Hackathon Victory",
      desc: "Proudly standing with the winning trophy after a grueling tech competition among top developers.",
      img: achievementTrophy,
    },
    {
      title: "NASA Winner Recognition",
      desc: "Officially recognized for excellence in the International Space Apps Challenge with a winner's certificate.",
      img: achievementNasaCert,
    },
    {
      title: "NASA Global Nominee '24",
      desc: "Proud Global Nominee for the NASA Space Apps Challenge 2024, selected among the top submissions worldwide.",
      img: achievementNasaNominee,
    },





  ];


  const techStacks = [
    { name: "Java", icon: "devicon-java-plain" },
    { name: "C", icon: "devicon-c-plain" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
    { name: "React", icon: "devicon-react-original" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Next.js", icon: "devicon-nextjs-plain" },
    { name: "Tailwind CSS", icon: "devicon-tailwindcss-original" },
    { name: "Django", icon: "devicon-django-plain" },
    { name: "MongoDB", icon: "devicon-mongodb-plain" },
    { name: "MySQL", icon: "devicon-mysql-plain" },
    { name: "Firebase", icon: "devicon-firebase-plain" },
    { name: "Docker", icon: "devicon-docker-plain" },
    { name: "Kubernetes", icon: "devicon-kubernetes-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "GitHub", icon: "devicon-github-original" },
    { name: "GCP", icon: "devicon-googlecloud-plain" },
    { name: "TensorFlow", icon: "devicon-tensorflow-original" },
    { name: "Numpy", icon: "devicon-numpy-plain" },
  ];

  const projects = [
    {
      title: "ElderGuardAI",
      desc: "Predict. Protect. Prevent.",
      img: ElderGuardAI,
    },
    {
      title: "PrivaSeal",
      desc: "Verify Anything. Reveal Nothing.",
      img: PrivaSeal,
    },
    {
      title: "AI Interview Coach",
      desc: "Your Future Starts Here. Personalized AI coaching.",
      img: AIInterviewCoach,
    },
    {
      title: "AI Image Gen",
      desc: "Deep learning based image synthesis API interface.",
      img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=AI+Gen",
    },
    {
      title: "Task CLI",
      desc: "Command line interface for managing daily tasks remotely.",
      img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=CLI",
    },
    {
      title: "Pixel Portfolio",
      desc: "My own retro personal site builder styling framework.",
      img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Pixel+Port",
    },
    {
      title: "AutoDeploy",
      desc: "CI/CD serverless auto deployment cloud script.",
      img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Deploy",
    },
    {
      title: "DataMiner",
      desc: "Data processing ETL pipeline utilizing NLP models.",
      img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=DataMiner",
    },
  ];

  const certificates = [
    {
      title: "Machine Learning I",
      desc: "Columbia+",
      img: cert1,
    },
    {
      title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
      desc: "Microsoft and LinkedIn",
      img: cert2,
    },
    {
      title: "Technology Job Simulation",
      desc: "Deloitte",
      img: cert4,
    },
    {
      title: "Lab: Retrieval Augmented Generation with LangChain",
      desc: "IBM SkillsBuild",
      img: cert3,
    },
    {
      title: "Data Visualisation: Empowering Business with Effective Insights",
      desc: "Tata",
      img: cert5,
    },
    {
      title: "Enterprise Design Thinking Practitioner",
      desc: "IBM",
      img: cert6,
    },
  ];

  return (
    <>
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      <div
        className={`min-h-screen crt relative transition-opacity duration-1000 ${showIntro ? "opacity-0 h-screen overflow-hidden" : "opacity-100"}`}
      >
        <OrbitBackground />
        {/* Header/Nav */}
        <header className="fixed top-0 w-full z-50 bg-darkGreen/90 backdrop-blur-sm border-b border-neonGreen/30 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="font-heading text-neonGreen text-xl text-shadow-neon">
              &lt;APR_5/&gt;
            </div>
            <nav className="hidden md:flex gap-4">
              {sections.map((s) => (
                <NavItem
                  key={s.id}
                  section={s}
                  current={activeSection}
                  onClick={scrollToSection}
                />
              ))}
            </nav>
          </div>
          <div className="bg-neonGreen/5 border-t border-neonGreen/10 py-2 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-[10px] md:text-xs font-heading text-neonGreen/80 tracking-widest uppercase items-center">
              <span className="mx-4">
                Full Stack Developer with GenAI || 2x Hackathon Winner ||
                NSAC Global Nominee’24 || Built PWA & apps serving 1k+ users ||
                Having 8+ Real World - Real Time Live Project || 5+ Open Source
                Projects
              </span>
              <span className="mx-4">
                Full Stack Developer with GenAI || 2x Hackathon Winner ||
                NSAC Global Nominee’24 || Built PWA & apps serving 1k+ users ||
                Having 8+ Real World - Real Time Live Project || 5+ Open Source
                Projects
              </span>
            </div>
          </div>
        </header>

        <main className="pt-32 pb-12 max-w-6xl mx-auto px-6 overflow-hidden">
          {/* HERO SECTION */}
          <section
            id="hero"
            className="min-h-[85vh] flex flex-col md:flex-row justify-between items-center mb-20 relative pt-20 pb-12 gap-8 md:gap-4"
          >
            <div className="flex flex-col justify-center items-start w-full md:w-[55%] lg:w-[60%] relative z-20 h-full">
              <p className="text-neonGreen font-body text-xl md:text-2xl mb-4 h-[32px]">
                {/* Live typing subline */}
                <Typewriter
                  words={["> Initialize user session..."]}
                  cursor
                  typeSpeed={60}
                />
              </p>
              <h1 className="font-heading text-4xl md:text-6xl text-white mb-6 leading-tight min-h-[144px] md:min-h-[160px]">
                Hi, I'm <br />
                <span className="text-neonGreen text-shadow-neon whitespace-nowrap">
                  {/* Typewriter for Name */}
                  <Typewriter
                    words={["Apurba Roy"]}
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={5000}
                    cursor
                    loop
                  />
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-sageGreen font-body mb-6 mt-2 h-[40px]">
                {/* Swapping titles */}
                <Typewriter
                  words={[
                    "Computer Science Engineer",
                    "Fullstack Developer",
                    "AI ML Enthusiast",
                  ]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h2>

              <div className="flex flex-col gap-4 mb-16 w-full max-w-md">
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => scrollToSection("portfolio")}
                    className="pixel-btn flex-1 text-center"
                  >
                    VIEW PROJECTS_
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="pixel-btn !bg-transparent !text-sageGreen !border-sageGreen hover:!border-neonGreen hover:!text-neonGreen flex-1 text-center"
                  >
                    CONTACT ME_
                  </button>
                </div>
                {/* Download CV newly added button */}
                <a
                  href="#"
                  download
                  className="pixel-btn !bg-neonGreen/10 w-full text-center hover:bg-neonGreen hover:text-darkGreen transition-all"
                >
                  DOWNLOAD MY CV_
                </a>
              </div>

              <div className="flex gap-6 mt-auto border-t border-sageGreen/20 pt-6 w-full max-w-md">
                <a
                  href="#"
                  title="GitHub"
                  className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="#"
                  title="LinkedIn"
                  className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  title="Twitter"
                  className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            <div className="w-full md:w-[45%] lg:w-[40%] flex justify-center md:justify-end items-center relative z-10 transition-opacity">
              <GlitchAvatar />
            </div>
          </section>

          {/* ABOUT ME */}
          <section
            id="about"
            className="py-20 mb-20 border-t border-neonGreen/20"
          >
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">
                &gt; ABOUT_ME
              </h2>
              <div className="h-px bg-neonGreen/30 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sageGreen font-body text-lg md:text-xl leading-relaxed mb-6">
                  I’m a BTech Computer Science student passionate about building impactful tech
                  solutions that blend creativity and functionality. I enjoy working on web development,
                  AI-driven applications, and real-world problem-solving projects. From hackathons
                  to independent builds, I focus on turning ideas into practical products.
                  With a strong interest in startups and innovation.

                </p>
                <p className="text-sageGreen font-body text-lg md:text-xl leading-relaxed mb-8">
                  I aim to create scalable solutions that deliver value. I’m constantly learning,
                  experimenting, and pushing my limits to grow as a developer and problem solver.
                </p>
                <blockquote className="border-l-4 border-neonGreen pl-4 py-2 bg-neonGreen/5">
                  <p className="font-heading text-sm text-neonGreen/80">
                    "Code is poetry written for machines to parse, and humans to
                    admire."
                  </p>
                </blockquote>
              </div>

              <div className="relative mx-auto group">
                <div className="absolute inset-0 border-2 border-neonGreen translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <img
                  src="https://via.placeholder.com/400x400/0a1a0f/39ff14?text=PROFILE_IMG"
                  alt="Profile"
                  className="relative z-10 block grayscale hover:grayscale-0 transition-all duration-500 w-full max-w-sm border border-neonGreen"
                />
              </div>
            </div>
          </section>

          {/* PORTFOLIO SHOWCASE */}
          <section
            id="portfolio"
            className="py-20 mb-20 border-t border-neonGreen/20"
          >
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">
                &gt; PORTFOLIO
              </h2>
              <div className="h-px bg-neonGreen/30 flex-grow"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  label: "Total Projects",
                  value: projects.length.toString(),
                  icon: <Briefcase className="text-neonGreen mb-2" size={32} />,
                },
                {
                  label: "Certificates",
                  value: certificates.length.toString(),
                  icon: (
                    <GraduationCap className="text-neonGreen mb-2" size={32} />
                  ),
                },
                {
                  label: "Years Exp",
                  value: "05",
                  icon: <Code className="text-neonGreen mb-2" size={32} />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="border border-neonGreen p-6 bg-darkGreen shadow-neon flex flex-col items-center justify-center hover:bg-neonGreen/10 transition-colors"
                >
                  {stat.icon}
                  <div className="font-heading text-3xl text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="font-body text-sageGreen text-xl uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tabbed Navigation */}
            <div className="flex justify-center flex-wrap gap-4 mb-12 border-b border-sageGreen/30 pb-4">
              {["projects", "certificates", "stack"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-heading text-sm px-6 py-2 transition-colors ${activeTab === tab ? "bg-neonGreen text-darkGreen shadow-neon" : "text-sageGreen hover:text-neonGreen"}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            {activeTab === "projects" && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {projects.slice(0, projLimit).map((proj, i) => (
                    <div
                      key={i}
                      className="group border border-neonGreen bg-darkGreen overflow-hidden hover:shadow-neon-strong transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="border-b border-neonGreen overflow-hidden">
                        <img
                          src={proj.img}
                          alt={proj.title}
                          className="w-full h-48 object-cover opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-neonGreen text-xl mb-3">
                          {proj.title}
                        </h3>
                        <p className="font-body text-sageGreen mb-6 h-12">
                          {proj.desc}
                        </p>
                        <div className="flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 border border-neonGreen py-2 text-neonGreen font-heading text-xs hover:bg-neonGreen hover:text-darkGreen transition-colors">
                            <ExternalLink size={14} /> DEMO
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 border border-sageGreen py-2 text-sageGreen font-heading text-xs hover:border-neonGreen hover:text-neonGreen transition-colors">
                            <Info size={14} /> DETAILS
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {projLimit < projects.length && (
                  <button
                    onClick={() => setProjLimit((prev) => prev + 6)}
                    className="pixel-btn mt-12 w-64 uppercase"
                  >
                    VIEW MORE
                  </button>
                )}
              </div>
            )}

            {/* Certificate Grid */}
            {activeTab === "certificates" && (
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {certificates.slice(0, certLimit).map((cert, i) => (
                    <div
                      key={i}
                      className="group border border-sageGreen bg-darkGreen overflow-hidden hover:border-neonGreen transition-all duration-300"
                    >
                      <div className="border-b border-sageGreen group-hover:border-neonGreen overflow-hidden flex items-center justify-center bg-white/5">
                        <img
                          src={cert.img}
                          alt={cert.title}
                          className="w-full h-56 object-contain p-2 opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-sageGreen group-hover:text-neonGreen transition-colors text-lg mb-2">
                          {cert.title}
                        </h3>
                        <p className="font-body text-sageGreen mb-4">
                          {cert.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn mt-12 w-64 uppercase hover:!bg-transparent hover:!text-neonGreen text-center inline-block"
                >
                  VIEW MORE
                </a>
              </div>
            )}

            {/* Tech Stack Grid */}
            {activeTab === "stack" && (
              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl py-8">
                  {techStacks.map((tech, i) => (
                    <div
                      key={i}
                      className="animate-float flex items-center gap-3 border border-sageGreen bg-darkGreen px-6 py-4 shadow-[0_0_10px_rgba(57,255,20,0.1)] hover:border-neonGreen hover:shadow-neon hover:text-neonGreen text-sageGreen transition-all cursor-crosshair rounded-sm"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <i className={`${tech.icon} text-3xl`}></i>
                      <span className="font-body text-xl">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ACHIEVEMENTS MARQUEE */}
          <section
            id="achievements"
            className="py-20 mb-20 border-t border-neonGreen/20 overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-12">
              <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">
                &gt; ACHIEVEMENTS
              </h2>
              <div className="h-px bg-neonGreen/30 flex-grow"></div>
            </div>

            <div className="relative w-full overflow-hidden group">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...achievData, ...achievData].map((achiev, i) => (
                  <div
                    key={i}
                    className="inline-block w-80 flex-shrink-0 mx-4 group/card border border-sageGreen bg-darkGreen overflow-hidden hover:border-neonGreen transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="border-b border-sageGreen group-hover/card:border-neonGreen overflow-hidden">
                      <img
                        src={achiev.img}
                        alt={achiev.title}
                        className="w-full h-40 object-cover opacity-100 group-hover/card:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-6 whitespace-normal">
                      <h3 className="font-heading text-sageGreen group-hover/card:text-neonGreen transition-colors text-lg mb-2">
                        {achiev.title}
                      </h3>
                      <p className="font-body text-sageGreen text-sm mb-4 h-16 overflow-hidden line-clamp-3">
                        {achiev.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* EDUCATION TIMELINE */}
          <section
            id="education"
            className="py-20 border-t border-neonGreen/20"
          >
            <div className="flex items-center gap-4 mb-16">
              <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">
                &gt; EDUCATION
              </h2>
              <div className="h-px bg-neonGreen/30 flex-grow"></div>
            </div>

            <div className="relative container mx-auto px-6 flex flex-col space-y-8">
              <div className="absolute z-0 w-1 bg-neonGreen/50 shadow-neon h-full md:left-1/2 md:transform md:-translate-x-1/2 left-6 ml-[13px] md:ml-0"></div>
              {eduData.map((item, index) => (
                <TimelineItem key={"edu" + index} item={item} index={index} />
              ))}
            </div>
          </section>

          {/* WORK EXPERIENCE */}
          <section
            id="experience"
            className="py-20 mb-20 border-t border-neonGreen/20"
          >
            <div className="flex items-center gap-4 mb-16">
              <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">
                &gt; WORK EXPERIENCE
              </h2>
              <div className="h-px bg-neonGreen/30 flex-grow"></div>
            </div>

            <div className="relative container mx-auto px-6 flex flex-col space-y-8">
              <div className="absolute z-0 w-1 bg-neonGreen/50 shadow-neon h-full md:left-1/2 md:transform md:-translate-x-1/2 left-6 ml-[13px] md:ml-0"></div>
              {expData.map((item, index) => (
                <TimelineItem
                  key={"exp" + index}
                  item={item}
                  index={index + 1}
                /> /* Add 1 to offset start alignment */
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="py-20 border-t border-neonGreen/20">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">
                &gt; CONTACT
              </h2>
              <div className="h-px bg-neonGreen/30 flex-grow"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="border border-neonGreen p-8 bg-darkGreen shadow-neon relative">
                <div className="absolute -top-3 left-4 bg-darkGreen px-2 font-heading text-sm text-neonGreen">
                  TRANSMISSION_PROTOCOL
                </div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleContactSubmit}
                >
                  <div>
                    <label className="font-body text-sageGreen mb-2 block">
                      NAME_ID:
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-sageGreen focus:border-neonGreen focus:outline-none text-white py-2 font-body text-lg transition-colors"
                      placeholder="GUEST_USER"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sageGreen mb-2 block">
                      COMMLINK_URI:
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full bg-transparent border-b border-sageGreen focus:border-neonGreen focus:outline-none text-white py-2 font-body text-lg transition-colors"
                      placeholder="user@domain.com"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sageGreen mb-2 block">
                      DATA_PAYLOAD:
                    </label>
                    <textarea
                      rows="4"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="w-full bg-transparent border border-sageGreen focus:border-neonGreen focus:outline-none text-white p-3 font-body text-lg transition-colors mt-2"
                      placeholder="Enter message parameters here..."
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={contactStatus === "SENDING..."}
                      className="pixel-btn flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      <Send size={18} /> INITIATE_TRANSFER
                    </button>
                    {contactStatus && (
                      <span className="font-heading text-xs text-neonGreen animate-pulse">
                        {contactStatus}
                      </span>
                    )}
                  </div>
                </form>
              </div>

              {/* Socials & Comments */}
              <div className="flex flex-col gap-12">
                <div>
                  <h3 className="font-heading text-xl text-sageGreen mb-6">
                    NETWORK_NODES //
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      // Replaced TikTok and Youtube with Leetcode and GeeksforGeeks properly mapped
                      { name: "LinkedIn", icon: <Linkedin size={20} /> },
                      { name: "GitHub", icon: <Github size={20} /> },
                      { name: "Instagram", icon: <Instagram size={20} /> },
                      { name: "LeetCode", icon: <Code size={20} /> },
                      { name: "GeeksForGeeks", icon: <Brain size={20} /> },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="flex items-center gap-3 p-4 border border-sageGreen/30 hover:border-neonGreen hover:text-neonGreen text-sageGreen transition-all hover:bg-neonGreen/5 group"
                      >
                        <span className="group-hover:animate-pulse">
                          {social.icon}
                        </span>
                        <span className="font-body text-lg uppercase">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border border-neonGreen/30 p-6 bg-darkGreen">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-sageGreen/20">
                    <h3
                      className="font-heading text-sm text-neonGreen cursor-pointer select-none title-admin"
                      onDoubleClick={() => setIsAdmin(!isAdmin)}
                    >
                      PUBLIC_LOGS{" "}
                      {isAdmin && (
                        <span className="text-[10px] ml-2 animate-pulse">
                          [ADMIN_ACTIVE]
                        </span>
                      )}
                    </h3>
                    <span className="text-sageGreen text-xs font-body">
                      COUNT: {logs.length.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2">
                    <div className="border-l-2 border-neonGreen pl-4 py-3 bg-neonGreen/5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-heading text-sm text-neonGreen">
                          SYS_OP [ADMIN]
                        </span>
                      </div>
                      <p className="text-white font-body text-sm">
                        Welcome to my digital space. Feel free to leave a trace.
                      </p>
                    </div>
                    {logs
                      .filter((log) => isAdmin || !log.hidden)
                      .map((log) => (
                        <div
                          key={log.id}
                          className={`border-l-2 ${log.hidden ? "border-red-500/50 bg-red-500/5" : "border-sageGreen bg-sageGreen/5"} pl-4 py-3 animate-fade-in relative group`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`font-heading text-sm sm:text-base ${log.hidden ? "text-red-400 opacity-70" : "text-neonGreen"} uppercase break-all pr-4`}
                            >
                              {log.user}{" "}
                              {log.hidden && (
                                <span className="text-[10px] ml-1 tracking-widest">
                                  [HIDDEN]
                                </span>
                              )}
                            </span>
                            {log.timestamp && (
                              <span className="text-sageGreen text-sm font-sans tracking-wide whitespace-nowrap opacity-90">
                                {new Date(log.timestamp).toLocaleDateString()}{" "}
                                {new Date(log.timestamp).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </span>
                            )}
                          </div>
                          <p className="text-white font-body text-sm break-words">
                            {log.text}
                          </p>

                          <div className="flex justify-end gap-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {isAdmin && (
                              <button
                                onClick={() =>
                                  handleHideLog(log.id, log.hidden)
                                }
                                className="text-sageGreen hover:text-neonGreen text-[10px] font-heading transition-colors tracking-wider"
                              >
                                {log.hidden ? "[UNHIDE]" : "[HIDE]"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteLog(log.id)}
                              className="text-sageGreen hover:text-red-500 flex items-center gap-1 text-[10px] font-heading transition-colors tracking-wider"
                            >
                              [DELETE]
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <form
                    onSubmit={handleLogSubmit}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newLogName}
                        onChange={(e) => setNewLogName(e.target.value)}
                        placeholder="Your Name (Optional)"
                        className="w-1/3 bg-transparent border border-sageGreen focus:border-neonGreen focus:outline-none px-3 py-2 text-white font-body text-sm"
                      />
                      <input
                        type="text"
                        value={newLog}
                        onChange={(e) => setNewLog(e.target.value)}
                        placeholder="Add to log..."
                        className="flex-1 bg-transparent border border-sageGreen focus:border-neonGreen focus:outline-none px-3 py-2 text-white font-body text-sm"
                      />
                      <button
                        type="submit"
                        disabled={logStatus === "POSTING..."}
                        className="bg-neonGreen text-darkGreen px-4 font-heading text-xs hover:shadow-neon transition-shadow disabled:opacity-50"
                      >
                        POST
                      </button>
                    </div>
                    {logStatus && (
                      <span className="text-xs text-neonGreen font-heading animate-pulse">
                        {logStatus}
                      </span>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <div className="text-center py-4 border-t border-neonGreen/20 bg-darkGreen">
          <div className="inline-flex items-center gap-2 font-body text-sageGreen border border-sageGreen/50 px-4 py-2 rounded-sm shadow-neon">
            <span className="w-2 h-2 rounded-full bg-neonGreen animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-neonGreen absolute"></span>
            <span className="ml-2 font-heading text-xs uppercase tracking-wider">
              Live Viewers: <span className="text-neonGreen">{viewers}</span>
            </span>
          </div>
        </div>

        <footer className="border-t border-neonGreen bg-darkGreen py-6 text-center">
          <p className="font-body text-sageGreen text-lg">
            &copy; {new Date().getFullYear()} APURBA ROY. All routines mapped
            and executed properly.
          </p>
        </footer>
      </div>
    </>
  );
}
