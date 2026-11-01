import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import GothamTransition from './components/GothamTransition.jsx'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import RobinHall from './pages/RobinHall.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import ComicsVault from './pages/ComicsVault.jsx'
import characters from './data/characters.json'

function ScrollManager() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [location.pathname])
  return null
}

function PageRoutes({ onJump }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 15, clipPath: 'inset(0 0 12% 0)', filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)' }}
        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)', filter: 'blur(4px)' }}
        transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home onJump={onJump} />} />
          <Route path="/characters" element={<Gallery onJump={onJump} />} />
          <Route path="/robins" element={<RobinHall onJump={onJump} />} />
          <Route path="/comics" element={<ComicsVault />} />
          <Route path="/character/:id" element={<CharacterDetail onJump={onJump} />} />
          <Route path="/gallery" element={<Navigate to="/characters" replace />} />
          <Route path="/spider/:id" element={<Navigate to="/characters" replace />} />
          <Route path="*" element={<div className="not-found"><span>404 // GOTHAM DATABASE</span><h1>THIS FILE IS CLASSIFIED.</h1><a href="/characters" className="button-primary">Return to the archive ↗</a></div>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const [jumpTarget, setJumpTarget] = useState(null)
  const navigate = useNavigate()
  const target = characters.find((character) => character.id === jumpTarget)

  const onJump = (id) => {
    if (jumpTarget) return
    setJumpTarget(id)
    window.setTimeout(() => {
      navigate(`/character/${id}`)
      window.setTimeout(() => setJumpTarget(null), 190)
    }, 500)
  }

  return (
    <>
      <ScrollManager />
      <Navbar />
      <PageRoutes onJump={onJump} />
      <Footer />
      <GothamTransition active={Boolean(jumpTarget)} characterName={target?.name} />
    </>
  )
}
