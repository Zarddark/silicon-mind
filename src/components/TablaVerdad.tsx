import React from 'react';
import type { Puerta } from '../types/circuit';

/**
 * Propiedades del componente TablaVerdad.
 */
interface TablaVerdadProps {
    /** Objeto completo de la compuerta seleccionada que contiene la descripción y los registros lógicos */
    puerta: Puerta;
}

/**
 * Componente técnico que renderiza las especificaciones y la tabla de verdad analítica.
 * Inspecciona dinámicamente la estructura de los datos de la compuerta para generar las columnas
 * adecuadas y aplica estilos de resalte verde neón ('cell-active') en las celdas con estados activos (1).
 * * @component
 */
export const TablaVerdad: React.FC<TablaVerdadProps> = ({ puerta }) => {
    // Inspecciona el primer registro de la tabla de verdad para deducir qué columnas existen dinámicamente
    const primerRegistro = puerta.tablaVerdad[0] || {};
    const columnas = Object.keys(primerRegistro);

    return (
        <footer className="info-panel-glass">
            {/* Sección descriptiva de la compuerta */}
            <div className="info-text">
                <h3>Especificaciones Técnicas</h3>
                <p>{puerta.descripcion}</p>
            </div>

            {/* Matriz analítica: Tabla de Verdad Dinámica */}
            <div className="truth-table-container">
                <h4>Tabla de Verdad</h4>
                <table>
                    <thead>
                        <tr>
                            {columnas.map((columna) => (
                                <th key={columna}>
                                    {/* Mapeador humano: Transforma las claves técnicas del JSON en textos amigables para el usuario */}
                                    {columna === 'entradaA' || columna === 'Entrada' ? 'Entrada A' :
                                     columna === 'entradaB' ? 'Entrada B' :
                                     columna === 'salida' ? 'Salida' : columna}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {puerta.tablaVerdad.map((fila, index) => (
                            <tr key={index}>
                                {Object.values(fila).map((valor, idx) => (
                                    <td 
                                        key={idx} 
                                        // Aplica un estilo de iluminación especial si la celda representa un estado lógico alto
                                        className={valor === 1 || valor === '1' ? 'cell-active' : ''}
                                    >
                                        {valor}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </footer>
    );
};