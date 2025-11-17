import { Note, NoteTag } from '@/types/note';
import axios from 'axios';

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export type Tag = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const getNotes = async (
  page: number = 1,
  perPage: number = 12,
  search?: string
): Promise<NoteResponse> => {
  const response = await axios.get<NoteResponse>(`/notes`, {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await axios.post<Note>(`/notes`, note, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};
