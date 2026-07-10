import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getOwnPostsByUserID,
  resetCreatePostStatus,
  selectUserProfile,
} from "../../redux/slices/userProfileSlice";
import { Status } from "../../utils/Status";
import PostCard from "../../components/postCard";
import CreatePostModal from "../../components/createPostModal";
import { selectAuth } from "../../redux/slices/authSlice";
import { selectPosts } from "../../redux/slices/postsSlice";
import PostModal from "../../components/postModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import AppButton from "../../components/appButton";
import LinkIcon from "@mui/icons-material/Link";
import ExploreCard from "../../components/exploreCard";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const userProfileSelector = useSelector(selectUserProfile);
  const authSelector = useSelector(selectAuth);
  const postsSelector = useSelector(selectPosts);
  const { ownPostsList, status } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showFullAbout, setShowFullAbout] = useState(false);

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
        {/* <Sidebar></Sidebar> */}

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

          {/* PROFILE */}
          <Box
            sx={{
              mb: "3.5rem",
              border: "1px solid red",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ pr: "5.375rem" }}>
              <Avatar
                sx={{ width: "168px", height: "168px" }}
                src={`${BASE_URL}${user.avatar}`}
              >
                {user.fullname?.[0]?.toUpperCase()}
              </Avatar>
            </Box>
            {/* <Button onClick={() => navigate("/editprofile")}>
              Edit profile
            </Button> */}

            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "22px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "20px",
                    lineheight: "25px",
                    color: "#000000",
                    textDecorationLine: "underline",
                  }}
                >
                  {user.username}
                </Typography>
                <AppButton
                  onClick={() => navigate("/editprofile")}
                  appearance="gray"
                  size="medium"
                >
                  Edit profile
                </AppButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "40px",
                }}
              >
                <Typography>posts</Typography>
                <Typography>followers</Typography>
                <Typography>following</Typography>
              </Box>

              {user.about && (
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {showFullAbout || user.about.length <= 100
                    ? user.about
                    : `${user.about.slice(0, 100)}...`}

                  {user.about.length > 100 && (
                    <Typography
                      component="span"
                      onClick={() => setShowFullAbout((prev) => !prev)}
                      sx={{
                        ml: 0.5,
                        color: "#737373",
                        cursor: "pointer",
                        userSelect: "none",
                        fontSize: "inherit",
                        fontWeight: 400,

                        "&:hover": {
                          color: "#555",
                        },
                      }}
                    >
                      {showFullAbout ? " less" : " more"}
                    </Typography>
                  )}
                </Typography>
              )}

              {user.link && (
                <Typography
                  component="a"
                  href={user.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#00376B",
                    textDecoration: "none",

                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <LinkIcon sx={{ fontSize: 16 }} />
                  {user.link}
                </Typography>
              )}
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
                <ExploreCard key={post._id} post={post} />
              ))
            )}
          </Box>
        </Box>
      </Box>
      {/* <Footer></Footer> */}
      <CreatePostModal />
      <PostModal></PostModal>
    </Box>
  );
}

export default UserProfile;
