import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronRight, Shield, Star } from 'lucide-react'
import CharacterCard from '../components/CharacterCard.jsx'
import GothamCanvas from '../components/GothamCanvas.jsx'
import characters from '../data/characters.json'

const milestones = [
  { id: 'nightwing', number: '01', era: '1940 · THE ORIGINAL', title: 'DICK GRAYSON', note: 'The acrobat who became the first Boy Wonder. He grew into Nightwing and built a heroic identity beyond Batman.' },
  { id: 'red-hood', number: '02', era: '1983 · THE REBEL', title: 'JASON TODD', note: 'A street-smart second Robin whose death changed Batman. He returned as Red Hood, with a harder code of his own.' },
  { id: 'tim-drake', number: '03', era: '1989 · THE DETECTIVE', title: 'TIM DRAKE', note: 'The strategist who deduced the secret identities and believed Batman needed a Robin to stay balanced.' },
  { id: 'stephanie-brown', number: '04', era: '2004 · THE SPOILER', title: 'STEPHANIE BROWN', note: 'The fourth Robin, briefly carrying the mantle before continuing as Spoiler and Batgirl.' },
  { id: 'damian-wayne', number: '05', era: '2006 · THE HEIR', title: 'DAMIAN WAYNE', note: "Bruce Wayne's son, raised by the League of Assassins and learning to turn his lethal training toward heroism." },
  { id: 'carrie-kelley', number: 'ALT', era: '1986 · ELSEWORLDS', title: 'CARRIE KELLEY', note: 'The Robin of The Dark Knight Returns, an alternate-future story outside the main DC Universe continuity.' }
]

export default function RobinHall({ onJump }) {
  const reducedMotion = useReducedMotion()
  const robinCharacters = milestones.map((milestone) => characters.find((character) => character.id === milestone.id))

  return (
    <main className="robin-page">
      <section className="robin-hero">
        <GothamCanvas className="robin-atmosphere" />
        <div className="robin-hero-shell">
          <motion.div className="robin-hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow"><span className="eyebrow-dot" /> THE BOY / THE GIRL / THE WONDER</div>
            <h1>THE ROBIN<br /><em>LEGACY.</em></h1>
            <p>The mainline mantle passed through five defining successors. The wider legacy also includes Carrie Kelley, the Robin of The Dark Knight Returns.</p>
            <div className="hero-actions"><Link to="/characters?group=family" className="button-primary">VIEW THE BAT-FAMILY <ArrowRight size={16} /></Link><a href="#timeline" className="button-quiet">Follow the timeline <ChevronRight size={15} /></a></div>
          </motion.div>
          <div className="robin-hero-mark"><div className="robin-mark-ring"><Star size={34} /></div><strong>R</strong><span>THE BOY<br />WONDER</span></div>
        </div>
      </section>

      <section className="robin-intro">
        <div className="robin-intro-label"><span>FIELD NOTE / 001</span><strong>MORE THAN<br />A SIDEKICK.</strong></div>
        <div className="robin-intro-copy"><p>Robin began as Batman's partner, but the mantle became its own legacy. Dick, Jason, Tim, Stephanie and Damian each brought a different strength, a different challenge and a different reason for the Dark Knight to keep believing in family.</p><a href="https://www.dc.com/characters/robin" target="_blank" rel="noreferrer">Read DC's official Robin profile <ArrowUpRight size={14} /></a></div>
      </section>

      <section className="robin-timeline-section" id="timeline">
        <div className="section-heading robin-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> MAINLINE SUCCESSORS + ELSEWORLDS</div><h2>ONE MANTLE.<br /><em>MANY STORIES.</em></h2></div><span className="timeline-count">01—05 + ALT / ROBIN FILES</span></div>
        <div className="robin-timeline">
          {milestones.map((milestone, index) => {
            const character = characters.find((item) => item.id === milestone.id)
            return (
              <motion.article className="robin-timeline-row" key={milestone.id} initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <div className="robin-timeline-number"><span>{milestone.number}</span><i /></div>
                <button className="robin-timeline-image" onClick={() => onJump(character.id)} aria-label={`Open ${character.name} file`}>
                  <img src={character.image} data-fallback={character.imageFallback || ''} alt={`${character.realName} as a Robin or successor`} referrerPolicy="no-referrer" loading="lazy" onError={(event) => { const img = event.currentTarget; if (img.dataset.fallback && !img.dataset.fallbackTried) { img.dataset.fallbackTried = 'true'; img.src = img.dataset.fallback } else { img.style.opacity = '0' } }} />
                </button>
                <div className="robin-timeline-info">
                  <span className="timeline-era">{milestone.era}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.note}</p>
                  <div className="robin-current-identity">{character.status}</div>
                </div>
                <button className="robin-open" onClick={() => onJump(character.id)} aria-label={`Open ${character.name} profile`}><ArrowUpRight size={20} /></button>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="robin-cards-section">
        <div className="section-heading"><div><div className="eyebrow"><Shield size={13} /> THE FULL PROFILE FILES</div><h2>MEET THE <em>ROBINS.</em></h2></div><span className="timeline-count">ALL SIX PROFILES</span></div>
        <div className="featured-grid robin-cards-grid">{robinCharacters.map((character, index) => <CharacterCard key={character.id} character={character} index={index} onJump={onJump} />)}</div>
      </section>

      <section className="robin-footnote"><div><span>THE MANTLE IS BIGGER THAN ONE PERSON</span><p>Carrie Kelley is included as an alternate-continuity Robin from <em>The Dark Knight Returns</em>, not as a member of the main DC Universe succession. The other five profiles represent the best-known mainline Robin successors.</p></div><a href="https://www.dc.com/graphic-novels/the-dark-knight-returns-1986/batman-the-dark-knight-returns" target="_blank" rel="noreferrer">DC / Dark Knight Returns <ArrowUpRight size={14} /></a></section>
    </main>
  )
}
