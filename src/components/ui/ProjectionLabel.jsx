export default function ProjectionLabel({ eyebrow, title, text }) {
  return <div className="projection-label"><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
