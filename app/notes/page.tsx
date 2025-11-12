import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNotes } from '@/lib/api';
import { notesKeys } from '@/lib/queryKeys';
import NotesClient from './filter/[...slug]/Notes.client';

export default async function NotesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: notesKeys.list(1),
    queryFn: () => fetchNotes(1),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  );
}

