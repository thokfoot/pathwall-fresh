import React, { useState } from 'react'

const CareerTimeline = ({ journey }) => {
    const [hoveredNode, setHoveredNode] = useState(null)

    // Default journey if none provided
    const defaultJourney = {
        name: 'Rahul Sharma',
        title: 'Software Engineer at Google',
        milestones: [
            { year: '2015', title: '11th PCM', description: 'Chose Science stream', salary: null, icon: '📚' },
            { year: '2017', title: '12th Boards', description: '92% in boards, JEE prep', salary: null, icon: '🎓' },
            { year: '2021', title: 'B.Tech CSE', description: 'NIT Trichy, CGPA 8.5', salary: null, icon: '🏛️' },
            { year: '2021', title: 'First Job', description: 'Startup SDE', salary: '₹12 LPA', icon: '💼' },
            { year: '2023', title: 'Amazon', description: 'SDE-2', salary: '₹28 LPA', icon: '📦' },
            { year: '2025', title: 'Google', description: 'Senior SDE', salary: '₹52 LPA', icon: '🚀' },
        ],
        color: '#C4A052'
    }

    const data = journey || defaultJourney

    // Calculate salary progression for the mini graph
    const salaryData = data.milestones
        .filter(m => m.salary)
        .map(m => ({
            year: m.year,
            value: parseInt(m.salary.replace(/[₹LPA,\s]/g, ''))
        }))

    const maxSalary = Math.max(...salaryData.map(s => s.value))

    return (
        <div className="relative bg-[#0f0f12] rounded-2xl border border-white/5 p-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{data.name}</h3>
                    <p className="text-sm text-white/50">{data.title}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        Verified Journey
                    </span>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline Line */}
                <div
                    className="absolute top-4 left-4 right-4 h-0.5"
                    style={{
                        background: `linear-gradient(90deg, ${data.color}20, ${data.color}50, ${data.color}20)`
                    }}
                />

                {/* Milestone Nodes */}
                <div className="relative flex justify-between">
                    {data.milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center cursor-pointer group"
                            onMouseEnter={() => setHoveredNode(index)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ flex: 1 }}
                        >
                            {/* Node */}
                            <div
                                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${hoveredNode === index ? 'scale-125' : ''
                                    }`}
                                style={{
                                    background: hoveredNode === index ? data.color : `${data.color}30`,
                                    border: `2px solid ${data.color}`,
                                    boxShadow: hoveredNode === index ? `0 0 20px ${data.color}50` : 'none'
                                }}
                            >
                                <span className={hoveredNode === index ? 'text-black' : ''}>{milestone.icon}</span>
                            </div>

                            {/* Year Label */}
                            <span className="mt-2 text-[10px] text-white/40 font-medium">{milestone.year}</span>

                            {/* Title */}
                            <span
                                className={`mt-1 text-xs font-medium text-center transition-colors duration-300 ${hoveredNode === index ? 'text-white' : 'text-white/60'
                                    }`}
                            >
                                {milestone.title}
                            </span>

                            {/* Hover Card */}
                            <div
                                className={`absolute top-full mt-4 z-20 w-48 p-3 rounded-xl transition-all duration-300 ${hoveredNode === index
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}
                                style={{
                                    background: '#1a1a1f',
                                    border: `1px solid ${data.color}30`,
                                    boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${data.color}10`
                                }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{milestone.icon}</span>
                                    <span className="text-sm font-semibold text-white">{milestone.title}</span>
                                </div>
                                <p className="text-xs text-white/50 mb-2">{milestone.description}</p>
                                {milestone.salary && (
                                    <div
                                        className="text-sm font-bold"
                                        style={{ color: data.color }}
                                    >
                                        {milestone.salary}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Salary Progression Mini Graph */}
            {salaryData.length > 1 && (
                <div className="mt-10 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-white/40 uppercase tracking-wider">Salary Progression</span>
                        <span className="text-xs font-medium" style={{ color: data.color }}>
                            +{Math.round((salaryData[salaryData.length - 1].value / salaryData[0].value - 1) * 100)}% Growth
                        </span>
                    </div>

                    <div className="relative h-24 flex items-end gap-2">
                        {salaryData.map((item, index) => (
                            <div
                                key={index}
                                className="relative flex-1 group"
                            >
                                <div
                                    className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-100 opacity-80"
                                    style={{
                                        height: `${(item.value / maxSalary) * 100}%`,
                                        background: `linear-gradient(180deg, ${data.color}, ${data.color}60)`,
                                        boxShadow: `0 0 20px ${data.color}20`
                                    }}
                                />
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold text-white whitespace-nowrap">₹{item.value}L</span>
                                </div>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/30">{item.year}</span>
                            </div>
                        ))}

                        {/* Growth line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={data.color} stopOpacity="0.2" />
                                    <stop offset="100%" stopColor={data.color} stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                            <path
                                d={salaryData.map((item, i) => {
                                    const x = (i / (salaryData.length - 1)) * 100
                                    const y = 100 - (item.value / maxSalary) * 100
                                    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}%`
                                }).join(' ')}
                                fill="none"
                                stroke="url(#lineGrad)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />
                        </svg>
                    </div>
                </div>
            )}

            {/* Skills/Achievements */}
            <div className="mt-8 flex flex-wrap gap-2">
                {['DSA', 'System Design', 'AWS', 'Leadership', 'Open Source'].map((skill, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50 border border-white/5"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

// Compact version for cards
export const CompactTimeline = ({ milestones, color = '#C4A052' }) => (
    <div className="relative flex items-center gap-1 py-2">
        {milestones.slice(0, 5).map((step, index) => (
            <React.Fragment key={index}>
                <div
                    className="px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap"
                    style={{
                        background: index === milestones.length - 1 ? `${color}20` : 'rgba(255,255,255,0.05)',
                        color: index === milestones.length - 1 ? color : 'rgba(255,255,255,0.5)',
                        border: index === milestones.length - 1 ? `1px solid ${color}30` : '1px solid transparent'
                    }}
                >
                    {step}
                </div>
                {index < milestones.slice(0, 5).length - 1 && (
                    <svg className="w-3 h-3 text-white/20 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </React.Fragment>
        ))}
    </div>
)

export default CareerTimeline
