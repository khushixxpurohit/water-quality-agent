function HistoryTable({ history }) {

    return (

        <div className="chart-card">

            <h2>Inspection History</h2>

            <table className="history-table">

                <thead>

                    <tr>

                        <th>Village</th>

                        <th>Source</th>

                        <th>Flood Status</th>

                        <th>pH</th>

                        <th>TDS</th>

                        <th>Turbidity</th>

                        <th>Classification</th>

                        <th>Risk</th>

                    </tr>

                </thead>

                <tbody>

                    {history.map((item, index) => (

                        <tr key={index}>

                            <td>{item.village}</td>

                            <td>{item.water_source}</td>

                            <td>{item.flood_status}</td>

                            <td>{item.ph}</td>

                            <td>{item.tds}</td>

                            <td>{item.turbidity}</td>

                            <td>{item.classification}</td>

                            <td>{item.risk}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default HistoryTable;