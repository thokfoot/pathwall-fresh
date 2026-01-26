import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JourneyDetailPage from './pages/JourneyDetailPage'
import SubmitJourneyPage from './pages/SubmitJourneyPage'
import ComparePage from './pages/ComparePage'
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/journey/:id" element={<JourneyDetailPage />} />
                <Route path="/submit" element={<SubmitJourneyPage />} />
                <Route path="/compare" element={<ComparePage />} />
            </Routes>
        </Router>
    )
}

export default App
