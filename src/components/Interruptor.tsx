import React from 'react';

/**
 * Propiedades del componente Interruptor.
 */
interface InterruptorProps {
    /** Etiqueta descriptiva que se mostrará sobre el interruptor (ej. "Entrada A", "Reset") */
    label: string;
    /** Estado eléctrico actual del interruptor. Solo puede ser 0 (inactivo) o 1 (activo) */
    value: number;
    /** Función de callback que se dispara al pulsar el interruptor para conmutar su estado */
    onChange: () => void;
}

/**
 * Componente interactivo que simula un interruptor físico de placa de circuito.
 * Renderiza un botón estilizado que alterna su estética visual (colores y resplandores neón)
 * en función de si transporta una señal lógica alta (1) o baja (0).
 * * @component
 */
export const Interruptor: React.FC<InterruptorProps> = ({ label, value, onChange }) => {
    return (
        <button 
            // Aplica la clase 'switch-on' de forma dinámica para activar los estilos CSS de iluminación verde
            className={`interactive-switch ${value === 1 ? 'switch-on' : ''}`}
            onClick={onChange}
            type="button" // Evita comportamientos de envío por defecto en formularios
        >
            <span className="switch-label">{label}</span>
            <span className="switch-value">{value}</span>
        </button>
    );
};