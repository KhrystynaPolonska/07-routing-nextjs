import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';

const PER_PAGE = 12;

interface NotesByTagPageProps {
  params: Promise<{ slug?: string[] }>;
}

async function NotesByTagPage({ params }: NotesByTagPageProps) {
  const { slug } = await params;
  const maybeTag = slug?.[0];

  const tag =
    !maybeTag || maybeTag === 'all'
      ? undefined
      : (decodeURIComponent(maybeTag) as NoteTag);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, PER_PAGE, '', tag ?? ''],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialSearch="" tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesByTagPage;