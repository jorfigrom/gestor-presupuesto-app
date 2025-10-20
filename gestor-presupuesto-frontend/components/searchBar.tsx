"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // Estado para el filtro

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = new URLSearchParams();
      if (search) query.append("q", search);
      if (filter !== "all") query.append("filter", filter);

      router.push(`/${routeType}?${query.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, filter, routeType]);

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
        <input
          id="text"
          value={search}
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          placeholder="Buscar"
          className="no-focus searchbar_input"
        />
      </div>
    </div>
  );
}

export default Searchbar;