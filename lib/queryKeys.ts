
export const notesKeys = {
  all: ['notes'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  list: (page: number) => [...notesKeys.lists(), page] as const,
};
