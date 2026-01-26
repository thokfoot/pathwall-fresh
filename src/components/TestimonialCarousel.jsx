import React, { useState, useEffect } from 'react'

const testimonials = [
    {
        id: 1,
        name: 'Priya Mehta',
        role: 'Product Manager at Microsoft',
        avatar: null,
        content: 'PathWall showed me that my non-linear journey from Arts to Tech was not only possible but common. Seeing real stories of people who made similar switches gave me the confidence to pursue my dream.',
        rating: 5,
        journey: 'Arts → MBA → PM',
        beforeSalary: '₹4 LPA',
        afterSalary: '₹35 LPA',
        color: '#A8D5BA'
    },
    {
        id: 2,
        name: 'Arjun Patel',
        role: 'Senior Data Scientist at Amazon',
        avatar: null,
        content: 'I was stuck in a dead-end IT job for 5 years. The career threads on PathWall helped me understand exactly what skills I needed and what the realistic timeline looked like. Best decision ever.',
        rating: 5,
        journey: 'IT Support → Data Science',
        beforeSalary: '₹6 LPA',
        afterSalary: '₹42 LPA',
        color: '#7EB8DA'
    },
    {
        id: 3,
        name: 'Sneha Gupta',
        role: 'Founder & CEO at TechStart',
        avatar: null,
        content: 'No motivational fluff, just real stories with real numbers. PathWall helped me understand the entrepreneurship journey before I took the leap. The struggles section was particularly eye-opening.',
        rating: 5,
        journey: 'Engineer → Founder',
        beforeSalary: '₹18 LPA',
        afterSalary: '₹80 LPA (equity)',
        color: '#D4A5FF'
    },
    {
        id: 4,
        name: 'Vikram Singh',
        role: 'CA Partner at Big4',
        avatar: null,
        content: 'Being from a small town, I had no idea what a CA career really looked like. PathWall threads from actual CAs showed me the reality - the failures, the retakes, and ultimately the success.',
        rating: 5,
        journey: 'Commerce → CA',
        beforeSalary: '₹0',
        afterSalary: '₹55 LPA',
        color: '#FFB366'
    }
]

const TestimonialCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const goToSlide = (index) => {
        setActiveIndex(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const currentTestimonial = testimonials[activeIndex]

    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#08080a]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${currentTestimonial.color}15, transparent 70%)` }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 mb-4">
                        What Actually Changed
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Real Transformations</span>
                    </h2>
                    <p className="text-white/50 max-w-2xl mx-auto text-lg">
                        Not overnight success � just real shifts over time.
                    </p>
                </div>

                {/* Main Testimonial */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Quote Icon */}
                    <div className="absolute -top-8 -left-4 text-6xl opacity-20" style={{ color: currentTestimonial.color }}>
                        "
                    </div>

                    <div
                        className="relative bg-[#0f0f12]/80 backdrop-blur-xl rounded-3xl border border-white/5 p-8 md:p-12 transition-all duration-500"
                        style={{ boxShadow: `0 0 100px -30px ${currentTestimonial.color}30` }}
                    >
                        {/* Content */}
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 font-light">
                            "{currentTestimonial.content}"
                        </p>

                        {/* Author Info */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                                    style={{
                                        background: `linear-gradient(135deg, ${currentTestimonial.color}30, ${currentTestimonial.color}50)`,
                                        border: `2px solid ${currentTestimonial.color}40`
                                    }}
                                >
                                    <span style={{ color: currentTestimonial.color }}>
                                        {currentTestimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">{currentTestimonial.name}</h4>
                                    <p className="text-white/40 text-sm">{currentTestimonial.role}</p>
                                </div>
                            </div>

                            {/* Journey Stats */}
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Journey</p>
                                    <p className="text-sm font-medium" style={{ color: currentTestimonial.color }}>
                                        {currentTestimonial.journey}
                                    </p>
                                </div>
                                <div className="h-10 w-px bg-white/10" />
                                <div className="text-center">
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Before</p>
                                    <p className="text-white/60 text-sm font-medium">{currentTestimonial.beforeSalary}</p>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">After</p>
                                    <p className="text-green-400 text-sm font-bold">{currentTestimonial.afterSalary}</p>
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="absolute top-8 right-8 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group relative p-2"
                            >
                                <div
                                    className="w-2 h-2 rounded-full transition-all duration-300"
                                    style={{
                                        background: index === activeIndex ? currentTestimonial.color : 'rgba(255,255,255,0.2)',
                                        transform: index === activeIndex ? 'scale(1.5)' : 'scale(1)',
                                        boxShadow: index === activeIndex ? `0 0 10px ${currentTestimonial.color}` : 'none'
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Arrow Navigation */}
                    <button
                        onClick={() => goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden lg:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goToSlide((activeIndex + 1) % testimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden lg:flex w-10 h-10 rounded-full bg-white/5 border border-white/10 items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/5">
                    {[
                        { value: '10,000+', label: 'Career Journeys' },
                        { value: '95%', label: 'Found Clarity' },
                        { value: '4.9/5', label: 'User Rating' },
                        { value: '50+', label: 'Industries Covered' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center px-6">
                            <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                            <div className="text-white/40 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialCarousel
