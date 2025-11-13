import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Notes from './Notes.client';
import { getNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => getNotes(1, 12, undefined, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NoteDetails;