import React from 'react';
import type { Puerta } from '../types/circuit';
import { Interruptor } from '../components/Interruptor';
import { LedSalida } from '../components/LedSalida';
import { TablaVerdad } from '../components/TablaVerdad';

/**
 * Propiedades del componente Laboratorio.
 */
interface LaboratorioProps {
    /** Objeto que define la compuerta o circuito integrado que se está simulando */
    puerta: Puerta;
    /** Estado eléctrico de la primera entrada (0 o 1) */
    inputA: number;
    /** Estado eléctrico de la segunda entrada (0 o 1) */
    inputB: number;
    /** Estado eléctrico resultante de la computación lógica */
    output: number;
    /** Dispatcher de React para mutar el estado de la primera entrada */
    setInputA: React.Dispatch<React.SetStateAction<number>>;
    /** Dispatcher de React para mutar el estado de la segunda entrada */
    setInputB: React.Dispatch<React.SetStateAction<number>>;
    /** Función callback encargada de replegar la persiana y regresar al Dashboard */
    onVolver: () => void;
}

/**
 * Vista de Laboratorio / Banco de pruebas (Workbench).
 * Renderiza de forma dinámica la interfaz del circuito integrado seleccionado. Adaptando 
 * el número de interruptores y sus etiquetas correspondientes según las necesidades 
 * físicas del componente (Compuertas estándar, Latch SR o Reloj oscilante).
 * * @component
 */
export const Laboratorio: React.FC<LaboratorioProps> = ({
    puerta,
    inputA,
    inputB,
    output,
    setInputA,
    setInputB,
    onVolver
}) => {
    // Salvaguarda: Si no hay ninguna compuerta activa en el estado, se aborta el renderizado
    if (!puerta) return null;

    /** Conmuta de forma binaria el estado del interruptor A (0 -> 1 / 1 -> 0) */
    const toggleInputA = () => setInputA(prev => (prev === 0 ? 1 : 0));
    /** Conmuta de forma binaria el estado del interruptor B (0 -> 1 / 1 -> 0) */
    const toggleInputB = () => setInputB(prev => (prev === 0 ? 1 : 0));

    return (
        <div className="workbench-container">
            {/* Control de navegación hacia la pantalla superior */}
            <button className="back-button" onClick={onVolver}>
                ⬆ VOLVER AL PANEL
            </button>

            <div className="circuit-layout">
                <h2 className="circuit-title">{puerta.id.toUpperCase()}</h2>

                {/* Área de experimentación interactiva */}
                <div className="sandbox-area">
                    
                    {/* COLUMNA DE ENTRADAS: Renderizado condicional adaptativo */}
                    <div className="col-inputs">
                        {/* Se oculta la primera entrada únicamente si el componente es un generador de reloj autónomo */}
                        {puerta.id !== 'clock' && (
                            <Interruptor
                                label={puerta.id === 'latch' ? 'Reset (R)' : 'Entrada A'}
                                value={inputA}
                                onChange={toggleInputA}
                            />
                        )}

                        {/* Se activa el segundo interruptor solo para componentes biestables o compuertas de doble entrada */}
                        {['and', 'or', 'xor', 'nand', 'nor', 'xnor', 'latch'].includes(puerta.id) && (
                            <Interruptor
                                label={puerta.id === 'latch' ? 'Set (S)' : 'Entrada B'}
                                value={inputB}
                                onChange={toggleInputB}
                            />
                        )}

                        {/* Indicador informativo específico para el modo oscilador */}
                        {puerta.id === 'clock' && (
                            <div className="clock-status">Generador Automático</div>
                        )}
                    </div>

                    {/* ZÓCALO CENTRAL: Esquema gráfico de la compuerta */}
                    <div className="gate-display">
                        <img
                            src={`/src/assets/gates/${puerta.id}.png`}
                            alt={puerta.id}
                            className="gate-icon-large"
                        />
                    </div>

                    {/* COLUMNA DE SALIDA: Diodo indicador LED */}
                    <LedSalida value={output} />
                </div>

                {/* TABLA DE VERDAD INFERIOR: Panel de especificaciones técnicas */}
                <TablaVerdad puerta={puerta} />
            </div>
        </div>
    );
};