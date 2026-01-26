import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const mockJourneys = [
    {
        id: 1,
        title: 'Software Engineer at Google',
        stream: 'PCM  B.Tech CSE',
        currentSalary: '?45-55 LPA',
        timeToStability: '6 years',
        switches: 4,
        education: 'Tier-2 College',
        location: 'Bangalore',
        failures: 2,
        color: '#C4A052'
    },
    {
        id: 2,
        title: 'Product Manager at Microsoft',
        stream: 'Arts  MBA',
        currentSalary: '?35-45 LPA',
        timeToStability: '5 years',
        switches: 3,
        education: 'IIM',
        location: 'Hyderabad',
        failures: 1,
        color: '#A8D5BA'
    },
    {
        id: 3,
        title: 'Data Scientist at Amazon',
        stream: 'PCM  B.Sc  MS',
        currentSalary: '?40-50 LPA',
        timeToStability: '7 years',
        switches: 3,
        education: 'MS from USA',
        location: 'Bangalore',
        failures: 0,
        color: '#7EB8DA'
    },
    {
        id: 4,
        title: 'UX Designer at Swiggy',
        stream: 'Commerce  Design',
        currentSalary: '?25-35 LPA',
        timeToStability: '4 years',
        switches: 2,
        education: 'Self-taught',
        location: 'Bangalore',
        failures: 1,
        color: '#D4A5FF'
    }
]

const ComparePage = () => {
    const [selectedJourneys, setSelectedJourneys] = useState([1, 2])
    const [filters, setFilters] = useState({
        stream: '',
        minSalary: '',
        maxSwitches: '',
        timeToStability: ''
    })

    const toggleJourney = (id) => {
        if (selectedJourneys.includes(id)) {
            setSelectedJourneys(prev => prev.filter(j => j !== id))
        } else if (selectedJourneys.length < 3) {
            setSelectedJourneys(prev => [...prev, id])
        }
    }

    const selectedData = mockJourneys.filter(j => selectedJourneys.includes(j.id))

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            
            <main className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Compare Journeys
                        </h1>
                        <p className="text-white/50 max-w-lg mx-auto">
                            See different paths side by side. No "best" path � just different trade-offs.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <select
                            value={filters.stream}
                            onChange={(e) => setFilters(prev => ({ ...prev, stream: e.target.value }))}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C4A052]/50"
                        >
                            <option value="">All Streams</option>
                            <option value="pcm">PCM / Science</option>
                            <option value="commerce">Commerce</option>
                            <option value="arts">Arts</option>
                        </select>
                        
                        <select
                            value={filters.minSalary}
                            onChange={(e) => setFilters(prev => ({ ...prev, minSalary: e.target.value }))}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C4A052]/50"
                        >
                            <option value="">Any Salary</option>
                            <option value="10">?10L+ current</option>
                            <option value="25">?25L+ current</option>
                            <option value="40">?40L+ current</option>
                        </select>
                        
                        <select
                            value={filters.maxSwitches}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxSwitches: e.target.value }))}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C4A052]/50"
                        >
                            <option value="">Any # of switches</option>
                            <option value="2">2 switches</option>
                            <option value="3">3 switches</option>
                            <option value="5">5 switches</option>
                        </select>
                        
                        <select
                            value={filters.timeToStability}
                            onChange={(e) => setFilters(prev => ({ ...prev, timeToStability: e.target.value }))}
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C4A052]/50"
                        >
                            <option value="">Any timeline</option>
                            <option value="3">3 years</option>
                            <option value="5">5 years</option>
                            <option value="7">7 years</option>
                        </select>
                    </div>

                    {/* Journey Selection */}
                    <div className="mb-8">
                        <p className="text-white/40 text-sm mb-4">Select up to 3 journeys to compare:</p>
                        <div className="flex flex-wrap gap-3">
                            {mockJourneys.map(journey => (
                                <button
                                    key={journey.id}
                                    onClick={() => toggleJourney(journey.id)}
                                    className={`px-4 py-2 rounded-xl text-sm transition-all ${
                                        selectedJourneys.includes(journey.id)
                                            ? 'text-black font-medium'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                                    }`}
                                    style={selectedJourneys.includes(journey.id) ? { background: journey.color } : {}}
                                >
                                    {journey.title.split(' at ')[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Table */}
                    {selectedData.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-4 px-4 text-white/40 text-sm font-normal">Attribute</th>
                                        {selectedData.map(journey => (
                                            <th key={journey.id} className="text-left py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ background: journey.color }} />
                                                    <span className="text-white font-medium text-sm">{journey.title}</span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Stream</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-white/80 text-sm">{j.stream}</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Current Salary</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-green-400 text-sm font-medium">{j.currentSalary}</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Time to Stability</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-white/80 text-sm">{j.timeToStability}</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Career Switches</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-white/80 text-sm">{j.switches} switches</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Education</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-white/80 text-sm">{j.education}</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Location</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-white/80 text-sm">{j.location}</td>
                                        ))}
                                    </tr>
                                    <tr className="border-b border-white/5">
                                        <td className="py-4 px-4 text-white/40 text-sm">Major Failures</td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4 text-white/80 text-sm">
                                                {j.failures === 0 ? 'None documented' : `${j.failures} documented`}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4"></td>
                                        {selectedData.map(j => (
                                            <td key={j.id} className="py-4 px-4">
                                                <Link
                                                    to={`/journey/${j.id}`}
                                                    className="text-sm font-medium hover:underline"
                                                    style={{ color: j.color }}
                                                >
                                                    View full journey 
                                                </Link>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="mt-12 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                        <p className="text-white/30 text-xs">
                            Comparison based on self-reported data. Each path has unique circumstances.
                            <br />
                            There is no "better" path � only different trade-offs.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ComparePage
