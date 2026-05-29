import { useState, useEffect, useRef } from 'react';
import './App.css';
import type { Bit, Puerta } from './types/circuit';
import { Dashboard } from './views/Dashboard';
import { Laboratorio } from './views/Laboratorio';
import { 
  buffer, 
  notGate, 
  andGate, 
  orGate, 
  xorGate, 
  nandGate, 
  norGate, 
  xnorGate, 
  Latch 
} from './logic';

/**
 * Catálogo estático de las compuertas lógicas y componentes integrados disponibles.
 * Define metadatos, descripciones técnicas y sus respectivas tablas de verdad.
 */
const PUERTAS: Puerta[] = [
  {
    nombre: 'BUFFER',
    id: 'buffer',
    descripcion: 'Replica exactamente el estado de la entrada. Si la entrada es 1, la salida es 1; si es 0, la salida es 0. Se utiliza principalmente para amplificar o aislar señales eléctricas.',
    tablaVerdad: [{ Entrada: 0, salida: 0 }, { Entrada: 1, salida: 1 }]
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
    tablaVerdad: [{ entradaA: 0, salida: 1 }, { entradaA: 1, salida: 0 }]
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

/**
 * Componente principal de la aplicación "Silicon-mind".
 * Gestiona el enrutamiento visual, el flujo de animaciones de la interfaz
 * y la sincronización reactiva de los estados eléctricos con la lógica de computación.
 */
function App() {
  // Estados de control de la simulación
  const [puertaSeleccionada, setPuertaSeleccionada] = useState<string | null>(null);
  const [inputA, setInputA] = useState<number>(0);
  const [inputB, setInputB] = useState<number>(0);
  const [output, setOutput] = useState<number>(0);
  
  // Estado para disparar la animación de deslizamiento vertical (persiana CSS)
  const [estaSubido, setEstaSubido] = useState(false);

  /**
   * Instancia persistente de la clase Latch.
   * Se utiliza 'useRef' para asegurar que el objeto POO sobreviva a los ciclos de renderizado
   * de React sin destruir ni resetear sus propiedades privadas de memoria interna.
   */
  const latchInstancia = useRef(new Latch());

  /**
   * Activa el laboratorio de pruebas cargando la compuerta seleccionada.
   * @param {string} id - Identificador único de la compuerta elegida.
   */
  const seleccionarPuerta = (id: string) => {
    setPuertaSeleccionada(id);
    setEstaSubido(true);
  };

  /**
   * Inicia la transición de bajada hacia el panel principal.
   * Aplica un retardo físico para limpiar los estados una vez concluida la animación CSS.
   */
  const volverAlDashboard = () => {
    setEstaSubido(false); // Quitas la clase .slide-up. La persiana empieza a bajar (tardará 600ms).
    setTimeout(() => {
      setPuertaSeleccionada(null);
      setInputA(0);
      setInputB(0);
      setOutput(0);
      // Reseteamos el componente de memoria para la próxima simulación limpia
      latchInstancia.current = new Latch();
    }, 600); // A los 600ms exactos desmontamos la puerta actual, reseteamos los inputs y limpias la instancia de Latch para evitar estados residuales.
  };

  /**
   * Loop de computación reactivo.
   * Se ejecuta de forma inmediata ante cualquier cambio de interruptores o compuertas,
   * procesa los datos y actualiza el output para encender o apagar los componentes visuales.
   */
  useEffect(() => {
    if (!puertaSeleccionada) return;

    // Casting seguro a nivel de compilación para cumplir estrictamente con el tipo Bit (0 | 1)
    const a = inputA as Bit;
    const b = inputB as Bit;

    /**
     * Evalúa las entradas basándose en el componente seleccionado.
     * Centraliza los retornos para evitar reasignaciones muertas y advertencias de ESLint.
     * @returns {Bit} Resultado de la operación computacional (0 o 1).
     */
    const obtenerResultado = (): Bit => {
      switch (puertaSeleccionada) {
        case 'buffer': return buffer(a);
        case 'not':    return notGate(a);
        case 'and':    return andGate({ a, b });
        case 'or':     return orGate({ a, b });
        case 'xor':    return xorGate({ a, b });
        case 'nand':   return nandGate({ a, b });
        case 'nor':    return norGate({ a, b });
        case 'xnor':   return xnorGate({ a, b });
        
        case 'latch': {
          const resetReact = inputA;
          let setReact = inputB;

          // SEGURO MECÁNICO PRIORITARIO: El botón de RESET (inputA) manda sobre el SET (inputB).
          // Evita estados no válidos en la interfaz haciendo saltar físicamente al SET si RESET se activa.
          if (resetReact === 1 && setReact === 1) {
            setReact = 0;
            setInputB(0);
          }

          // Sincronización bidireccional con las propiedades de la clase Latch
          if (resetReact !== latchInstancia.current.getReset()) {
            latchInstancia.current.updateReset();
          }
          if (setReact !== latchInstancia.current.getSet()) {
            latchInstancia.current.updateSet();
          }

          return latchInstancia.current.getState();
        }
        
        case 'clock':
          return output as Bit;
          
        default:
          return 0;
      }
    };

    setOutput(obtenerResultado());

  }, [inputA, inputB, puertaSeleccionada]);

  // Busca el objeto completo de la compuerta actual para pintar descripciones e hilos
  const puertaActual = PUERTAS.find((p) => p.id === puertaSeleccionada);

  return (
    <div className={`window-wrapper ${estaSubido ? 'slide-up' : ''}`}>

      {/* PANTALLA 1: CUADRO DE MANDOS / SELECCIÓN DE PUERTAS */}
      <Dashboard puertas={PUERTAS} onSeleccionarPuerta={seleccionarPuerta} />

      {/* PANTALLA 2: LABORATORIO DE PRUEBAS 
        Se mantiene siempre montado en el DOM para posibilitar el deslizamiento fluido de la persiana CSS.
        Si 'puertaActual' es nulo, se inyecta una compuerta por defecto para prevenir excepciones de renderizado.
      */}
      <Laboratorio
        puerta={puertaActual || PUERTAS[0]}
        inputA={inputA}
        inputB={inputB}
        output={output}
        setInputA={setInputA}
        setInputB={setInputB}
        onVolver={volverAlDashboard}
      />

    </div>
  );
}

export default App;