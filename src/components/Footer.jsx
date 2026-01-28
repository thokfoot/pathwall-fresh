import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const [email, setEmail] = useState('')

    const footerLinks = {
        explore: [
            { name: 'All Journeys', href: '/explore' },
            { name: 'By Stream', href: '/explore?filter=stream' },
            { name: 'By Salary', href: '/explore?filter=salary' },
            { name: 'Success Stories', href: '/stories' }
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Ethics', href: '/ethics' },
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' }
        ],
        connect: [
            { name: 'Twitter', href: 'https://twitter.com' },
            { name: 'LinkedIn', href: 'https://linkedin.com' },
            { name: 'Instagram', href: 'https://instagram.com' }
        ]
    }

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        console.log('Newsletter signup:', email)
        setEmail('')
    }

    return (
        <footer className="relative overflow-hidden" style={{ background: '#050506' }}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#080809] to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#C4A052]/3 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C4A052] to-[#8B7355] flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="text-white font-semibold text-lg">
                                Path<span className="text-[#C4A052]">Wall</span>
                            </span>
                        </Link>
                        <p className="text-white/35 text-sm leading-relaxed mb-6">
                            Real career journeys from 11th grade to professional life.
                            No sugar-coating, just truth.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {['twitter', 'linkedin', 'instagram'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com`}
                                    className="w-9 h-9 rounded-lg bg-white/4 hover:bg-[#C4A052]/15 border border-white/8 hover:border-[#C4A052]/25 flex items-center justify-center transition-all duration-300 group"
                                >
                                    <span className="text-white/35 group-hover:text-[#C4A052] text-sm capitalize">
                                        {social[0].toUpperCase()}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {footerLinks.explore.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-white/35 hover:text-[#C4A052] text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-white/35 hover:text-[#C4A052] text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
                        <p className="text-white/35 text-sm mb-4">
                            Get weekly career insights and new journeys.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-2.5 rounded-lg bg-white/4 border border-white/8 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#C4A052]/40 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 rounded-lg bg-[#C4A052] hover:bg-[#D4B062] text-black font-medium text-sm transition-colors h-full sm:h-auto"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-8">
                    <p className="text-white/25 text-xs text-center leading-relaxed">
                        <strong className="text-white/35">Disclaimer:</strong> PathWall does not provide career advice.
                        This platform documents experiences, not recommendations.
                        <br />
                        Your path will be different. Use this as context, not guidance.
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-white/25 text-sm">
                        2024 PathWall. All rights reserved.
                    </p>
                    <div className="flex gap-6 justify-center md:justify-end w-full md:w-auto">
                        <Link to="/privacy" className="text-white/25 hover:text-white/50 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-white/25 hover:text-white/50 text-sm transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer