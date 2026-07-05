export const BASE_URL = "http://localhost:3332";
export const BASE_URL_API = "http://localhost:3332/api";

export const API = {
  FILES: {
    getServerURL: () => `${BASE_URL_API}`,
  },
  Authorization: {
    register: () => `${BASE_URL_API}/auth/register`,
    login: () => `${BASE_URL_API}/auth/login`,
  },
  User: {
    editUserData: () => `${BASE_URL_API}/user/edituserdata`,
    uploadAvatar: () => `${BASE_URL_API}/user/avatar`,
  },
  Posts: {
    createPost: () => `${BASE_URL_API}/posts/post`,
    updatePost: () => `${BASE_URL_API}/posts/post/:id`,
    deletePost: () => `${BASE_URL_API}/posts/post/:id`,
    getPostByPostId: (id) => `${BASE_URL_API}/posts/post/${id}`,
    getPostsByUserID: (id) => `${BASE_URL_API}/posts/postsbyuserid/${id}`,
  },
};
