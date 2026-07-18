import { useState } from "react";
import axios from "axios";
import "./App.css";

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

  return (

    <div className="container">

      <h1>AquaSentinel</h1>

      <p className="subtitle">

        AI-Powered Rural Water Quality Monitoring

      </p>

      <div className="card">

        <label>Village</label>

        <input

          name="village"

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

          value={formData.ph}

          onChange={handleChange}

        />

        <label>TDS</label>

        <input

          type="number"

          name="tds"

          value={formData.tds}

          onChange={handleChange}

        />

        <label>Turbidity</label>

        <input

          type="number"

          step="0.1"

          name="turbidity"

          value={formData.turbidity}

          onChange={handleChange}

        />

        <button onClick={analyzeWater}>

          {loading ? "Analyzing..." : "Analyze Water"}

        </button>

      </div>

      {result && (

        <div className="result-card">

          <h2>Analysis Result</h2>

          <p>

            <strong>Classification:</strong> {result.classification}

          </p>

          <p>

            <strong>Risk:</strong> {result.risk}

          </p>

          <p>

            <strong>Priority:</strong> {result.priority}

          </p>

          <p>

            <strong>Trend:</strong> {result.trend}

          </p>

          <p>

            <strong>Recommendation:</strong>

            <br />

            {result.recommendation}

          </p>

          <h3>Actions</h3>

          <ul>

            {result.actions.map((action, index) => (

              <li key={index}>{action}</li>

            ))}

          </ul>

        </div>

      )}

    </div>

  );

}

export default App;