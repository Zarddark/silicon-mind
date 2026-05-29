import React, { useState } from 'react';
import type { Bit } from '../logic';

// Definimos qué datos necesita recibir visualmente nuestra puerta
interface Props {
  nombre: string;
  funcionLogica: (inputs: { a: Bit; b: Bit }) => Bit;
}

export function PuertaLogica({ nombre, funcionLogica }: Props) {
  // React maneja el estado de los clicks del usuario aquí
  const [inputA, setInputA] = useState<Bit>(0);
  const [inputB, setInputB] = useState<Bit>(0);

  // ¡Calculamos el resultado usando tu función de logic.ts!
  const resultado = funcionLogica({ a: inputA, b: inputB });

  return (
    <div className="puerta-card" style={{ border: '2px solid #ccc', padding: '20px', borderRadius: '12px', width: '250px', backgroundColor: '#1a1a1a' }}>
      <h4>{nombre}</h4>
      
      {/* Controles de Entrada */}
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '15px 0' }}>
        <button onClick={() => setInputA(inputA === 0 ? 1 : 0)}>A: {inputA}</button>
        <button onClick={() => setInputB(inputB === 0 ? 1 : 0)}>B: {inputB}</button>
      </div>

      {/* Salida Visual */}
      <div style={{ marginTop: '15px' }}>
        <span>Resultado: </span>
        <strong style={{ color: resultado === 1 ? '#4caf50' : '#f44336', fontSize: '1.2em' }}>
          {resultado}
        </strong>
      </div>
    </div>
  );
}