
import React, { useContext, useEffect, useState } from 'react';
import { AgentContext } from '../context/AgentContext';

const ExecutionMonitor = () => {
    const { state } = useContext(AgentContext);
    const [logs, setLogs] = useState([]);
    const [displayedLogs, setDisplayedLogs] = useState([]);

    useEffect(() => {
        setLogs(state.executedLog);
    }, [state.executedLog]);

    useEffect(() => {
        if (logs.length > 0) {
            const showLogsWithDelay = () => {
                logs.forEach((log, index) => {
                    setTimeout(() => {
                        setDisplayedLogs((prevLogs) => [...prevLogs, log]);
                    }, index * 500);
                });
            };
            showLogsWithDelay();
        }
    }, [logs]);

    return (
        <div className="execution-logs-container">
            <h3 className="logs-header">Execution Logs</h3>
            {displayedLogs && displayedLogs.map((log, index) => (
                <div key={index} className="log-item">
                    {log.output}
                </div>
            ))}
        </div>
    );
};

export default ExecutionMonitor;
