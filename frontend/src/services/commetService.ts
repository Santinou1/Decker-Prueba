import { CommetResponse } from '@/types/commet';

const API_URL = 'http://localhost:3000/api';

export const getCommets = async (): Promise<CommetResponse> => {
  const response = await fetch(`${API_URL}/commets`);
  if (!response.ok) {
    throw new Error('Failed to fetch commets');
  }
  return response.json();
};

export const createCommets = async (data: any[]): Promise<void> => {
  const response = await fetch(`${API_URL}/commets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create commets');
  }
};
