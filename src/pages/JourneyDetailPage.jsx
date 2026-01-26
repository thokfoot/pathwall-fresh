import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Mock journey data - would come from API
const mockJourneys = {
    1: {
        id: 1,
        title: 'Software Engineer at Google',
        background: {
            education: '11th PCM  B.Tech CSE (Tier-2 College)',
            location: 'Small town in UP  Bangalore',
            constraints: 'First-generation engineer, limited exposure, no mentorship',
            startYear: 2012
        },
        timeline: [
            { year: '2012-2016', phase: 'B.Tech CSE', salary: null, event: 'Joined tier-2 college after failing JEE twice. Felt lost for 2 years.', type: 'education' },
            { year: '2016-2017', phase: 'First Job', salary: '?4-6 LPA', event: 'Service company. Hated it. Started learning DSA at night.', type: 'job' },
            { year: '2017-2018', phase: 'Gap Period', salary: null, event: 'Quit job. 8 months of self-study. Family pressure was intense.', type: 'gap' },
            { year: '2018-2020', phase: 'Startup', salary: '?8-12 LPA', event: 'Joined early-stage startup. Learned fast. Burned out.', type: 'job' },
            { year: '2020-2021', phase: 'Amazon', salary: '?25-30 LPA', event: 'Finally cracked FAANG. Took 3 attempts over 2 years.', type: 'job' },
            { year: '2021-Present', phase: 'Google', salary: '?45-55 LPA', event: 'Switched for better WLB and interesting problems.', type: 'job' }
        ],
        mistakes: [
            'Wasted 2 years in college not building anything',
            'Took first job for money, not learning',
            'Tried to crack FAANG without proper system design knowledge',
            'Ignored health during startup phase'
        ],
        whatWorked: [
            'Consistent DSA practice (2 hours daily for 18 months)',
            'Building side projects that solved real problems',
            'Mock interviews with friends who were already at FAANG',
            'Quitting the service job even without another offer'
        ],
        misunderstandings: {
            at18: 'Thought IIT was the only path to good tech jobs',
            at21: 'Believed service companies were dead ends forever',
            at25: 'Assumed FAANG = happiness (it is not, but it is stability)'
        },
        anonymous: true,
        verified: true,
        submittedAt: '2024-03-15'
    }
}

const JourneyDetailPage = () => {
    const { id } = useParams()
    const journey = mockJourneys[id] || mockJourneys[1]
    const [bookmarked, setBookmarked] = useState(false)

    const phaseColors = {
        education: '#7EB8DA',
        job: '#C4A052',
        gap: '#ef4444',
        skill: '#10b981'
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            
            <main className="pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
                        <Link to="/" className="hover:text-white/60">Home</Link>
                        <span>/</span>
                        <Link to="/explore" className="hover:text-white/60">Journeys</Link>
                        <span>/</span>
                        <span className="text-white/60">Journey #{journey.id}</span>
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                {journey.verified && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                        Verified
                                    </span>
                                )}
                                {journey.anonymous && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        Anonymous
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {journey.title}
                            </h1>
                            <p className="text-white/50">
                                {journey.background.education}
                            </p>
                        </div>
                        <button
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`p-3 rounded-xl transition-all ${bookmarked ? 'bg-[#C4A052]/20 text-[#C4A052]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                        >
                            <svg className="w-6 h-6" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                    </div>

                    {/* Background Section */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-[#C4A052]/20 flex items-center justify-center text-sm"></span>
                            Background
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Education Path</p>
                                <p className="text-white/80">{journey.background.education}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                                <p className="text-white/80">{journey.background.location}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Constraints & Context</p>
                                <p className="text-white/80">{journey.background.constraints}</p>
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-[#7EB8DA]/20 flex items-center justify-center text-sm"></span>
                            Timeline
                        </h2>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
                            
                            {journey.timeline.map((item, index) => (
                                <div key={index} className="relative pl-12 pb-8 last:pb-0">
                                    {/* Dot */}
                                    <div 
                                        className="absolute left-2 w-5 h-5 rounded-full border-2 border-[#0a0a0a]"
                                        style={{ background: phaseColors[item.type] || '#C4A052' }}
                                    />
                                    
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white/40 text-sm">{item.year}</span>
                                            {item.salary && (
                                                <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400">
                                                    {item.salary}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-white font-medium mb-1">{item.phase}</h3>
                                        <p className="text-white/50 text-sm">{item.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mistakes Section */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-sm"></span>
                            Mistakes & Wrong Assumptions
                        </h2>
                        <div className="p-6 rounded-xl bg-red-500/[0.03] border border-red-500/10">
                            <ul className="space-y-3">
                                {journey.mistakes.map((mistake, index) => (
                                    <li key={index} className="flex items-start gap-3 text-white/70">
                                        <span className="text-red-400 mt-1"></span>
                                        {mistake}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* What Worked Section */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-sm"></span>
                            What Actually Worked
                            <span className="text-xs text-white/30 font-normal ml-2">(Not advice � just events)</span>
                        </h2>
                        <div className="p-6 rounded-xl bg-green-500/[0.03] border border-green-500/10">
                            <ul className="space-y-3">
                                {journey.whatWorked.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-white/70">
                                        <span className="text-green-400 mt-1"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Misunderstandings Section */}
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-[#C4A052]/20 flex items-center justify-center text-sm"></span>
                            What I Misunderstood
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(journey.misunderstandings).map(([age, text]) => (
                                <div key={age} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <p className="text-[#C4A052] text-sm font-medium mb-2">
                                        At {age.replace('at', '')}
                                    </p>
                                    <p className="text-white/60 text-sm">{text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                        <p className="text-white/30 text-xs">
                            This is one person's experience, not advice. Your path will be different.
                            <br />
                            Submitted anonymously on {journey.submittedAt}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default JourneyDetailPage
