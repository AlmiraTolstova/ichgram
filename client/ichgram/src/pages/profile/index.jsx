import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getOwnPostsByUserID,
  resetCreatePostStatus,
  selectUserProfile,
} from "../../redux/slices/userProfileSlice";
import { Status } from "../../utils/Status";
import CreatePostModal from "../../components/createPostModal";
import {
  getCurrentUser,
  logout,
  selectAuth,
} from "../../redux/slices/authSlice";
import { selectPosts } from "../../redux/slices/postsSlice";
import PostModal from "../../components/postModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import AppButton from "../../components/appButton";
import LinkIcon from "@mui/icons-material/Link";
import ExploreCard from "../../components/exploreCard";
import { selectConversations } from "../../redux/slices/conversationsSlice";

function UserProfile() {
  const { user, token } = useSelector((state) => state.auth);
  const userProfileSelector = useSelector(selectUserProfile);
  const authSelector = useSelector(selectAuth);
  const postsSelector = useSelector(selectPosts);
  const converstationSelector = useSelector(selectConversations);
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
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            //border: "1px solid red",
            //p: "2.375rem 5.9375rem 13.5rem 10.625rem",
            p: {
              xs: "1rem 1rem 1rem 1rem", // мобильные устройства
              sm: "1rem 1rem 1rem 1rem", // планшеты
              md: "2.375rem 5.9375rem 13.5rem 10.625rem", // от 900px и выше
            },
          }}
        >
          {/* <Box>
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
            <Button
              onClick={() => {
                console.log(converstationSelector);
              }}
            >
              Reducer Conversation to console
            </Button>
          </Box> */}

          {/* PROFILE */}
          {/* <Box
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
                <Typography>posts {user.postsCount}</Typography>
                <Typography>followers {user.followersCount}</Typography>
                <Typography>following {user.followingCount}</Typography>
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
          </Box> */}

          {/* PROFILE */}
          <Box
            sx={{
              mb: "3.5rem",
              //border: "2px solid red",
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                pr: {
                  xs: 0,
                  md: "5.375rem",
                },

                display: {
                  xs: "flex",
                  md: "block",
                },
                justifyContent: {
                  xs: "center",
                  md: "initial",
                },
              }}
            >
              <Avatar
                sx={{
                  width: {
                    xs: "5.625rem",
                    md: "10.5rem",
                  },
                  height: {
                    xs: "5.625rem",
                    md: "10.5rem",
                  },
                }}
                src={`${BASE_URL}${user.avatar}`}
              >
                {user.fullname?.[0]?.toUpperCase()}
              </Avatar>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                width: {
                  xs: "100%",
                  md: "auto",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: "1rem", md: "1rem", lg: "3rem" },
                  alignItems: "center",
                  flexWrap: "wrap",

                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: {
                      xs: "18px",
                      md: "20px",
                    },
                    lineheight: "25px",
                    color: "#000000",
                    textDecorationLine: "underline",
                  }}
                >
                  {user.username}
                </Typography>

                <AppButton
                  onClick={() => navigate("/editprofile")}
                  appearance="primary"
                  size="medium"
                >
                  Edit profile
                </AppButton>

                <AppButton
                  appearance="gray"
                  size="medium"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </AppButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: {
                    xs: "16px",
                    md: "40px",
                  },

                  flexWrap: "wrap",

                  justifyContent: {
                    xs: "center",
                    md: "flex-start",
                  },
                }}
              >
                <Typography>
                  <b>{user.postsCount}</b> posts
                </Typography>

                <Typography>
                  <b>{user.followersCount}</b> followers
                </Typography>

                <Typography>
                  <b>{user.followingCount}</b> following
                </Typography>
              </Box>

              {user.about && (
                <Typography
                  sx={{
                    whiteSpace: "pre-line",

                    textAlign: {
                      xs: "center",
                      md: "left",
                    },
                  }}
                >
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
                    justifyContent: {
                      xs: "center",
                      md: "flex-start",
                    },
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
              //gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
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

      <PostModal></PostModal>
    </Box>
  );
}

export default UserProfile;
