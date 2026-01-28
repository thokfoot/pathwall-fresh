import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const location = useLocation()

    const navItems = [
        { name: 'Browse', path: '/', section: 'threads-section' },
        { name: 'Compare', path: '/compare', section: null },
        { name: 'Submit', path: '/submit', section: null },
    ]

    const handleNavClick = (item) => {
        if (item.section && location.pathname === '/') {
            const element = document.getElementById(item.section)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsOpen(false)
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: 'rgba(10, 10, 10, 0.9)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-110"
                                style={{
                                    background: 'linear-gradient(135deg, #C4A052, #9A7B3D)',
                                    color: '#0a0a0a',
                                }}
                            >
                                C
                            </div>
                        </div>
                        <span className="text-xl font-bold hidden sm:block text-white/90">
                            Co <span className="font-normal text-white/60">Ends</span>
                        </span>
                    </Link>

                    {/* Center Search Bar - Desktop */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-8">
                        <div
                            className={`neon-search relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${isSearchFocused
                                ? 'bg-white/10 border-[#C4A052]/30'
                                : 'bg-white/5 border-white/10'
                                }`}
                            style={{ border: '1px solid' }}
                        >
                            <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                placeholder="Search careers, companies..."
                                className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
                            />
                            <kbd className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-white/25 text-[10px] font-medium">
                                <span></span>K
                            </kbd>
                        </div>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            item.path === '/' ? (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item)}
                                    className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            to="/submit"
                            className="px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #C4A052, #9A7B3D)',
                                color: '#0a0a0a',
                            }}
                        >
                            Share Journey
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                style={{
                    background: 'rgba(10, 10, 10, 0.98)',
                    borderTop: isOpen ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                }}
            >
                <div className="px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        item.path === '/' ? (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item)}
                                className="w-full text-left px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                                {item.name}
                            </button>
                        ) : (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                                {item.name}
                            </Link>
                        )
                    ))}

                    <div className="pt-4 border-t border-white/5">
                        <Link
                            to="/submit"
                            onClick={() => setIsOpen(false)}
                            className="block w-full px-4 py-3 text-base font-semibold rounded-xl text-center"
                            style={{
                                background: 'linear-gradient(135deg, #C4A052, #9A7B3D)',
                                color: '#0a0a0a'
                            }}
                        >
                            Share Your Journey
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
