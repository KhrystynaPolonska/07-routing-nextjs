'use client';

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (isError || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.createdAt;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button>Edit</button>
      <p>{formattedDate}</p>
    </div>
  );
};

export default NoteDetailsClient;