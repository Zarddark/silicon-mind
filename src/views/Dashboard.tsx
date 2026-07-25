import React from 'react';
import type { Puerta } from '../types/circuit';

/**
 * Propiedades del componente Dashboard.
 */
interface DashboardProps {
    /** Catálogo completo de compuertas lógicas y circuitos integrados a renderizar en la cuadrícula */
    puertas: Puerta[];
    /** Callback que se dispara al clicar sobre una tarjeta para abrir su simulación en el laboratorio */
    onSeleccionarPuerta: (id: string) => void;
}

/**
 * Vista de Cuadro de Mandos principal (Dashboard).
 * Actúa como el menú de bienvenida de la aplicación, desplegando las compuertas disponibles
 * en una cuadrícula interactiva. Gestiona la carga dinámica de esquemas lógicos e incluye un
 * sistema de contingencia para ocultar imágenes no encontradas de forma elegante.
 * * @component
 */
export const Dashboard: React.FC<DashboardProps> = ({ puertas, onSeleccionarPuerta }) => {
    return (
        <div className="dashboard-container">
            {/* Cabecera principal del proyecto */}
            <header className="dashboard-header">
                <h1>🧠 SILICON MIND</h1>
                <p>Simulador interactivo de circuitos y puertas lógicas</p>
            </header>

            {/* Cuadrícula interactiva de componentes */}
            <main className="gates-grid">
                {puertas.map((puerta) => (
                    <div
                        key={puerta.id}
                        className={`gate-card gate-${puerta.id.toLowerCase()}`}
                        onClick={() => onSeleccionarPuerta(puerta.id)}
                    >
                        <span className="gate-title">{puerta.nombre}</span>
                        
                        <div className="gate-icon-container">
                            <img
                                src={`/src/assets/gates/${puerta.id}.png`}
                                alt={`Símbolo ${puerta.nombre}`}
                                className="gate-icon"
                                /**
                                 * Mecanismo de seguridad para evitar iconos rotos en el DOM.
                                 * Si el archivo .png correspondiente al ID no existe o falla al cargar,
                                 * se oculta la etiqueta de la imagen para preservar la limpieza visual de la tarjeta.
                                 */
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            {/* Marcador de posición opcional para estilos o fuentes de iconos */}
                            <div className="icon-placeholder"></div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};