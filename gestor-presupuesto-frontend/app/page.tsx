'use client'; // Directiva para que el componente se ejecute en el cliente (navegador)

import NavItems from '@/components/NavItems';
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
    //obtener los datos de la API
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

  // Cálculos para las tarjetas de resumen
  const ingresosTotales = transacciones
    .filter(t => t.tipo === 'INGRESO')
    .reduce((acc, t) => acc + t.cantidad, 0);

  const gastosTotales = transacciones
    .filter(t => t.tipo === 'GASTO')
    .reduce((acc, t) => acc + t.cantidad, 0);

  const numeroOperaciones = transacciones.length;

  // Un estado de carga más centrado y visual
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavItems />
      
      <main className="flex-1 p-8">
        {/* Encabezado de la página */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
          <a href="/crear-transaccion" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            Añadir Operación
          </a>
        </div>

        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="summary-card">
            <h3>GASTOS TOTALES</h3>
            <p className="text-red-600">${gastosTotales.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>INGRESOS TOTALES</h3>
            <p className="text-green-600">${ingresosTotales.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h3>NÚMERO DE OPERACIONES</h3>
            <p>{numeroOperaciones}</p>
          </div>
        </div>

        {/* Tabla de Transacciones Recientes */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-800 p-4 border-b">
            Historial de Transacciones
          </h2>
          <table className="w-full min-w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Nombre</th>
                <th className="p-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Cantidad</th>
                <th className="p-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Tipo</th>
                <th className="p-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.length > 0 ? (
                transacciones.map((transaccion) => (
                  <tr key={transaccion.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 text-gray-800">{transaccion.nombre}</td>
                    <td className={`p-4 font-medium ${transaccion.tipo === 'INGRESO' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaccion.tipo === 'INGRESO' ? '+' : '-'}${transaccion.cantidad.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${transaccion.tipo === 'INGRESO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {transaccion.tipo}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{new Date(transaccion.fecha).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-gray-500">
                    No hay transacciones para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}