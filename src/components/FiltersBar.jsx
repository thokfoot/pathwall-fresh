import React, { useState } from 'react'

/**
 * Prompt for Copilot:
 * "Create a FiltersBar component with dropdowns for Stream, Course, Profession,
 * and a search input. When filters are applied, show only relevant threads."
 */

const FiltersBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        stream: 'All',
        profession: 'All',
        salary: 'All',
        search: '',
    })

    const handleChange = (key, value) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onFilterChange?.(newFilters)
    }

    return (
        <section className="py-8 px-6 bg-dark-card sticky top-0 z-40 border-b border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search careers..."
                        className="px-4 py-2 bg-dark-bg text-white rounded-lg border border-gray-700 focus:border-accent outline-none"
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />

                    {/* Stream Filter */}
                    <select
                        className="px-4 py-2 bg-dark-bg text-white rounded-lg border border-gray-700 focus:border-accent outline-none"
                        value={filters.stream}
                        onChange={(e) => handleChange('stream', e.target.value)}
                    >
                        <option>All Streams</option>
                        <option>Science</option>
                        <option>Commerce</option>
                        <option>Arts</option>
                    </select>

                    {/* Profession Filter */}
                    <select
                        className="px-4 py-2 bg-dark-bg text-white rounded-lg border border-gray-700 focus:border-accent outline-none"
                        value={filters.profession}
                        onChange={(e) => handleChange('profession', e.target.value)}
                    >
                        <option>All Professions</option>
                        <option>Engineer</option>
                        <option>Doctor</option>
                        <option>Designer</option>
                        <option>Creator</option>
                        <option>Business</option>
                    </select>

                    {/* Salary Filter */}
                    <select
                        className="px-4 py-2 bg-dark-bg text-white rounded-lg border border-gray-700 focus:border-accent outline-none"
                        value={filters.salary}
                        onChange={(e) => handleChange('salary', e.target.value)}
                    >
                        <option>All Salaries</option>
                        <option>&lt;10L</option>
                        <option>10-20L</option>
                        <option>20-40L</option>
                        <option>40L+</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

export default FiltersBar
