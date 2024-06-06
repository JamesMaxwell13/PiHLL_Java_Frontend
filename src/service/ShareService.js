import axios from "axios";
import { process } from 'react'

const REST_API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/share';

// const REST_API_BASE_URL = 'http://localhost:8080/api/share';

export const listShares = () => axios.get(REST_API_BASE_URL + '/all');

export const createShare = (share) => axios.post(REST_API_BASE_URL, share);

export const getShare = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const updateShare = (id, share) => axios.put(REST_API_BASE_URL + '/' + id, share);

export const deleteShare = (id) => axios.delete(REST_API_BASE_URL + '/' + id);

export const getCompany = (shareId) => axios.get(REST_API_BASE_URL + '/' + shareId + '/company');

export const getCompanyShares = (companyId) => axios.get(REST_API_BASE_URL.replace('share', '') + 'company/' + companyId + '/shares');

export const getUserShares = (userId) => axios.get(REST_API_BASE_URL.replace('share', '') + 'user/' + userId + '/shares');

export const sellUserShare = (userId, id) => axios.delete(REST_API_BASE_URL.replace('share', '') + 'user/' + userId + '/shares?share_id=' + id);

export const buyUserShare = (userId, id) => axios.post(REST_API_BASE_URL.replace('share', '') + 'user/' + userId + '?share_id=' + id);

export const getNotPurchasedShares = (userBuyId) => axios.get(REST_API_BASE_URL.replace('share', '') + 'user/' + userBuyId + '/shares/none');
