import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import ClassificationPieChart from "./components/ClassificationPieChart";
import HistoryTable from "./components/HistoryTable";
import Navbar from "./components/Navbar";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
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
const sourceData = Object.values(
    history.reduce((acc, item) => {
        if (!acc[item.water_source]) {
            acc[item.water_source] = {
                source: item.water_source,
                count: 0,
            };
        }

        acc[item.water_source].count++;

        return acc;
    }, {})
);
const trendData = history.map((item, index) => ({

    inspection: index + 1,

    ph: item.ph,

    tds: item.tds,

    turbidity: item.turbidity

}));

const now = new Date();

    return (
        <>
            <Navbar/>
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
                <div className="chart-card">

    <h2>Water Source Distribution</h2>
    <p className="chart-subtitle">
        Number of inspections conducted for each water source
    </p>

    <ResponsiveContainer width="100%" height={320}>

        <BarChart
            layout="vertical"
            data={sourceData}
            margin={{
                top: 20,
                right: 40,
                left: 20,
                bottom: 10
            }}
        >

            <defs>
                <linearGradient id="waterGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2dd4bf"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
            </defs>

            <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(255,255,255,0.08)"
                horizontal={false}
            />

            <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
            />

            <YAxis
                type="category"
                dataKey="source"
                axisLine={false}
                tickLine={false}
                width={90}
            />

            <Tooltip
                cursor={{ fill: "rgba(86,214,224,0.08)" }}
                contentStyle={{
                    background: "#071316",
                    border: "1px solid #56d6e0",
                    borderRadius: "10px"
                }}
            />

            <Bar
                dataKey="count"
                fill="url(#waterGradient)"
                radius={[0,8,8,0]}
                barSize={22}
                label={{
                    position: "right",
                    fill: "#ffffff"
                }}
            />

        </BarChart>

    </ResponsiveContainer>

</div>


                <div className="history-table-wrap">
                    <h2>Inspection Log</h2>
                    <p className="chart-subtitle">Most recent field readings, newest last</p>
                    <HistoryTable history={history} />
                </div>
                
            </>
                

            )}

        </div>
        </>
    );

}

export default Dashboard;