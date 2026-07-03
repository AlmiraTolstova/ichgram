import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar";
import { useEffect } from "react";
import {
  getOwnPostsByUserID,
  resetCreatePostStatus,
  selectUserProfile,
} from "../../redux/slices/userProfileSlice";
import { Status } from "../../utils/Status";
import PostCard from "../../components/postCard";
import Footer from "../../components/footer";
import CreatePostModal from "../../components/createPostModal";
import { selectAuth } from "../../redux/slices/authSlice";
import { selectPosts } from "../../redux/slices/postsSlice";
import PostModal from "../../components/postModal";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const userProfileSelector = useSelector(selectUserProfile);
  const authSelector = useSelector(selectAuth);
  const postsSelector = useSelector(selectPosts);
  const { ownPostsList, status } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwnPostsByUserID());
  }, [dispatch]);

  useEffect(() => {
    if (status.createPost === Status.DONE) {
      dispatch(getOwnPostsByUserID());
      dispatch(resetCreatePostStatus());
    }
  }, [status.createPost, dispatch]);

  if (!user) {
    return (
      <Typography textAlign="center" mt={4}>
        No user data
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", border: "2px solid green" }}>
        <Sidebar></Sidebar>

        <Box
          sx={{
            border: "1px solid red",
            p: "38px 95px 216px 170px",
          }}
        >
          <Box>
            <Button
              onClick={() => {
                dispatch(getOwnPostsByUserID());
              }}
            >
              Обновить ленту
            </Button>
            <Button
              onClick={() => {
                console.log(userProfileSelector);
              }}
            >
              Reducer userProfile to console
            </Button>
            <Button
              onClick={() => {
                console.log(authSelector);
              }}
            >
              Reducer Auth to console
            </Button>
            <Button
              onClick={() => {
                console.log(postsSelector);
              }}
            >
              Reducer Posts to console
            </Button>
          </Box>
          <Box
            // elevation={3}
            sx={{
              // maxWidth: 400,
              // mx: "auto",
              mb: "55px",
              border: "1px solid red",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ pr: "86px" }}>
              <Avatar sx={{ width: "168px", height: "168px" }}>
                {user.fullname?.[0]?.toUpperCase()}
              </Avatar>
            </Box>
            <Button onClick={() => navigate("/editprofile")}>
              Edit profile
            </Button>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* <Typography variant="h6">{user.fullname}</Typography>

              <Typography variant="body2" color="text.secondary">
                Username
              </Typography> */}
              <Box>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "20px",
                    lineheight: "25px",
                    color: "#000000",
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography>{user.email}</Typography>

              <Typography variant="body2" color="text.secondary">
                ID
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {user.id}
              </Typography>
            </Box>
          </Box>
          {/* POSTS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            {status.ownPostsList === Status.LOADING ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : (
              ownPostsList.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Footer></Footer>
      <CreatePostModal />
      <PostModal></PostModal>
    </Box>
  );
}

export default UserProfile;
