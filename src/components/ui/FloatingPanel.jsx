export default function FloatingPanel({ children, className = '' }) {
  return <div className={`floating-panel ${className}`}>{children}</div>;
}
