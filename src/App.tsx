import { useState } from 'react';
import './App.css';

// Lista de las puertas para renderizarlas automáticamente
const PUERTAS = [
  { 
    nombre: 'BUFFER', 
    id: 'buffer', 
    descripcion: 'Replica exactamente el estado de la entrada. Si la entrada es 1, la salida es 1; si es 0, la salida es 0. Se utiliza principalmente para amplificar o aislar señales eléctricas.', 
    tablaVerdad: [
      { Entrada: 0, salida: 0 },
      { Entrada: 1, salida: 1 }
    ]
  },
  { 
    nombre: 'AND', 
    id: 'and', 
    descripcion: 'La salida solo se activa (1) si todas sus entradas están activas (1) de forma simultánea. Si cualquiera de las entradas es 0, la salida se mantiene apagada.', 
    tablaVerdad: [
      { entradaA: 0, entradaB: 0, salida: 0 },
      { entradaA: 0, entradaB: 1, salida: 0 },
      { entradaA: 1, entradaB: 0, salida: 0 },
      { entradaA: 1, entradaB: 1, salida: 1 }
    ]
  },
  { 
    nombre: 'OR', 
    id: 'or', 
    descripcion: 'La salida se activa (1) si al menos una de las entradas está activa (1). Solo se mantiene apagada (0) cuando todas sus entradas son cero.', 
    tablaVerdad: [
      { entradaA: 0, entradaB: 0, salida: 0 },
      { entradaA: 0, entradaB: 1, salida: 1 },
      { entradaA: 1, entradaB: 0, salida: 1 },
      { entradaA: 1, entradaB: 1, salida: 1 }
    ]
  },
  { 
    nombre: 'XOR', 
    id: 'xor', 
    descripcion: 'Puerta OR Exclusiva. La salida se activa (1) únicamente cuando sus entradas son diferentes entre sí. Si ambas entradas son iguales (ambas 0 o ambas 1), la salida es 0.', 
    tablaVerdad: [
      { entradaA: 0, entradaB: 0, salida: 0 },
      { entradaA: 0, entradaB: 1, salida: 1 },
      { entradaA: 1, entradaB: 0, salida: 1 },
      { entradaA: 1, entradaB: 1, salida: 0 }
    ]
  },
  { 
    nombre: 'NOT', 
    id: 'not', 
    descripcion: 'Inversor lógico. Invierte por completo el estado de su única entrada. Si recibe un 0 entrega un 1, y si recibe un 1 entrega un 0.', 
    tablaVerdad: [
      { entradaA: 0, salida: 1 },
      { entradaA: 1, salida: 0 }
    ]
  },
  { 
    nombre: 'NAND', 
    id: 'nand', 
    descripcion: 'Puerta AND Invertida. Su salida siempre está activa (1) a menos que todas sus entradas estén encendidas al mismo tiempo, en cuyo caso la salida se apaga (0).', 
    tablaVerdad: [
      { entradaA: 0, entradaB: 0, salida: 1 },
      { entradaA: 0, entradaB: 1, salida: 1 },
      { entradaA: 1, entradaB: 0, salida: 1 },
      { entradaA: 1, entradaB: 1, salida: 0 }
    ]
  },
  { 
    nombre: 'NOR', 
    id: 'nor', 
    descripcion: 'Puerta OR Invertida. La salida solo se activa (1) si absolutamente todas sus entradas están apagadas (0). Si entra cualquier señal activa, la salida se vuelve 0.', 
    tablaVerdad: [
      { entradaA: 0, entradaB: 0, salida: 1 },
      { entradaA: 0, entradaB: 1, salida: 0 },
      { entradaA: 1, entradaB: 0, salida: 0 },
      { entradaA: 1, entradaB: 1, salida: 0 }
    ]
  },
  { 
    nombre: 'XNOR', 
    id: 'xnor', 
    descripcion: 'Equivalencia lógica. La salida se activa (1) únicamente cuando todas sus entradas tienen el mismo estado (ya sean todas 0 o todas 1). Si son distintas, da 0.', 
    tablaVerdad: [
      { entradaA: 0, entradaB: 0, salida: 1 },
      { entradaA: 0, entradaB: 1, salida: 0 },
      { entradaA: 1, entradaB: 0, salida: 0 },
      { entradaA: 1, entradaB: 1, salida: 1 }
    ]
  },
  { 
    nombre: 'LATCH SR', 
    id: 'latch', 
    descripcion: 'Circuito biestable básico de memoria. Dispone de una entrada Set para activar la salida y una entrada Reset para apagarla. Si ambas están inactivas, retiene el último estado guardado.', 
    tablaVerdad: [
      { Accion: 'Inicio', S: 0, R: 0, salida: 0 },
      { Accion: 'Set', S: 1, R: 0, salida: 1 },
      { Accion: 'Recuerda', S: 0, R: 0, salida: 1 },
      { Accion: 'Reset', S: 0, R: 1, salida: 0 },
      { Accion: 'No válido', S: 1, R: 1, salida: 0 }
    ]
  },
  { 
    nombre: 'RELOJ / CLOCK', 
    id: 'clock', 
    descripcion: 'Generador de pulsos oscilantes. Alterna de forma automática y cíclica entre los estados 0 y 1 a una frecuencia determinada para sincronizar los tiempos del circuito.', 
    tablaVerdad: [
      { Tiempo: 't0', salida: 0 },
      { Tiempo: 't1', salida: 1 },
      { Tiempo: 't2', salida: 0 },
      { Tiempo: 't3', salida: 1 }
    ]
  }
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
              <div className="info-text">
                <h3>Especificaciones Técnicas</h3>
                <p>{PUERTAS.find((p) => p.id === puertaSeleccionada)?.descripcion}</p>
              </div>

              {/* Contenedor de la Tabla de Verdad Dinámica */}
              <div className="truth-table-container">
                <h4>Tabla de Verdad</h4>
                <table>
                  <thead>
                    <tr>
                      {/* Extraemos los nombres de las columnas dinámicamente basados en el primer registro */}
                      {Object.keys(PUERTAS.find((p) => p.id === puertaSeleccionada)?.tablaVerdad[0] || {}).map((columna) => (
                        <th key={columna}>
                          {/* Formateamos un poco el texto visual de las cabeceras */}
                          {
                            columna === 'entradaA' ? 'Entrada A' : 
                            columna === 'entradaB' ? 'Entrada B' : 
                            columna === 'salida' ? 'Salida' : columna
                          }
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Recorremos cada fila de combinaciones lógicas */}
                    {PUERTAS.find((p) => p.id === puertaSeleccionada)?.tablaVerdad.map((fila, index) => (
                      <tr key={index}>
                        {Object.values(fila).map((valor, idx) => (
                          <td key={idx} className={valor === 1 || valor === '1' ? 'cell-active' : ''}>
                            {valor}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </footer>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;