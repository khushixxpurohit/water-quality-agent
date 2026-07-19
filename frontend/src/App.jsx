import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "./App.css";

const RISK_SCORES = { Low: 20, Medium: 55, High: 85 };
const RISK_CLASS = { Low: "safe", Medium: "warning", High: "danger" };

// Signature element: a river-gauge post, styled after the physical
// staff gauges used at flood monitoring stations, filling to the
// AI-assessed risk level.
function RiskGauge({ risk }) {
  const score = RISK_SCORES[risk] ?? 0;
  const tier = RISK_CLASS[risk] ?? "safe";
  const fillFraction = score / 100;

  const tubeTop = 20;
  const tubeBottom = 220;
  const tubeHeight = tubeBottom - tubeTop;
  const fillHeight = tubeHeight * fillFraction;
  const fillY = tubeBottom - fillHeight;

  const ticks = [0, 20, 40, 60, 80, 100];

  return (
    <div className="gauge-box">
      <h3>Risk Gauge</h3>
      <svg viewBox="0 0 140 250" width="120" height="214" role="img" aria-label={`Risk gauge reading ${score} out of 100, ${risk} risk`}>
        <rect x="40" y={tubeTop} width="34" height={tubeHeight} rx="6" fill="rgba(127,163,166,0.12)" stroke="rgba(127,163,166,0.35)" strokeWidth="1.5" />
        <clipPath id="tubeClip">
          <rect x="40" y={tubeTop} width="34" height={tubeHeight} rx="6" />
        </clipPath>
        <g clipPath="url(#tubeClip)">
          <rect
            className={`gauge-fill-${tier} gauge-fill-animated`}
            x="40"
            y={fillY}
            width="34"
            height={fillHeight + 10}
          />
        </g>
        {ticks.map((t) => {
          const y = tubeBottom - (t / 100) * tubeHeight;
          return (
            <g key={t}>
              <line x1="30" y1={y} x2="40" y2={y} stroke="rgba(127,163,166,0.5)" strokeWidth="1.5" />
              <text x="24" y={y + 3} textAnchor="end" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="#7fa3a6">
                {t}
              </text>
            </g>
          );
        })}
        <line x1="40" y1={tubeBottom} x2="74" y2={tubeBottom} stroke="rgba(127,163,166,0.6)" strokeWidth="2" />
      </svg>
      <div className={`gauge-readout ${tier}`}>
        <span className="value">{score}</span>
        <span className="label">{risk ?? "—"} risk index</span>
      </div>
    </div>
  );
}

function App() {

  const [formData, setFormData] = useState({
    village: "",
    water_source: "Hand Pump",
    flood_status: "Post-Flood",
    flood_event_id: "WB-2026-001",
    ph: "",
    tds: "",
    turbidity: ""
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const chartData = result
  ? [
      {
        parameter: "pH",
        value: Number(formData.ph),
      },
      {
        parameter: "TDS",
        value: Number(formData.tds),
      },
      {
        parameter: "Turbidity",
        value: Number(formData.turbidity),
      },
    ]
  : [];

  const pieData = result
  ? [
      {
        name: "Risk Score",
        value:
          result.risk === "High"
            ? 80
            : result.risk === "Medium"
            ? 50
            : 20,
      },
      {
        name: "Safe Margin",
        value:
          result.risk === "High"
            ? 20
            : result.risk === "Medium"
            ? 50
            : 80,
      },
    ]
  : [];
  const COLORS = ["#ff8266", "#92e396"];

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const analyzeWater = async () => {

    try {

      setLoading(true);

      const response = await axios.post(

        "http://127.0.0.1:8000/analyze",

        {

          ...formData,

          ph: Number(formData.ph),

          tds: Number(formData.tds),

          turbidity: Number(formData.turbidity)

        }

      );

      setResult(response.data);

    }

    catch (err) {

      console.error(err);

      alert("Backend connection failed.");

    }

    finally {

      setLoading(false);

    }

  };

  const now = new Date();

  return (
    <>
    <Navbar/>

    <div className="container">

      <div className="station-bar">
        <span>🌐 Ganga–Brahmaputra Basin Network</span>
        <span>{now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}</span>
      </div>

      <h1>AquaSentinel</h1>

      <p className="subtitle">

        AI-Powered Rural Water Quality Monitoring

      </p>

      <div className="card">

        <div className="card-eyebrow">
          <span>Field Reading Entry</span>
          <span>{formData.flood_event_id}</span>
        </div>

        <label>Village</label>

        <input

          name="village"

          placeholder="e.g. Nabagram, Murshidabad"

          value={formData.village}

          onChange={handleChange}

        />

        <label>Water Source</label>

        <select

          name="water_source"

          value={formData.water_source}

          onChange={handleChange}

        >

          <option>Hand Pump</option>

          <option>Tube Well</option>

          <option>River</option>

          <option>Pond</option>

        </select>

        <label>Flood Status</label>

        <select

          name="flood_status"

          value={formData.flood_status}

          onChange={handleChange}

        >

          <option>Normal</option>

          <option>Flood</option>

          <option>Post-Flood</option>

        </select>

        <label>pH</label>

        <input

          type="number"

          step="0.1"

          name="ph"

          placeholder="e.g. 7.2"

          value={formData.ph}

          onChange={handleChange}

        />

        <label>TDS (ppm)</label>

        <input

          type="number"

          name="tds"

          placeholder="e.g. 480"

          value={formData.tds}

          onChange={handleChange}

        />

        <label>Turbidity (NTU)</label>

        <input

          type="number"

          step="0.1"

          name="turbidity"

          placeholder="e.g. 3.5"

          value={formData.turbidity}

          onChange={handleChange}

        />

        <button onClick={analyzeWater} disabled={loading}>

          {loading ? "Analyzing..." : "Analyze Water"}

        </button>

      </div>

      {result && (

<div className="result-card">

<h2>Water Quality Dashboard</h2>
<div className="inspection-info">

    <div className="info-item">
        <span className="info-title">📍 Village</span>
        <span>{formData.village || "Unnamed site"}</span>
    </div>

    <div className="info-item">
        <span className="info-title">💧 Water Source</span>
        <span>{formData.water_source}</span>
    </div>

    <div className="info-item">
        <span className="info-title">🌊 Flood Status</span>
        <span>{formData.flood_status}</span>
    </div>

    <div className="info-item">
        <span className="info-title">🧪 Inspection ID</span>
        <span>{formData.flood_event_id}</span>
    </div>

</div>

<div className="status-grid">

<div
  className={`status-card ${
    result.classification === "Safe"
      ? "safe"
      : result.classification === "Needs Treatment"
      ? "warning"
      : "danger"
  }`}
>
    <h4>Classification</h4>
    <p>{result.classification}</p>
  </div>

  <div
  className={`status-card ${
    result.risk === "Low"
      ? "safe"
      : result.risk === "Medium"
      ? "warning"
      : "danger"
  }`}
>
    <h4>Risk</h4>
    <p>{result.risk}</p>
  </div>

  <div className="status-card">
    <h4>Priority</h4>
    <p>{result.priority}</p>
  </div>

  <div className="status-card">
    <h4>Flood Status</h4>
    <p>{formData.flood_status}</p>
  </div>

</div>

<div className="charts-row">

  <RiskGauge risk={result.risk} />

  <div className="chart-box">

    <h3>Water Parameters</h3>

    <ResponsiveContainer width="100%" height={260}>

      <BarChart data={chartData}>

        <XAxis dataKey="parameter" stroke="#7fa3a6" tick={{ fill: "#7fa3a6", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 }} />

        <YAxis stroke="#7fa3a6" tick={{ fill: "#7fa3a6", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 }} />

        <Tooltip contentStyle={{ background: "#071316", border: "1px solid rgba(79,208,218,0.35)", borderRadius: 8 }} labelStyle={{ color: "#f2eee1" }} />

        <Bar dataKey="value" fill="#2ba9b4" radius={[4, 4, 0, 0]} />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

<div className="charts-row">

  <div className="chart-box">

    <h3>Risk Distribution</h3>

    <ResponsiveContainer width="100%" height={280}>

      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={95}
          label
        >

          {pieData.map((entry,index)=>(

            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip contentStyle={{ background: "#071316", border: "1px solid rgba(79,208,218,0.35)", borderRadius: 8 }} labelStyle={{ color: "#f2eee1" }} />

        <Legend wrapperStyle={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 11, color: "#cdd8d6" }} />

      </PieChart>

    </ResponsiveContainer>

  </div>

  <div className="chart-box">

    <h3>Parameter Spread</h3>

    <ResponsiveContainer width="100%" height={280}>

      <RadarChart data={chartData}>

        <PolarGrid stroke="rgba(127,163,166,0.25)" />

        <PolarAngleAxis dataKey="parameter" tick={{ fill: "#7fa3a6", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 }} />

        <PolarRadiusAxis tick={{ fill: "#7fa3a6", fontSize: 10 }} />

        <Radar
          dataKey="value"
          stroke="#56d6e0"
          fill="#2ba9b4"
          fillOpacity={0.45}
        />

      </RadarChart>

    </ResponsiveContainer>

  </div>

</div>

<div className="recommendation-box">

    <h3>💡 AI Recommendation</h3>

    <p>{result.recommendation}</p>

</div>

<div className="action-panel">

    <h3>📋 Recommended Action Plan</h3>

    <div className="action-grid">

        {result.actions.map((action, index) => (

            <div className="action-card" key={index}>

                <span className="action-icon">✅</span>

                <span>{action}</span>

            </div>

        ))}

    </div>

</div>

<div className="result-footer">
  <span>Model: AquaSentinel v1 · Field Inference</span>
  <span>Logged {now.toLocaleTimeString()}</span>
</div>

</div>

)}

    </div>
</>
  );

}

export default App;