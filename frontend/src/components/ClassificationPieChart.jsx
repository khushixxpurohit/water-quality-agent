import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#4CAF50",
    "#FFC107",
    "#F44336"
];

function ClassificationPieChart({ analytics }) {

    const data = [

        {
            name: "Safe",
            value: analytics.safe
        },

        {
            name: "Needs Treatment",
            value: analytics.needs_treatment
        },

        {
            name: "Unsafe",
            value: analytics.unsafe
        }

    ];

    return (

        <div className="chart-card">

            <h2>Classification Distribution</h2>

            <ResponsiveContainer width="100%" height={350}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ClassificationPieChart;