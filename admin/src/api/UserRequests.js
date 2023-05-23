import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
// export const getUser = (userId) => API.get(`/user/${userId}`);
export const blockUser = (data)=> API.put(`/admin/users/block`, data)
export const getAllUser = ()=> API.get('/admin/users')