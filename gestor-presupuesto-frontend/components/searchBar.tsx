"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import { useState } from "react";

interface Props {
  onSearch: (term: string) => void; // Nueva prop para manejar la búsqueda
}

function Searchbar({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term);
    onSearch(term); // Llamar a la función pasada desde el componente padre
  };

  return (
    <div className="searchbar flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/search-gray.svg"
          alt="search"
          width={24}
          height={24}
          className="object-contain"
        />
        <Input
          id="text"
          value={search}
          onChange={handleSearchChange}
          placeholder={`Buscar`}
          className="no-focus searchbar_input bg-gray-200 text-gray-800 border border-gray-300 rounded-lg p-2"
        />
      </div>
    </div>
  );
}

export default Searchbar;