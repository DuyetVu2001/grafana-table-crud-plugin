const API = 'http://localhost:8000';

export const createUser = async (data: any) =>
  fetch(`${API}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const updateUser = async (data: any) =>
  fetch(`${API}/user/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

export const deleteUser = async (id: any) =>
  fetch(`${API}/user/${id}`, {
    method: 'DELETE',
  });

export const getUsers = async () => fetch(`${API}/users`);
