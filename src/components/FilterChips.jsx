import React, { useState } from 'react'

const filterCategories = {
    industry: {
        label: 'Industry',
        icon: '🏢',
        options: ['Technology', 'Finance', 'Healthcare', 'Design', 'Marketing', 'Consulting', 'Education', 'Startups']
    },
    experience: {
        label: 'Experience',
        icon: '⏱️',
        options: ['0-2 years', '2-5 years', '5-10 years', '10+ years']
    },
    salary: {
        label: 'Salary Range',
        icon: '💰',
        options: ['₹3-10 LPA', '₹10-25 LPA', '₹25-50 LPA', '₹50+ LPA']
    },
    stream: {
        label: 'Stream',
        icon: '📚',
        options: ['PCM', 'PCB', 'Commerce', 'Arts', 'Other']
    },
    difficulty: {
        label: 'Difficulty',
        icon: '📊',
        options: ['Easy', 'Moderate', 'Challenging', 'Expert']
    }
}

const FilterChips = ({ onFilterChange, activeFilters = {} }) => {
    const [expandedCategory, setExpandedCategory] = useState(null)

    const handleFilterToggle = (category, value) => {
        const currentFilters = activeFilters[category] || []
        const isActive = currentFilters.includes(value)

        const newFilters = isActive
            ? currentFilters.filter(v => v !== value)
            : [...currentFilters, value]

        onFilterChange?.({
            ...activeFilters,
            [category]: newFilters
        })
    }

    const clearFilters = () => {
        onFilterChange?.({})
    }

    const totalActiveFilters = Object.values(activeFilters).flat().length

    return (
        <div className="space-y-4">
            {/* Quick Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Clear All Button */}
                {totalActiveFilters > 0 && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear All ({totalActiveFilters})
                    </button>
                )}

                {/* Category Chips */}
                {Object.entries(filterCategories).map(([key, category]) => {
                    const activeCount = (activeFilters[key] || []).length
                    const isExpanded = expandedCategory === key

                    return (
                        <div key={key} className="relative">
                            <button
                                onClick={() => setExpandedCategory(isExpanded ? null : key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${isExpanded || activeCount > 0
                                        ? 'bg-[#C4A052]/20 text-[#C4A052] border-[#C4A052]/30'
                                        : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                                style={{ border: '1px solid' }}
                            >
                                <span>{category.icon}</span>
                                <span>{category.label}</span>
                                {activeCount > 0 && (
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C4A052] text-black text-[10px] font-bold">
                                        {activeCount}
                                    </span>
                                )}
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            <div
                                className={`absolute top-full left-0 mt-2 z-20 min-w-[200px] p-2 rounded-xl transition-all duration-300 ${isExpanded
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}
                                style={{
                                    background: '#1a1a1f',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                {category.options.map((option) => {
                                    const isActive = (activeFilters[key] || []).includes(option)
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleFilterToggle(key, option)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                                    ? 'bg-[#C4A052]/20 text-[#C4A052]'
                                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <span>{option}</span>
                                            {isActive && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Active Filters Display */}
            {totalActiveFilters > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/30 uppercase tracking-wider">Active:</span>
                    {Object.entries(activeFilters).map(([category, values]) =>
                        values.map((value) => (
                            <button
                                key={`${category}-${value}`}
                                onClick={() => handleFilterToggle(category, value)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#C4A052]/10 text-[#C4A052] border border-[#C4A052]/20 hover:bg-[#C4A052]/20 transition-colors group"
                            >
                                <span>{value}</span>
                                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

// Sort Options Component
export const SortOptions = ({ value, onChange }) => {
    const options = [
        { value: 'newest', label: 'Newest First', icon: '🆕' },
        { value: 'popular', label: 'Most Popular', icon: '🔥' },
        { value: 'rating', label: 'Highest Rated', icon: '⭐' },
        { value: 'salary', label: 'Highest Salary', icon: '💰' },
    ]

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Sort by:</span>
            <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/5">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onChange?.(option.value)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${value === option.value
                                ? 'bg-[#C4A052] text-black'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <span>{option.icon}</span>
                        <span className="hidden sm:inline">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

// Results Counter
export const ResultsCounter = ({ total, filtered }) => (
    <div className="flex items-center gap-2 text-sm">
        <span className="text-white/40">Showing</span>
        <span className="text-[#C4A052] font-semibold">{filtered.toLocaleString()}</span>
        <span className="text-white/40">of</span>
        <span className="text-white font-medium">{total.toLocaleString()}</span>
        <span className="text-white/40">journeys</span>
    </div>
)

export default FilterChips
