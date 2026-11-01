import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Fingerprint, Radar, Shield, Swords } from 'lucide-react'
import CharacterCard from '../components/CharacterCard.jsx'
import characters from '../data/characters.json'

export default function CharacterDetail({ onJump }) {
  const { id } = useParams()
  const character = characters.find((item) => item.id === id)
  const reducedMotion = useReducedMotion()
  const [imageSrc, setImageSrc] = useState(character?.image || character?.imageFallback || '')
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageSrc(character?.image || character?.imageFallback || '')
    setImageFailed(false)
  }, [character?.id, character?.image, character?.imageFallback])

  const handleImageError = () => {
    if (character?.imageFallback && imageSrc !== character.imageFallback) {
      setImageSrc(character.imageFallback)
      return
    }
    setImageFailed(true)
  }

  if (!character) {
    return <main className="not-found"><span>404 // FILE NOT FOUND</span><h1>THE TRAIL WENT COLD.</h1><Link to="/characters" className="button-primary">Back to the archive <ArrowRight size={16} /></Link></main>
  }

  const related = characters.filter((item) => item.id !== character.id && (item.group === character.group || item.category === character.category)).slice(0, 3)
  const directoryPath = character.group === 'family' || character.group === 'core' ? '/characters?group=family' : character.group === 'villains' ? '/characters?group=villains' : character.group === 'variants' ? '/characters?group=variants' : '/characters'
  const directoryLabel = character.group === 'villains' ? 'ROGUES GALLERY' : character.group === 'variants' ? 'BATMAN VARIANTS' : 'BAT-FAMILY'
  const sourceLabel = character.sourceLabel || 'DC reference'

  return (
    <main className="detail-page" style={{ '--detail-accent': character.accent }}>
      <div className="detail-topline"><Link to={directoryPath}><ArrowLeft size={15} /> BACK TO {directoryLabel}</Link><span>CASE FILE // {character.number}</span></div>
      <section className="detail-hero">
        <div className="detail-hero-art">
          <div className="detail-art-grid" />
          <div className="detail-art-glow" />
          <div className="detail-orbit detail-orbit-a" /><div className="detail-orbit detail-orbit-b" />
          {imageSrc && !imageFailed ? <motion.img
            src={imageSrc}
            style={{ objectPosition: character.imagePosition || 'center center' }}
            referrerPolicy="no-referrer"
            alt={`${character.name} character artwork`}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.86, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onError={handleImageError}
          /> : <div className="detail-art-fallback"><span>GOTHAM ARCHIVE // ALTERNATE FILE</span><strong>{character.name}</strong><i>{character.universe}</i></div>}
          <span className="detail-vertical-label">{character.universe} / GOTHAM ARCHIVE</span>
        </div>
        <motion.div className="detail-copy" initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }}>
          <div className="eyebrow"><span className="eyebrow-dot" /> {character.status}</div>
          <div className="detail-number">FILE NUMBER {character.number} / {character.category.toUpperCase()}</div>
          <h1>{character.name.split(' ').map((word, index) => <span key={`${word}-${index}`} className={index === character.name.split(' ').length - 1 ? 'last-word' : ''}>{word} </span>)}</h1>
          <p className="detail-real-name">IDENTITY // {character.realName}</p>
          <p className="detail-real-name">AFFILIATION // {character.affiliation}</p>
          <p className="detail-tagline">“{character.tagline}”</p>
          <p className="detail-description">{character.description}</p>
          <div className="detail-actions"><span className="universe-pill"><Radar size={14} /> {character.universe}</span>{character.source && <a className="source-link" href={character.source} target="_blank" rel="noreferrer">{sourceLabel} <ArrowUpRight size={13} /></a>}</div>
        </motion.div>
      </section>

      <section className="detail-data-section">
        <div className="data-heading"><span>FIELD REPORT / CAPABILITIES</span><span>01 — 03</span></div>
        <div className="data-panel">
          <div className="data-panel-heading"><div className="data-icon"><Swords size={19} /></div><div><span>SKILL SET</span><small>Known abilities, training and tools</small></div></div>
          <div className="power-list">{character.powers.map((power, index) => <motion.div key={power} className="power-chip" initial={reducedMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}><span>0{index + 1}</span>{power}</motion.div>)}</div>
        </div>
        {character.filmography?.length > 0 && <div className="data-panel"><div className="data-panel-heading"><div className="data-icon"><Fingerprint size={19} /></div><div><span>SCREEN APPEARANCES</span><small>Live-action Batman filmography</small></div></div><div className="power-list">{character.filmography.map((film, index) => <div className="power-chip" key={film}><span>{String(index + 1).padStart(2,'0')}</span>{film}</div>)}</div></div>}
        <div className="data-panel data-panel-secondary"><div className="data-panel-heading"><div className="data-icon"><Fingerprint size={19} /></div><div><span>IDENTITY RECORD</span><small>Gotham archive classification</small></div></div><div className="dimension-stats"><div><small>CLASSIFICATION</small><strong>{character.category.toUpperCase()}</strong></div><div><small>KNOWN AS</small><strong>{character.name}</strong></div><div><small>FILE STATUS</small><strong>{character.status}</strong></div></div></div>
      </section>

      <section className="related-section">
        <div className="section-heading"><div><div className="eyebrow"><Shield size={13} /> CONNECTIONS DETECTED</div><h2>RELATED <em>FILES.</em></h2></div><Link to={directoryPath} className="text-link">Full directory <ArrowRight size={16} /></Link></div>
        <div className="featured-grid">{related.map((item, index) => <CharacterCard key={item.id} character={item} index={index} onJump={onJump} />)}</div>
      </section>
    </main>
  )
}
