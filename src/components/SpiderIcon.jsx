/**
 * Spider-Man spider silhouette — replaces the Batman bat icon.
 *
 * A stylized spider with body + 8 legs, rendered as a group of SVG elements.
 * Accepts the same props as the original BatPath (fill, opacity, etc.)
 * via spread on the <g> element.
 *
 * Usage: <svg viewBox="0 0 24 24">
 *          <SpiderPath fill="#C0001A" />
 *        </svg>
 */
const SpiderPath = (props) => (
  <g {...props}>
    {/* Abdomen (rear body) */}
    <ellipse cx="12" cy="14" rx="3.5" ry="4.5" />
    {/* Cephalothorax (head/body) */}
    <ellipse cx="12" cy="7.5" rx="2" ry="2.5" />
    {/* Upper legs — outer pair */}
    <path d="M10 7 Q6.5 4.5 3.5 5.5 Q5.5 7 8 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M14 7 Q17.5 4.5 20.5 5.5 Q18.5 7 16 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    {/* Upper legs — inner pair */}
    <path d="M9.5 9.5 Q5.5 9.5 2 11.5 Q4.5 11.5 7.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M14.5 9.5 Q18.5 9.5 22 11.5 Q19.5 11.5 16.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    {/* Middle legs */}
    <path d="M9 13 Q5 13.5 2.5 16.5 Q5 15 8 15" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M15 13 Q19 13.5 21.5 16.5 Q19 15 16 15" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    {/* Lower legs */}
    <path d="M10 16 Q7 18 5.5 21 Q8 19.5 10 18.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M14 16 Q17 18 18.5 21 Q16 19.5 14 18.5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </g>
)

export default SpiderPath

/**
 * Note: For CSS cursor URLs, a simplified spider SVG is base64-encoded
 * directly in index.css. This component is for React-rendered SVGs only.
 */
