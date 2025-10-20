'use client';

import NavItems from "@/components/NavItems";
import { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';

interface Transaccion {
  id: number;
  nombre: string;
  cantidad: number;
  tipo: string;
  fecha: string;
  descripcion?: string;
}

export default function EditarTransaccionPage() {
    
  const router = useRouter();
  const { id } = useParams(); // Obtener el ID de la transacción desde la URL dinámica

  const [transaccion, setTransaccion] = useState<Transaccion | null>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchTransaccion = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/transacciones/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la transacción');
        }
        const data: Transaccion = await response.json();
        setTransaccion(data); 
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTransaccion();
  }, [id]);

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const transaccionActualizada = {
      nombre: formData.get("nombre") as string,
      cantidad: Number(formData.get("cantidad")),
      tipo: formData.get("tipo") as string,
      fecha: formData.get("fecha") as string,
      descripcion: formData.get("descripcion") as string,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/transacciones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaccionActualizada),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar la transacción: ${response.status} - ${errorText}`);
      }

      router.push('/'); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error("Error en la petición PUT:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Cargando transacción...</p>
      </div>
    );
  }

  if (!transaccion) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">No se encontró la transacción.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavItems />
      <div className="flex flex-col flex-1 p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Editar Transacción</h1>

        <form className="flex flex-col font-bold" onSubmit={handleSubmit}>
          <label className="mb-2">Nombre de la Transacción:</label>
          <input
            name="nombre"
            type="text"
            defaultValue={transaccion.nombre}
            className="border border-gray-300 p-2 mb-4 rounded"
            required
          />

          <label className="mb-2">Cantidad:</label>
          <input
            name="cantidad"
            type="number"
            defaultValue={transaccion.cantidad}
            className="border border-gray-300 p-2 mb-4 rounded"
            required
          />

          <label className="mb-2">Tipo:</label>
          <select
            name="tipo"
            defaultValue={transaccion.tipo}
            className="border border-gray-300 p-2 mb-4 rounded"
            required
          >
            <option value="INGRESO">Ingreso</option>
            <option value="GASTO">Gasto</option>
          </select>

          <label className="mb-2">Fecha:</label>
          <input
            name="fecha"
            type="date"
            defaultValue={transaccion.fecha}
            className="border border-gray-300 p-2 mb-4 rounded"
            required
          />

          <label className="mb-2">Descripción:</label>
          <input
            name="descripcion"
            type="text"
            defaultValue={transaccion.descripcion || ''}
            className="border border-gray-300 p-2 mb-4 rounded"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}