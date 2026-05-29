import type { Bit } from './types/circuit';

// Interfaz para representar el estado de una puerta de dos entradas (AND, OR, XOR)
export interface DualInput {
    a: Bit;
    b: Bit;
}

// Buffer: Pasa la señal tal cual entra
export const buffer = (input: Bit): Bit => {
    return input;
};

// NOT: Invierte el bit (si es 1 devuelve 0, si es 0 devuelve 1)
export const notGate = (input: Bit): Bit => {
    return input === 1 ? 0 : 1;
};

// AND: Solo da 1 si ambos son 1
export const andGate = (inputs: DualInput): Bit => {
    return (inputs.a === 1 && inputs.b === 1) ? 1 : 0;
};

// OR: Da 1 si al menos uno es 1
export const orGate = (inputs: DualInput): Bit => {
    return (inputs.a === 1 || inputs.b === 1) ? 1 : 0;
};

// XOR: Da 1 solo si son diferentes
export const xorGate = (inputs: DualInput): Bit => {
    return (inputs.a !== inputs.b) ? 1 : 0;
};

// NAND: Da 1 si al menos uno es 0
export const nandGate = (inputs: DualInput): Bit => {
    return (inputs.a === 1 && inputs.b === 1) ? 0 : 1;
};

// NOR: Da 1 si ambos son 0
export const norGate = (inputs: DualInput): Bit => {
    return (inputs.a === 0 && inputs.b === 0) ? 1 : 0;
};

// XNOR: Da 1 solo si son iguales
export const xnorGate = (inputs: DualInput): Bit => {
    return (inputs.a === inputs.b) ? 1 : 0;
};

// Latch (Tipo SR - Set/Reset)
export class Latch {
    private set: Bit = 0;
    private reset: Bit = 0;
    private state: Bit = 0;

    public updateSet(): void {
        this.set = this.set === 0 ? 1 : 0;
        this.updateState();
    }

    public updateReset(): void {
        this.reset = this.reset === 0 ? 1 : 0; 
        this.updateState();
    }

    private updateState(): void {
        if (this.set === 1 && this.reset === 0) {
            this.state = 1; // Set
        } else if (this.set === 0 && this.reset === 1) {
            this.state = 0; // Reset
        } else if (this.set === 1 && this.reset === 1) {
            this.state = 0; // Estado inválido: forzamos a 0 por seguridad
        }
    }

    public getState(): Bit {
        return this.state;
    }

    public getSet(): Bit {
        return this.set;
    }

    public getReset(): Bit {
        return this.reset;
    }
}