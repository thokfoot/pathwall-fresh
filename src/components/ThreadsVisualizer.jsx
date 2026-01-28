import React, { useState, memo, useEffect, useRef } from 'react'

// Extended career journey data - 18 journeys
const allJourneys = [
    { id: 1, name: 'Software Engineer', title: 'Engineer to Tech Lead', color: '#C4A052', glow: 'rgba(196, 160, 82, 0.25)', milestones: ['11th PCM', 'B.Tech CSE', 'First Job 8L', 'Senior Dev 25L'], positions: [12, 38, 65, 90], years: ['2016', '2018-22', '2022', '2025'] },
    { id: 2, name: 'Product Designer', title: 'Commerce to Remote Designer', color: '#8FAAB8', glow: 'rgba(143, 170, 184, 0.25)', milestones: ['11th Commerce', 'BBA + Bootcamp', 'Intern', 'Designer 18L'], positions: [10, 40, 60, 90], years: ['2017', '2019-22', '2022', '2024'] },
    { id: 3, name: 'Doctor', title: 'NEET to Cardiologist', color: '#B89B9B', glow: 'rgba(184, 155, 155, 0.25)', milestones: ['11th PCB', 'MBBS', 'Intern', 'Consultant 60L'], positions: [10, 35, 65, 92], years: ['2015', '2016-21', '2022', '2026'] },
    { id: 4, name: 'Content Creator', title: 'Arts to Full-Time Creator', color: '#9AB8A0', glow: 'rgba(154, 184, 160, 0.25)', milestones: ['11th Arts', 'BA + YouTube', 'Marketing 4L', 'Creator 30L'], positions: [10, 35, 60, 90], years: ['2018', '2019-22', '2022', '2024'] },
    { id: 5, name: 'Data Scientist', title: 'Stats to AI/ML Expert', color: '#A8A0B8', glow: 'rgba(168, 160, 184, 0.25)', milestones: ['11th PCM', 'B.Sc Stats', 'MS USA', 'Amazon 42L'], positions: [12, 36, 62, 88], years: ['2016', '2017-20', '2020-22', '2024'] },
    { id: 6, name: 'CA Professional', title: 'Commerce to Big 4', color: '#B8A880', glow: 'rgba(184, 168, 128, 0.25)', milestones: ['11th Commerce', 'CA Foundation', 'Articleship', 'Big 4 Partner'], positions: [10, 35, 60, 88], years: ['2016', '2017-19', '2019-22', '2025'] },
    { id: 7, name: 'Mechanical Engineer', title: 'Core to Auto Sector', color: '#A0B8B0', glow: 'rgba(160, 184, 176, 0.25)', milestones: ['11th PCM', 'B.Tech Mech', 'TATA Motors', 'Manager 22L'], positions: [12, 40, 65, 90], years: ['2015', '2016-20', '2021', '2025'] },
    { id: 8, name: 'Investment Banker', title: 'Engineering to Finance', color: '#B8A090', glow: 'rgba(184, 160, 144, 0.25)', milestones: ['11th PCM', 'B.Tech Drop', 'MBA IIM', 'Goldman 55L'], positions: [10, 30, 60, 88], years: ['2014', '2016', '2018-20', '2024'] },
    { id: 9, name: 'Civil Services', title: 'UPSC Journey', color: '#90A8B8', glow: 'rgba(144, 168, 184, 0.25)', milestones: ['11th Arts', 'BA History', '3 Attempts', 'IAS Officer'], positions: [10, 35, 60, 90], years: ['2015', '2016-19', '2020-22', '2023'] },
    { id: 10, name: 'Startup Founder', title: 'Engineer to CEO', color: '#C4A052', glow: 'rgba(196, 160, 82, 0.25)', milestones: ['11th PCM', 'B.Tech', 'First Startup', 'Series A 80L'], positions: [12, 38, 62, 88], years: ['2014', '2015-19', '2020', '2024'] },
    { id: 11, name: 'Lawyer', title: 'Law School to Supreme Court', color: '#B8B090', glow: 'rgba(184, 176, 144, 0.25)', milestones: ['11th Commerce', 'CLAT', 'NLU Delhi', 'SC Advocate 35L'], positions: [10, 32, 58, 90], years: ['2015', '2016', '2017-22', '2025'] },
    { id: 12, name: 'UX Designer', title: 'Psychology to Tech Design', color: '#A8B8A0', glow: 'rgba(168, 184, 160, 0.25)', milestones: ['11th Arts', 'BA Psychology', 'Bootcamp', 'Google 48L'], positions: [10, 38, 62, 88], years: ['2016', '2017-20', '2021', '2024'] },
    { id: 13, name: 'Architect', title: 'Design to Real Estate', color: '#B0A8B8', glow: 'rgba(176, 168, 184, 0.25)', milestones: ['11th PCM', 'B.Arch', 'Intern', 'Own Firm 40L'], positions: [12, 42, 65, 90], years: ['2014', '2015-20', '2021', '2025'] },
    { id: 14, name: 'Pilot', title: 'Commerce to Cockpit', color: '#B8A8A0', glow: 'rgba(184, 168, 160, 0.25)', milestones: ['11th Commerce', 'CPL Training', 'First Officer', 'Captain 65L'], positions: [10, 40, 65, 90], years: ['2015', '2016-19', '2020', '2025'] },
    { id: 15, name: 'Journalist', title: 'Mass Comm to Editor', color: '#A0A8B8', glow: 'rgba(160, 168, 184, 0.25)', milestones: ['11th Arts', 'Mass Comm', 'Reporter', 'Editor 18L'], positions: [10, 35, 60, 88], years: ['2016', '2017-20', '2021', '2025'] },
    { id: 16, name: 'Cyber Security', title: 'Hacker to Security Head', color: '#B8B8A0', glow: 'rgba(184, 184, 160, 0.25)', milestones: ['11th PCM', 'B.Tech CS', 'Bug Bounty', 'CISO 52L'], positions: [12, 38, 62, 88], years: ['2015', '2016-20', '2021', '2025'] },
    { id: 17, name: 'Film Director', title: 'Arts to Bollywood', color: '#B8A0B0', glow: 'rgba(184, 160, 176, 0.25)', milestones: ['11th Arts', 'Film School', 'AD Work', 'First Film'], positions: [10, 38, 62, 90], years: ['2014', '2015-18', '2019-22', '2024'] },
    { id: 18, name: 'Chartered Analyst', title: 'Commerce to CFA', color: '#A8B8B0', glow: 'rgba(168, 184, 176, 0.25)', milestones: ['11th Commerce', 'B.Com', 'CFA Levels', 'Portfolio Manager 45L'], positions: [10, 35, 60, 88], years: ['2015', '2016-19', '2020-22', '2025'] },
]

const generateWavePath = (seed, time, amplitude) => {
    const points = []
    for (let i = 0; i <= 20; i++) {
        const y = (i / 20) * 100
        const wave = Math.sin((y * 0.18) + (seed * 1.5) + time) * (amplitude * 0.5) +
            Math.cos((y * 0.12) + (seed * 2) + time * 0.7) * (amplitude * 0.2)
        points.push({ x: 50 + wave, y })
    }
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1], p1 = points[i]
        d += ` Q ${p0.x} ${(p0.y + p1.y) / 2} ${(p0.x + p1.x) / 2} ${p1.y}`
    }
    return d
}

const JourneyThread = memo(function JourneyThread({ journey, index, active, setActive, scrollOffset }) {
    const isActive = active === journey.id
    const dimmed = active && active !== journey.id
    const [time, setTime] = useState(index * 0.5)
    const [hoveredMilestone, setHoveredMilestone] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => setTime(t => t + 0.08), 50)
        return () => clearInterval(interval)
    }, [])

    const path = generateWavePath(index, time, isActive ? 14 : 9)

    return (
        <div
            className="relative cursor-pointer group flex-shrink-0"
            style={{
                width: isActive ? '110px' : '75px',
                height: '100%',
                transition: 'all 0.3s ease',
                opacity: dimmed ? 0.25 : 1,
            }}
            onMouseEnter={() => setActive(journey.id)}
            onMouseLeave={() => setActive(null)}
        >
            {/* SVG Wave */}
            <svg
                className="absolute left-1/2 -translate-x-1/2 h-full overflow-visible"
                style={{ width: '24px' }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id={`grad-${journey.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={journey.color} stopOpacity="0.05" />
                        <stop offset="15%" stopColor={journey.color} stopOpacity="0.7" />
                        <stop offset="50%" stopColor={journey.color} stopOpacity="1" />
                        <stop offset="85%" stopColor={journey.color} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={journey.color} stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                <path
                    d={path}
                    fill="none"
                    stroke={`url(#grad-${journey.id})`}
                    strokeWidth={isActive ? 3.5 : 2}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 ${isActive ? 6 : 3}px ${journey.color})` }}
                />
            </svg>

            {/* Milestone dots */}
            {journey.positions.map((pos, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: `${pos}%` }}
                    onMouseEnter={() => setHoveredMilestone(i)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                >
                    <div
                        className="rounded-full border border-white/25"
                        style={{
                            width: isActive ? 10 : 6,
                            height: isActive ? 10 : 6,
                            background: journey.color,
                            boxShadow: `0 0 ${isActive ? 8 : 4}px ${journey.glow}`,
                            transition: 'all 0.2s',
                        }}
                    />
                    {/* Milestone tooltip */}
                    {hoveredMilestone === i && (
                        <div
                            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg whitespace-nowrap z-50"
                            style={{
                                background: 'rgba(8,8,10,0.95)',
                                border: `1px solid ${journey.color}35`,
                                boxShadow: `0 6px 16px rgba(0,0,0,0.5)`
                            }}
                        >
                            <p className="text-[11px] font-medium text-white">{journey.milestones[i]}</p>
                            <p className="text-[9px] text-white/40">{journey.years[i]}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* Career name label */}
            <div
                className="absolute -bottom-36 left-1/2 -translate-x-1/2 text-center transition-all duration-300"
                style={{
                    opacity: isActive ? 1 : 0.35,
                    width: '100%',
                    maxWidth: 240,
                    minHeight: 72,
                    padding: '0 8px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <p
                    className="font-bold"
                    style={{
                        fontSize: isActive ? '28px' : '18px',
                        color: journey.color,
                        textShadow: isActive ? `0 0 20px ${journey.glow}` : 'none',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                        margin: 0,
                        lineHeight: 1.22,
                        textAlign: 'center'
                    }}
                >
                    {journey.name}
                </p>
            </div>
        </div>
    )
})

const ThreadsVisualizer = () => {
    const [active, setActive] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [scrollOffset, setScrollOffset] = useState(0)
    const containerRef = useRef(null)
    const animationRef = useRef(null)

    // Filter journeys based on search query
    const filteredJourneys = searchQuery.trim() === ''
        ? allJourneys
        : allJourneys.filter(j =>
            j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

    // Auto-scroll animation
    useEffect(() => {
        if (searchQuery.trim() !== '') {
            // Stop scrolling when searching
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            return
        }

        const animate = () => {
            setScrollOffset(prev => {
                const newOffset = prev + 0.3
                // Reset when scrolled too far
                if (containerRef.current) {
                    const containerWidth = containerRef.current.scrollWidth / 2
                    if (newOffset >= containerWidth) return 0
                }
                return newOffset
            })
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [searchQuery])

    // Double the journeys for infinite scroll effect
    const displayJourneys = searchQuery.trim() === ''
        ? [...allJourneys, ...allJourneys]
        : filteredJourneys

    return (
        <section id="journeys-section" className="relative py-16 overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #12100e 0%, #0a0a0a 60%, #08080a 100%)' }}
            />

            {/* Subtle glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(196,160,82,0.03) 0%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 mb-3">
                        Real Career Journeys
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                        Explore <span style={{ color: '#C4A052' }}>{filteredJourneys.length}</span> Documented Journeys
                    </h2>
                    <p className="text-white/35 max-w-md mx-auto text-sm">
                        Type to filter. Hover to explore milestones.
                    </p>
                </div>

                {/* Search Bar - Above Threads */}
                <div className="max-w-md mx-auto mb-8">
                    <div
                        className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: searchQuery ? '1px solid rgba(196,160,82,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search: Engineer, Designer, Doctor, CA..."
                            className="flex-1 bg-transparent text-white placeholder:text-white/25 text-sm focus:outline-none"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-white/30 hover:text-white/60 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                    {/* Live filter hint */}
                    {searchQuery && (
                        <p className="text-center text-[10px] text-white/25 mt-2">
                            Showing {filteredJourneys.length} of {allJourneys.length} journeys matching "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Threads Display - Scrolling Container */}
                <div className="relative overflow-hidden" style={{ height: '340px' }}>
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, #0a0a0a 0%, transparent 100%)' }} />
                    <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to left, #0a0a0a 0%, transparent 100%)' }} />

                    <div
                        ref={containerRef}
                        className="flex items-end gap-1 h-full pb-10"
                        style={{
                            transform: searchQuery.trim() === '' ? `translateX(-${scrollOffset}px)` : 'translateX(0)',
                            transition: searchQuery.trim() !== '' ? 'transform 0.3s ease' : 'none',
                            justifyContent: searchQuery.trim() !== '' ? 'center' : 'flex-start',
                            paddingLeft: searchQuery.trim() === '' ? '40px' : '0',
                        }}
                    >
                        {displayJourneys.map((journey, index) => (
                            <JourneyThread
                                key={`${journey.id}-${index}`}
                                journey={journey}
                                index={index % allJourneys.length}
                                active={active}
                                setActive={setActive}
                                scrollOffset={scrollOffset}
                            />
                        ))}
                    </div>
                </div>

                {/* No results message */}
                {filteredJourneys.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-white/40 text-sm">No journeys found for "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-2 text-[#C4A052] text-sm hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-8">
                    <button
                        className="px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300"
                        style={{
                            background: 'rgba(196, 160, 82, 0.1)',
                            border: '1px solid rgba(196, 160, 82, 0.25)',
                            color: '#C4A052',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(196, 160, 82, 0.18)'
                            e.target.style.borderColor = 'rgba(196, 160, 82, 0.4)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(196, 160, 82, 0.1)'
                            e.target.style.borderColor = 'rgba(196, 160, 82, 0.25)'
                        }}
                    >
                        Explore All 10,000+ Journeys
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ThreadsVisualizer