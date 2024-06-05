import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/share';

export const listShares = () => axios.get(REST_API_BASE_URL + '/all');

export const createShare = (share) => axios.post(REST_API_BASE_URL, share);

export const getShare = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateShare = (id, share) => axios.put(REST_API_BASE_URL + '/' + id, share);

export const deleteShare = (id) => axios.delete(REST_API_BASE_URL + '/' + id);

export const getCompany = (id) => axios.get(REST_API_BASE_URL + '/' + id + '/company');

export const getUserShares = (id) => axios.get(REST_API_BASE_URL.replace('share', '') + '/company/' + id + '/shares');

export const getCompanyShares = (id) => axios.get(REST_API_BASE_URL.replace('share', '') + '/user/' + id + '/shares');