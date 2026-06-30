export default function AnimatedValue({ label, value, suffix = '' }) {
  return <div className="animated-value"><span>{label}</span><strong>{value}{suffix}</strong></div>;
}
