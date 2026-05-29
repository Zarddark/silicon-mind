/**
 * Representa una señal eléctrica binaria pura dentro del simulador.
 * Restringe los valores numéricos a un estado lógico bajo (0) o alto (1).
 */
export type Bit = 0 | 1;

/**
 * Representa un registro analítico dentro de una tabla de verdad.
 * Soporta claves dinámicas para adaptarse a compuertas de una entrada,
 * múltiples entradas o anotaciones de texto (ej. "Acción", "Tiempo").
 */
export interface FilaTablaVerdad {
    [key: string]: number | string;
}

/**
 * Define la estructura de metadatos e información analítica 
 * que describe a cualquier componente o compuerta lógica del sistema.
 */
export interface Puerta {
    /** Nombre comercial o técnico de la compuerta en mayúsculas (ej. "AND", "LATCH SR") */
    nombre: string;
    /** Identificador único en minúsculas utilizado para el enrutamiento y la lógica (ej. "and", "latch") */
    id: string;
    /** Explicación didáctica sobre el comportamiento y uso del componente en la electrónica */
    descripcion: string;
    /** Conjunto de combinaciones binarias que representan el comportamiento teórico del componente */
    tablaVerdad: FilaTablaVerdad[];
}