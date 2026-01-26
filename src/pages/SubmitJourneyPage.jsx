import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const steps = [
    { id: 1, title: 'Background', icon: '' },
    { id: 2, title: 'Timeline', icon: '' },
    { id: 3, title: 'Salary Ranges', icon: '' },
    { id: 4, title: 'Failures & Lessons', icon: '' },
    { id: 5, title: 'Review & Submit', icon: '' }
]

const SubmitJourneyPage = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        background: {
            education: '',
            stream: '',
            location: '',
            constraints: ''
        },
        timeline: [
            { year: '', phase: '', event: '', type: 'job' }
        ],
        salaries: [
            { phase: '', range: '', optional: true }
        ],
        failures: [''],
        lessons: [''],
        misunderstandings: {
            at18: '',
            at22: '',
            at25: ''
        }
    })

    const updateBackground = (field, value) => {
        setFormData(prev => ({
            ...prev,
            background: { ...prev.background, [field]: value }
        }))
    }

    const addTimelineEntry = () => {
        setFormData(prev => ({
            ...prev,
            timeline: [...prev.timeline, { year: '', phase: '', event: '', type: 'job' }]
        }))
    }

    const updateTimeline = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            timeline: prev.timeline.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }))
    }

    const addFailure = () => {
        setFormData(prev => ({ ...prev, failures: [...prev.failures, ''] }))
    }

    const updateFailure = (index, value) => {
        setFormData(prev => ({
            ...prev,
            failures: prev.failures.map((item, i) => i === index ? value : item)
        }))
    }

    const addLesson = () => {
        setFormData(prev => ({ ...prev, lessons: [...prev.lessons, ''] }))
    }

    const updateLesson = (index, value) => {
        setFormData(prev => ({
            ...prev,
            lessons: prev.lessons.map((item, i) => i === index ? value : item)
        }))
    }

    const handleSubmit = () => {
        console.log('Submitted journey:', formData)
        alert('Thank you! Your journey has been submitted for review.')
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            
            <main className="pt-24 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Share Your Journey
                        </h1>
                        <p className="text-white/50 max-w-lg mx-auto">
                            Your story might help someone feel less lost.
                            <br />
                            <span className="text-white/30">100% anonymous. Takes ~10 minutes.</span>
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-12 overflow-x-auto pb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <button
                                    onClick={() => setCurrentStep(step.id)}
                                    className={`flex flex-col items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                                        currentStep === step.id 
                                            ? 'bg-[#C4A052]/20 text-[#C4A052]' 
                                            : currentStep > step.id
                                                ? 'text-green-400'
                                                : 'text-white/30'
                                    }`}
                                >
                                    <span className="text-xl">{step.icon}</span>
                                    <span className="text-xs whitespace-nowrap">{step.title}</span>
                                </button>
                                {index < steps.length - 1 && (
                                    <div className={`w-8 h-px mx-2 ${currentStep > step.id ? 'bg-green-400' : 'bg-white/10'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                        
                        {/* Step 1: Background */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Tell us about your starting point</h2>
                                
                                <div>
                                    <label className="block text-white/60 text-sm mb-2">Education Path</label>
                                    <input
                                        type="text"
                                        value={formData.background.education}
                                        onChange={(e) => updateBackground('education', e.target.value)}
                                        placeholder="e.g., 11th PCM  B.Tech CSE (Tier-2 College)"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/60 text-sm mb-2">Stream in 11th/12th</label>
                                    <select
                                        value={formData.background.stream}
                                        onChange={(e) => updateBackground('stream', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C4A052]/50"
                                    >
                                        <option value="">Select stream</option>
                                        <option value="pcm">PCM (Science with Maths)</option>
                                        <option value="pcb">PCB (Science with Biology)</option>
                                        <option value="commerce">Commerce</option>
                                        <option value="arts">Arts / Humanities</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white/60 text-sm mb-2">Location Journey</label>
                                    <input
                                        type="text"
                                        value={formData.background.location}
                                        onChange={(e) => updateBackground('location', e.target.value)}
                                        placeholder="e.g., Small town in UP  Bangalore"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/60 text-sm mb-2">Constraints & Context</label>
                                    <textarea
                                        value={formData.background.constraints}
                                        onChange={(e) => updateBackground('constraints', e.target.value)}
                                        placeholder="e.g., First-generation engineer, limited exposure, financial constraints..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50 resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Timeline */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Your career timeline</h2>
                                <p className="text-white/40 text-sm mb-6">Add each major phase or switch in your career</p>
                                
                                {formData.timeline.map((entry, index) => (
                                    <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={entry.year}
                                                onChange={(e) => updateTimeline(index, 'year', e.target.value)}
                                                placeholder="Year range (e.g., 2018-2020)"
                                                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                            />
                                            <select
                                                value={entry.type}
                                                onChange={(e) => updateTimeline(index, 'type', e.target.value)}
                                                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C4A052]/50"
                                            >
                                                <option value="education">Education</option>
                                                <option value="job">Job</option>
                                                <option value="gap">Gap / Break</option>
                                                <option value="skill">Skill Building</option>
                                            </select>
                                        </div>
                                        <input
                                            type="text"
                                            value={entry.phase}
                                            onChange={(e) => updateTimeline(index, 'phase', e.target.value)}
                                            placeholder="Phase name (e.g., First Job at TCS)"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                        />
                                        <textarea
                                            value={entry.event}
                                            onChange={(e) => updateTimeline(index, 'event', e.target.value)}
                                            placeholder="What happened? Be honest about struggles..."
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50 resize-none"
                                        />
                                    </div>
                                ))}
                                
                                <button
                                    onClick={addTimelineEntry}
                                    className="w-full py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white/60 hover:border-white/40 transition-all"
                                >
                                    + Add another phase
                                </button>
                            </div>
                        )}

                        {/* Step 3: Salaries */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-white mb-2">Salary ranges (optional)</h2>
                                <p className="text-white/40 text-sm mb-6">
                                    We only show ranges, never exact numbers. This helps others set realistic expectations.
                                </p>
                                
                                {formData.timeline.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="text-white/60 text-sm min-w-[120px]">{entry.phase || `Phase ${index + 1}`}</span>
                                        <select
                                            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C4A052]/50"
                                        >
                                            <option value="">Prefer not to say</option>
                                            <option value="0-3">?0-3 LPA</option>
                                            <option value="3-6">?3-6 LPA</option>
                                            <option value="6-10">?6-10 LPA</option>
                                            <option value="10-15">?10-15 LPA</option>
                                            <option value="15-25">?15-25 LPA</option>
                                            <option value="25-40">?25-40 LPA</option>
                                            <option value="40-60">?40-60 LPA</option>
                                            <option value="60+">?60+ LPA</option>
                                        </select>
                                    </div>
                                ))}
                                
                                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <p className="text-blue-400 text-sm">
                                         Salary data is completely optional and always shown as ranges.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Failures & Lessons */}
                        {currentStep === 4 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-2">Mistakes & failures</h2>
                                    <p className="text-white/40 text-sm mb-4">What went wrong? What would you do differently?</p>
                                    
                                    {formData.failures.map((failure, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={failure}
                                            onChange={(e) => updateFailure(index, e.target.value)}
                                            placeholder="e.g., Wasted 2 years not building anything"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50 mb-3"
                                        />
                                    ))}
                                    <button
                                        onClick={addFailure}
                                        className="text-white/40 text-sm hover:text-white/60"
                                    >
                                        + Add more
                                    </button>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-2">What actually worked</h2>
                                    <p className="text-white/40 text-sm mb-4">Not advice � just what made a difference for you</p>
                                    
                                    {formData.lessons.map((lesson, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={lesson}
                                            onChange={(e) => updateLesson(index, e.target.value)}
                                            placeholder="e.g., Consistent practice for 18 months"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50 mb-3"
                                        />
                                    ))}
                                    <button
                                        onClick={addLesson}
                                        className="text-white/40 text-sm hover:text-white/60"
                                    >
                                        + Add more
                                    </button>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">What you misunderstood at different ages</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">At 18</label>
                                            <input
                                                type="text"
                                                value={formData.misunderstandings.at18}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    misunderstandings: { ...prev.misunderstandings, at18: e.target.value }
                                                }))}
                                                placeholder="What did you believe that turned out to be wrong?"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">At 22</label>
                                            <input
                                                type="text"
                                                value={formData.misunderstandings.at22}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    misunderstandings: { ...prev.misunderstandings, at22: e.target.value }
                                                }))}
                                                placeholder="What changed in your understanding?"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white/60 text-sm mb-2">At 25+</label>
                                            <input
                                                type="text"
                                                value={formData.misunderstandings.at25}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    misunderstandings: { ...prev.misunderstandings, at25: e.target.value }
                                                }))}
                                                placeholder="What do you know now?"
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#C4A052]/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Review */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Review your submission</h2>
                                
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <p className="text-white/60 text-sm mb-4">Your journey will be:</p>
                                    <ul className="space-y-2 text-white/80 text-sm">
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-400"></span>
                                            100% anonymous � no names, no identifiable info
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-400"></span>
                                            Reviewed for clarity (not edited for success)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-400"></span>
                                            Published within 48 hours if approved
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-4 rounded-xl bg-[#C4A052]/10 border border-[#C4A052]/20">
                                    <p className="text-[#C4A052] text-sm">
                                         By submitting, you confirm this is your real experience and contains no promotional content.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                            <button
                                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                                disabled={currentStep === 1}
                                className="px-6 py-3 rounded-xl text-white/50 hover:text-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                 Back
                            </button>
                            
                            {currentStep < 5 ? (
                                <button
                                    onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                                    className="px-6 py-3 rounded-xl bg-[#C4A052] text-black font-medium hover:bg-[#D4B062] transition-all"
                                >
                                    Continue 
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-3 rounded-xl bg-green-500 text-black font-medium hover:bg-green-400 transition-all"
                                >
                                    Submit Journey
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SubmitJourneyPage
