import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const close = () => setOpen(false)
  const group = new URLSearchParams(location.search).get('group')
  const isCharacters = location.pathname === '/characters'
  const isActive = (value) => isCharacters && group === value

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" onClick={close} aria-label="Gotham archive home">
          <span className="brand-mark"><span /></span>
          <span className="brand-copy">GOTHAM<span> ARCHIVE</span><small>THE BATMAN FILES</small></span>
        </Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <Link className={location.pathname === '/' ? 'active' : ''} to="/" onClick={close}>Home</Link>
          <Link className={isActive('family') ? 'active' : ''} to="/characters?group=family" onClick={close}>Bat-Family</Link>
          <Link className={location.pathname === '/robins' ? 'active' : ''} to="/robins" onClick={close}>Robin Legacy</Link>
          <Link className={location.pathname === '/comics' ? 'active' : ''} to="/comics" onClick={close}>Comic Vault</Link>
          <Link className={isActive('villains') ? 'active' : ''} to="/characters?group=villains" onClick={close}>Rogues Gallery</Link>
          <Link className={isActive('variants') ? 'active' : ''} to="/characters?group=variants" onClick={close}>Batman Variants</Link>
        </nav>
        <Link to="/characters" className="nav-cta" onClick={close}>OPEN CASE FILES <ChevronDown size={14} /></Link>
      </div>
    </header>
  )
}
