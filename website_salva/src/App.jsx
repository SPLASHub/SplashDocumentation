import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <section>
      <Navbar />
      <div className="mainpage">
        <h1>SALVA</h1>
        <h2>Smart Aid for Lifeguards and Vigilance Assistance</h2>
        <div className="divider" />
        <p>
          Projeto em Engenharia de Computadores e Informática 2024/2025
        </p>
        <p>
          Orientadores: Prof. Samuel Silva e Prof. Bernardo Marques
        </p>
        <p>
          Docente da disciplina : Prof. José Moreira
        </p>
        <div className="Deti" />

      </div>

      <div className="aboutsec">
        <h2>About this Project</h2>
        <div className="divider" />
        <div className='context'>
          <div className='contextT'>
            <h3>Context</h3>
            <p>In recent decades, tourism has consolidated itself as one of the fundamental pillars of the Portuguese economy, with a significant impact on the country's growth. The growing popularity of water activities has led to an increased flow of tourists visiting sea and river beaches, making the safety of bathers a priority. Lifeguards play a crucial role in monitoring, preventing and rescuing people in danger. However, the lack of human resources in monitored (and unsupervised) areas sometimes has negative consequences for continuous and effective surveillance over a vast bathing area, especially in conditions of large crowds and adverse weather conditions. The integration of technology and intelligent computer systems can offer new support alternatives for lifeguards, improving surveillance, prevention, communication and response to emergencies.</p>
          </div>
          <div className='contextI'>
            <img src={process.env.PUBLIC_URL + '/Images/logo.png'} alt="Logo" />
          </div>
        </div>
        <div className="more">
          <h3>
            More Information
          </h3> 
          <div>
            <p>
              <a href="https://www.ua.pt/pt/uc/3246">University of Aveiro</a>
            </p>
            <p>
              <a href="https://www.ua.pt/pt/uc/3246">Department of Electronics, Telecommunications and Informatics</a>
            </p>
            
          </div>      
        </div>
      </div>
    </section>
  );
}

export default App;
