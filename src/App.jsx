import React, { useMemo, useState } from 'react';
import './styles.css';
import Background from './components/Layout/Background';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import CompanyPulse from './components/Pulse/CompanyPulse';

export default function App() {
  const [mode, setMode] = useState('cinematic');
  const [selectedAction, setSelectedAction] = useState('De-mark hardware dependency');

  const peloton = useMemo(() => ({
    name: 'Peloton',
    thesis: 'ReCentre Peloton away from premium hardware dependency and toward a premium connected coaching platform.',
    level: 9,
    target: 5,
    recoveryProbability: 74,
    trust: 68,
    drift: 31,
    confidence: 82,
    score: 71,
    signals: [
      { key: 'BUY', value: '+12', meaning: 'confidence entering', type: 'positive' },
      { key: 'SELL', value: '-4', meaning: 'confidence leaving', type: 'negative' },
      { key: 'GAIN', value: '+8', meaning: 'trust increasing', type: 'positive' },
      { key: 'LOSS', value: '-2', meaning: 'trust decreasing', type: 'negative' },
      { key: 'BUILD', value: '+6', meaning: 'structure strengthening', type: 'positive' },
      { key: 'DRIFT', value: '+18', meaning: 'market misalignment', type: 'warning' },
      { key: 'TRUST', value: '74', meaning: 'belief in company', type: 'positive' },
      { key: 'FLOW', value: '81', meaning: 'healthy value movement', type: 'positive' },
      { key: 'LOCK', value: '92%', meaning: 'retention strength', type: 'positive' },
      { key: 'LEAK', value: '21%', meaning: 'churn pressure', type: 'warning' },
      { key: 'RECENTRE', value: 'L5', meaning: 'target state', type: 'target' },
    ],
    supervisor: [
      { name: 'Hardware friction', signal: 'SELL + BLOCK + DRIFT', severity: 78, action: 'Reduce purchase friction and shift value story to subscription outcomes.' },
      { name: 'Subscription loyalty', signal: 'LOCK + TRUST + FLOW', severity: 83, action: 'Amplify coaching identity and community-led retention.' },
      { name: 'Pricing confusion', signal: 'BLOCK + DOUBT + LEAK', severity: 64, action: 'Simplify bundles and create a lower-friction entry tier.' },
      { name: 'Instructor brand', signal: 'BUILD + PULL + GAIN', severity: 88, action: 'Make instructors the premium category anchor.' },
    ],
    opportunities: [
      { label: 'Family Bundle', impact: '+11 Trust', distance: 1 },
      { label: 'AI Coach', impact: '+9 Growth', distance: 2 },
      { label: 'Corporate Wellness', impact: '+7 Flow', distance: 3 },
      { label: 'Retail Try-Before-Buy', impact: '-8 Block', distance: 2 },
      { label: 'Instructor Network', impact: '+13 Lock', distance: 1 },
    ],
    dna: [
      { label: 'Brand', value: 78 },
      { label: 'Product', value: 62 },
      { label: 'Pricing', value: 44 },
      { label: 'Audience', value: 71 },
      { label: 'Narrative', value: 58 },
      { label: 'Community', value: 86 },
      { label: 'Competition', value: 39 },
    ],
    timeline: [
      { label: 'Today', level: 9 },
      { label: '30D', level: 8 },
      { label: '60D', level: 7 },
      { label: '90D', level: 6 },
      { label: 'Level 5', level: 5 },
    ],
    actions: [
      'De-mark hardware dependency',
      'Rebuild around coaching subscription',
      'Simplify pricing trust',
      'Launch family retention bundle',
      'Amplify instructor-led community',
    ],
  }), []);

  return (
    <main className={mode === 'boardroom' ? 'app boardroom' : 'app cinematic'}>
      <Background />
      <Sidebar active="Company Pulse" />
      <section className="workspace">
        <TopBar company={peloton.name} mode={mode} setMode={setMode} />
        <CompanyPulse company={peloton} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
      </section>
    </main>
  );
}
