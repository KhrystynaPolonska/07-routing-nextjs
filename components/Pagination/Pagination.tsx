"use client";

import dynamic from "next/dynamic";
import css from "./Pagination.module.css";

const ReactPaginate = dynamic(() => import("react-paginate"), { ssr: false });

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({ pageCount, onPageChange }: PaginationProps) {
  return (
    <div className={css.paginationWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    </div>
  );
}
