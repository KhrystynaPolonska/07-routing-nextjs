'use client';

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <div className={css.searchBox}>
      <input
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className={css.input}
      />
    </div>
  );
}
