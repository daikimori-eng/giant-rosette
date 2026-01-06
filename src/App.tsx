import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubjectMenu from './pages/SubjectMenu';
import Quiz from './pages/Quiz';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import Layout from './components/layout/Layout';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="subject/:subjectId" element={<SubjectMenu />} />
                    <Route path="quiz/:subjectId/:mode" element={<Quiz />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </Router>
    );
}


export default App;

