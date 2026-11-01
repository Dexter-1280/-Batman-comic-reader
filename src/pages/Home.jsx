import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, ChevronRight, Radar, Shield } from 'lucide-react'
import GothamCanvas from '../components/GothamCanvas.jsx'
import CharacterCard from '../components/CharacterCard.jsx'
import characters from '../data/characters.json'

export default function Home({ onJump }) {
  const reducedMotion = useReducedMotion()
  const batman = characters.find((character) => character.id === 'batman')
  const featured = ['nightwing', 'red-hood', 'batgirl', 'joker'].map((id) => characters.find((character) => character.id === id))
  const count = characters.length

  return (
    <main>
      <section className="hero-section">
        <GothamCanvas className="hero-atmosphere" />
        <div className="hero-noise" />
        <div className="hero-cityline" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="hero-shell">
          <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="eyebrow"><span className="eyebrow-dot" /> GOTHAM CITY // 11:47 PM // RAINFALL DETECTED</div>
            <h1>WELCOME TO<br /><span>THE CITY</span><br />OF THE <em>BAT.</em></h1>
            <p className="hero-lede">The Dark Knight. The family he built. The villains who test them. Enter the Gotham Archive and explore every corner of Batman's world.</p>
            <div className="hero-actions">
              <Link to="/characters" className="button-primary">ENTER GOTHAM <ArrowUpRight size={16} /></Link>
              <Link to="/robins" className="button-quiet">Meet every Robin <ArrowRight size={15} /></Link>
            </div>
            <div className="hero-meta"><span><i /> {count} CHARACTER FILES ONLINE</span><span>ONE CITY. NO SAFE STREETS.</span></div>
          </motion.div>
          <motion.div className="hero-art" initial={reducedMotion ? false : { opacity: 0, scale: 0.86, x: 32 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}>
            <div className="hero-art-glow" />
            <div className="hero-art-ring hero-ring-one" />
            <div className="hero-art-ring hero-ring-two" />
            <img
              src={batman.image}
              alt="Batman — Bruce Wayne"
              data-fallback={batman.imageFallback || ''}
              referrerPolicy="no-referrer"
              loading="eager"
              onError={(event) => { const img = event.currentTarget; if (img.dataset.fallback && !img.dataset.fallbackTried) { img.dataset.fallbackTried = 'true'; img.src = img.dataset.fallback } else { img.style.opacity = '0' } }}
            />
            <div className="hero-coordinate"><span>GOTHAM / EARTH-0</span><strong>SUBJECT 001</strong><i>THE DARK KNIGHT</i></div>
            <div className="hero-stamp">WAYNE<br />FILES</div>
          </motion.div>
        </div>
        <div className="hero-bottom-line"><span>SCROLL TO INVESTIGATE</span><span className="line" /><span>GCPD // 001</span></div>
        <div className="bat-signal-shape" aria-hidden="true"><span /></div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-shell">
          <div className="manifesto-label"><span>01</span> THE GOTHAM DOSSIER</div>
          <div className="manifesto-copy"><h2>One symbol.<br /><span>A thousand lives.</span></h2><p>Batman never fights alone. From the Robins who inherited the mission to the allies who protect Gotham in their own way, the Bat-Family is a network built on trust, grit and second chances.</p><Link to="/characters?group=family" className="text-link">Meet the Bat-Family <ArrowRight size={15} /></Link></div>
          <div className="manifesto-stamp"><Shield size={39} strokeWidth={1.1} /><span>PROTECT<br />GOTHAM</span></div>
        </div>
      </section>

      <section className="featured-section" id="featured">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-dot" /> MOST WANTED / MOST TRUSTED</div><h2>THE KEY <em>PLAYERS.</em></h2></div>
          <Link to="/characters" className="text-link">Open all case files <ArrowRight size={16} /></Link>
        </div>
        <div className="featured-grid">
          {featured.map((character, index) => <CharacterCard key={character.id} character={character} index={index} onJump={onJump} />)}
        </div>
      </section>

      <section className="gotham-split-section">
        <div className="gotham-split-art">
          <div className="split-skyline" />
          <div className="split-bat-signal"><span /></div>
          <div className="split-art-caption"><span>GOTHAM CITY POLICE DEPARTMENT</span><strong>THE CITY NEEDS ITS KNIGHT.</strong></div>
        </div>
        <div className="gotham-split-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> THE SYMBOL EVOLVES</div>
          <h2>THE COWL<br />IS A <em>LEGACY.</em></h2>
          <p>Bruce Wayne is only the beginning. Explore the people who have worn the Robin colours, the allies who stand beside them and the alternate versions who have taken up the Batman mantle.</p>
          <div className="split-links"><Link to="/robins"><span>01</span> THE ROBIN LEGACY <ArrowUpRight size={15} /></Link><Link to="/characters?group=variants"><span>02</span> BATMAN VARIANTS <ArrowUpRight size={15} /></Link><Link to="/characters?group=villains"><span>03</span> THE ROGUES GALLERY <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>

      <section className="home-comics-teaser">
        <div className="home-comics-mark"><span>DC</span><BookOpen size={25} /></div>
        <div className="home-comics-copy"><div className="eyebrow"><span className="eyebrow-dot" /> THE STORIES BEHIND THE SYMBOL</div><h2>GOTHAM'S HISTORY<br /><em>IS WRITTEN IN INK.</em></h2><p>Open the infinite Batman comic catalogue, browse chronological arcs and jump straight to the matching BatCave issue reader.</p></div>
        <Link to="/comics" className="button-primary">ENTER THE COMIC VAULT <ArrowUpRight size={16} /></Link>
      </section>

      <section className="signal-section">
        <div className="signal-grid">
          <div className="signal-mark"><Radar size={28} /><span>BAT<br />SIGNAL</span></div>
          <div><div className="eyebrow">THE NIGHT IS NOT OVER</div><h2>GOTHAM IS<br /><em>CALLING.</em></h2></div>
          <div className="signal-copy"><p>Search the archive. Trace the family tree. Study the threats. Every file is one click away.</p><Link to="/characters" className="button-primary">BROWSE {count} FILES <ChevronRight size={16} /></Link></div>
        </div>
      </section>
    </main>
  )
}
