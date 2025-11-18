'use client';

import Loading from '@/app/loading';
// import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { createNote, getNotes } from '@/lib/api';
import { Note } from '@/types/note';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type NotesProps = {
  tag?: string;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function Notes({ tag }: NotesProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page: currentPage, search: debouncedSearch, tag }],
    queryFn: () => getNotes(currentPage, 12, debouncedSearch, tag),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

 const handleCreateNote = async (note: Partial<Note>) => {
  await createNote({ title: note.title!, content: note.content!, tag: note.tag! });
  toast.success('Note created!');
  queryClient.invalidateQueries({ queryKey: ['notes'], exact: false });
  setIsModalOpen(false);
};


  if (isLoading) return <Loading />;
  if (isError) return <p>Error to loading notes...</p>;

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>add New Note</button>

      <SearchBox value={search} onSearch={handleSearchChange} />

      {notes.length > 0 && <NoteList notes={notes} />}

      {notes.length > 0 && (
        <Pagination
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}

      <NoteForm
  onSubmit={async (values) => {
    // NoteFormValues has full types; convert if needed
    await handleCreateNote(values);
  }}
  onClose={() => setIsModalOpen(false)}
  onSuccess={() => {
    /* optional extra actions after success */
  }}
/>

    </div>
  );
}
