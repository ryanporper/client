/*
Separation of concerns:
Components only need to be concerned with receiving and rendering data,
they don't need to be concerned with how to make API calls.
This service file is concerned only with how to make API calls to our API
and only returns the data.
Combining a service file with the react-query package's useQuery hook is
ideal for larger projects.
*/

import axios from 'axios';

// Normally the url would be saved in a .env or config file that is git ignored
// so it's easy to have a different url for production.
const http = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getAllProducts = async () => {
  const res = await http.get('/products');
  return res.data;
};

export const getProductById = async (id) => {
  const res = await http.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await http.post('/products', data);
  return res.data;
};

export const updateProductById = async (id, data) => {
  const res = await http.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProductById = async (id) => {
  const res = await http.delete(`/products/${id}`);
  return res.data;
};