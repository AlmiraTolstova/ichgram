import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  followUser,
  getProfile,
  selectOtherProfile,
  unfollowUser,
} from "../../redux/slices/otherProfileSlice";
import { Status } from "../../utils/Status";
import PostModal from "../../components/postModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import AppButton from "../../components/appButton";
import LinkIcon from "@mui/icons-material/Link";
import ExploreCard from "../../components/exploreCard";
import {
  createConversation,
  getMessages,
} from "../../redux/slices/conversationsSlice";

function OtherProfile() {
  const otherProfileSelector = useSelector(selectOtherProfile);
  const { user, status, targetUserID } = useSelector(
    (state) => state.otherProfile,
  );
  const currentUserId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showFullAbout, setShowFullAbout] = useState(false);
  const isFollowing = user.user?.followers?.includes(currentUserId);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, targetUserID]);

  if (!user.user) {
    return (
      <Typography textAlign="center" mt={4}>
        No user data
      </Typography>
    );
  }

  const handleMessage = async () => {
    const conversation = await dispatch(
      createConversation(user.user._id),
    ).unwrap();

    dispatch(getMessages(conversation._id));
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
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
                dispatch(getProfile());
              }}
            >
              Обновить ленту
            </Button>
            <Button
              onClick={() => {
                console.log(otherProfileSelector);
              }}
            >
              Reducer userProfile to console
            </Button>
          </Box> */}

          {/* PROFILE */}
          {status.getProfile === Status.LOADING ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  mb: "3.5rem",
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
                    src={`${BASE_URL}${user.user.avatar}`}
                  >
                    {user.user.fullname?.[0]?.toUpperCase()}
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
                        fontSize: "20px",
                        lineheight: "25px",
                        color: "#000000",
                        textDecorationLine: "underline",
                      }}
                    >
                      {user.user.username}
                    </Typography>
                    {isFollowing ? (
                      <AppButton
                        appearance="secondary"
                        size="medium"
                        onClick={() => dispatch(unfollowUser())}
                      >
                        Following
                      </AppButton>
                    ) : (
                      <AppButton
                        appearance="primary"
                        size="medium"
                        onClick={() => dispatch(followUser())}
                      >
                        Follow
                      </AppButton>
                    )}
                    <AppButton
                      onClick={handleMessage}
                      appearance="gray"
                      size="medium"
                    >
                      Message
                    </AppButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "40px",
                    }}
                  >
                    <Typography>posts {user.user.postsCount}</Typography>
                    <Typography>
                      followers {user.user.followersCount}
                    </Typography>
                    <Typography>
                      following {user.user.followingCount}
                    </Typography>
                  </Box>

                  {user.user.about && (
                    <Typography sx={{ whiteSpace: "pre-line" }}>
                      {showFullAbout || user.user.about.length <= 100
                        ? user.user.about
                        : `${user.user.about.slice(0, 100)}...`}

                      {user.user.about.length > 100 && (
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

                  {user.user.link && (
                    <Typography
                      component="a"
                      href={user.user.link}
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
                      {user.user.link}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* POSTS */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {status.getProfile === Status.LOADING ? (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  user?.posts?.map((post) => (
                    <ExploreCard key={post._id} post={post} />
                  ))
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <PostModal></PostModal>
    </Box>
  );
}

export default OtherProfile;
