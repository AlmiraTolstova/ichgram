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
    searchUsers: () => `${BASE_URL_API}/user/search`,
    getProfile: (id) => `${BASE_URL_API}/user/${id}/profile`,
    followUser: (id) => `${BASE_URL_API}/user/${id}/follow`,
    unfollowUser: (id) => `${BASE_URL_API}/user/${id}/unfollow`,
    getCurrentUser: () => `${BASE_URL_API}/user/me`,
  },
  Posts: {
    createPost: () => `${BASE_URL_API}/posts/post`,
    updatePost: () => `${BASE_URL_API}/posts/post/:id`,
    deletePost: (id) => `${BASE_URL_API}/posts/post/${id}`,
    getPostByPostId: (id) => `${BASE_URL_API}/posts/post/${id}`,
    getPostsByUserID: (id) => `${BASE_URL_API}/posts/postsbyuserid/${id}`,
    getFeed: () => `${BASE_URL_API}/posts/feed`,
    toggleLike: (id) => `${BASE_URL_API}/posts/${id}/like`,
    addComment: (id) => `${BASE_URL_API}/posts/post/${id}/comment`,
    updateComment: (id) => `${BASE_URL_API}/posts/comment/${id}`,
    deleteComment: (id) => `${BASE_URL_API}/posts/comment/${id}`,
  },
  Notifications: {
    getNotifications: () => `${BASE_URL_API}/notifications/list`,
    readNotifications: () => `${BASE_URL_API}/notifications/set-read`,
  },
  Chat: {
    getConversations: () => `${BASE_URL_API}/chat`,
    getMessages: (id) => `${BASE_URL_API}/chat/${id}/messages`,
    readConversation: (id) => `${BASE_URL_API}/chat/${id}/read`,
    createConversation: () => `${BASE_URL_API}/chat/conversation`,
  },
};
