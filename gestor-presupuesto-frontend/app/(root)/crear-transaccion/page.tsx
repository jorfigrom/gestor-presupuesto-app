'use client';

import NavItems from "@/components/NavItems";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // ⬅️ Importar useRouter

interface Transaccion {
    id: number;
    nombre: string;
    cantidad: number;
    tipo: string;
    fecha: string;
    descripcion?: string; 
}


export default function CrearTransaccionPage() {

    const router = useRouter();
    
    const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
    const [loading, setLoading] = useState(true);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 

      const formData = new FormData(event.currentTarget);
      const nuevaTransaccion = {
        nombre: formData.get("nombre") as string,
        cantidad: Number(formData.get("cantidad")),
        tipo: formData.get("tipo") as string,
        fecha: formData.get("fecha") as string,
        descripcion: formData.get("descripcion") as string,
      };

      try {
        const response = await fetch("http://localhost:8080/api/transacciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaTransaccion),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al crear la transacción: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setTransacciones((prev) => [...prev, data]);
        

        router.push('/');

      } catch (error) {
        console.error("Error en la petición POST:", error);
      }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <NavItems />
            <div className="flex flex-col flex-1 p-6 text-gray-800">
                <h1 className="text-3xl font-bold mb-6">Crear Nueva Transacción</h1>
                
                <form className="flex flex-col font-bold" onSubmit={handleSubmit}>
                    
                    <label className="mb-2">Nombre de la Transacción:</label>
                    <input name="nombre" type="text" className="border border-gray-300 p-2 mb-4 rounded" required />
                    
                    <label className="mb-2">Cantidad:</label>
                    <input name="cantidad" type="number" className="border border-gray-300 p-2 mb-4 rounded" required />
                    
                    <label className="mb-2">Tipo:</label>
                    <select name="tipo" className="border border-gray-300 p-2 mb-4 rounded" required>
                        <option value="INGRESO">Ingreso</option>
                        <option value="GASTO">Gasto</option>
                    </select>
                    
                    <label className="mb-2">Fecha:</label>
                    <input name="fecha" type="date" className="border border-gray-300 p-2 mb-4 rounded" required />
                    
                    <label className="mb-2">Descripción:</label>
                    <input name="descripcion" type="text" className="border border-gray-300 p-2 mb-4 rounded" />
                    
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">Crear Transacción</button>
                </form>

            </div>
        </div>
    );
}