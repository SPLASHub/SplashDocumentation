import React, { useState, useEffect } from 'react';
import './Teams-schedule_menu.css'; // Importa o arquivo CSS

function TeamSchedule() {
    const [schedule, setSchedule] = useState({
        Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
    });
    const [newShift, setNewShift] = useState({
        day: 'Monday', startTime: '', endTime: '', person: ''
    });
    const [editing, setEditing] = useState({ index: null, day: '' });
    const [columnWidths, setColumnWidths] = useState({
        Monday: 200, Tuesday: 200, Wednesday: 200, Thursday: 200, Friday: 200, Saturday: 200, Sunday: 200
    });
    const [resizing, setResizing] = useState({ active: false, day: '', startX: 0, startWidth: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!resizing.active) return;

            const delta = e.clientX - resizing.startX;
            const newWidth = Math.max(150, resizing.startWidth + delta);

            setColumnWidths(prev => ({
                ...prev,
                [resizing.day]: newWidth
            }));
        };

        const handleMouseUp = () => {
            setResizing({ active: false, day: '', startX: 0, startWidth: 0 });
        };

        if (resizing.active) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing]);

    const timeToPixels = time => {
        const [h, m] = time.split(':').map(Number);
        return ((h - 8) * 60) + m;
    };

    const calculateLanes = (shifts) => {
        const indexedShifts = shifts.map((shift, index) => ({ ...shift, originalIndex: index }));
        const sorted = [...indexedShifts].sort((a, b) =>
            timeToPixels(a.startTime) - timeToPixels(b.startTime)
        );

        const lanes = [];
        const laneAssignments = new Array(shifts.length).fill(0);
        let maxLanes = 0;

        sorted.forEach(shift => {
            const start = timeToPixels(shift.startTime);
            const end = timeToPixels(shift.endTime);
            let laneFound = false;

            for (let lane = 0; lane < lanes.length; lane++) {
                if (start >= lanes[lane]) {
                    lanes[lane] = end;
                    laneFound = true;
                    laneAssignments[shift.originalIndex] = lane;
                    break;
                }
            }

            if (!laneFound) {
                lanes.push(end);
                laneAssignments[shift.originalIndex] = lanes.length - 1;
                maxLanes = Math.max(maxLanes, lanes.length);
            }
        });

        return { laneAssignments, totalLanes: maxLanes || 1 };
    };

    const handleAddShift = () => {
        if (!newShift.startTime || !newShift.endTime || !newShift.person) return;

        if (editing.index !== null) {
            const updated = [...schedule[editing.day]];
            updated[editing.index] = newShift;
            setSchedule(prev => ({ ...prev, [editing.day]: updated }));
            setEditing({ index: null, day: '' });
        } else {
            setSchedule(prev => ({
                ...prev,
                [newShift.day]: [...prev[newShift.day], newShift]
            }));
        }
        setNewShift({ day: 'Monday', startTime: '', endTime: '', person: '' });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setNewShift(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (day, index) => {
        const shift = schedule[day][index];
        setNewShift({ ...shift, day });
        setEditing({ index, day });
    };

    const handleDelete = (day, index) => {
        setSchedule(prev => ({
            ...prev,
            [day]: prev[day].filter((_, i) => i !== index)
        }));
    };

    const ResizableBorder = ({ day }) => (
        <div
            className="resizable-border"
            onMouseDown={(e) => {
                setResizing({
                    active: true,
                    day,
                    startX: e.clientX,
                    startWidth: columnWidths[day]
                });
            }}
        />
    );

    const ShiftBlock = ({ shift, lane, totalLanes, onEdit, onDelete, day }) => {
        const start = timeToPixels(shift.startTime);
        const end = timeToPixels(shift.endTime);
        const laneWidth = 95 / totalLanes;

        return (
            <div
                className="shift-block"
                style={{
                    top: `${start}px`,
                    height: `${end - start}px`,
                    left: `${5 + (lane * laneWidth)}%`,
                    width: `${laneWidth - 2}%`
                }}
            >
                <div className="shift-content">
                    <div>
                        <div className="shift-person">{shift.person}</div>
                        <div className="shift-time">
                            {shift.startTime} - {shift.endTime}
                        </div>
                    </div>
                    <div className="shift-actions">
                        <button className="edit-button" onClick={onEdit}>
                            ✏️ Edit
                        </button>
                        <button className="delete-button" onClick={onDelete}>
                            🗑️ Erase
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="schedule-container">
            <div className="form-container">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Weekday:</label>
                        <select
                            name="day"
                            value={newShift.day}
                            onChange={handleChange}
                            className="form-input"
                        >
                            {Object.keys(schedule).map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Start Time:</label>
                        <input
                            type="time"
                            name="startTime"
                            value={newShift.startTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>End Time:</label>
                        <input
                            type="time"
                            name="endTime"
                            value={newShift.endTime}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="person"
                            value={newShift.person}
                            onChange={handleChange}
                            placeholder="Nome"
                            className="form-input"
                        />
                    </div>
                </div>

                <button
                    className={`submit-button ${editing.index !== null ? 'editing' : ''}`}
                    onClick={handleAddShift}
                >
                    {editing.index !== null ? 'Update Shift' : 'Add Shift'}
                </button>
            </div>

            <div className="schedule-grid">
                <div className="grid-header">
                    <div className="time-column-header">Schedule</div>
                    {Object.keys(schedule).map(day => (
                        <div
                            key={day}
                            className="day-header"
                            style={{ width: columnWidths[day], minWidth: columnWidths[day] }}
                        >
                            {day}
                            <ResizableBorder day={day} />
                        </div>
                    ))}
                </div>

                <div className="grid-body">
                    <div className="time-column">
                        {Array.from({ length: 13 }).map((_, i) => {
                            const hour = 8 + i;
                            return (
                                <div key={i} className="time-cell">
                                    {`${String(hour).padStart(2, '0')}:00`}
                                </div>
                            );
                        })}
                    </div>

                    <div className="days-container">
                        {Object.keys(schedule).map(day => {
                            const shifts = schedule[day];
                            const { laneAssignments, totalLanes } = calculateLanes(shifts);

                            return (
                                <div
                                    key={day}
                                    className="day-column"
                                    style={{ width: columnWidths[day], minWidth: columnWidths[day] }}
                                >
                                    {shifts.map((shift, index) => (
                                        <ShiftBlock
                                            key={index}
                                            shift={shift}
                                            lane={laneAssignments[index]}
                                            totalLanes={totalLanes}
                                            day={day}
                                            onEdit={() => handleEdit(day, index)}
                                            onDelete={() => handleDelete(day, index)}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSchedule;