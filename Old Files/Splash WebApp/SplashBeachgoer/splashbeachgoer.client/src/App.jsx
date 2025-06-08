import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar.jsx';
import Map from './Map.jsx'
import Teams from './Teams.jsx'

function App() {
    const [view, setView] = useState("map");

    return (
        <section>
            <section className='nav'>
                <Navbar setView={setView} />
            </section>
            <div className='Division'>
                {view === "map" ? <Map /> : <Teams />}
            </div>
        </section>
    );
    
}

export default App;