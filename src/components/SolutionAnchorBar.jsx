export default function SolutionAnchorBar({ links, onEnquiry, children }) {
  return <header data-solution-anchor className="solution-anchor-bar">
    <div className="solution-anchor-inner">
      <nav className="solution-anchor-links" aria-label="On this page">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="solution-anchor-actions">
        <button type="button" className="solution-anchor-cta" onClick={onEnquiry}>Enquiry <span aria-hidden="true">↗</span></button>
        {children}
      </div>
    </div>
  </header>;
}
