export const BASE_URL = "http://localhost:3332/api";

export const API = {
  Authorization: {
    register: () => `${BASE_URL}/auth/register`,
    login: () => `${BASE_URL}/auth/login`,
  },
  Posts: {
    createPost: () => `${BASE_URL}/posts/post`,
    updatePost: () => `${BASE_URL}/posts/post/:id`,
    deletePost: () => `${BASE_URL}/posts/post/:id`,
    getPostByPostId: () => `${BASE_URL}/posts/post/:id`,
    getPostsByUserID: () => `${BASE_URL}/posts/postsbyuserid/:id`,
  },
};
