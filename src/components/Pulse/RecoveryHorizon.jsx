import React, { useMemo, useState } from 'react';

const scenarios = {
  balanced: {
    name: 'Balanced Recovery',
    line: 'Lower friction, strengthen loyalty, and reposition around coaching without overextending capital.',
    confidence: 84,
    cost: '$18M - $32M',
    path: [9, 8, 7, 6, 5],
    moves: [
      { date: 'Today', title: 'De-mark hardware dependence', impact: '+6 Trust', signals: ['SELL -3', 'BLOCK -8', 'DRIFT -5'], note: 'Reduce dependence on expensive equipment as the primary identity.' },
      { date: '30D', title: 'Simplify pricing architecture', impact: '+8 Conversion', signals: ['BUY +5', 'DOUBT -7', 'FLOW +6'], note: 'Make the offer easier to understand before changing the whole brand.' },
      { date: '60D', title: 'Launch family retention bundle', impact: '+11 Lock', signals: ['ATTRACT +6', 'LOCK +9', 'GAIN +5'], note: 'Increase household value and reduce subscriber leakage.' },
      { date: '90D', title: 'Rebuild around instructor-led coaching', impact: '+13 Trust', signals: ['BUILD +8', 'PULL +7', 'TRUST +9'], note: 'Move Peloton from hardware status symbol to premium coaching relationship.' },
      { date: '180D', title: 'Certify Level 5 recovery state', impact: 'L5 Target', signals: ['RECENTRE +12', 'VALUE +10', 'CENTRE +9'], note: 'Market understands the new category: connected coaching platform.' },
    ],
  },
  aggressive: {
    name: 'Aggressive Expansion',
    line: 'Push AI coaching, retail reach, and corporate wellness faster to pull demand forward.',
    confidence: 76,
    cost: '$45M - $75M',
    path: [9, 7, 6, 5, 5],
    moves: [
      { date: 'Today', title: 'Launch AI coach beta', impact: '+12 Growth', signals: ['CREATE +10', 'DISCOVER +8', 'RISE +7'], note: 'Creates a new reason for subscribers to re-engage.' },
      { date: '30D', title: 'Retail try-before-buy program', impact: '-10 Block', signals: ['BUY +6', 'BLOCK -10', 'FLOW +8'], note: 'Turns hardware friction into retail confidence.' },
      { date: '60D', title: 'Corporate wellness acquisition channel', impact: '+9 Flow', signals: ['DEAL +7', 'ATTRACT +8', 'LOCK +5'], note: 'Adds a B2B recovery vector outside household demand.' },
      { date: '90D', title: 'Instructor creator network', impact: '+15 Pull', signals: ['PULL +12', 'LEAD +7', 'BUILD +8'], note: 'Lets Peloton own premium coaching culture again.' },
      { date: '180D', title: 'New category launch', impact: 'L5 Target', signals: ['RECENTRE +14', 'GAIN +9', 'CENTRE +12'], note: 'Publicly frame the business as connected coaching intelligence.' },
    ],
  },
  conservative: {
    name: 'Conservative Stabilisation',
    line: 'Protect cash, reduce churn, and steadily repair confidence before major expansion.',
    confidence: 88,
    cost: '$8M - $16M',
    path: [9, 9, 8, 7, 6],
    moves: [
      { date: 'Today', title: 'Churn triage squad', impact: '+8 Lock', signals: ['LOCK +7', 'LEAK -6', 'REPAIR +5'], note: 'Stop the most immediate confidence leakage first.' },
      { date: '30D', title: 'Pricing clarity campaign', impact: '+6 Trust', signals: ['DOUBT -6', 'TRUST +5', 'FLOW +4'], note: 'Make the subscription value feel obvious.' },
      { date: '60D', title: 'Hardware financing refresh', impact: '-5 Block', signals: ['BLOCK -5', 'BUY +3', 'FLOW +4'], note: 'Lower the barrier without a deep discounting spiral.' },
      { date: '90D', title: 'Community loyalty program', impact: '+7 Gain', signals: ['GAIN +6', 'LOCK +8', 'BUILD +4'], note: 'Turn existing fans into the recovery engine.' },
      { date: '180D', title: 'Category message test', impact: 'L6 Forecast', signals: ['CENTRE +5', 'VALUE +6', 'TRUST +4'], note: 'Prepare recategorization after stability improves.' },
    ],
  },
};

const signalMeaning = {
  BUY: 'confidence entering the system',
  SELL: 'confidence leaving the system',
  GAIN: 'trust increasing',
  LOSS: 'trust decreasing',
  BUILD: 'structure strengthening',
  DRIFT: 'movement away from market alignment',
  CENTRE: 'movement toward recovery alignment',
  FLOW: 'healthy value movement',
  BLOCK: 'friction preventing value movement',
  LOCK: 'customer retention strengthening',
  LEAK: 'customer attrition pressure',
  TRUST: 'belief entering the company',
  DOUBT: 'belief leaving the company',
  ATTRACT: 'new audience entering',
  PULL: 'market attraction toward the company',
  CREATE: 'new value generated',
  DISCOVER: 'new opportunity detected',
  RISE: 'momentum increasing',
  DEAL: 'new relationship formed',
  LEAD: 'category leadership',
  RECENTRE: 'returning toward Level 5',
  VALUE: 'perceived usefulness increasing',
  REPAIR: 'recovery action occurring',
};

export default function RecoveryHorizon({ company }) {
  const [active, setActive] = useState('balanced');
  const [selectedMove, setSelectedMove] = useState(0);
  const scenario = scenarios[active];
  const selected = scenario.moves[selectedMove];

  const graphPoints = useMemo(() => {
    return scenario.path.map((level, index) => {
      const x = 8 + index * 21;
      const y = 18 + (level - 5) * 13;
      return `${x},${y}`;
    }).join(' ');
  }, [scenario]);

  return (
    <section className="glass horizonPanel">
      <div className="horizonHeader">
        <div>
          <p className="eyebrow">Recovery Horizon</p>
          <h3>Time Machine for every move needed to reach Level 5</h3>
          <p className="horizonSub">The Telemetry Supervisor projects each decision through BUY, SELL, FLOW, LOCK, DRIFT, TRUST and RECENTRE signals so the future becomes visible before the company commits.</p>
        </div>
        <div className="horizonProbability">
          <span>Recovery confidence</span>
          <b>{scenario.confidence}%</b>
          <small>{scenario.cost}</small>
        </div>
      </div>

      <div className="scenarioTabs">
        {Object.keys(scenarios).map((key) => (
          <button key={key} className={active === key ? 'scenarioTab active' : 'scenarioTab'} onClick={() => { setActive(key); setSelectedMove(0); }}>
            <span>{scenarios[key].name}</span>
            <b>{scenarios[key].confidence}%</b>
          </button>
        ))}
      </div>

      <div className="horizonGrid">
        <div className="futureMap">
          <div className="futureGlow" />
          <svg viewBox="0 0 100 90" className="futureSvg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="futureLine" x1="0" x2="1">
                <stop offset="0" stopColor="#f472b6" />
                <stop offset="0.45" stopColor="#67e8f9" />
                <stop offset="1" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <polyline points={graphPoints} fill="none" stroke="url(#futureLine)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            {scenario.path.map((level, index) => {
              const x = 8 + index * 21;
              const y = 18 + (level - 5) * 13;
              return <circle key={index} cx={x} cy={y} r={index === selectedMove ? 3.7 : 2.4} fill={index === selectedMove ? '#fff' : '#67e8f9'} />;
            })}
          </svg>
          <div className="futureMarkers">
            {scenario.moves.map((move, index) => (
              <button key={move.date} className={selectedMove === index ? 'futureMarker active' : 'futureMarker'} onClick={() => setSelectedMove(index)}>
                <span>{move.date}</span>
                <b>L{scenario.path[index]}</b>
              </button>
            ))}
          </div>
        </div>

        <div className="moveInspector">
          <p className="eyebrow">Selected future move</p>
          <h4>{selected.title}</h4>
          <div className="impactPill">{selected.impact}</div>
          <p>{selected.note}</p>
          <div className="signalChain">
            {selected.signals.map((signal, index) => {
              const key = signal.split(' ')[0];
              const positive = !signal.includes('-') && !['SELL', 'LOSS', 'LEAK', 'DOUBT', 'BLOCK', 'DRIFT'].includes(key);
              return (
                <React.Fragment key={signal}>
                  <div className={positive ? 'chainNode positive' : 'chainNode warning'}>
                    <b>{signal}</b>
                    <span>{signalMeaning[key] || 'strategic telemetry signal'}</span>
                  </div>
                  {index < selected.signals.length - 1 && <i className="chainArrow">→</i>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="decisionLedger">
        <div className="ledgerHead">
          <p className="eyebrow">Decision ledger</p>
          <span>{company.name} projection path: Level {company.level} → Level {company.target}</span>
        </div>
        {scenario.moves.map((move, index) => (
          <button key={move.title} className={selectedMove === index ? 'ledgerRow active' : 'ledgerRow'} onClick={() => setSelectedMove(index)}>
            <span>{move.date}</span>
            <b>{move.title}</b>
            <em>{move.signals.join(' / ')}</em>
            <strong>{move.impact}</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
