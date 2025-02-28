import React, { useState } from 'react';
import './Teams.css';
import TeamManagement from './Teams-management_menu.jsx';
import TeamSchedual from './Teams-schedule_menu.jsx';

function Teams() {
    const [viewMode, setViewMode] = useState("teams"); // Estado para alternar entre Teams e Schedule

    return (
        <div className="teams-container">
            <div className="sidebar">
                <h1>Teams</h1>
                <div className="sidebar-buttons">
                    <button onClick={() => setViewMode("teams")}>Teams</button>
                    <button onClick={() => setViewMode("schedule")}>Schedule</button>
                    <button>History</button>
                </div>
            </div>

            {viewMode === "teams" && <TeamManagement />}
            {viewMode === "schedule" && <TeamSchedual />}
        </div>
    );
}

export default Teams;
