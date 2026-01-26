/**
 * Prompt for Copilot:
 * "Create an Express server with MongoDB connection.
 * Define routes for /threads, /journeys, /videos, /users.
 * Use dotenv for environment variables and cors for frontend connection."
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())

// Sample data (replace with MongoDB later)
const sampleThreads = [
    {
        id: 1,
        name: 'Software Engineer',
        stream: 'Science',
        salary: '₹25L',
        difficulty: 'Medium',
        years: 8,
        switches: 3,
        description: 'Started with PCM, got into B.Tech CSE. First job at ₹8L in a startup.',
        milestones: [
            {
                year: '11th',
                label: '11th Grade - PCM',
                position: 10,
                insight: 'Chose PCM, struggled with chemistry',
                videoUrl: 'https://example.com/video1',
                timestamp: '00:15'
            },
            {
                year: 'Degree',
                label: 'B.Tech CSE',
                position: 35,
                insight: 'Coding clicked in 2nd year. Built 5+ projects.',
                videoUrl: 'https://example.com/video1',
                timestamp: '02:30'
            },
            {
                year: 'Job',
                label: 'First Job - ₹8L',
                position: 65,
                insight: 'Startup job. Learned more in 6 months than 4 years.',
                videoUrl: 'https://example.com/video1',
                timestamp: '05:45'
            },
            {
                year: 'Today',
                label: 'Senior Dev - ₹25L',
                position: 90,
                insight: 'Switched 3 times. Each switch = ₹5L+ jump.',
                videoUrl: 'https://example.com/video1',
                timestamp: '08:20'
            },
        ],
    },
    {
        id: 2,
        name: 'Product Designer',
        stream: 'Commerce',
        salary: '₹18L',
        difficulty: 'Medium',
        years: 6,
        switches: 2,
        description: 'Commerce background, learned design through bootcamps.',
        milestones: [
            {
                year: '11th',
                label: '11th Grade - Commerce',
                position: 10,
                insight: 'Wanted CA, but loved art',
                videoUrl: 'https://example.com/video2',
                timestamp: '00:20'
            },
            {
                year: 'Degree',
                label: 'BBA + Design Bootcamp',
                position: 40,
                insight: 'Realized business + design = product',
                videoUrl: 'https://example.com/video2',
                timestamp: '03:10'
            },
            {
                year: 'Job',
                label: 'UI/UX Intern - ₹0',
                position: 60,
                insight: 'Worked free for 3 months to build portfolio',
                videoUrl: 'https://example.com/video2',
                timestamp: '06:00'
            },
            {
                year: 'Today',
                label: 'Product Designer - ₹18L',
                position: 90,
                insight: 'Remote job, travel 6 months/year',
                videoUrl: 'https://example.com/video2',
                timestamp: '09:15'
            },
        ],
    },
]

// Routes

/**
 * GET /api/threads
 * Returns all career threads with filtering
 */
app.get('/api/threads', (req, res) => {
    const { stream, profession, salary, search } = req.query

    let filtered = sampleThreads

    if (stream && stream !== 'All Streams') {
        filtered = filtered.filter(t => t.stream === stream)
    }

    if (search) {
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase())
        )
    }

    res.json({
        success: true,
        count: filtered.length,
        threads: filtered
    })
})

/**
 * GET /api/threads/:id
 * Returns a single thread by ID
 */
app.get('/api/threads/:id', (req, res) => {
    const thread = sampleThreads.find(t => t.id === parseInt(req.params.id))

    if (!thread) {
        return res.status(404).json({ success: false, message: 'Thread not found' })
    }

    res.json({ success: true, thread })
})

/**
 * POST /api/submit-journey
 * Allows users to submit their own journey
 * Includes validation to filter boring/empty responses
 */
app.post('/api/submit-journey', (req, res) => {
    const { name, stream, milestones, confusion, salary, regrets, learnings } = req.body

    // Validation
    if (!name || !stream || !milestones || milestones.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Name, stream, and at least one milestone are required'
        })
    }

    // Filter boring responses (less than 20 characters)
    if (confusion && confusion.length < 20) {
        return res.status(400).json({
            success: false,
            message: 'Please provide more detailed answers (minimum 20 characters)'
        })
    }

    // TODO: Save to MongoDB
    console.log('New journey submitted:', { name, stream })

    res.json({
        success: true,
        message: 'Journey submitted successfully! It will be reviewed and added soon.'
    })
})

/**
 * GET /api/videos
 * Returns video metadata for milestone integration
 */
app.get('/api/videos', (req, res) => {
    const videos = [
        {
            id: 1,
            threadId: 1,
            url: 'https://example.com/video1',
            title: 'Software Engineer Journey',
            duration: '10:30',
            milestones: [
                { timestamp: '00:15', label: '11th Grade' },
                { timestamp: '02:30', label: 'College' },
                { timestamp: '05:45', label: 'First Job' },
                { timestamp: '08:20', label: 'Today' },
            ]
        },
        {
            id: 2,
            threadId: 2,
            url: 'https://example.com/video2',
            title: 'Product Designer Journey',
            duration: '12:00',
            milestones: [
                { timestamp: '00:20', label: '11th Grade' },
                { timestamp: '03:10', label: 'College + Bootcamp' },
                { timestamp: '06:00', label: 'Internship' },
                { timestamp: '09:15', label: 'Full-time' },
            ]
        },
    ]

    res.json({ success: true, videos })
})

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'PathWall API is running' })
})

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ success: false, message: 'Something went wrong!' })
})

app.listen(PORT, () => {
    console.log(`🚀 PathWall API running on http://localhost:${PORT}`)
})
