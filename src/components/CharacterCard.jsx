import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Shield } from 'lucide-react'

export default function CharacterCard({ character, index = 0, onJump }) {
  const reducedMotion = useReducedMotion()
  const [imageSrc, setImageSrc] = useState(character.image || character.imageFallback || '')
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageSrc(character.image || character.imageFallback || '')
    setImageFailed(false)
  }, [character.id, character.image, character.imageFallback])

  const handleImageError = () => {
    if (character.imageFallback && imageSrc !== character.imageFallback) {
      setImageSrc(character.imageFallback)
      return
    }
    setImageFailed(true)
  }

  return (
    <motion.button
      type="button"
      className={`character-card ${character.category === 'villain' ? 'is-villain' : ''}`}
      style={{ '--card-accent': character.accent }}
      onClick={() => onJump(character.id)}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.48, delay: reducedMotion ? 0 : (index % 4) * 0.055, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="card-image-wrap">
        <div className="card-image-backdrop" />
        {imageSrc && !imageFailed
          ? <img className="card-image" style={{ objectPosition: character.imagePosition || 'center 20%' }} src={imageSrc} alt={`${character.name} character artwork`} title={`${character.name} artwork`} referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={handleImageError} />
          : <div className="card-image-placeholder"><span>GOTHAM ARCHIVE</span><strong>{character.name}</strong><i>{character.universe}</i></div>}
        <div className="card-image-shade" />
        <span className="card-index">{character.number}</span>
        <span className="card-open"><ArrowUpRight size={17} /></span>
        <span className="card-status"><Shield size={10} /> {character.status}</span>
        <span className="card-category">{character.mediaType === 'live-action' ? 'LIVE-ACTION BATMAN' : character.group === 'variants' ? 'ALTERNATE COWL' : character.category === 'villain' ? 'ROGUES GALLERY' : character.group === 'family' ? 'BAT-FAMILY' : 'THE DARK KNIGHT'}</span>
      </div>
      <div className="card-info">
        <div className="card-universe">{character.affiliation}</div>
        <h3>{character.name}</h3>
        <p>{character.realName}</p>
      </div>
    </motion.button>
  )
}
