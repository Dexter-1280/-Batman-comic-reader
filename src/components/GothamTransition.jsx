import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function GothamTransition({ active, characterName }) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="gotham-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.08 : 0.2 }}
          aria-live="polite"
          aria-label={`Opening ${characterName || 'character'} case file`}
        >
          <div className="transition-grid" />
          <motion.div
            className="transition-beam"
            initial={reducedMotion ? { opacity: 0.3 } : { x: '-68vw', opacity: 0, rotate: -18 }}
            animate={reducedMotion ? { opacity: 0.3 } : { x: '68vw', opacity: 1, rotate: -18 }}
            transition={{ duration: reducedMotion ? 0.08 : 0.62, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="transition-bat-symbol"
            initial={reducedMotion ? { opacity: 0.55 } : { opacity: 0, scale: 0.72, filter: 'blur(16px)' }}
            animate={reducedMotion ? { opacity: 0.55 } : { opacity: 0.72, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: reducedMotion ? 0.08 : 0.58, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="transition-scanline"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.08 : 0.42, delay: reducedMotion ? 0 : 0.12, ease: 'easeOut' }}
          />
          <div className="transition-skyline" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <motion.div
            className="transition-caption"
            initial={reducedMotion ? false : { y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.08 : 0.32, delay: reducedMotion ? 0 : 0.18 }}
          >
            <span><i /> GCPD EMERGENCY NETWORK // SIGNAL ACQUIRED</span>
            <strong>OPENING {characterName || 'CASE FILE'}</strong>
            <small>GOTHAM ARCHIVE / PERSONNEL DOSSIER</small>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
