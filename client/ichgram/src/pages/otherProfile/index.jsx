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
  getProfile,
  selectOtherProfile,
} from "../../redux/slices/otherProfileSlice";
import { Status } from "../../utils/Status";
import PostCard from "../../components/postCard";
import PostModal from "../../components/postModal";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import AppButton from "../../components/appButton";
import LinkIcon from "@mui/icons-material/Link";
import ExploreCard from "../../components/exploreCard";

function OtherProfile() {
  const otherProfileSelector = useSelector(selectOtherProfile);
  const { user, status, targetUserID } = useSelector(
    (state) => state.otherProfile,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showFullAbout, setShowFullAbout] = useState(false);

  useEffect(() => {
    console.log("otherprofile");

    //dispatch(getProfile());
  }, [dispatch]);

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
          </Box>

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
                    src={`${BASE_URL}${user.user.avatar}`}
                  >
                    {user.fullname?.[0]?.toUpperCase()}
                  </Avatar>
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
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
                    <AppButton appearance="primary" size="medium">
                      Follow
                    </AppButton>
                    <AppButton
                      onClick={() => navigate("/editprofile")}
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

      {/* <Footer></Footer> */}
      <PostModal></PostModal>
    </Box>
  );
}

export default OtherProfile;
