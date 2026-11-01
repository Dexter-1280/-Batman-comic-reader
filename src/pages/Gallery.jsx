import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownUp, Filter, Search, SlidersHorizontal, Files, ArrowRight } from 'lucide-react'
import CharacterCard from '../components/CharacterCard.jsx'
import GothamCanvas from '../components/GothamCanvas.jsx'
import characters from '../data/characters.json'

const groupLabels = {
  all: { eyebrow: 'GOTHAM CITY DATABASE', title: <>THE GOTHAM<br /><em>ARCHIVE.</em></>, description: 'A field guide to the Dark Knight, his allies, his enemies and the many people who have worn the cowl.' },
  family: { eyebrow: 'ALLIES / INNER CIRCLE', title: <>THE BAT-<br /><em>FAMILY.</em></>, description: 'The people behind the symbol: partners, protégés, friends and family who defend Gotham alongside the Dark Knight.' },
  villains: { eyebrow: 'ARKHAM / MOST WANTED', title: <>THE ROGUES<br /><em>GALLERY.</em></>, description: 'The criminals, masterminds and monsters who keep Gotham on the edge — and keep Batman in the shadows.' },
  variants: { eyebrow: 'MULTIVERSE / COMIC & CINEMATIC COWLS', title: <>BEYOND THE<br /><em>BAT-SIGNAL.</em></>, description: 'Alternate comic-book Batmen, future successors and the real-world actors who brought the Dark Knight to the screen.' }
}

export default function Gallery({ onJump }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const reducedMotion = useReducedMotion()
  const selectedGroup = searchParams.get('group') || 'all'
  const sortOrder = searchParams.get('sort') || 'az'
  const searchTerm = searchParams.get('q') || ''
  const mediaType = searchParams.get('type') || 'all'
  const config = groupLabels[selectedGroup] || groupLabels.all
  const scopedCharacters = selectedGroup === 'all'
    ? characters
    : selectedGroup === 'family'
      ? characters.filter((character) => character.group === 'family' || character.group === 'core')
      : characters.filter((character) => character.group === selectedGroup)

  const updateParam = (key, value, defaultValue) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === defaultValue) next.delete(key)
    else next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  const visibleCharacters = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase()
    return scopedCharacters
      .filter((character) => mediaType === 'all' || (mediaType === 'live-action' ? character.mediaType === 'live-action' : character.mediaType !== 'live-action'))
      .filter((character) => !normalized || `${character.name} ${character.realName} ${character.affiliation} ${character.universe} ${character.status} ${character.powers.join(' ')} ${character.description}`.toLowerCase().includes(normalized))
      .sort((a, b) => {
        if (sortOrder === 'za') return b.name.localeCompare(a.name)
        if (sortOrder === 'number') return a.number.localeCompare(b.number)
        return a.name.localeCompare(b.name)
      })
  }, [scopedCharacters, sortOrder, searchTerm, mediaType])

  const activeCoordinates = `group=${selectedGroup}&sort=${sortOrder}${searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''}`
  const totalLabel = String(scopedCharacters.length).padStart(2, '0')

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <GothamCanvas className="gallery-atmosphere" />
        <div className="gallery-hero-shell">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow"><span className="eyebrow-dot" /> {config.eyebrow} // FILES 001—{totalLabel}</div>
            <h1>{config.title}</h1>
            <p>{config.description}</p>
            {selectedGroup === 'family' && <Link to="/robins" className="text-link gallery-inline-link">Explore the full Robin timeline <ArrowRight size={15} /></Link>}
          </motion.div>
          <div className="gallery-hero-count"><strong>{scopedCharacters.length}</strong><span>CASE<br />FILES</span></div>
        </div>
      </section>

      <section className="directory-section">
        <div className="directory-toolbar">
          <div className="directory-title"><span className="toolbar-icon"><Files size={15} /></span><div><span>DATABASE / SEARCH</span><small>{visibleCharacters.length} of {scopedCharacters.length} profiles visible</small></div></div>
          <div className="filters-group">
            <label className="filter-control search-control"><Search size={15} /><input value={searchTerm} onChange={(event) => updateParam('q', event.target.value, '')} placeholder="Search name, identity or skill" aria-label="Search character files" /></label>
            <label className="filter-control"><SlidersHorizontal size={15} /><select value={selectedGroup} onChange={(event) => setSearchParams(event.target.value === 'all' ? {} : { group: event.target.value })} aria-label="Filter by category"><option value="all">All files</option><option value="family">Bat-Family</option><option value="villains">Rogues Gallery</option><option value="variants">Batman variants</option></select></label>
            {selectedGroup === 'variants' && <label className="filter-control"><SlidersHorizontal size={15} /><select value={mediaType} onChange={(event) => updateParam('type', event.target.value, 'all')} aria-label="Filter Batman variants"><option value="all">All variants</option><option value="comic">Comic multiverse</option><option value="live-action">Live-action film Batmen</option></select></label>}
            <label className="filter-control sort-control"><ArrowDownUp size={15} /><select value={sortOrder} onChange={(event) => updateParam('sort', event.target.value, 'az')} aria-label="Sort character files"><option value="az">Name: A—Z</option><option value="za">Name: Z—A</option><option value="number">File number</option></select></label>
          </div>
        </div>
        <div className="active-filter-row"><span>QUERY / CURRENT FILTER</span><code>{activeCoordinates}</code><button onClick={() => setSearchParams({})}>Clear filters ↺</button></div>
        {visibleCharacters.length ? (
          <div className="directory-grid">
            {visibleCharacters.map((character, index) => <CharacterCard key={character.id} character={character} index={index} onJump={onJump} />)}
          </div>
        ) : (
          <div className="empty-state"><span>NO MATCHES IN THE DATABASE</span><h3>That trail went cold.</h3><p>Try another name, skill or category.</p><button className="button-primary" onClick={() => setSearchParams({})}>Reset search <ArrowRight size={15} /></button></div>
        )}
      </section>
    </main>
  )
}
