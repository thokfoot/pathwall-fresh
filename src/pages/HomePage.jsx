import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ThreadsVisualizer from '../components/ThreadsVisualizer'
import IndustryCategories from '../components/IndustryCategories'
import JourneyCard from '../components/JourneyCard'
import Footer from '../components/Footer'

// Scroll Animation Hook
const useScrollAnimation = () => {
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up')
                        entry.target.style.opacity = '1'
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        const elements = ref.current?.querySelectorAll('.scroll-animate')
        elements?.forEach((el) => {
            el.style.opacity = '0'
            observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return ref
}

// Tooltip Component
const Tooltip = ({ children, text }) => {
    const [show, setShow] = useState(false)
    return (
        <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-[#1a1a1d] border border-white/10 text-xs text-white/70 whitespace-nowrap z-50">
                    {text}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1d]" />
                </div>
            )}
        </div>
    )
}

// Sample journey data
const sampleJourneys = [
    {
        id: 1,
        title: 'Software Engineer',
        name: 'Rahul S.',
        company: 'Google',
        stream: 'PCM to B.Tech CSE',
        salary: '45 LPA',
        salaryGrowth: '+380%',
        experience: '8 years',
        difficulty: 'Challenging',
        description: 'Started with 11th PCM, failed JEE twice, joined tier-2 college, self-taught DSA, cracked FAANG after 3 years.',
        milestones: ['11th PCM', 'B.Tech', 'Startup', 'Amazon', 'Google'],
        rating: 4.8,
        helpful: 234,
        verified: true,
        color: '#C4A052'
    },
    {
        id: 2,
        title: 'Product Manager',
        name: 'Priya S.',
        company: 'Microsoft',
        stream: 'Arts to MBA',
        salary: '35 LPA',
        salaryGrowth: '+420%',
        experience: '6 years',
        difficulty: 'Moderate',
        description: 'Humanities background, worked in content, transitioned to PM via MBA. Non-linear but worth it.',
        milestones: ['11th Arts', 'BA English', 'Content', 'MBA', 'Microsoft'],
        rating: 4.9,
        helpful: 189,
        verified: true,
        color: '#A8D5BA'
    },
    {
        id: 3,
        title: 'Data Scientist',
        name: 'Amit P.',
        company: 'Amazon',
        stream: 'PCM to B.Sc to MS',
        salary: '42 LPA',
        salaryGrowth: '+350%',
        experience: '7 years',
        difficulty: 'Expert',
        description: 'Statistics background, learned Python during lockdown, MS from US, returned to India for Amazon.',
        milestones: ['11th PCM', 'B.Sc Stats', 'MS USA', 'Research', 'Amazon'],
        rating: 4.7,
        helpful: 156,
        verified: true,
        color: '#7EB8DA'
    },
    {
        id: 4,
        title: 'UX Designer',
        name: 'Sneha G.',
        company: 'Swiggy',
        stream: 'Commerce to Design',
        salary: '28 LPA',
        salaryGrowth: '+460%',
        experience: '5 years',
        difficulty: 'Moderate',
        description: 'Commerce student who discovered design through freelancing. Self-taught Figma, built portfolio, landed dream job.',
        milestones: ['11th Commerce', 'B.Com', 'Freelance', 'Bootcamp', 'Swiggy'],
        rating: 4.9,
        helpful: 312,
        verified: true,
        color: '#D4A5FF'
    },
    {
        id: 5,
        title: 'Investment Banker',
        name: 'Vikram M.',
        company: 'Goldman Sachs',
        stream: 'PCM to Finance',
        salary: '55 LPA',
        salaryGrowth: '+520%',
        experience: '6 years',
        difficulty: 'Expert',
        description: 'Engineering dropout who pivoted to finance. CFA, MBA from IIM, now VP at Goldman Sachs.',
        milestones: ['11th PCM', 'B.Tech Drop', 'CFA', 'IIM', 'Goldman'],
        rating: 4.6,
        helpful: 198,
        verified: true,
        color: '#10b981'
    },
    {
        id: 6,
        title: 'Startup Founder',
        name: 'Arjun R.',
        company: 'TechFlow (Acquired)',
        stream: 'Engineering to Founder',
        salary: '80 LPA (Exit)',
        salaryGrowth: '+900%',
        experience: '7 years',
        difficulty: 'Expert',
        description: 'Left cushy job at 28, failed twice, third startup got acquired. Raw journey with all failures documented.',
        milestones: ['B.Tech', 'TCS', 'Failed 1', 'Failed 2', 'Exit'],
        rating: 5.0,
        helpful: 567,
        verified: true,
        color: '#FFB366'
    }
]

const HomePage = () => {
    const scrollRef = useScrollAnimation()

    return (
        <div ref={scrollRef} className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <HeroSection />

            {/* Career Journeys Visualization Section */}
            <section id="journeys-section" className="py-24 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0e] to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 scroll-animate">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 mb-4">
                            Real Career Journeys
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Browse Real <span className="text-gradient">Journeys</span>
                        </h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-base mb-4">
                            Unfiltered career stories from people who took different routes.<br />
                            <span className="text-white/35">Each line = one person. Dots = life milestones.</span>
                        </p>
                        
                        {/* Legend */}
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-xl mx-auto">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#C4A052]"></div>
                                <span>Job change</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                                <span>Gap / failure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#7EB8DA]"></div>
                                <span>Skill upgrade</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
                                <span>Salary jump</span>
                            </div>
                        </div>
                        <p className="text-white/30 text-sm">
                            Click any line to see the full journey
                        </p>
                    </div>

                    <div className="scroll-animate delay-200">
                        <ThreadsVisualizer />
                    </div>
                </div>
            </section>

            {/* Emotional Anchor - Raw Quote */}
            <section className="py-16 px-4 relative">
                <div className="max-w-2xl mx-auto text-center scroll-animate">
                    <div className="relative p-8 md:p-12 rounded-2xl bg-[#0c0c0f] border border-white/5">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs bg-[#0a0a0a] border border-white/10 text-white/30">
                            Real story
                        </div>
                        <blockquote className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed">
                            "I followed advice, not instinct. Lost 6 years."
                        </blockquote>
                        <p className="mt-4 text-lg text-[#C4A052]">
                            This is what I wish I knew earlier.
                        </p>
                        <p className="mt-6 text-sm text-white/40 italic">
                            - Software Engineer, India (anonymous)
                        </p>
                    </div>
                </div>
            </section>

            {/* Industry Categories */}
            <IndustryCategories />

            {/* Featured Journeys Section */}
            <section className="py-24 px-4 relative">
                <div className="absolute inset-0 bg-[#0a0a0a]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 scroll-animate">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 mb-4">
                                Featured Journeys
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                Popular <span className="text-gradient">Journeys</span>
                            </h2>
                            <p className="text-white/50 max-w-xl text-lg">
                                Real career journeys with real outcomes - no filters, no fluff
                            </p>
                        </div>
                        <div className="mt-6 md:mt-0 flex gap-2">
                            <button className="px-4 py-2 rounded-lg text-sm bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 hover:bg-[#C4A052]/20 transition-colors">
                                All
                            </button>
                            <button className="px-4 py-2 rounded-lg text-sm text-white/50 hover:bg-white/5 transition-colors">
                                Tech
                            </button>
                            <button className="px-4 py-2 rounded-lg text-sm text-white/50 hover:bg-white/5 transition-colors">
                                Finance
                            </button>
                            <button className="px-4 py-2 rounded-lg text-sm text-white/50 hover:bg-white/5 transition-colors">
                                Design
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-animate delay-200">
                        {sampleJourneys.map((journey) => (
                            <JourneyCard key={journey.id} journey={journey} />
                        ))}
                    </div>

                    <div className="text-center mt-12 scroll-animate delay-300">
                        <button className="btn-secondary">
                            View All 10,000+ Journeys
                        </button>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 scroll-animate">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Why These Journeys Are Trustworthy
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-animate">
                        {[
                            { text: '127 journeys include documented salary slips', icon: '#' },
                            { text: '89% of contributors chose anonymity for honesty', icon: '*' },
                            { text: 'Each journey reviewed by 2+ moderators before publish', icon: '+' },
                            { text: 'Zero promotional content - failures included by default', icon: '!' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <span className="text-xl text-[#C4A052] font-bold">{item.icon}</span>
                                <span className="text-white/60 text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-24 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] to-[#0a0a0a]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 scroll-animate">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 mb-4">
                            The Process
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            How PathWall Works
                        </h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-lg">
                            No fancy algorithm. Just documented reality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Browse Journeys',
                                description: 'Explore thousands of real career journeys from 11th grade to professional life. No filters, no sugar-coating.',
                                color: '#C4A052'
                            },
                            {
                                step: '02',
                                title: 'Filter & Compare',
                                description: 'Filter by stream, salary range, or career type. Compare different journeys side by side to understand trade-offs.',
                                color: '#7EB8DA'
                            },
                            {
                                step: '03',
                                title: 'See the Reality',
                                description: 'See the real struggles, pivots, and breakthroughs. Understand what it actually takes to reach your goals.',
                                color: '#A8D5BA'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="scroll-animate group relative"
                                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                            >
                                <div
                                    className="relative bg-[#0f0f12] rounded-2xl border border-white/5 p-8 h-full transition-all duration-500 hover:border-white/10"
                                    style={{ boxShadow: 'none' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = `0 0 40px -20px ${item.color}30`
                                        e.currentTarget.style.borderColor = `${item.color}25`
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'none'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <div
                                        className="absolute -top-4 -right-4 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
                                        style={{
                                            background: `linear-gradient(135deg, ${item.color}15, ${item.color}30)`,
                                            border: `1px solid ${item.color}25`,
                                            color: item.color
                                        }}
                                    >
                                        {item.step}
                                    </div>

                                    <div className="text-5xl mb-6 text-white/15">{item.step}</div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                                </div>

                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section with Tooltips */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C4A052]/3 via-transparent to-[#C4A052]/3" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 scroll-animate">
                        {[
                            { value: '10,000+', label: 'Verified anonymous journeys', tooltip: 'Verified & anonymized by our team' },
                            { value: '50+', label: 'Career paths across industries', tooltip: 'Tech, Finance, Design, Healthcare & more' },
                            { value: '3L-80L', label: 'CTC salary range documented', tooltip: 'Self-reported, cross-validated where possible' },
                            { value: '95%', label: 'Users who found clarity', tooltip: 'Based on post-visit surveys' }
                        ].map((stat, index) => (
                            <Tooltip key={index} text={stat.tooltip}>
                                <div className="text-center group cursor-help">
                                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                                    <div className="text-white/40 text-xs leading-relaxed max-w-[140px] mx-auto">{stat.label}</div>
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contributor CTA Section */}
            <section className="py-24 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c0e] to-[#0a0a0a]" />

                <div className="max-w-4xl mx-auto relative z-10 text-center scroll-animate">
                    <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 mb-6">
                        Share Your Journey
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Your story might help someone who feels lost today.
                    </h2>
                    <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                        Share your journey anonymously. The mistakes, the pivots, the real numbers.
                    </p>

                    <button className="btn-primary text-base px-8 py-4">
                        Share Anonymously
                    </button>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            100% Anonymous
                        </div>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Takes 5 minutes
                        </div>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Free Forever
                        </div>
                    </div>
                </div>
            </section>

            {/* Confused User CTA - Before Footer */}
            <section className="py-16 px-4 relative bg-[#060608]">
                <div className="max-w-2xl mx-auto text-center scroll-animate">
                    <p className="text-white/40 text-lg mb-4">
                        Still confused about your career?
                    </p>
                    <p className="text-white/60 text-xl font-medium mb-6">
                        Start with people who were confused like you.
                    </p>
                    <button
                        className="btn-secondary"
                        onClick={() => document.getElementById('journeys-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Explore Real Journeys
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage