// Animated Counter Hook
function useCountUp(target, duration = 2000) {
    const [count, setCount] = React.useState(0)
    React.useEffect(() => {
        let start = 0
        let startTime = null
        function animate(ts) {
            if (!startTime) startTime = ts
            const progress = Math.min((ts - startTime) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(target)
        }
        requestAnimationFrame(animate)
        // eslint-disable-next-line
    }, [target, duration])
    return count
}

const stats = [
    { value: 10000, label: 'Verified journeys', primary: true, display: '10,000+' },
    { value: 80, label: 'CTC range documented', display: '3L-80L' },
    { value: 50, label: 'Career paths', display: '50+' },
    { value: 95, label: 'Found clarity', display: '~95%' },
]
import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ThreadsVisualizer from '../components/ThreadsVisualizer'
import JourneyCard from '../components/JourneyCard'
import Footer from '../components/Footer'

// Minimal sample journeys for featured grid
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
    // Extract unique careers for left/right lists
    const leftCareers = sampleJourneys.map(j => j.title)
    const rightCareers = sampleJourneys.map(j => j.company)
    const [hoveredCareer, setHoveredCareer] = React.useState(null)
    const [spotlight, setSpotlight] = React.useState({ x: 0, y: 0 })
    // Filter state for pills
    const allFilters = [
        ...Array.from(new Set(sampleJourneys.map(j => j.title)))
    ]
    const [selectedFilter, setSelectedFilter] = React.useState(null)

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setSpotlight({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="min-h-screen cyber-grid-bg relative overflow-hidden">
            {/* Mouse Spotlight Effect - More Visible */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: `radial-gradient(900px at ${spotlight.x}px ${spotlight.y}px, rgba(196,160,82,0.18) 0%, rgba(10,10,10,0.0) 70%)`,
                    transition: 'background 0.18s',
                }}
            />

            <Navbar brandName="Co Ends" />


            {/* Infinite Marquee for Careers (moving rows) - always visible below Navbar */}
            <div className="w-full overflow-visible mt-12 mb-4" style={{ position: 'relative', zIndex: 30 }}>
                <div className="marquee careers-top text-xs font-semibold text-[#C4A052] bg-black/80 py-1 shadow-lg" style={{ position: 'relative', zIndex: 31, borderBottom: '1px solid #2d2412', marginBottom: '2px' }}>
                    <div className="marquee-content flex gap-8 animate-marquee">
                        {leftCareers.map((career, idx) => (
                            <span key={idx}>{career}</span>
                        ))}
                    </div>
                </div>
                <div className="marquee careers-bottom text-xs font-semibold text-[#C4A052] bg-black/70 py-1" style={{ position: 'relative', zIndex: 30 }}>
                    <div className="marquee-content flex gap-8 animate-marquee-reverse">
                        {rightCareers.map((career, idx) => (
                            <span key={idx}>{career}</span>
                        ))}
                    </div>
                </div>
            </div>


            <HeroSection brandName="Co Ends" />

            {/* Connecting Ends Visualization (desktop only) */}
            <section id="journeys-section" className="py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-row gap-8 items-center relative">
                    {/* Left Careers removed for symmetry. Only horizontal pills above. */}

                    {/* SVG Connection Lines */}
                    <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        {hoveredCareer !== null && (
                            <line
                                x1="20%" y1={`${10 + hoveredCareer * 60}`}
                                x2="80%" y2={`${10 + hoveredCareer * 60}`}
                                stroke="#C4A052"
                                strokeWidth="3"
                                style={{ filter: 'drop-shadow(0 0 8px #C4A05288)' }}
                            >
                                <animate attributeName="stroke-opacity" from="0.2" to="1" dur="0.4s" fill="freeze" />
                            </line>
                        )}
                    </svg>

                    {/* Centerpiece */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <ThreadsVisualizer />
                        <p className="text-center mt-6 text-sm text-white/30" style={{ letterSpacing: '0.01em' }}>
                            Each line = one person. Each dot = a real milestone.
                        </p>
                    </div>

                    {/* Right Careers */}
                    <div className="hidden md:flex flex-col gap-6 items-start w-1/5">
                        {rightCareers.map((career, idx) => (
                            <div
                                key={career}
                                className={`px-4 py-2 rounded-xl bg-white/5 text-white/80 font-medium cursor-pointer transition-all duration-200 hover:bg-gradient-to-l hover:from-[#C4A052]/30 hover:to-[#9A7B3D]/20`}
                                style={{ position: 'relative', zIndex: 2 }}
                            >
                                {career}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Journeys Grid (cards only, no heading/button) */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl justify-center mx-auto">
                        {(selectedFilter
                            ? sampleJourneys.filter(j => j.title === selectedFilter)
                            : sampleJourneys
                        ).map((journey) => (
                            <JourneyCard key={journey.id} journey={journey} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage