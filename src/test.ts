import { buffer, notGate, andGate, orGate, xorGate, nandGate, norGate, xnorGate, Latch } from './logic';

/**
 * Suite de pruebas unitarias artesanales para la lógica computacional.
 * Verifica de forma secuencial que todas las compuertas lógicas y los ciclos de memoria
 * del Latch SR cumplan estrictamente con sus respectivas tablas de verdad teóricas.
 */
function runTests() {
    console.log("⚡ Iniciando tests de integridad...");
    const errores: string[] = [];

    // --- COMPUERTAS LÓGICAS ESTÁNDAR ---

    if (buffer(0) !== 0 || buffer(1) !== 1) {
        errores.push("buffer");
    }

    if (notGate(0) !== 1 || notGate(1) !== 0) {
        errores.push("notGate");
    }

    if (andGate({a: 0, b: 0}) !== 0 || andGate({a: 0, b: 1}) !== 0 || andGate({a: 1, b: 0}) !== 0 || andGate({a: 1, b: 1}) !== 1) {
        errores.push("andGate");
    }

    if (orGate({a: 0, b: 0}) !== 0 || orGate({a: 0, b: 1}) !== 1 || orGate({a: 1, b: 0}) !== 1 || orGate({a: 1, b: 1}) !== 1) {
        errores.push("orGate");
    }

    if (xorGate({a: 0, b: 0}) !== 0 || xorGate({a: 0, b: 1}) !== 1 || xorGate({a: 1, b: 0}) !== 1 || xorGate({a: 1, b: 1}) !== 0) {
        errores.push("xorGate");
    }

    if (nandGate({a: 0, b: 0}) !== 1 || nandGate({a: 0, b: 1}) !== 1 || nandGate({a: 1, b: 0}) !== 1 || nandGate({a: 1, b: 1}) !== 0) {
        errores.push("nandGate");
    }

    if (norGate({a: 0, b: 0}) !== 1 || norGate({a: 0, b: 1}) !== 0 || norGate({a: 1, b: 0}) !== 0 || norGate({a: 1, b: 1}) !== 0) {
        errores.push("norGate");
    }

    if (xnorGate({a: 0, b: 0}) !== 1 || xnorGate({a: 0, b: 1}) !== 0 || xnorGate({a: 1, b: 0}) !== 0 || xnorGate({a: 1, b: 1}) !== 1) {
        errores.push("xnorGate");
    }

    // --- PRUEBAS DE MEMORIA SECUENCIAL (LATCH SR) ---
    // Al ser un componente con estado, el orden de ejecución de estos bloques es crítico.
    
    const latch = new Latch();

    // 1. Activación del SET: La salida debe encenderse (1)
    latch.updateSet();
    if (latch.getSet() !== 1 || latch.getReset() !== 0 || latch.getState() !== 1) {
        errores.push("Latch Set");
    }

    // 2. Desactivación del SET: Debe recordar el estado anterior y mantener la salida encendida (1)
    latch.updateSet();
    if (latch.getSet() !== 0 || latch.getReset() !== 0 || latch.getState() !== 1) {
        errores.push("Latch Toggle Set");
    }

    // 3. Activación del RESET: La salida debe apagarse de inmediato (0)
    latch.updateReset();
    if (latch.getSet() !== 0 || latch.getReset() !== 1 || latch.getState() !== 0) {
        errores.push("Latch Reset");
    }

    // 4. Desactivación del RESET: Debe recordar el estado apagado y mantener la salida en 0
    latch.updateReset();
    if (latch.getSet() !== 0 || latch.getReset() !== 0 || latch.getState() !== 0) {
        errores.push("Latch Toggle Reset");
    }

    // 5. Estado Crítico (Ambos activos): Sincroniza ambos a 1 para comprobar la respuesta del circuito integrado
    latch.updateSet();
    latch.updateReset();
    if (latch.getSet() !== 1 || latch.getReset() !== 1 || latch.getState() !== 0) {
        errores.push("Latch Invalid State");
    }

    // --- REPORTE DE RESULTADOS ---
    if (errores.length === 0) {
        console.log("✅ ¡Excelente! Todos los tests pasaron correctamente.");
    } else {
        console.error("❌ Fallas detectadas en los siguientes módulos: " + errores.join(", "));
    }
}

// Ejecución automática de la suite de pruebas
runTests();