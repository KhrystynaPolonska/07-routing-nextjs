'use client';

import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleChange}
        className={css.input}
      />
    </div>
  );
}
