import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/company';

export const listCompanies = () => axios.get(REST_API_BASE_URL + '/all');

export const createCompany = (company) => axios.post(REST_API_BASE_URL, company);

export const getCompany = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateCompany = (id, company) => axios.put(REST_API_BASE_URL + '/' + id, company);

export const deleteCompany = (id) => axios.delete(REST_API_BASE_URL + '/' + id);

