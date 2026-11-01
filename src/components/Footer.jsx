import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><span className="brand-mark"><span /></span><span>GOTHAM<span> ARCHIVE</span></span></div>
        <p>One city. A thousand stories. One symbol.</p>
        <a href="/comics">Comic Vault <ExternalLink size={13} /></a>
        <a href="https://www.dc.com/characters/batman" target="_blank" rel="noreferrer">DC character reference <ExternalLink size={13} /></a>
      </div>
      <div className="footer-bottom">
        <span>Unofficial fan-made educational project. Not affiliated with DC or Warner Bros.</span>
        <span>Character names, artwork and trademarks belong to their respective owners. References link to DC.</span>
      </div>
    </footer>
  )
}
