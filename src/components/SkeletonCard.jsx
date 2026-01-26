import React from 'react'

// Skeleton shimmer animation
const shimmer = `
@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
`

const SkeletonPulse = ({ className = '' }) => (
    <div
        className={`rounded ${className}`}
        style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
        }}
    />
)

// Journey Card Skeleton
export const JourneyCardSkeleton = () => (
    <>
        <style>{shimmer}</style>
        <div className="relative bg-[#0f0f12] rounded-2xl border border-white/5 p-6 overflow-hidden">
            {/* Top accent line */}
            <SkeletonPulse className="absolute top-0 left-0 right-0 h-1" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <SkeletonPulse className="w-12 h-12 rounded-full" />
                    <div>
                        <SkeletonPulse className="w-24 h-4 mb-2" />
                        <SkeletonPulse className="w-16 h-3" />
                    </div>
                </div>
                <SkeletonPulse className="w-16 h-6 rounded-full" />
            </div>

            {/* Title */}
            <SkeletonPulse className="w-3/4 h-5 mb-3" />

            {/* Description */}
            <SkeletonPulse className="w-full h-3 mb-2" />
            <SkeletonPulse className="w-5/6 h-3 mb-6" />

            {/* Milestones */}
            <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <SkeletonPulse key={i} className="w-16 h-6 rounded-lg" />
                ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
                <SkeletonPulse className="w-20 h-4" />
                <SkeletonPulse className="w-16 h-4" />
                <SkeletonPulse className="w-12 h-4" />
            </div>
        </div>
    </>
)

// Industry Card Skeleton
export const IndustryCardSkeleton = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-[#0f0f12] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center gap-4 mb-4">
                <SkeletonPulse className="w-14 h-14 rounded-xl" />
                <div>
                    <SkeletonPulse className="w-24 h-5 mb-2" />
                    <SkeletonPulse className="w-32 h-3" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <SkeletonPulse className="w-20 h-4" />
                <SkeletonPulse className="w-16 h-6 rounded-full" />
            </div>
        </div>
    </>
)

// Testimonial Skeleton
export const TestimonialSkeleton = () => (
    <>
        <style>{shimmer}</style>
        <div className="bg-[#0f0f12] rounded-2xl border border-white/5 p-8">
            <div className="flex items-center gap-4 mb-6">
                <SkeletonPulse className="w-16 h-16 rounded-full" />
                <div>
                    <SkeletonPulse className="w-32 h-5 mb-2" />
                    <SkeletonPulse className="w-24 h-3" />
                </div>
            </div>
            <SkeletonPulse className="w-full h-4 mb-2" />
            <SkeletonPulse className="w-full h-4 mb-2" />
            <SkeletonPulse className="w-3/4 h-4 mb-6" />
            <div className="flex gap-4">
                <SkeletonPulse className="w-28 h-16 rounded-lg" />
                <SkeletonPulse className="w-28 h-16 rounded-lg" />
            </div>
        </div>
    </>
)

// Hero Search Skeleton
export const SearchSkeleton = () => (
    <>
        <style>{shimmer}</style>
        <SkeletonPulse className="w-full max-w-xl h-14 rounded-2xl mx-auto" />
    </>
)

// Stats Skeleton
export const StatsSkeleton = () => (
    <>
        <style>{shimmer}</style>
        <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center px-6 py-4 rounded-xl bg-[#0c0c0f] border border-white/5">
                    <SkeletonPulse className="w-20 h-8 mb-2 mx-auto" />
                    <SkeletonPulse className="w-16 h-3 mx-auto" />
                </div>
            ))}
        </div>
    </>
)

// Full Page Skeleton
export const PageSkeleton = () => (
    <>
        <style>{shimmer}</style>
        <div className="min-h-screen bg-[#0a0a0a] p-8">
            {/* Navbar Skeleton */}
            <div className="flex items-center justify-between mb-16">
                <SkeletonPulse className="w-32 h-8" />
                <div className="hidden md:flex items-center gap-6">
                    <SkeletonPulse className="w-16 h-4" />
                    <SkeletonPulse className="w-16 h-4" />
                    <SkeletonPulse className="w-16 h-4" />
                </div>
                <SkeletonPulse className="w-24 h-10 rounded-full" />
            </div>

            {/* Hero Skeleton */}
            <div className="text-center mb-24">
                <SkeletonPulse className="w-48 h-6 rounded-full mx-auto mb-6" />
                <SkeletonPulse className="w-96 h-16 mx-auto mb-4" />
                <SkeletonPulse className="w-64 h-8 mx-auto mb-8" />
                <SearchSkeleton />
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <JourneyCardSkeleton key={i} />
                ))}
            </div>
        </div>
    </>
)

// Loading Spinner
export const LoadingSpinner = ({ size = 'md', color = '#C4A052' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    }

    return (
        <div className={`${sizeClasses[size]} animate-spin`}>
            <svg viewBox="0 0 24 24" fill="none">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={color}
                    strokeWidth="3"
                />
                <path
                    className="opacity-75"
                    fill={color}
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    )
}

// Progress Bar
export const ProgressBar = ({ progress = 0, color = '#C4A052' }) => (
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div
            className="h-full rounded-full transition-all duration-300"
            style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                boxShadow: `0 0 10px ${color}40`,
            }}
        />
    </div>
)

export default {
    JourneyCardSkeleton,
    IndustryCardSkeleton,
    TestimonialSkeleton,
    SearchSkeleton,
    StatsSkeleton,
    PageSkeleton,
    LoadingSpinner,
    ProgressBar,
}
