'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import css from './Notes.client.module.css';

interface Props {
  initialSearch?: string;
  initialPage?: number;
  tag?: string; // ✅ заменяем category → tag
}

const NotesClient = ({
  initialSearch = '',
  initialPage = 1,
  tag = '', // ✅ новый проп
}: Props) => {
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    debounced(value);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page,
        tag: tag || undefined,
      }),
    placeholderData: previousData => previousData,
  });

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError || !data) return <p>Could not fetch the list of notes.</p>;

  return (
    <section className={css.section}>
      <div className={css.header}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button
          className={css.createButton}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create Note
        </button>
      </div>

      {data.totalPages > 1 && (
        <Pagination
          pageCount={Math.ceil(data.totalPages)}
          onPageChange={({ selected }) => setPage(selected + 1)}
        />
      )}

      {data.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
          onSubmit={handleCreateSuccess}
          />
        </Modal>
      )}
    </section>
  );
};

export default NotesClient;
