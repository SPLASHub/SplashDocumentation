import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <section>
      <Navbar />
      <div className="mainpage">
        <div className='maintext'>
          <h1>SALVA</h1>
          <h2>Smart Aid for Lifeguards and Vigilance Assistance</h2>
          <div className="divider2" />
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

      </div>

      <div className="aboutsec">
        <h2>About this Project</h2>
        <div className="divider1" />
        <div className='context'>
          <div className='contextT'>
            <h3>Context</h3>
            <p>In recent decades, tourism has consolidated itself as one of the fundamental pillars of the Portuguese economy, with a significant impact on the country's growth. The growing popularity of water activities has led to an increased flow of tourists visiting sea and river beaches, making the safety of bathers a priority. Lifeguards play a crucial role in monitoring, preventing and rescuing people in danger. However, the lack of human resources in monitored (and unsupervised) areas sometimes has negative consequences for continuous and effective surveillance over a vast bathing area, especially in conditions of large crowds and adverse weather conditions. The integration of technology and intelligent computer systems can offer new support alternatives for lifeguards, improving surveillance, prevention, communication and response to emergencies.</p>
          </div>
          
        </div>
        <div className="more">
          <h3>
            More Information
          </h3> 
          <div className='moreinfo'>
            <div className='moreInfoText'>
              <h4>Challenges</h4>
              <p>1. Operate in vast bathing areas with different coastline and sea characteristics with large volumes and types of bathers.</p>
              <p>2. Operate under adverse weather conditions.</p>
              <p>3. Ensure the minimum possible environmental impact.</p>
              <p>4. Ensure that the solutions implemented cause as little interference as possible to the natural experience of bathers.</p>
              <p>5. Integration with existing structures and devices on beaches.</p>
            </div>
            <div className='moreInfoText'>
              <h4>Objectives</h4>
              <p>1. Increase and improve the effectiveness of surveillance and security in bathing areas of different characteristics and with different volumes of bathers.</p>
              <p>2. Improve identification and speed of response to risk and emergency situations.</p>
              <p>3. Improve communication and coordination between lifeguards and emergency services.</p>
            </div>
            
          </div>      
        </div>
      </div>
    </section>
  );
}

export default App;
