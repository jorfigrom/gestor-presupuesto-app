'use client'; // Directiva para que el componente se ejecute en el cliente (navegador)

import { useState, useEffect } from 'react';

// Definimos un tipo para nuestras transacciones para usar TypeScript
interface Transaccion {
  id: number;
  nombre: string;
  cantidad: number;
  tipo: string;
  fecha: string;
}

export default function HomePage() {

  // Estado para almacenar la lista de transacciones
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  
  // Estado para manejar errores o mensajes de carga
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta después de que el componente se renderiza
  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchTransacciones = async () => {
      try {
        // Hacemos la petición a nuestro backend
        const response = await fetch('http://localhost:8080/api/transacciones');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data: Transaccion[] = await response.json();
        setTransacciones(data); // Guardamos los datos en el estado
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Dejamos de cargar, tanto si hubo éxito como si no
      }
    };

    fetchTransacciones();
  }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez

  if (loading) {
    return <p>Cargando transacciones...</p>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Transacciones</h1>
      <ul className="space-y-2">
        {transacciones.map((transaccion) => (
          <li key={transaccion.id} className="p-2 border rounded shadow-sm">
            <p className="font-semibold">{transaccion.nombre}</p>
            <p>Cantidad: ${transaccion.cantidad.toFixed(2)}</p>
            <p>Tipo: {transaccion.tipo}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}