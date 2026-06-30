import React, { useState } from 'react';
import './styles.css';
import Background from './components/Layout/Background';
import Sidebar from './components/Layout/Sidebar';
import WelcomeExperience from './components/Pulse/WelcomeExperience';
import CompanyPulse from './components/Pulse/CompanyPulse';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState('pulse');

  return (
    <div className="rc-app">
      <Background />
      {!entered ? (
        <WelcomeExperience onEnter={() => setEntered(true)} />
      ) : (
        <div className="rc-shell">
          <Sidebar section={section} setSection={setSection} />
          <main className="rc-main">
            <CompanyPulse section={section} setSection={setSection} />
          </main>
        </div>
      )}
    </div>
  );
}
