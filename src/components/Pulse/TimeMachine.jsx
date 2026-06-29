import React, { useMemo, useState } from 'react';
import GlassPanel from '../ui/GlassPanel';

const scenarios = {
  balanced: {
    label: 'Balanced Recovery',
    summary: 'Protect the Peloton brand while shifting the centre of gravity from hardware to connected coaching.',
    path: [9, 8, 7, 6, 5],
    probability: 84,
    confidence: 86,
    cost: '$8.6M',
    moves: [
      { name: 'Bundle family membership', chain: ['ATTRACT', 'BUY', 'LOCK', 'GAIN'], effect: '+11 subscribers', confidence: '84%' },
      { name: 'Reposition around coaching', chain: ['TRUST', 'BUILD', 'VALUE', 'RECENTRE'], effect: '+12 clarity', confidence: '88%' },
      { name: 'Launch AI coaching layer', chain: ['CREATE', 'FLOW', 'LOCK', 'GROW'], effect: '+8 retention', confidence: '80%' },
    ],
  },
  conservative: {
    label: 'Conservative Repair',
    summary: 'Reduce friction carefully, protect existing subscribers, and avoid brand shock.',
    path: [9, 9, 8, 7, 6],
    probability: 72,
    confidence: 78,
    cost: '$4.2M',
    moves: [
      { name: 'Simplify subscription plans', chain: ['BUILD', 'TRUST', 'FLOW'], effect: '+6 trust', confidence: '81%' },
      { name: 'Extend financing options', chain: ['BUY', 'ATTRACT', 'GAIN'], effect: '+9 conversion', confidence: '76%' },
      { name: 'Improve retention offers', chain: ['LOCK', 'REPAIR', 'CENTRE'], effect: '-4 churn', confidence: '79%' },
    ],
  },
  aggressive: {
    label: 'Aggressive Rebuild',
    summary: 'Attack market drift quickly with pricing, retail expansion, and category reset.',
    path: [9, 7, 6, 5, 4],
    probability: 79,
    confidence: 74,
    cost: '$18.4M',
    moves: [
      { name: 'Retail expansion reset', chain: ['PULL', 'BUY', 'FLOW'], effect: '+14 awareness', confidence: '72%' },
      { name: 'Hardware price shock', chain: ['ATTRACT', 'GAIN', 'RISK'], effect: '+18 demand', confidence: '68%' },
      { name: 'Acquire coaching app', chain: ['DEAL', 'JOIN', 'CREATE'], effect: '+10 capability', confidence: '77%' },
    ],
  },
};

const atomicSignals = [
  ['BUY', '+12', 'confidence entering'],
  ['GAIN', '+8', 'trust increasing'],
  ['BUILD', '+11', 'structure strengthening'],
  ['LOCK', '+9', 'retention improving'],
  ['FLOW', '+14', 'value moving cleanly'],
  ['DRIFT', '-6', 'misalignment reducing'],
  ['LEAK', '-5', 'churn pressure falling'],
  ['DOUBT', '-7', 'uncertainty leaving'],
];

export default function TimeMachine({ company }) {
  const [scenarioKey, setScenarioKey] = useState('balanced');
  const [activeMove, setActiveMove] = useState(0);
  const scenario = scenarios[scenarioKey];
  const selected = scenario.moves[activeMove];

  const comparison = useMemo(() => Object.values(scenarios), []);

  return (
    <section className="timeMachineShell" id="time-machine">
      <div className="timeMachineHeader">
        <div>
          <p className="eyebrow">ReCentre Time Machine</p>
          <h2>Recovery Horizon</h2>
          <p>
            Keep the spinning Company Pulse Reactor as the living centre. The Time Machine now projects future moves around it: every decision, every signal chain, every Level 5 path.
          </p>
        </div>
        <div className="timeMachineStatus"><span /> Future states active</div>
      </div>

      <div className="timeMachineGrid">
        <GlassPanel className="tmControls">
          <div className="tmPanelTitle"><b>Scenario Control</b><small>choose a future branch</small></div>
          <div className="tmScenarioStack">
            {Object.entries(scenarios).map(([key, item]) => (
              <button key={key} onClick={() => { setScenarioKey(key); setActiveMove(0); }} className={key === scenarioKey ? 'tmScenario active' : 'tmScenario'}>
                <b>{item.label}</b>
                <span>{item.probability}% Level 5 probability</span>
              </button>
            ))}
          </div>
          <div className="tmMiniStats">
            <div><span>Confidence</span><b>{scenario.confidence}%</b></div>
            <div><span>Cost</span><b>{scenario.cost}</b></div>
            <div><span>Target</span><b>L5</b></div>
          </div>
        </GlassPanel>

        <GlassPanel className="tmFutureStage">
          <div className="tmPanelTitle"><b>Future Path Visualizer</b><small>{company.name} projected recovery states</small></div>
          <div className="tmStage">
            <div className="tmStageGlow" />
            <div className="tmStageAxis" />
            <svg className="tmSvg" viewBox="0 0 1000 420" preserveAspectRatio="none">
              {comparison.map((item, index) => (
                <path
                  key={item.label}
                  d={item.path.map((level, i) => `${i === 0 ? 'M' : 'L'} ${70 + i * 225} ${85 + (level - 5) * 48 + index * 4}`).join(' ')}
                  fill="none"
                  stroke={item.label === scenario.label ? 'rgba(103,232,249,.92)' : 'rgba(255,255,255,.14)'}
                  strokeWidth={item.label === scenario.label ? '5' : '2'}
                  strokeLinecap="round"
                />
              ))}
            </svg>
            {scenario.path.map((level, index) => (
              <div key={index} className="tmFutureNode" style={{ left: `${7 + index * 22.5}%`, top: `${18 + (level - 5) * 11}%` }}>
                <b>L{level}</b>
                <span>{['Today','30D','90D','180D','1Y'][index]}</span>
              </div>
            ))}
            <div className="tmProbabilityOrb"><b>{scenario.probability}%</b><span>Level 5 probability</span></div>
          </div>
        </GlassPanel>

        <GlassPanel className="tmSignalPanel">
          <div className="tmPanelTitle"><b>Finest Signal Propagation</b><small>atomic telemetry from selected move</small></div>
          <div className="tmChainSentence">
            {selected.chain.map((signal, index) => (
              <React.Fragment key={signal}>
                <span>{signal}</span>{index < selected.chain.length - 1 && <i>→</i>}
              </React.Fragment>
            ))}
          </div>
          <div className="tmAtomicGrid">
            {atomicSignals.map(([name, value, desc], index) => (
              <div key={name} className="tmAtomic" style={{ animationDelay: `${index * 0.06}s` }}>
                <b>{name}</b><strong>{value}</strong><span>{desc}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="tmLedgerPanel">
          <div className="tmPanelTitle"><b>Decision Ledger</b><small>moves required to bend the future</small></div>
          {scenario.moves.map((move, index) => (
            <button key={move.name} onClick={() => setActiveMove(index)} className={activeMove === index ? 'tmLedger active' : 'tmLedger'}>
              <span><b>{move.name}</b><small>{move.chain.join(' → ')}</small></span>
              <em>{move.effect}</em>
              <strong>{move.confidence}</strong>
            </button>
          ))}
          <div className="tmThesis"><span>Supervisor thesis</span><b>{scenario.summary}</b></div>
        </GlassPanel>
      </div>
    </section>
  );
}
