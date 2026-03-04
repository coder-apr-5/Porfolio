import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, Youtube, Twitter, Send, ExternalLink, Info, Code, MapPin, Mail, AlignLeft, GraduationCap, Briefcase } from 'lucide-react';

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
                    <h3 className="font-heading text-neonGreen text-sm md:text-base leading-relaxed">{item.degree}</h3>
                </div>
                <h4 className="text-sageGreen font-body text-xl mb-2">{item.school}</h4>
                <span className="inline-block bg-neonGreen/20 text-neonGreen px-2 py-1 text-xs font-body mb-4">{item.year}</span>
                <p className="text-sageGreen text-sm md:text-base font-body">{item.description}</p>
            </div>
        </div>
    );
};

export default function App() {
    const [activeSection, setActiveSection] = useState('hero');
    const [activeTab, setActiveTab] = useState('projects');

    const sections = [
        { id: 'hero', label: 'HOME' },
        { id: 'about', label: 'ABOUT' },
        { id: 'portfolio', label: 'PORTFOLIO' },
        { id: 'education', label: 'EDUCATION' },
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

    const projects = [
        { title: "RetroArcade", desc: "A browser-based retro 8-bit game engine.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=RetroArcade" },
        { title: "NeoChat", desc: "Real-time terminal style encrypted chat app.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=NeoChat" },
        { title: "GreenWallet", desc: "Crypto portfolio dashboard with vintage vibes.", img: "https://via.placeholder.com/400x250/0a1a0f/39ff14?text=GreenWallet" }
    ];

    return (
        <div className="min-h-screen crt relative">
            {/* Header/Nav */}
            <header className="fixed top-0 w-full z-50 bg-darkGreen/90 backdrop-blur-sm border-b border-neonGreen/30 shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="font-heading text-neonGreen text-xl text-shadow-neon">&lt;EK/&gt;</div>
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
                    <p className="text-neonGreen font-body text-xl md:text-2xl mb-4 typing-effect">&gt; Initialize user session...</p>
                    <h1 className="font-heading text-4xl md:text-6xl text-white mb-6 leading-tight">
                        Hi, I'm <br /><span className="text-neonGreen text-shadow-neon">Arnab</span>.
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-sageGreen font-body mb-6">Frontend Developer & Retro Enthusiast</h2>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {['React', 'JavaScript', 'Node.js', 'Tailwind CSS'].map(tech => (
                            <span key={tech} className="border border-sageGreen text-sageGreen px-3 py-1 font-body text-sm rounded bg-darkGreen">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 mb-12">
                        <button onClick={() => scrollToSection('portfolio')} className="pixel-btn">
                            VIEW PROJECTS_
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="pixel-btn !bg-transparent !text-sageGreen !border-sageGreen hover:!border-neonGreen hover:!text-neonGreen">
                            CONTACT ME_
                        </button>
                    </div>

                    <div className="flex gap-6 mt-auto">
                        <a href="#" className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"><Github size={24} /></a>
                        <a href="#" className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"><Linkedin size={24} /></a>
                        <a href="#" className="text-sageGreen hover:text-neonGreen hover:shadow-neon transition-colors"><Twitter size={24} /></a>
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
                            { label: 'Total Projects', value: '42', icon: <Briefcase className="text-neonGreen mb-2" size={32} /> },
                            { label: 'Certificates', value: '15', icon: <GraduationCap className="text-neonGreen mb-2" size={32} /> },
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((proj, i) => (
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
                    )}

                    {activeTab === 'certificates' && (
                        <div className="p-12 border border-neonGreen text-center bg-darkGreen/50">
                            <p className="font-body text-2xl text-sageGreen">Loading certificates module...</p>
                        </div>
                    )}

                    {activeTab === 'stack' && (
                        <div className="p-12 border border-neonGreen text-center bg-darkGreen/50">
                            <p className="font-body text-2xl text-sageGreen">Compiling tech stack data...</p>
                        </div>
                    )}
                </section>

                {/* EDUCATION TIMELINE */}
                <section id="education" className="py-20 mb-20 border-t border-neonGreen/20">
                    <div className="flex items-center gap-4 mb-16">
                        <h2 className="font-heading text-3xl text-neonGreen text-shadow-neon">&gt; EDUCATION</h2>
                        <div className="h-px bg-neonGreen/30 flex-grow"></div>
                    </div>

                    <div className="relative container mx-auto px-6 flex flex-col space-y-8">
                        {/* Center Line for Desktop / Left Line for Mobile */}
                        <div className="absolute z-0 w-1 bg-neonGreen/50 shadow-neon h-full md:left-1/2 md:transform md:-translate-x-1/2 left-6 ml-[13px] md:ml-0"></div>

                        {eduData.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} />
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
                                        { name: "LinkedIn", icon: <Linkedin size={20} /> },
                                        { name: "GitHub", icon: <Github size={20} /> },
                                        { name: "Instagram", icon: <Instagram size={20} /> },
                                        { name: "YouTube", icon: <Youtube size={20} /> },
                                        { name: "TikTok", icon: <Code size={20} /> }
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

            <footer className="border-t border-neonGreen bg-darkGreen py-6 text-center">
                <p className="font-body text-sageGreen text-lg">
                    &copy; {new Date().getFullYear()} ARNAB_DEV. All routines mapped and executed properly.
                </p>
            </footer>
        </div>
    );
}
