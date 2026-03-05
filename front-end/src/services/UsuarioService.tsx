import axios from 'axios';

const API_URL = "http://localhost:8080/api/usuarios";

export const getUsuarios = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createUsuario = async (usuario: any) => {
  const res = await axios.post(`${API_URL}/guardar`, usuario,  {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.data;
};

export const updateUsuario = async (id: number, usuario: any) => {
  const res = await axios.put(`${API_URL}/editar/${id}`, usuario, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.data;
};

export const deleteUsuario = async (id: number) => {
  await axios.delete(`${API_URL}/eliminar/${id}`);
};
