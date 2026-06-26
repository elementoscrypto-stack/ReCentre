import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  Crosshair,
  Diamond,
  Gauge,
  Layers3,
  Orbit,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import "./App.css";

const levelLabels = {
  1: "Minute Risk",
  2: "Stable Signal",
  3: "Light Drift",
  4: "Market Watch",
  5: "ReCentred",
  6: "Nuance Forming",
  7: "Recovery Motion",
  8: "Trust Strain",
  9: "Category Drift",
  10: "Critical Offering",
  11: "Confidence Loss",
  12: "Structural Weakness",
  13: "Collapse Warning",
  14: "Back-to-Back Replay",
  15: "Full Market Crisis",
};

const demoCompanies = {
  Peloton: {
    offer: "Premium connected fitness subscription hardware",
    level: 10,
    trustDelta: 12,
    sentimentDelta: 9,
    revenueDelta: 4,
    audienceDelta: 7,
    relevanceDelta: 14,
    riskPressure: 8,
  },
  Nokia: {
    offer: "Legacy mobile and network infrastructure brand",
    level: 9,
    trustDelta: 9,
    sentimentDelta: 6,
    revenueDelta: 5,
    audienceDelta: 4,
    relevanceDelta: 7,
    riskPressure: 6,
  },
  WeWork: {
    offer: "Flexible office space with damaged investor trust",
    level: 13,
    trustDelta: 8,
    sentimentDelta: 5,
    revenueDelta: 3,
    audienceDelta: 6,
    relevanceDelta: 9,
    riskPressure: 14,
  },
  BlackBerry: {
    offer: "Security-first enterprise software after mobile decline",
    level: 8,
    trustDelta: 7,
    sentimentDelta: 7,
    revenueDelta: 4,
    audienceDelta: 5,
    relevanceDelta: 6,
    riskPressure: 5,
  },
};

const nuances = [
  {
    name: "Confidence Lifestyle System",
    category: "Confidence Commerce",
    lift: 3,
    description: "Turns hardware into a trusted recovery lifestyle category.",
  },
  {
    name: "Decision Recovery OS",
    category: "Recovery Operations Software",
    lift: 4,
    description: "Turns vague software into urgent executive clarity.",
  },
  {
    name: "Adaptive Trust Infrastructure",
    category: "Trust Infrastructure",
    lift: 5,
    description: "Turns legacy reputation into dependable market confidence.",
  },
  {
    name: "Founder Proof Narrative",
    category: "Founder Recovery Category",
    lift: 2,
    description: "Turns early confusion into a believable promise.",
  },
];

function clampLevel(value) {
  return Math.max(1, Math.min(15, value));
}

export default function App() {
  const [company, setCompany] = useState("Peloton");
  const [offer, setOffer] = useState(demoCompanies.Peloton.offer);
  const [currentLevel, setCurrentLevel] = useState(10);
  const [mode, setMode] = useState("Public Mode");
  const [selectedNuance, setSelectedNuance] = useState(nuances[0]);

  const [deltas, setDeltas] = useState({
    trustDelta: 12,
    sentimentDelta: 9,
    revenueDelta: 4,
    audienceDelta: 7,
    relevanceDelta: 14,
    riskPressure: 8,
  });

  const analysis = useMemo(() => {
    const positive =
      deltas.trustDelta +
      deltas.sentimentDelta +
      deltas.revenueDelta +
      deltas.audienceDelta +
      deltas.relevanceDelta;

    const deltaImpact = Math.round(positive / 9);
    const riskLift = Math.round(deltas.riskPressure / 4);

    const newLevel = clampLevel(
      currentLevel - deltaImpact - selectedNuance.lift + riskLift
    );

    return {
      positive,
      deltaImpact,
      riskLift,
      newLevel,
      geometry: newLevel > 7 ? "SOR" : "NOR",
      midLevel: newLevel > 7 ? Math.max(7, newLevel - 2) : newLevel,
      currentLabel: levelLabels[currentLevel],
      newLabel: levelLabels[newLevel],
    };
  }, [deltas, currentLevel, selectedNuance]);

  function loadCompany(name) {
    const demo = demoCompanies[name];
    setCompany(name);
    setOffer(demo.offer);
    setCurrentLevel(demo.level);
    setDeltas({
      trustDelta: demo.trustDelta,
      sentimentDelta: demo.sentimentDelta,
      revenueDelta: demo.revenueDelta,
      audienceDelta: demo.audienceDelta,
      relevanceDelta: demo.relevanceDelta,
      riskPressure: demo.riskPressure,
    });
  }

  function updateDelta(key, value) {
    setDeltas((prev) => ({ ...prev, [key]: Number(value) }));
  }

  const shards = offer.split(/\s+/).filter(Boolean).slice(0, 10);

  return (
    <main className={`appShell ${analysis.geometry === "NOR" ? "norMode" : "sorMode"}`}>
      <div className="backgroundGrid" />
      <div className="sorLines" />

      <section className="wrap">
        <nav className="nav">
          <div className="brand">
            <div className="logoMark">◇</div>
            <div>
              <h1>ReCentre</h1>
              <p>Original cinematic look + Delta/Nuance Engine</p>
            </div>
          </div>

          <button className="primaryBtn">
            <Zap size={16} />
            Run ReCentre Shift
          </button>
        </nav>

        <section className="hero">
          <div>
            <div className="kicker">POSTER LOOK RESTORED · NOR/SOR · DELTA + NUANCE</div>
            <h2 className="heroTitle">
              Vibrate the old offer. Fuse the new nuance. Shift the company to Level 5.
            </h2>
            <p className="heroCopy">
              ReCentre is back in the original neon command-centre style, now with the new engine:
              <b> deltas move the company</b>, <b> nuance directs the category</b>, and the system
              animates the path from crisis into trust recovery.
            </p>

            <div className="pillRow">
              <Pill>Live company demos</Pill>
              <Pill>Delta movement</Pill>
              <Pill>Nuance selector</Pill>
              <Pill>Category gravity</Pill>
              <Pill>Offer shatter</Pill>
              <Pill>15-level tower</Pill>
            </div>
          </div>

          <Reactor analysis={analysis} currentLevel={currentLevel} />
        </section>

        <section className="layout">
          <aside className="card">
            <SectionTitle icon={<Search size={18} />} title="Company Scanner" />

            <div className="demoGrid">
              {Object.keys(demoCompanies).map((name) => (
                <button
                  key={name}
                  className={company === name ? "smallBtn active" : "smallBtn"}
                  onClick={() => loadCompany(name)}
                >
                  {name}
                </button>
              ))}
            </div>

            <Field label="Company">
              <input value={company} onChange={(e) => setCompany(e.target.value)} />
            </Field>

            <Field label="Current Offering">
              <textarea rows={3} value={offer} onChange={(e) => setOffer(e.target.value)} />
            </Field>

            <Slider
              label="Current Level"
              value={currentLevel}
              min={1}
              max={15}
              onChange={setCurrentLevel}
              plainValue
            />

            <div className="modeGrid">
              {["Public Mode", "Private Mode"].map((item) => (
                <button
                  key={item}
                  className={mode === item ? "smallBtn active" : "smallBtn"}
                  onClick={() => setMode(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="modeNote">
              <Building2 size={16} />
              {mode === "Public Mode"
                ? "Public mode simulates stocks, earnings, headlines, reviews, layoffs and launches."
                : "Private mode simulates pitch decks, website copy, reviews, sales notes and internal feedback."}
            </div>
          </aside>

          <main className="mainStack">
            <Card>
              <SectionTitle icon={<Activity size={18} />} title="Delta Movement Engine" />
              <div className="deltaGrid">
                <DeltaSlider label="Trust Delta" value={deltas.trustDelta} onChange={(v) => updateDelta("trustDelta", v)} />
                <DeltaSlider label="Sentiment Delta" value={deltas.sentimentDelta} onChange={(v) => updateDelta("sentimentDelta", v)} />
                <DeltaSlider label="Revenue Delta" value={deltas.revenueDelta} onChange={(v) => updateDelta("revenueDelta", v)} />
                <DeltaSlider label="Audience Delta" value={deltas.audienceDelta} onChange={(v) => updateDelta("audienceDelta", v)} />
                <DeltaSlider label="Relevance Delta" value={deltas.relevanceDelta} onChange={(v) => updateDelta("relevanceDelta", v)} />
                <DeltaSlider label="Risk Pressure" value={deltas.riskPressure} onChange={(v) => updateDelta("riskPressure", v)} danger />
              </div>
            </Card>

            <Card>
              <SectionTitle icon={<Diamond size={18} />} title="Nuance Selector" />
              <div className="nuanceGrid">
                {nuances.map((nuance) => (
                  <button
                    key={nuance.name}
                    onClick={() => setSelectedNuance(nuance)}
                    className={selectedNuance.name === nuance.name ? "nuance active" : "nuance"}
                  >
                    <b>{nuance.name}</b>
                    <span>{nuance.description}</span>
                    <em>+{nuance.lift} level lift · {nuance.category}</em>
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle icon={<RefreshCw size={18} />} title="Recovery Path" />
              <div className="path">
                <PathNode level={currentLevel} label="Current" />
                <ArrowRight className="pathArrow" />
                <PathNode level={analysis.midLevel} label="Shifted" active />
                <ArrowRight className="pathArrow" />
                <PathNode level={5} label="ReCentred" goal />
              </div>
            </Card>
          </main>

          <aside className="sideStack">
            <Card>
              <SectionTitle icon={<Orbit size={18} />} title="Nuance Fusion Core" />
              <div className="heatGrid">
                <HeatCell value={analysis.deltaImpact} label="Total delta impact" />
                <HeatCell value={selectedNuance.lift} label="Nuance lift" />
                <HeatCell value={deltas.riskPressure} label="Risk pressure" danger />
                <HeatCell value={analysis.geometry} label="Geometry state" />
              </div>
            </Card>

            <Card>
              <SectionTitle icon={<Crosshair size={18} />} title="Category Gravity" />
              <div className="gravityMap">
                <div className="oldOffer">
                  <small>Old offer</small>
                  <b>{offer}</b>
                </div>
                <div className="gravityArrow">→</div>
                <div className="newCategory">
                  <b>{selectedNuance.category}</b>
                </div>
              </div>
            </Card>
          </aside>
        </section>

        <Card className="wideCard">
          <SectionTitle icon={<Sparkles size={18} />} title="Old Offer Shatter Lab" />
          <div className="shatterLab">
            {shards.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="shard"
                style={{
                  left: `${8 + (index * 11) % 78}%`,
                  top: `${22 + (index * 17) % 56}%`,
                  transform: `rotate(${index % 2 ? -12 : 14}deg) skewX(${index % 2 ? -6 : 4}deg)`,
                  animationDelay: `${index * 0.12}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </Card>

        <Card className="wideCard">
          <SectionTitle icon={<Layers3 size={18} />} title="15-Level Recovery Tower" />
          <div className="tower">
            {Array.from({ length: 15 }, (_, index) => index + 1).map((level) => (
              <div
                key={level}
                className={[
                  "towerBar",
                  level === analysis.newLevel ? "now" : "",
                  level === 5 ? "goal" : "",
                  level >= 11 ? "hot" : "",
                ].join(" ")}
                style={{ height: `${42 + level * 10}px` }}
              >
                L{level}
              </div>
            ))}
          </div>
        </Card>

        <Card className="wideCard">
          <SectionTitle icon={<Target size={18} />} title="Strategy Output" />
          <div className="reportGrid">
            <ReportItem
              title="Current State"
              text={`${company} is at Level ${currentLevel}: ${levelLabels[currentLevel]}.`}
            />
            <ReportItem
              title="Delta Signal"
              text={`Delta impact is ${analysis.deltaImpact}. Risk pressure is ${deltas.riskPressure}. New simulated level is ${analysis.newLevel}.`}
            />
            <ReportItem
              title="Nuance Direction"
              text={`${selectedNuance.name} redirects the offer into ${selectedNuance.category}.`}
            />
            <ReportItem
              title="Level 5 Target"
              text={
                analysis.newLevel <= 5
                  ? "The company has reached or beaten Level 5."
                  : `Next target: move Level ${analysis.newLevel} → Level 5.`
              }
            />
          </div>
        </Card>
      </section>
    </main>
  );
}

function Reactor({ analysis, currentLevel }) {
  return (
    <Card className="reactor">
      <div className="axisH" />
      <div className="axisV" />
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />

      <div className="core">
        <Gauge size={34} />
        <div className="levelText">L{currentLevel}</div>
        <div className="levelLabel">{analysis.currentLabel}</div>
      </div>

      <div className="statbar clean">
        <Stat label="Delta Impact" value={`+${analysis.deltaImpact}`} />
        <Stat label="Nuance Lift" value={`+${analysis.riskLift}`} />
        <Stat label="New Level" value={`L${analysis.newLevel}`} />
      </div>
    </Card>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function SectionTitle({ icon, title }) {
  return (
    <div className="sectionTitle">
      <div className="sectionIcon">{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Slider({ label, value, min, max, onChange, plainValue }) {
  return (
    <div className="sliderBox">
      <div className="sliderTop">
        <span>{label}</span>
        <b>{plainValue ? value : `+${value}`}</b>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function DeltaSlider({ label, value, onChange, danger }) {
  return (
    <div className={danger ? "deltaCard danger" : "deltaCard good"}>
      <Slider label={label} value={value} min={0} max={30} onChange={onChange} />
    </div>
  );
}

function PathNode({ level, label, active, goal }) {
  return (
    <div className={["pathNode", active ? "active" : "", goal ? "goal" : ""].join(" ")}>
      <b>L{level}</b>
      <span>{label}</span>
    </div>
  );
}

function HeatCell({ value, label, danger }) {
  return (
    <div className={danger ? "heatCell danger" : "heatCell"}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function ReportItem({ title, text }) {
  return (
    <div className="reportItem">
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}
