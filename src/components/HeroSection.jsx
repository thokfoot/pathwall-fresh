import React, { useState, memo, useEffect } from 'react'

// Color palette
const colors = {
    primaryGold: '#C4A052',
    mutedChampagne: '#D4C4A0',
    darkBrown: '#1a1612'
}

const threadData = {
    left: [
        { id: 'L1', name: 'Software Engineer', color: '#C4A052', glow: 'rgba(196, 160, 82, 0.25)', milestones: ['Age 17', 'Age 21', 'Age 24', 'Age 28'], positions: [12, 32, 58, 85] },
        { id: 'L2', name: 'Doctor', color: '#B8A090', glow: 'rgba(184, 160, 144, 0.2)', milestones: ['Age 17', 'Age 23', 'Age 26', 'Age 30'], positions: [10, 30, 55, 82] },
        { id: 'L3', name: 'Data Scientist', color: '#8FAAB8', glow: 'rgba(143, 170, 184, 0.2)', milestones: ['Age 17', 'Age 21', 'Age 25', 'Age 29'], positions: [15, 38, 62, 88] },
    ],
    right: [
        { id: 'R1', name: 'Product Designer', color: '#9AB8A0', glow: 'rgba(154, 184, 160, 0.2)', milestones: ['Age 17', 'Age 21', 'Age 24', 'Age 27'], positions: [14, 36, 60, 86] },
        { id: 'R2', name: 'Content Creator', color: '#A8A0B8', glow: 'rgba(168, 160, 184, 0.2)', milestones: ['Age 17', 'Age 20', 'Age 23', 'Age 26'], positions: [11, 33, 58, 84] },
        { id: 'R3', name: 'CA Professional', color: '#B8A880', glow: 'rgba(184, 168, 128, 0.2)', milestones: ['Age 17', 'Age 22', 'Age 26', 'Age 30'], positions: [16, 40, 65, 90] },
    ]
}

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

const Thread = memo(function Thread({ thread, index, side, active, setActive }) {
    const isActive = active === thread.id
    const dimmed = active && active !== thread.id
    const [time, setTime] = useState(index * 0.5)
    const [hoveredMilestone, setHoveredMilestone] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => setTime(t => t + 0.12), 40)
        return () => clearInterval(interval)
    }, [])

    const path = generateWavePath(index, time, isActive ? 14 : 9)

    return (
        <div
            className="relative cursor-pointer flex-shrink-0"
            style={{
                width: '22px',
                height: '100%',
                opacity: dimmed ? 0.15 : 1,
                transition: 'opacity 0.3s',
            }}
            onMouseEnter={() => setActive(thread.id)}
            onMouseLeave={() => setActive(null)}
        >
            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`g-${thread.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={thread.color} stopOpacity="0.05" />
                        <stop offset="15%" stopColor={thread.color} stopOpacity="0.7" />
                        <stop offset="50%" stopColor={thread.color} stopOpacity="1" />
                        <stop offset="85%" stopColor={thread.color} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={thread.color} stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                <path
                    d={path}
                    fill="none"
                    stroke={`url(#g-${thread.id})`}
                    strokeWidth={isActive ? 3 : 1.8}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 ${isActive ? 6 : 3}px ${thread.color})` }}
                />
            </svg>
            {thread.positions.map((pos, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 group"
                    style={{ top: `${pos}%` }}
                    onMouseEnter={() => setHoveredMilestone(i)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                >
                    <div
                        className="rounded-full border border-white/30"
                        style={{
                            width: isActive ? 10 : 7,
                            height: isActive ? 10 : 7,
                            background: thread.color,
                            boxShadow: `0 0 ${isActive ? 6 : 3}px ${thread.glow}`,
                            transition: 'all 0.2s',
                        }}
                    />
                    {/* Age tooltip on hover */}
                    {hoveredMilestone === i && (
                        <div
                            className={`absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded text-[9px] font-medium whitespace-nowrap z-50 ${side === 'left' ? 'right-4' : 'left-4'}`}
                            style={{ background: '#0a0a0c', border: `1px solid ${thread.color}40`, color: thread.color }}
                        >
                            {thread.milestones[i]}
                        </div>
                    )}
                </div>
            ))}
            <div
                className="absolute font-bold tracking-[0.12em] uppercase whitespace-nowrap pointer-events-none select-none"
                style={{
                    writingMode: 'vertical-rl',
                    color: thread.color,
                    fontSize: isActive ? '20px' : '16px', // Increased font size for better readability
                    opacity: isActive ? 1 : 0.85, // Improved visibility for inactive threads
                    textShadow: isActive ? `0 0 18px ${thread.glow}` : 'none',
                    [side === 'left' ? 'right' : 'left']: isActive ? 'calc(100% + 20px)' : 'calc(100% + 15px)', // Adjusted alignment
                    top: '50%',
                    transform: side === 'left' ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                    transition: 'all 0.3s ease-out',
                    letterSpacing: isActive ? '0.35em' : '0.3em',
                }}
            >
                {thread.name}
            </div>
        </div>
    )
})

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
    const [active, setActive] = useState(null)

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 lg:pt-24"
            style={{
                background: 'radial-gradient(ellipse 100% 80% at 50% 20%, #1a1612 0%, #0a0a0a 50%, #08080a 100%)'
            }}
        >
            {/* Background Effects - Reduced */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 25%, rgba(196,160,82,0.03) 0%, transparent 70%)' }} />

            {/* Floating Particles Effect - Reduced */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float"
                        style={{
                            background: '#C4A052',
                            opacity: 0.15,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-[1400px] mx-auto" style={{ gap: '8px' }}>
                <div className="flex items-center h-[55vh] min-h-[320px] max-h-[520px]" style={{ gap: '1px' }}>
                    {threadData.left.map((t, i) => (
                        <Thread key={t.id} thread={t} index={i} side="left" active={active} setActive={setActive} />
                    ))}
                </div>

                <div className="flex flex-col items-center">
                    <div
                        className="flex items-center gap-2 px-4 py-2 mb-4 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(196,160,82,0.1) 0%, rgba(196,160,82,0.03) 100%)',
                            border: '1px solid rgba(196,160,82,0.2)',
                        }}
                    >
                        <span className="relative w-2 h-2">
                            <span className="animate-ping absolute inset-0 rounded-full opacity-40" style={{ background: '#C4A052' }} />
                            <span className="absolute inset-0 rounded-full" style={{ background: '#C4A052' }} />
                        </span>
                        <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'rgba(196,160,82,0.85)' }}>10,000+ Real Career Journeys</span>
                    </div>

                    <h1
                        className="font-black text-center leading-[0.95] tracking-[-0.02em] select-none"
                        style={{ fontSize: 'clamp(3.2rem, 11vw, 8rem)' }}
                    >
                        <span className="block" style={{
                            background: 'linear-gradient(140deg, #f5e6c8 0%, #c4a052 45%, #8b6914 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 2px 10px rgba(196,160,82,0.08))',
                        }}>Path</span>
                        <span className="block" style={{
                            background: 'linear-gradient(140deg, #8b6914 0%, #c4a052 55%, #f5e6c8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 2px 10px rgba(196,160,82,0.06))',
                        }}>Wall</span>
                    </h1>

                    {/* Clear Value Proposition */}
                    <p className="text-center mt-4 max-w-lg mx-auto" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                        Unfiltered career journeys - salaries, mistakes, switches, reality.<br />
                        <span style={{ color: 'rgba(196,160,82,0.9)', fontSize: '0.9em' }}>No advice. No motivation. Just documented truth.</span>
                    </p>

                    {/* Trust Indicators */}
                    <TrustIndicators />
                </div>

                <div className="flex items-center h-[55vh] min-h-[320px] max-h-[520px]" style={{ gap: '1px' }}>
                    {threadData.right.map((t, i) => (
                        <Thread key={t.id} thread={t} index={i + 5} side="right" active={active} setActive={setActive} />
                    ))}
                </div>
            </div>

            {/* Bottom thread labels for all 18 threads */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto mt-2 flex justify-between px-4" style={{ pointerEvents: 'none' }}>
                {[...threadData.left, ...threadData.right].map((t, i) => (
                    <span
                        key={t.id}
                        style={{
                            color: t.color,
                            fontWeight: 700,
                            fontSize: '1.15rem', // Increased font size for readability
                            letterSpacing: '0.04em',
                            textShadow: `0 1px 8px #000, 0 0 2px ${t.color}55`,
                            opacity: 0.92,
                            minWidth: 0,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            flex: 1,
                        }}
                    >
                        {t.name}
                    </span>
                ))}
            </div>

            <div className="relative z-10 mt-6 sm:mt-10 flex flex-col items-center px-4 w-full max-w-2xl">
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