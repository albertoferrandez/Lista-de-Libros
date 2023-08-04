"use client";

import { useState, useEffect } from "react";

interface Props {
  onFilterChange: (genre: string, range: number) => void;
  genres: string[];
  pages: number[];
}

function Filters({ onFilterChange, genres, pages }: Props) {
  let maxValue = Math.max(...pages);

  const [range, setRange] = useState<number>(maxValue);
  const [genre, setGenre] = useState<string>("");

  const handleRangeChange = () => {
    onFilterChange(genre, range);
  };

  useEffect(() => {
    handleRangeChange();
  }, [genre, range]);

  return (
    <div className="flex flex-col">
      <label
        htmlFor="rangePages"
        className="mb-2 inline-block text-neutral-700 dark:text-slate-200"
      >
        Filters
      </label>
      <input
        type="range"
        className="transparent h-[4px] w-full cursor-pointer appearance-none 
        border-transparent bg-neutral-200 dark:bg-neutral-600
        accent-pink-500"
        id="rangePages"
        min={0}
        max={maxValue}
        value={range}
        onChange={(e) => setRange(Number(e.target.value))}
      />
      <div>
        <span>{range}</span>
      </div>

      <label
        htmlFor="category"
        className="mb-2 mt-12 inline-block text-neutral-700 dark:text-slate-200"
      >
        Select Category
      </label>
      <select
        name="category"
        onChange={(e) => setGenre(e.target.value)}
        id="category"
        className="bg-transparent text-slate-300 px-1 py-2 
        cursor-pointer border border-slate-300 rounded text-xs"
      >
        <option value="">Todos</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
