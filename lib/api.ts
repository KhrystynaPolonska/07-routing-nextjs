import axios from "axios";
import type { NoteCreate, Note } from "@/types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const PER_PAGE = 12;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  search = 'tag',
  page = 1,
  perPage = PER_PAGE,
  tag,
}: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
} = {}): Promise<FetchNotesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await axios.get<FetchNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: { search, page, perPage },
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );
  return data;
};

export async function createNote(note: NoteCreate): Promise<Note> {
  const { data } = await api.post<Note>("/", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  if (!id) throw new Error("Note id is required");
  const { data } = await api.get<Note>(`/${id}`);
  return data;
}
