import React, { useState } from 'react';
import './Teams-management_menu.css';
function TeamManagement() {

    const [beaches, setBeaches] = useState([
        { id: 1, name: "Praia da Rocha", coordinates: [37.1193, -8.5384] },
        { id: 2, name: "Praia de Carcavelos", coordinates: [38.6772, -9.3337] },
        { id: 3, name: "Praia do Guincho", coordinates: [38.7344, -9.4722] }
    ]);

    const [teams, setTeams] = useState([
        { id: 1, name: "Team Alpha", beachId: 1, members: [] },
        { id: 2, name: "Team Beta", beachId: 1, members: [] },
        { id: 3, name: "Team Gamma", beachId: 2, members: [] },
        { id: 4, name: "Team Delta", beachId: 3, members: [] }
    ]);

    const [members, setMembers] = useState([
        "Alice", "Bob", "Charlie", "David", "Emma",
        "Frank", "Grace", "Hannah", "Isaac", "Jack",
        "Katie", "Liam", "Mia", "Noah", "Olivia"
    ]);

    const [searchMember, setSearchMember] = useState('');
    const [searchBeach, setSearchBeach] = useState('');

    const handleDragStart = (event, memberName, fromTeam) => {
        event.dataTransfer.setData('member', JSON.stringify({ name: memberName, fromTeam }));
    };

    const handleDrop = (event, targetTeamId) => {
        event.preventDefault();
        const { name, fromTeam } = JSON.parse(event.dataTransfer.getData('member'));

        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === targetTeamId
                    ? { ...team, members: [...team.members, name] }
                    : team.id === fromTeam
                        ? { ...team, members: team.members.filter((m) => m !== name) }
                        : team
            )
        );

        if (fromTeam === null) {
            setMembers((prev) => prev.filter((m) => m !== name));
        }
    };

    const removeFromTeam = (memberName, teamId) => {
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === teamId
                    ? { ...team, members: team.members.filter((m) => m !== memberName) }
                    : team
            )
        );
        setMembers((prevMembers) => [...prevMembers, memberName]);
    };

    const addBeach = () => {
        const name = prompt("Enter the name of the new beach:");
        if (name && name.trim() !== "") {
            const newBeach = {
                id: beaches.length + 1,
                name: name.trim(),
                coordinates: [0, 0]
            };
            setBeaches([...beaches, newBeach]);
        }
    };

    const addTeamToBeach = (beachId) => {
        const name = prompt("Enter the name of the new team:");
        if (name && name.trim() !== "") {
            const newTeam = {
                id: teams.length + 1,
                name: name.trim(),
                beachId: beachId,
                members: []
            };
            setTeams([...teams, newTeam]);
        }
    };

    const filteredBeaches = beaches.filter(beach =>
        beach.name.toLowerCase().includes(searchBeach.toLowerCase()) ||
        teams.some(team =>
            team.beachId === beach.id && team.name.toLowerCase().includes(searchBeach.toLowerCase())
        )
    );

    return (
        <div className="main-container">
            <div className="search-bar beach-search">
                <input
                    type="text"
                    value={searchBeach}
                    onChange={(e) => setSearchBeach(e.target.value)}
                    placeholder="Search for a beach or a team..."
                />
                <button className="add-button" onClick={addBeach}>+ Add Beach</button>
            </div>

            <div className="content-wrapper">
                <div className="members-container">
                    <h2>Members</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            value={searchMember}
                            onChange={(e) => setSearchMember(e.target.value)}
                            placeholder="Search for a member..."
                        />
                    </div>
                    <div className="members-list">
                        {members.filter((member) => member.toLowerCase().includes(searchMember.toLowerCase()))
                            .map((member, index) => (
                                <div key={index} className="member"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, member, null)}
                                >
                                    {member}
                                </div>
                            ))}
                    </div>
                </div>

                <div className="teams-section">
                    {filteredBeaches.map((beach) => (
                        <div key={beach.id} className="beach-section">
                            <div className="beach-header">
                                <h2>{beach.name}</h2>
                                <button className="add-button" onClick={() => addTeamToBeach(beach.id)}>+ Add Team</button>
                            </div>
                            <div className="beach-teams">
                                {teams.filter(team => team.beachId === beach.id)
                                    .map((team) => (
                                        <div key={team.id} className="team"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e, team.id)}
                                        >
                                            <h3>{team.name}</h3>
                                            {team.members.map((member, i) => (
                                                <div key={i} className="member team-member"
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, member, team.id)}
                                                >
                                                    {member}
                                                    <button
                                                        className="remove-member-button"
                                                        onClick={() => removeFromTeam(member, team.id)}
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeamManagement;