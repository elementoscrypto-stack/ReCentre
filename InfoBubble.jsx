import { forecast } from '../../core/telemetry/ForecastEngine';
export default function ExecutiveForecast(){return <div className="forecast-strip">{forecast.map(f=><div key={f.period}><b>{f.period}</b><span>L{f.level}</span><small>Trust {f.trust}</small></div>)}</div>}
