import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar.jsx';
import Map from './Map.jsx'
import Teams from './Teams.jsx'

function App() {
    const [forecasts, setForecasts] = useState();

    

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <section>
            <section className='nav'>
                <Navbar />
            </section>
            <h1> Mapa </h1>
            <div className='MapDivision'>
                <Teams/>
            </div>
        </section>
    );
    
}

export default App;