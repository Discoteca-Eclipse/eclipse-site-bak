import type {EntityToList} from '../models';

const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getDjs(): Promise<EntityToList[]> {
  const res = await fetch(`${API_URL}/djs`);

  if (!res.ok) {
    return [];
  }

  return await res.json();
}
