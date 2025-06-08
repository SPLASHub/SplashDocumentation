import React, { useState } from 'react';
import './Teams-management_menu.css';
function TeamManagement() {

    const [beaches, setBeaches] = useState([
        { id: 1, name: "Praia da Barra"},
        { id: 2, name: "Praia de Carcavelos"},
        { id: 3, name: "Praia do Francelos"}
    ]);

    const [teams, setTeams] = useState([
        { id: 1, name: "Team Alpha", beachId: 1, members: [] },
        { id: 2, name: "Team Beta", beachId: 1, members: [] },
        { id: 3, name: "Team Gamma", beachId: 2, members: [] },
        { id: 4, name: "Team Delta", beachId: 3, members: [] }
    ]);

    const [members, setMembers] = useState([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "David" },
        { id: 5, name: "Emma" }
    ]);



    const [searchMember, setSearchMember] = useState('');
    const [searchBeach, setSearchBeach] = useState('');

    const handleDragStart = (event, member, fromTeam) => {
        event.dataTransfer.setData('member', JSON.stringify({ id: member.id, name: member.name, fromTeam }));
    };

    const handleDrop = (event, targetTeamId) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('member');

        if (!data) return; // Se não houver dados, não faz nada

        const { id, name, fromTeam } = JSON.parse(data);

        if (!id || !name) return; // Se os dados estiverem corrompidos, não continua

        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === targetTeamId
                    ? { ...team, members: [...team.members, { id, name }] }
                    : team.id === fromTeam
                        ? { ...team, members: team.members.filter((m) => m.id !== id) }
                        : team
            )
        );

        if (fromTeam === null) {
            setMembers((prev) => prev.filter((m) => m.id !== id));
        }
    };


    const removeFromTeam = (memberId, teamId) => {
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === teamId
                    ? { ...team, members: team.members.filter((m) => m.id !== memberId) }
                    : team
            )
        );

        // Retornar o membro removido para a lista de membros disponíveis
        const removedTeam = teams.find(team => team.id === teamId);
        if (removedTeam) {
            const removedMember = removedTeam.members.find(member => member.id === memberId);
            if (removedMember) {
                setMembers((prevMembers) => [...prevMembers, removedMember]);
            }
        }
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

    const saveChanges = () => {
        if (window.confirm("Tem certeza que deseja salvar as alterações?")) {
            console.log("Alterações salvas:", teams);
        }
    };

    const cancelChanges = () => {
        if (window.confirm("Tem certeza que deseja cancelar as alterações?")) {
            window.location.reload(); // Recarrega a página
        }
    };

    return (
        <div className="main-container">
            {/* Barra de pesquisa de praias */}
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
                {/* Lista de membros disponíveis */}
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
                        {members
                            .filter((member) => member.name.toLowerCase().includes(searchMember.toLowerCase()))
                            .map((member) => (
                                <div key={member.id} className="member"
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, member, null)}
                                >
                                    {member.name}
                                </div>
                            ))}
                    </div>
                </div>

                {/* Seção de equipes e praias */}
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
                                            {team.members.length > 0 ? (
                                                team.members.map((member) => (
                                                    <div key={member.id} className="member team-member"
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, member, team.id)}
                                                    >
                                                        {member.name}
                                                        <button
                                                            className="remove-member-button"
                                                            onClick={() => removeFromTeam(member.id, team.id)}
                                                        >
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="empty-team-message">No members</p>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}

                    {/* Botões de salvar e cancelar */}
                    <div className="buttons-container">
                        <button className="save-button" onClick={saveChanges}>Salvar</button>
                        <button className="cancel-button" onClick={cancelChanges}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamManagement;