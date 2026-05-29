import { useState } from 'react';
import './App.css';

// Lista de las puertas para renderizarlas automáticamente
const PUERTAS = [
  { nombre: 'BUFFER', id: 'buffer' },
  { nombre: 'AND', id: 'and' },
  { nombre: 'OR', id: 'or' },
  { nombre: 'XOR', id: 'xor' },
  { nombre: 'NOT', id: 'not' },
  { nombre: 'NAND', id: 'nand' },
  { nombre: 'NOR', id: 'nor' },
  { nombre: 'XNOR', id: 'xnor' },
  { nombre: 'LATCH SR', id: 'latch' },
  { nombre: 'RELOJ / CLOCK', id: 'clock' }, // Futuro reloj
];

function App() {
  // Estado para saber qué puerta estamos probando
  const [puertaSeleccionada, setPuertaSeleccionada] = useState<string | null>(null);
  
  // Estado que añadirá la clase de CSS para activar la animación de subida
  const [estaSubido, setEstaSubido] = useState(false);

  const seleccionarPuerta = (id: string) => {
    console.log(`Cargando vista de la puerta: ${id}`);
    setPuertaSeleccionada(id);
    setEstaSubido(true); // ¡Dispara la persiana hacia arriba!
  };

  const volverAlDashboard = () => {
    setEstaSubido(false); // ¡Cae la persiana de la tienda!
    // Esperamos a que termine la animación de CSS (300ms) antes de limpiar la puerta
    setTimeout(() => {
      setPuertaSeleccionada(null);
    }, 600);
  };

  return (
    // Este contenedor maestro se moverá verticalmente según el estado "estaSubido"
    <div className={`window-wrapper ${estaSubido ? 'slide-up' : ''}`}>
      
      {/* 🏛️ PANTALLA 1: DASHBOARD PRINCIPAL (TUS CARDS) */}
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>🧠 SILICON MIND</h1>
          <p>Simulador interactivo de circuitos y puertas lógicas</p>
        </header>

        <main className="gates-grid">
          {PUERTAS.map((puerta) => (  
            <div 
              key={puerta.id} 
              className="gate-card"
              onClick={() => seleccionarPuerta(puerta.id)}
            >
              <span className="gate-title">{puerta.nombre}</span>
              <div className="gate-icon-container">
                <img 
                  src={`/src/assets/gates/${puerta.id}.png`} 
                  alt={`Símbolo ${puerta.nombre}`}
                  className="gate-icon"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="icon-placeholder"></div>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* 🧪 PANTALLA 2: EL LABORATORIO (PLACA BASE) */}
      <div className="workbench-container">
        {/* Botón flotante para bajar la persiana */}
        <button className="back-button" onClick={volverAlDashboard}>
          ⬆ VOLVER AL PANEL
        </button>

        {puertaSeleccionada && (
          <div className="circuit-layout">
            {/* Cabecera de la puerta actual */}
            <h2 className="circuit-title">{puertaSeleccionada.toUpperCase()}</h2>

            {/* Zona de simulación real */}
            <div className="sandbox-area">
              <div className="col-inputs">
                {/* Aquí renderizaremos los interruptores */}
                <p>[ Botones Entrada ]</p>
              </div>
              
              <div className="col-gate">
                {/* Aquí meteremos el icono grande tintado */}
                <div className="gate-display">
                  <img 
                    src={`/src/assets/gates/${puertaSeleccionada}.png`} 
                    alt="Puerta activa" 
                    className="gate-icon-large" 
                  />
                </div>
              </div>

              <div className="col-output">
                {/* Aquí irá nuestra bombilla inteligente */}
                <p>[ Bombilla Salida ]</p>
              </div>
            </div>

            {/* Panel de información y Tabla de verdad inferior (Efecto Cristal) */}
            <footer className="info-panel-glass">
              <h3>📄 Especificaciones Técnicas</h3>
              <p>Aquí irá la descripción dinámica y su correspondiente Tabla de Verdad interactiva.</p>
            </footer>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;