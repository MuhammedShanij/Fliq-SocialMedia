import API from '../utils/axios.js'


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})
export const reportPost=(data)=>API.post('posts/report', data)
export const deletePost=(id,userId)=>API.delete(`posts/${id}`, { data: { userId: userId } })

