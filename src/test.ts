import { wire, notGate, andGate, orGate, xorGate, nandGate, norGate, xnorGate, Latch  } from './logic.js';
function runTests() {
    console.log("Iniciando tests...");
    let errores: string[] = [];

    if (wire(0) !== 0 || wire(1) !== 1) {
        errores.push("wireGate");
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

    const latch = new Latch();
    latch.updateSet();
    if (latch.getSet() !== 1 || latch.getReset() !== 0 || latch.getState() !== 1) {
        errores.push("Latch Set");
    }

    latch.updateSet();
    if (latch.getSet() !== 0 || latch.getReset() !== 0 || latch.getState() !== 1) {
        errores.push("Latch Toggle Set");
    }

    latch.updateReset();
    if (latch.getSet() !== 0 || latch.getReset() !== 1 || latch.getState() !== 0) {
        errores.push("Latch Reset");
    }

    latch.updateReset();
    if (latch.getSet() !== 0 || latch.getReset() !== 0 || latch.getState() !== 0) {
        errores.push("Latch Toggle Reset");
    }

    latch.updateSet();
    latch.updateReset();
    if (latch.getSet() !== 1 || latch.getReset() !== 1 || latch.getState() !== 0) {
        errores.push("Latch Invalid State");
    }

    if (errores.length === 0) {
        console.log("Todos los tests pasaron correctamente.");
    } else {
        console.error("Los siguientes tests fallaron: " + errores.join(", "));
    }
}

runTests();