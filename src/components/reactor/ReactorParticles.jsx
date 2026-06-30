export default function ReactorParticles() { return <>{Array.from({length:20}).map((_,i)=><i className="particle" key={i}/> )}</>; }
