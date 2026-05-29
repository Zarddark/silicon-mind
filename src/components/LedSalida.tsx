import React from 'react';

/**
 * Propiedades del componente LedSalida.
 */
interface LedSalidaProps {
    /** El estado lógico resultante de la compuerta. Determina si el LED se enciende (1) o se apaga (0) */
    value: number;
}

/**
 * Componente visual que actúa como un diodo LED indicador en una placa de pruebas.
 * Recibe el bit final del cálculo lógico y reacciona de forma puramente declarativa, 
 * activando un potente resplandor radial amarillo en la pantalla cuando recibe una señal alta (1).
 * * @component
 */
export const LedSalida: React.FC<LedSalidaProps> = ({ value }) => {
    return (
        <div className="col-outputs">
            {/* Aplica la clase 'led-on' dinámicamente para inyectar las animaciones y sombras de iluminación por CSS */}
            <div className={`led-bulb ${value === 1 ? 'led-on' : ''}`}>
                {/* Elemento estructural vacío utilizado exclusivamente por el CSS para generar el efecto de destello de luz */}
                <span className="led-glow"></span>
                <span className="led-value">{value}</span>
            </div>
        </div>
    );
};