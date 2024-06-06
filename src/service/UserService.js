import axios from "axios";
import { process } from 'react'

const REST_API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/user';

// const REST_API_BASE_URL = 'http://localhost:8080/api/user';

export const listUsers = () => axios.get(REST_API_BASE_URL + '/all');

export const createUser = (user) => axios.post(REST_API_BASE_URL, user);

export const getUser = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateUser = (id, user) => axios.put(REST_API_BASE_URL + '/' + id, user);

export const deleteUser = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
