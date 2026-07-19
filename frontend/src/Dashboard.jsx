import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import ClassificationPieChart from "./components/ClassificationPieChart";
import HistoryTable from "./components/HistoryTable";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const tooltipStyle = {
    background: "#071316",
    border: "1px solid rgba(79,208,218,0.35)",
    borderRadius: 8,
    fontFamily: "IBM Plex Mono, monospace",
    fontSize: 12
};

const axisTick = { fill: "#7fa3a6", fontFamily: "IBM Plex Mono, monospace", fontSize: 11 };

function Dashboard() {

    const [analytics, setAnalytics] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchAnalytics();
        fetchHistory();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const response = await axios.get(
                "https://water-quality-agent.onrender.com/analytics"
            );

            setAnalytics(response.data);

        }

        catch (err) {

            console.log(err);

        }

    };
    const fetchHistory = async () => {

    try {

        const response = await axios.get(
            "https://water-quality-agent.onrender.com/history"
        );

        setHistory(response.data);

    }

    catch (err) {

        console.log(err);

    }

};
const trendData = history.map((item, index) => ({

    inspection: index + 1,

    ph: item.ph,

    tds: item.tds,

    turbidity: item.turbidity

}));

const now = new Date();

    return (

        <div className="dashboard-page">

            <div className="dashboard-eyebrow">
                <span>Basin-Wide Station Log</span>
                <span>{now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>

            <h1>AquaSentinel Analytics Dashboard</h1>

            {!analytics ? (

                <p className="dashboard-loading">Pulling station records...</p>

            ) : (
                <>

                <div className="stats-grid">

                    <div className="card neutral">
                        <h3>Total Inspections</h3>
                        <h2>{analytics.total_inspections}</h2>
                    </div>

                    <div className="card safe">
                        <h3>Safe</h3>
                        <h2>{analytics.safe}</h2>
                    </div>

                    <div className="card warning">
                        <h3>Needs Treatment</h3>
                        <h2>{analytics.needs_treatment}</h2>
                    </div>

                    <div className="card danger">
                        <h3>Unsafe</h3>
                        <h2>{analytics.unsafe}</h2>
                    </div>

                    <div className="card danger">
                        <h3>High Risk</h3>
                        <h2>{analytics.high_risk}</h2>
                    </div>

                    <div className="card warning">
                        <h3>Medium Risk</h3>
                        <h2>{analytics.medium_risk}</h2>
                    </div>

                    <div className="card safe">
                        <h3>Low Risk</h3>
                        <h2>{analytics.low_risk}</h2>
                    </div>

                </div>
                <div className="chart-card">

                  <h2>Water Quality Trend</h2>
                  <p className="chart-subtitle">pH · TDS · Turbidity across recorded inspections</p>

                  <ResponsiveContainer width="100%" height={350}>

                     <LineChart data={trendData}>

                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,163,166,0.15)" />

                         <XAxis dataKey="inspection" stroke="#7fa3a6" tick={axisTick} />

                         <YAxis stroke="#7fa3a6" tick={axisTick} />

                         <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#f2eee1" }} />

                         <Line
                             type="monotone"
                             dataKey="ph"
                             stroke="#56d6e0"
                             strokeWidth={2}
                             dot={{ r: 3, fill: "#56d6e0" }}
                         />

                            <Line
                                type="monotone"
                                dataKey="tds"
                                stroke="#92e396"
                                strokeWidth={2}
                                dot={{ r: 3, fill: "#92e396" }}
                            />

                            <Line
                                type="monotone"
                                dataKey="turbidity"
                              stroke="#f2b06a"
                              strokeWidth={2}
                              dot={{ r: 3, fill: "#f2b06a" }}
                          />

                      </LineChart>

                 </ResponsiveContainer>

                </div>
                <ClassificationPieChart analytics={analytics} />
                <div className="history-table-wrap">
                    <h2>Inspection Log</h2>
                    <p className="chart-subtitle">Most recent field readings, newest last</p>
                    <HistoryTable history={history} />
                </div>
            </>
                

            )}

        </div>

    );

}

export default Dashboard;