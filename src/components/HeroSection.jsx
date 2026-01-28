import React from 'react'
import { Link } from 'react-router-dom'

// Much larger set of unique professions (global, diverse)
const professions = Array.from(new Set([
    'Software Engineer', 'Product Designer', 'Doctor', 'Content Creator', 'Data Scientist', 'CA Professional',
    'Mechanical Engineer', 'Investment Banker', 'Civil Services', 'Startup Founder', 'Lawyer', 'UX Designer',
    'Architect', 'Pilot', 'Journalist', 'Cyber Security', 'Film Director', 'Chartered Analyst',
    'Technology', 'Finance', 'Healthcare', 'Design', 'Marketing', 'Consulting', 'Education', 'Startups',
    'Product Manager', 'UX Designer', 'Startup Founder', 'Civil Services', 'Content Creator',
    // Global professions
    'Accountant', 'Actor', 'Actuary', 'Advertising Manager', 'Aerospace Engineer', 'Agricultural Scientist',
    'Air Traffic Controller', 'Animator', 'Anthropologist', 'Archaeologist', 'Architect', 'Archivist',
    'Art Director', 'Artist', 'Astronomer', 'Athlete', 'Attorney', 'Auditor', 'Author', 'Baker', 'Banker',
    'Barber', 'Bartender', 'Biochemist', 'Biologist', 'Biomedical Engineer', 'Bricklayer', 'Broker',
    'Business Analyst', 'Carpenter', 'Cartographer', 'Chef', 'Chemical Engineer', 'Chemist',
    'Chiropractor', 'Coach', 'Composer', 'Computer Programmer', 'Construction Manager', 'Consultant',
    'Copywriter', 'Counselor', 'Court Reporter', 'Curator', 'Dancer', 'Data Analyst', 'Dentist',
    'Detective', 'Dietitian', 'Director', 'Dispatcher', 'DJ', 'Economist', 'Editor', 'Electrician',
    'EMT', 'Engineer', 'Event Planner', 'Farmer', 'Fashion Designer', 'Film Editor', 'Firefighter',
    'Flight Attendant', 'Florist', 'Geologist', 'Graphic Designer', 'Hairdresser', 'Historian',
    'Hotel Manager', 'Human Resources', 'Illustrator', 'Industrial Designer', 'Insurance Agent',
    'Interpreter', 'IT Specialist', 'Janitor', 'Jeweler', 'Judge', 'Lab Technician', 'Librarian',
    'Logistician', 'Machine Operator', 'Magistrate', 'Makeup Artist', 'Management Consultant',
    'Marine Biologist', 'Marketing Manager', 'Mathematician', 'Mechanic', 'Medical Assistant',
    'Meteorologist', 'Microbiologist', 'Midwife', 'Model', 'Musician', 'Network Engineer',
    'Nurse', 'Nutritionist', 'Occupational Therapist', 'Optometrist', 'Painter', 'Paramedic',
    'Park Ranger', 'Pathologist', 'Personal Trainer', 'Pharmacist', 'Philosopher', 'Photographer',
    'Physical Therapist', 'Physician', 'Physicist', 'Pilot', 'Plumber', 'Police Officer',
    'Politician', 'PR Specialist', 'Professor', 'Project Manager', 'Psychiatrist', 'Psychologist',
    'Public Defender', 'Publisher', 'Radiologist', 'Real Estate Agent', 'Receptionist', 'Reporter',
    'Researcher', 'Retail Manager', 'Sailor', 'Sales Manager', 'Scientist', 'Screenwriter',
    'Secretary', 'Security Guard', 'Social Worker', 'Software Developer', 'Statistician',
    'Stockbroker', 'Surgeon', 'Surveyor', 'Teacher', 'Technical Writer', 'Therapist',
    'Translator', 'Travel Agent', 'Urban Planner', 'Veterinarian', 'Video Editor', 'Waiter',
    'Web Developer', 'Welder', 'Writer', 'Zoologist',
    // Add more as needed for realism
]));

console.log('Professions List:', professions);


// Helper to create a slug for links
const toSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');


// Alphabetical sort helpers
const professionsAZ = [...professions].sort((a, b) => a.localeCompare(b));
const professionsZA = [...professions].sort((a, b) => b.localeCompare(a));


// Trust Indicators Component
const TrustIndicators = () => {
    const indicators = [
        { icon: '+', text: 'Verified Journeys', color: '#10b981' },
        { icon: '*', text: '100% Anonymous', color: '#3b82f6' },
        { icon: '#', text: '4.9/5 Rating', color: '#f59e0b' },
    ]

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-6">
            {indicators.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                    style={{
                        background: `${item.color}08`,
                        border: `1px solid ${item.color}20`,
                        color: item.color
                    }}
                >
                    <span className="font-bold">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                </div>
            ))}
        </div>
    )
}

const HeroSection = () => {
    // Alphabetically sorted for left (A-Z) and right (Z-A)
    const leftProfessions = Array(10).fill(professionsAZ).flat();
    const rightProfessions = Array(10).fill(professionsZA).flat();
    const exploreBtnRef = React.useRef(null);
    const [btnOffset, setBtnOffset] = React.useState({ x: 0, y: 0 });

    // Magnetic effect
    React.useEffect(() => {
        const btn = exploreBtnRef.current;
        if (!btn) return;
        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            setBtnOffset({ x: x * 0.18, y: y * 0.18 });
        };
        const handleMouseLeave = () => setBtnOffset({ x: 0, y: 0 });
        btn.addEventListener('mousemove', handleMouseMove);
        btn.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            btn.removeEventListener('mousemove', handleMouseMove);
            btn.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 lg:pt-24"
            style={{
                background: 'radial-gradient(ellipse 100% 80% at 50% 20%, #1a1612 0%, #0a0a0a 50%, #08080a 100%)'
            }}
        >
            {/* ...existing code... */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    ref={exploreBtnRef}
                    className="magnetic-btn group px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
                    style={{
                        background: 'linear-gradient(135deg, #C4A052 0%, #9A7B3D 100%)',
                        boxShadow: '0 4px 10px rgba(196,160,82,0.12)',
                        color: '#0a0a0c',
                        transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`
                    }}
                    onClick={() => document.getElementById('journeys-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="flex items-center gap-2 relative z-10">
                        Explore Real Journeys
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                    <div className="shimmer" />
                </button>
                <button
                    className="px-6 sm:px-8 py-3.5 rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-all hover:bg-white/5"
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.55)',
                    }}
                >
                    Share Your Journey Anonymously
                </button>
            </div>
            <div className="relative z-10 flex flex-row items-center justify-center w-full max-w-[1400px] mx-auto" style={{ gap: '48px', minHeight: '420px' }}>
                {/* Center Content - Minimal: Only Logo, Tagline */}
                <div className="flex flex-col items-center justify-center px-8 w-full">
                    <h1
                        className="font-black text-center leading-[0.95] tracking-[-0.02em] select-none"
                        style={{ fontSize: 'clamp(3.2rem, 11vw, 8rem)' }}
                    >
                        <span className="block uppercase" style={{
                            background: 'linear-gradient(140deg, #f5e6c8 0%, #c4a052 45%, #8b6914 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 2px 10px rgba(196,160,82,0.08))',
                        }}>CONNECTING</span>
                        <span className="block uppercase" style={{
                            background: 'linear-gradient(140deg, #8b6914 0%, #c4a052 55%, #f5e6c8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 2px 10px rgba(196,160,82,0.06))',
                        }}>ENDS</span>
                    </h1>
                    <p className="text-center mt-4 max-w-lg mx-auto" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                        Explore real, anonymous career paths. See how lives actually unfold—mistakes, pivots, and all.
                    </p>
                    <p className="text-center mt-1 max-w-lg mx-auto" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                        For students, explorers, and anyone curious about the truth behind careers.
                    </p>
                </div>
            </div>



            <div className="relative z-10 mt-4 sm:mt-6 flex flex-col items-center px-4 w-full max-w-2xl">
                <p className="text-center max-w-md mb-5" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                    Shared anonymously by professionals. Verified where possible.<br />
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>The struggles, pivots, and breakthroughs - no sugar-coating.</span>
                </p>


                {/* Stats Row */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 mb-6">
                    {[
                        { value: '10,000+', label: 'Verified journeys', primary: true },
                        { value: '3L-80L', label: 'CTC range documented' },
                        { value: '50+', label: 'Career paths' },
                        { value: '~95%', label: 'Found clarity' },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="text-center px-4 sm:px-5 py-2 sm:py-3 rounded-xl"
                            style={{
                                background: s.primary ? 'rgba(196,160,82,0.08)' : 'rgba(12,12,15,0.8)',
                                border: `1px solid ${s.primary ? 'rgba(196,160,82,0.2)' : 'rgba(196,160,82,0.08)'}`
                            }}
                        >
                            <div
                                className="font-bold"
                                style={{
                                    fontSize: s.primary ? 'clamp(1.1rem, 2.5vw, 1.5rem)' : 'clamp(0.9rem, 2vw, 1.2rem)',
                                    background: 'linear-gradient(135deg, #C4A052, #E8C872)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >{s.value}</div>
                            <div className="text-[8px] sm:text-[9px] font-medium tracking-wide mt-1 max-w-[100px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        className="group px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
                        style={{
                            background: 'linear-gradient(135deg, #C4A052 0%, #9A7B3D 100%)',
                            boxShadow: '0 4px 10px rgba(196,160,82,0.12)',
                            color: '#0a0a0c',
                        }}
                        onClick={() => document.getElementById('journeys-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="flex items-center gap-2">
                            Explore Real Journeys
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                    <button
                        className="px-6 sm:px-8 py-3.5 rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-all hover:bg-white/5"
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.55)',
                        }}
                    >
                        Share Your Journey Anonymously
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
                <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: '1px solid rgba(196,160,82,0.2)' }}>
                    <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: '#C4A052', animationDuration: '1.8s' }} />
                </div>
                <span className="text-[7px] mt-1.5 tracking-widest uppercase" style={{ color: 'rgba(196,160,82,0.35)' }}>Scroll</span>
            </div>
        </section>
    )
}

export default HeroSection