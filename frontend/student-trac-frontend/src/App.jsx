import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import CreateProfile from './components/CreateProfile'
import ViewProfile from './components/ViewProfile'
import EditInfo from './components/EditInfo'
import ViewCourses from './components/ViewCourses'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Landing or Create Profile */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />

        {/* Profile Pages */}
        <Route path="/profile/:studentId" element={<ViewProfile />} />
        <Route path="/edit/:studentId" element={<EditInfo />} />

        {/* Courses */}
        <Route path="/courses" element={<ViewCourses />} />

        {/* Catch-all → redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App