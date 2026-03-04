import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, Twitter, Send, ExternalLink, Info, Code, GraduationCap, Briefcase, TerminalSquare, Brain } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const NavItem = ({ section, current, onClick }) => (
    <button
        onClick={() => onClick(section.id)}
        className={`px-4 py-2 font-heading text-xs tracking-widest transition-all ${current === section.id ? 'text-neonGreen text-shadow-neon border-b-2 border-neonGreen' : 'text-sageGreen hover:text-neonGreen'}`}
    >
        {section.label}
    </button>
);

const TimelineItem = ({ item, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });
        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={domRef}
            className={`relative w-full my-8 flex justify-between items-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 ' + (index % 2 === 0 ? '-translate-x-12' : 'translate-x-12')} md:flex-row flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="order-1 md:w-5/12 hidden md:block"></div>

            {/* Center timeline dot */}
            <div className="z-20 md:order-1 flex items-center shadow-neon bg-neonGreen w-4 h-4 rounded-full absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2">
            </div>

            {/* Card Content */}
            <div className={`order-1 border border-neonGreen shadow-neon bg-darkGreen/80 p-6 md:w-5/12 w-full ml-12 md:ml-0 rounded-md`}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-heading text-neonGreen text-sm md:text-base leading-relaxed">{item.degree || item.title}</h3>
                </div>
                <h4 className="text-sageGreen font-body text-xl mb-2">{item.school || item.company || 'Achievement'}</h4>
                <span className="inline-block bg-neonGreen/20 text-neonGreen px-2 py-1 text-xs font-body mb-4">{item.year}</span>
                <p className="text-sageGreen text-sm md:text-base font-body">{item.description}</p>
            </div>
        </div>
    );
};

const Intro = ({ onComplete }) => {
    const [text, setText] = useState('00000');
    const [mounted, setMounted] = useState(false);
    const final = 'APR_5';

    useEffect(() => {
        // Start fade in
        const mountTimer = setTimeout(() => setMounted(true), 100);

        let iteration = 0;
        let interval;
        // Delay binary effect slightly so the fade-in is visible first
        const startTimer = setTimeout(() => {
            interval = setInterval(() => {
                setText(prev =>
                    prev.split('').map((letter, index) => {
                        if (index < iteration) {
                            return final[index];
                        }
                        return Math.random() > 0.5 ? '1' : '0';
                    }).join('')
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
            className={`fixed inset-0 bg-darkGreen flex flex-col items-center justify-center crt z-[100] transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{
                backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.15) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
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

export default function App() {
    const [showIntro, setShowIntro] = useState(true);
    const [activeSection, setActiveSection] = useState('hero');
    const [activeTab, setActiveTab] = useState('projects');

    const [projLimit, setProjLimit] = useState(6);
    const [certLimit, setCertLimit] = useState(6);

    // Live Viewer setup
    const [viewers, setViewers] = useState(0);

    useEffect(() => {
        // Start randomly between 12 and 45 viewers
        setViewers(Math.floor(Math.random() * 33) + 12);

        const viewerInterval = setInterval(() => {
            setViewers(prev => {
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
        { id: 'hero', label: 'HOME' },
        { id: 'about', label: 'ABOUT' },
        { id: 'portfolio', label: 'PORTFOLIO' },
        { id: 'education', label: 'EDUCATION' },
        { id: 'achievements', label: 'ACHIEVEMENTS' },
        { id: 'contact', label: 'CONTACT' }
    ];

    // Scrollspy logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight / 3;
            for (let s of sections) {
                const element = document.getElementById(s.id);
                if (element && element.offsetTop <= scrollPos && (element.offsetTop + element.offsetHeight) > scrollPos) {
                    setActiveSection(s.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const eduData = [
        { school: "University of Technology", degree: "BSc in Computer Science", year: "2018 - 2022", description: "Focused on software engineering, algorithms, and web development." },
        { school: "Code Masters Academy", degree: "Full-Stack Web Development Bootcamp", year: "2023", description: "Intensive training in modern JS frameworks, Node.js, and scaling applications." },
        { school: "CyberSecurity Institute", degree: "Certified Ethical Hacker Badge", year: "2024", description: "Advanced training in network security, pen testing, and secure coding." }
    ];

    const achievData = [
        { title: "1st Place AI Hackathon", year: "2023", description: "Won the national AI development hackathon by building a fast NLP triage system." },
        { title: "Open Source Contributor", year: "2024", description: "Successfully merged 25+ pull requests in popular JS/Python frameworks." },
        { title: "Best Algorithm Design", year: "2022", description: "Awarded during the university coding cup for complex data structure optimization." }
    ];

    const techStacks = [
        { name: 'Java', icon: 'devicon-java-plain' },
        { name: 'C', icon: 'devicon-c-plain' },
        { name: 'Python', icon: 'devicon-python-plain' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain' },
        { name: 'React', icon: 'devicon-react-original' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain' },
        { name: 'Next.js', icon: 'devicon-nextjs-plain' },
        { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original' },
        { name: 'Django', icon: 'devicon-django-plain' },
        { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
        { name: 'MySQL', icon: 'devicon-mysql-plain' },
        { name: 'Firebase', icon: 'devicon-firebase-plain' },
        { name: 'Docker', icon: 'devicon-docker-plain' },
        { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
        { name: 'Git', icon: 'devicon-git-plain' },
        { name: 'GitHub', icon: 'devicon-github-original' },
        { name: 'GCP', icon: 'devicon-googlecloud-plain' },
        { name: 'TensorFlow', icon: 'devicon-tensorflow-original' },
        { name: 'Numpy', icon: 'devicon-numpy-plain' }
    ];

    const projects = [
        { title: "RetroArcade", desc: "A browser-based retro 8-bit game engine.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=RetroArcade" },
        { title: "NeoChat", desc: "Real-time terminal style encrypted chat app.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=NeoChat" },
        { title: "GreenWallet", desc: "Crypto portfolio dashboard with vintage vibes.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=GreenWallet" },
        { title: "AI Image Gen", desc: "Deep learning based image synthesis API interface.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=AI+Gen" },
        { title: "Task CLI", desc: "Command line interface for managing daily tasks remotely.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=CLI" },
        { title: "Pixel Portfolio", desc: "My own retro personal site builder styling framework.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Pixel+Port" },
        { title: "AutoDeploy", desc: "CI/CD serverless auto deployment cloud script.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Deploy" },
        { title: "DataMiner", desc: "Data processing ETL pipeline utilizing NLP models.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=DataMiner" }
    ];

    const certificates = [
        { title: "AWS Solutions Architect", desc: "Professional tier cloud certification.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=AWS" },
        { title: "Google Cloud Engineer", desc: "Associate tier data engineering certificate.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=GCP" },
        { title: "DeepLearning.AI", desc: "Specialization in cutting edge sequence models.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=DeepLearning" },
        { title: "CS50x Harvard", desc: "Elite Introduction to Computer Science modules.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=CS50" },
        { title: "Meta Front-End", desc: "Professional full frontend qualification.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Meta" },
        { title: "Kaggle Master CV", desc: "Top 5% competitor locally in computer vision.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Kaggle" },
        { title: "Docker Certified", desc: "Orchestration & container ecosystem mastery.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=Docker" }
    ];

    return (
        <>
            {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
            <div className={`min-h-screen crt relative transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
                {/* Header/Nav */}
                <header className="fixed top-0 w-full z-50 bg-darkGreen/90 backdrop-blur-sm border-b border-neonGreen/30 shadow-md">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="font-heading text-neonGreen text-xl text-shadow-neon">&lt;APR_5/&gt;</div>
                        <nav className="hidden md:flex gap-4">
                            {sections.map(s => (
                                <NavItem key={s.id} section={s} current={activeSection} onClick={scrollToSection} />
                            ))}
                        </nav>
                    </div>
                </header>

                <main className="pt-24 pb-12 max-w-6xl mx-auto px-6 overflow-hidden">
                    {/* HERO SECTION */}
                    <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-start mb-20 relative">
                        <p className="text-neonGreen font-body text-xl md:text-2xl mb-4 h-[32px]">
                            {/* Live typing subline */}
                            <Typewriter
                                words={['> Initialize user session...']}
                                cursor
                                typeSpeed={60}
                            />
                        </p>
                        <h1 className="font-heading text-4xl md:text-6xl text-white mb-6 leading-tight min-h-[144px] md:min-h-[160px]">
                            Hi, I'm <br />
                            <span className="text-neonGreen text-shadow-neon">
                                {/* Typewriter for Name */}
                                <Typewriter
                                    words={['Apurba Roy']}
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
                                words={['Computer Science Engineer', 'Fullstack Developer', 'AI ML Enthusiast']}
                                loop
                                cursor
                                cursorStyle='_'
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </h2>

                        <div className="flex flex-col gap-4 mb-16 w-full max-w-md">
                            <div className="flex gap-4 w-full">
                                <button onClick={() => scrollToSection('portfolio')} className="pixel-btn flex-1 text-center">
                                    VIEW PROJECTS_
                                </button>
                                <button onClick={() => scrollToSection('contact')} className="pixel-btn !bg-transparent !text-sageGreen !border-sageGreen hover:!border-neonGreen hover:!text-neonGreen flex-1 text-center">
                                    CONTACT ME_
                                </button>
                            </div>
                            {/* Download CV newly added button */}
                            <a href="#" download className="pixel-btn !bg-neonGreen/10 w-full text-center hover:bg-neonGreen hover:text-darkGreen transition-all">
                                DOWNLOAD MY CV_
                            </a>
                        </div>

                        <div className="flex gap-6 mt-auto border-t border-sageGreen/20 pt-6 w-full max-w-md">
                            <a href="#" title="GitHub" className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"><Github size={24} /></a>
                            <a href="#" title="LinkedIn" className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"><Linkedin size={24} /></a>
                            <a href="#" title="Twitter" className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"><Twitter size={24} /></a>
                        </div>
                    </section>

                    {/* ABOUT ME */}
                    <section id="about" className="py-20 mb-20 border-t border-neonGreen/20">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">&gt; ABOUT_ME</h2>
                            <div className="h-px bg-neonGreen/30 flex-grow"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-sageGreen font-body text-lg md:text-xl leading-relaxed mb-6">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                                </p>
                                <p className="text-sageGreen font-body text-lg md:text-xl leading-relaxed mb-8">
                                    Phasellus pellentesque, neque dignissim convallis pellentesque, enim justo dictum risus, eget congue lacus enim auctor quam.
                                </p>
                                <blockquote className="border-l-4 border-neonGreen pl-4 py-2 bg-neonGreen/5">
                                    <p className="font-heading text-sm text-neonGreen/80">"Code is poetry written for machines to parse, and humans to admire."</p>
                                </blockquote>
                            </div>

                            <div className="relative mx-auto group">
                                <div className="absolute inset-0 border-2 border-neonGreen translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                                <img src="https://via.placeholder.com/400x400/0a1a0f/39ff14?text=PROFILE_IMG" alt="Profile" className="relative z-10 block grayscale hover:grayscale-0 transition-all duration-500 w-full max-w-sm border border-neonGreen" />
                            </div>
                        </div>
                    </section>

                    {/* PORTFOLIO SHOWCASE */}
                    <section id="portfolio" className="py-20 mb-20 border-t border-neonGreen/20">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">&gt; PORTFOLIO</h2>
                            <div className="h-px bg-neonGreen/30 flex-grow"></div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {[
                                { label: 'Total Projects', value: projects.length.toString(), icon: <Briefcase className="text-neonGreen mb-2" size={32} /> },
                                { label: 'Certificates', value: certificates.length.toString(), icon: <GraduationCap className="text-neonGreen mb-2" size={32} /> },
                                { label: 'Years Exp', value: '05', icon: <Code className="text-neonGreen mb-2" size={32} /> }
                            ].map((stat, i) => (
                                <div key={i} className="border border-neonGreen p-6 bg-darkGreen shadow-neon flex flex-col items-center justify-center hover:bg-neonGreen/10 transition-colors">
                                    {stat.icon}
                                    <div className="font-heading text-3xl text-white mb-2">{stat.value}</div>
                                    <div className="font-body text-sageGreen text-xl uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tabbed Navigation */}
                        <div className="flex justify-center flex-wrap gap-4 mb-12 border-b border-sageGreen/30 pb-4">
                            {['projects', 'certificates', 'stack'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`font-heading text-sm px-6 py-2 transition-colors ${activeTab === tab ? 'bg-neonGreen text-darkGreen shadow-neon' : 'text-sageGreen hover:text-neonGreen'}`}
                                >
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Project Grid */}
                        {activeTab === 'projects' && (
                            <div className="flex flex-col items-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                    {projects.slice(0, projLimit).map((proj, i) => (
                                        <div key={i} className="group border border-neonGreen bg-darkGreen overflow-hidden hover:shadow-neon-strong transition-all duration-300 transform hover:-translate-y-2">
                                            <div className="border-b border-neonGreen overflow-hidden">
                                                <img src={proj.img} alt={proj.title} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-heading text-neonGreen text-xl mb-3">{proj.title}</h3>
                                                <p className="font-body text-sageGreen mb-6 h-12">{proj.desc}</p>
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
                                        onClick={() => setProjLimit(prev => prev + 6)}
                                        className="pixel-btn mt-12 w-64 uppercase"
                                    >
                                        VIEW MORE
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Certificate Grid */}
                        {activeTab === 'certificates' && (
                            <div className="flex flex-col items-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                                    {certificates.slice(0, certLimit).map((cert, i) => (
                                        <div key={i} className="group border border-sageGreen bg-darkGreen overflow-hidden hover:border-neonGreen transition-all duration-300">
                                            <div className="border-b border-sageGreen group-hover:border-neonGreen overflow-hidden">
                                                <img src={cert.img} alt={cert.title} className="w-full h-48 object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-heading text-sageGreen group-hover:text-neonGreen transition-colors text-lg mb-2">{cert.title}</h3>
                                                <p className="font-body text-sageGreen mb-4">{cert.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {certLimit < certificates.length && (
                                    <button
                                        onClick={() => setCertLimit(prev => prev + 3)}
                                        className="pixel-btn mt-12 w-64 uppercase hover:!bg-transparent hover:!text-neonGreen"
                                    >
                                        VIEW MORE
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Tech Stack Grid */}
                        {activeTab === 'stack' && (
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

                    {/* EDUCATION TIMELINE */}
                    <section id="education" className="py-20 border-t border-neonGreen/20">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">&gt; EDUCATION</h2>
                            <div className="h-px bg-neonGreen/30 flex-grow"></div>
                        </div>

                        <div className="relative container mx-auto px-6 flex flex-col space-y-8">
                            <div className="absolute z-0 w-1 bg-neonGreen/50 shadow-neon h-full md:left-1/2 md:transform md:-translate-x-1/2 left-6 ml-[13px] md:ml-0"></div>
                            {eduData.map((item, index) => (
                                <TimelineItem key={'edu' + index} item={item} index={index} />
                            ))}
                        </div>
                    </section>

                    {/* ACHIEVEMENTS */}
                    <section id="achievements" className="py-20 mb-20 border-t border-neonGreen/20">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">&gt; ACHIEVEMENTS</h2>
                            <div className="h-px bg-neonGreen/30 flex-grow"></div>
                        </div>

                        <div className="relative container mx-auto px-6 flex flex-col space-y-8">
                            <div className="absolute z-0 w-1 bg-neonGreen/50 shadow-neon h-full md:left-1/2 md:transform md:-translate-x-1/2 left-6 ml-[13px] md:ml-0"></div>
                            {achievData.map((item, index) => (
                                <TimelineItem key={'ach' + index} item={item} index={index + 1} /> /* Add 1 to offset start alignment */
                            ))}
                        </div>
                    </section>

                    {/* CONTACT SECTION */}
                    <section id="contact" className="py-20 border-t border-neonGreen/20">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">&gt; CONTACT</h2>
                            <div className="h-px bg-neonGreen/30 flex-grow"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div className="border border-neonGreen p-8 bg-darkGreen shadow-neon relative">
                                <div className="absolute -top-3 left-4 bg-darkGreen px-2 font-heading text-sm text-neonGreen">TRANSMISSION_PROTOCOL</div>
                                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="font-body text-sageGreen mb-2 block">NAME_ID:</label>
                                        <input type="text" className="w-full bg-transparent border-b border-sageGreen focus:border-neonGreen focus:outline-none text-white py-2 font-body text-lg transition-colors" placeholder="GUEST_USER" />
                                    </div>
                                    <div>
                                        <label className="font-body text-sageGreen mb-2 block">COMMLINK_URI:</label>
                                        <input type="email" className="w-full bg-transparent border-b border-sageGreen focus:border-neonGreen focus:outline-none text-white py-2 font-body text-lg transition-colors" placeholder="user@domain.com" />
                                    </div>
                                    <div>
                                        <label className="font-body text-sageGreen mb-2 block">DATA_PAYLOAD:</label>
                                        <textarea rows="4" className="w-full bg-transparent border border-sageGreen focus:border-neonGreen focus:outline-none text-white p-3 font-body text-lg transition-colors mt-2" placeholder="Enter message parameters here..."></textarea>
                                    </div>
                                    <button type="submit" className="pixel-btn flex items-center justify-center gap-3 mt-4">
                                        <Send size={18} /> INITIATE_TRANSFER
                                    </button>
                                </form>
                            </div>

                            {/* Socials & Comments */}
                            <div className="flex flex-col gap-12">
                                <div>
                                    <h3 className="font-heading text-xl text-sageGreen mb-6">NETWORK_NODES //</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            // Replaced TikTok and Youtube with Leetcode and GeeksforGeeks properly mapped
                                            { name: "LinkedIn", icon: <Linkedin size={20} /> },
                                            { name: "GitHub", icon: <Github size={20} /> },
                                            { name: "Instagram", icon: <Instagram size={20} /> },
                                            { name: "LeetCode", icon: <Code size={20} /> },
                                            { name: "GeeksForGeeks", icon: <Brain size={20} /> }
                                        ].map(social => (
                                            <a key={social.name} href="#" className="flex items-center gap-3 p-4 border border-sageGreen/30 hover:border-neonGreen hover:text-neonGreen text-sageGreen transition-all hover:bg-neonGreen/5 group">
                                                <span className="group-hover:animate-pulse">{social.icon}</span>
                                                <span className="font-body text-lg uppercase">{social.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="border border-neonGreen/30 p-6 bg-darkGreen">
                                    <div className="flex justify-between items-center mb-6 pb-2 border-b border-sageGreen/20">
                                        <h3 className="font-heading text-sm text-neonGreen">PUBLIC_LOGS</h3>
                                        <span className="text-sageGreen text-xs font-body">COUNT: 01</span>
                                    </div>

                                    <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2">
                                        <div className="border-l-2 border-neonGreen pl-4 py-2 bg-neonGreen/5">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-heading text-xs text-neonGreen">[ADMIN]</span>
                                                <span className="text-sageGreen text-xs font-body">SYS_OP</span>
                                            </div>
                                            <p className="text-white font-body text-sm">Welcome to my digital space. Feel free to leave a trace.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Add to log..." className="flex-1 bg-transparent border border-sageGreen focus:border-neonGreen focus:outline-none px-3 py-2 text-white font-body text-sm" />
                                        <button className="bg-neonGreen text-darkGreen px-4 font-heading text-xs hover:shadow-neon transition-shadow">POST</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <div className="text-center py-4 border-t border-neonGreen/20 bg-darkGreen">
                    <div className="inline-flex items-center gap-2 font-body text-sageGreen border border-sageGreen/50 px-4 py-2 rounded-sm shadow-neon">
                        <span className="w-2 h-2 rounded-full bg-neonGreen animate-ping"></span>
                        <span className="w-2 h-2 rounded-full bg-neonGreen absolute"></span>
                        <span className="ml-2 font-heading text-xs uppercase tracking-wider">Live Viewers: <span className="text-neonGreen">{viewers}</span></span>
                    </div>
                </div>

                <footer className="border-t border-neonGreen bg-darkGreen py-6 text-center">
                    <p className="font-body text-sageGreen text-lg">
                        &copy; {new Date().getFullYear()} APURBA ROY. All routines mapped and executed properly.
                    </p>
                </footer>
            </div>
        </>
    );
}
