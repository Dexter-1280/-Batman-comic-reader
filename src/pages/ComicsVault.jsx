import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookMarked, BookOpen, Search, Shield } from 'lucide-react'
import comics from '../data/comics.json'

const filters = ['All stories', 'Foundations', 'Detective', 'Bat-Family', 'Major Arcs', 'Elseworlds', 'Villains', 'Gotham', 'Events', 'Reading Orders']
const PAGE_SIZE = 12

function ComicCard({ comic, index }) {
  const [coverSrc, setCoverSrc] = useState(comic.cover || comic.coverFallback || '')
  const [fallbackFailed, setFallbackFailed] = useState(false)
  const isEvent = String(comic.batcaveUrl || '').includes('/event/')
  const isReadingOrder = Boolean(comic.isReadingOrder) || isEvent
  const targetUrl = isReadingOrder ? comic.batcaveUrl : (comic.readerUrl || comic.batcaveUrl || comic.guideUrl)
  const isGuide = String(comic.batcaveUrl || '').includes('/folder/')
  const actionLabel = isReadingOrder
    ? 'OPEN INFINITE READING ORDER'
    : comic.readerUrl
      ? 'READ FROM ISSUE 1'
      : isGuide
        ? 'OPEN BATMAN READING GUIDE'
        : 'VIEW COMIC ON BATCAVE'

  useEffect(() => {
    setCoverSrc(comic.cover || comic.coverFallback || '')
    setFallbackFailed(false)
  }, [comic.cover, comic.coverFallback])

  const handleCoverError = () => {
    if (comic.coverFallback && coverSrc !== comic.coverFallback) {
      setCoverSrc(comic.coverFallback)
      return
    }
    setFallbackFailed(true)
  }

  return (
    <motion.article
      id={`comic-${comic.id}`}
      className={`comic-card comic-${comic.accent}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, delay: (index % 4) * 0.04 }}
    >
      <div className="comic-cover-wrap">
        <div className="comic-cover-backdrop" />
        {coverSrc && !fallbackFailed
          ? <img className="comic-cover" src={coverSrc} alt={`${comic.title} cover artwork`} loading="lazy" referrerPolicy="no-referrer" onError={handleCoverError} />
          : <div className={`comic-cover-fallback cover-${comic.accent}`}><span>GOTHAM ARCHIVE // FILE {comic.sequence}</span><strong>{comic.title}</strong><i>{comic.tag}</i><b>GA</b></div>}
        <div className="comic-cover-shade" />
        <span className="comic-sequence">FILE {comic.sequence}</span>
        <span className="comic-tag">{comic.tag}</span>
        {isReadingOrder && <span className="comic-order-badge">INFINITE ORDER</span>}
      </div>
      <div className="comic-card-info">
        <div className="comic-card-meta"><span>{comic.year}</span><span>{comic.pages}</span></div>
        <h3>{comic.title}</h3>
        <p className="comic-subtitle">{comic.subtitle}</p>
        <p className="comic-description">{comic.description}</p>
        <div className="comic-creator">{comic.creator}</div>
        <div className="comic-card-actions">
          <a className="comic-read-button" href={targetUrl} target="_blank" rel="noopener noreferrer">
            <BookOpen size={14} /> {actionLabel} <ArrowUpRight size={13} />
          </a>
          {!isEvent && comic.readerUrl && comic.batcaveUrl && comic.readerUrl !== comic.batcaveUrl && (
            <a className="comic-series-link" href={comic.batcaveUrl} target="_blank" rel="noopener noreferrer">SERIES DETAILS <ArrowUpRight size={12} /></a>
          )}
        </div>
        <div className="comic-source-label"><span /> {isReadingOrder ? 'BATCAVE CHRONOLOGY' : comic.readerUrl ? 'DIRECT ISSUE READER' : isGuide ? 'BATMAN READING GUIDE' : 'BATCAVE COMIC ENTRY'}</div>
      </div>
    </motion.article>
  )
}

export default function ComicsVault() {
  const [activeFilter, setActiveFilter] = useState('All stories')
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef(null)

  const filteredComics = useMemo(() => comics.filter((comic) => {
    const matchesFilter = activeFilter === 'All stories' || (comic.categories || []).includes(activeFilter)
    const text = `${comic.title} ${comic.subtitle} ${comic.creator} ${comic.description} ${comic.tag} ${comic.year}`.toLowerCase()
    return matchesFilter && text.includes(query.toLowerCase().trim())
  }), [activeFilter, query])

  const visibleComics = filteredComics.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [activeFilter, query])

  useEffect(() => {
    const element = sentinelRef.current
    if (!element || visibleCount >= filteredComics.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredComics.length))
      }
    }, { rootMargin: '700px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [visibleCount, filteredComics.length])

  const scrollToStory = (id) => {
    const index = comics.findIndex((comic) => comic.id === id)
    setActiveFilter('All stories')
    setQuery('')
    setVisibleCount(Math.min(Math.max(PAGE_SIZE, Math.ceil((index + 1) / PAGE_SIZE) * PAGE_SIZE), comics.length))
    window.setTimeout(() => document.getElementById(`comic-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 260)
  }

  const resetArchive = () => {
    setQuery('')
    setActiveFilter('All stories')
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <main className="comics-page">
      <section className="comics-hero">
        <div className="comics-hero-grid" />
        <div className="comics-hero-signal"><span /></div>
        <div className="comics-skyline" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="comics-hero-inner">
          <div className="eyebrow"><span className="eyebrow-dot" /> GOTHAM PUBLIC ARCHIVE // COMIC DIVISION</div>
          <div className="comics-hero-copy">
            <div>
              <h1>THE<br /><span>COMIC</span><br /><em>VAULT.</em></h1>
              <p>Decades of Gotham cases, family legacies, alternate worlds and detective stories — indexed in one infinite archive. Choose a title to open its matching BatCave comic page or reading order.</p>
              <a href="#comic-library" className="button-primary">ENTER THE READING ROOM <ArrowRight size={16} /></a>
            </div>
            <div className="comics-hero-side">
              <div className="comics-file-stamp"><BookOpen size={35} strokeWidth={1.1} /><span>CASE<br />ARCHIVE</span></div>
              <div className="comics-hero-stat"><strong>{comics.length}</strong><span>CATALOGUED<br />STORY FILES</span></div>
              <div className="comics-hero-caption"><span>THE DARK KNIGHT COLLECTION</span><strong>INK. SHADOW. LEGACY.</strong></div>
            </div>
          </div>
          <div className="comics-hero-bottom"><span>GOTHAM CITY // EARTH-0</span><span className="comics-hero-line" /><span>BATCAVE INDEX: LINKED</span></div>
        </div>
      </section>

      <section className="comics-intro-band">
        <div className="comics-intro-inner">
          <div><span className="eyebrow-dot" /><span>THE ARCHIVE NOTICE</span></div>
          <p>Gotham Archive keeps the searchable catalogue and infinite scroll. Each title opens its matching BatCave comic entry; titles with a verified reader link jump straight to the first issue, while crossover cards open their full chronological reading order.</p>
          <div className="comic-local-status"><Shield size={14} /> {comics.length} BATCAVE LINKS INDEXED</div>
          <a className="comic-screen-link" href="/characters?group=variants&type=live-action">EXPLORE SCREEN BATMEN ↗</a>
        </div>
      </section>

      <section className="comic-library-section" id="comic-library">
        <div className="comic-library-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> EVIDENCE FILES / OPEN THE LEGENDS</div>
            <h2>THE GOTHAM <em>LIBRARY.</em></h2>
            <p>Search Batman stories, Bat-Family books, classic detective runs, alternate worlds and multi-issue event chronologies. Reading opens on the matching BatCave page.</p>
          </div>
          <div className="comic-library-count"><strong>{filteredComics.length.toString().padStart(2, '0')}</strong><span>FILES<br />FOUND</span></div>
        </div>

        <div className="comic-toolbar">
          <div className="comic-filter-row">{filters.map((filter) => <button type="button" key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <label className="comic-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search story, creator or keyword..." /><kbd>⌕</kbd></label>
        </div>

        {visibleComics.length > 0
          ? <div className="comic-grid">{visibleComics.map((comic, index) => <ComicCard key={comic.id} comic={comic} index={index} />)}</div>
          : <div className="comic-empty"><BookMarked size={28} /><h3>NO STORIES MATCH THAT SEARCH.</h3><p>Clear the search or choose another archive category.</p><button type="button" onClick={resetArchive}>RESET ARCHIVE</button></div>}

        {visibleCount < filteredComics.length && <div ref={sentinelRef} className="comic-infinite-sentinel"><span className="comic-loading-mark" /><strong>SCANNING DEEPER INTO THE ARCHIVE</strong><small>{visibleCount} OF {filteredComics.length} FILES DISPLAYED</small></div>}
        {visibleCount >= filteredComics.length && filteredComics.length > PAGE_SIZE && <div className="comic-infinite-end"><span>END OF CURRENT ARCHIVE INDEX</span><strong>{filteredComics.length} STORY FILES REVIEWED</strong></div>}
      </section>

      <section className="comic-reading-order">
        <div className="reading-order-art"><div className="reading-order-bat" /><span>READING<br />PROTOCOL</span><strong>START<br />HERE.</strong></div>
        <div className="reading-order-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> NEW TO THE COWL?</div>
          <h2>A WAY INTO<br /><em>THE DARK.</em></h2>
          <p>Start with Batman’s early years, move into Gotham’s defining mysteries, then follow the stories that reshape the Bat-Family. Pick a title below to jump to its card, then open its BatCave issue page.</p>
          <div className="reading-path">
            <button type="button" onClick={() => scrollToStory('year-one')}><span>01</span><strong>Year One</strong><small>Meet Batman and Gordon</small><BookOpen size={14} /></button>
            <button type="button" onClick={() => scrollToStory('long-halloween')}><span>02</span><strong>The Long Halloween</strong><small>Follow the early Gotham mystery</small><BookOpen size={14} /></button>
            <button type="button" onClick={() => scrollToStory('dark-victory')}><span>03</span><strong>Dark Victory</strong><small>See the first Robin enter the story</small><BookOpen size={14} /></button>
            <button type="button" onClick={() => scrollToStory('court-of-owls')}><span>04</span><strong>Court of Owls</strong><small>Uncover Gotham’s hidden history</small><BookOpen size={14} /></button>
          </div>
        </div>
      </section>

      <section className="comic-batcave-note">
        <div className="comic-batcave-note-mark"><Shield size={26} /></div>
        <div><div className="eyebrow"><span className="eyebrow-dot" /> READER DESTINATION</div><h2>THE ARCHIVE STAYS HERE.<br /><em>THE READING OPENS THERE.</em></h2><p>Comic pages and issue sequences are served by BatCave.biz, not downloaded or stored in this project. The catalogue links to the matching title, issue reader or event chronology so every book opens at its own destination.</p></div>
        <a href="https://batcave.biz/" target="_blank" rel="noopener noreferrer" className="button-primary">OPEN BATCAVE <ArrowUpRight size={15} /></a>
      </section>

      <section className="comics-access-note"><div className="access-note-icon"><Shield size={24} /></div><div><strong>CATALOGUE & SOURCE NOTE</strong><p>Titles and reading-order groupings are indexed from BatCave’s public Batman guides, comic entries and event chronologies. This project does not copy, host, or proxy comic scans. Availability and issue order are controlled by BatCave.</p></div></section>
    </main>
  )
}
