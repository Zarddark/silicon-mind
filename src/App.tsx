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
  const seleccionarPuerta = (id: string) => {
    console.log(`Cargando vista de la puerta: ${id}`);
    // Aquí es donde programaremos el cambio de pantalla
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🧠 SILICON MIND</h1>
        <p>Simulador interactivo de circuitos y puertas lógicas</p>
      </header>

      {/* Grid principal que controlará la distribución */}
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
                  // Esto evita que se vea feo mientras no tenemos los PNGs listos
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="icon-placeholder"></div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;