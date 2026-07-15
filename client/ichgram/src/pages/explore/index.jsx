import { Box, CircularProgress, Typography } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../redux/slices/postsSlice";
import { Status } from "../../utils/Status";
import PostCard from "../../components/postCard";
import FeedCard from "../../components/feedCard";
import PostModal from "../../components/postModal";
import ExploreCard from "../../components/exploreCard";

function Explore() {
  const dispatch = useDispatch();
  const { feed, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
  return (
    <Box
      sx={{
        // border: "2px solid red",
        // p: "5.5625rem 7.3125rem 5.6875rem",
        p: {
          xs: "1rem 1rem 1rem 1rem", // мобильные устройства
          sm: "3rem 3rem 0.75rem 4rem", // планшеты
          md: "5.5625rem 7.3125rem 5.6875rem", // от 900px и выше
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          //gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          columnGap: "4px",
          rowGap: {
            xs: "1rem",
            sm: 0,
          },
        }}
      >
        {status.feed === Status.LOADING ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          feed.map((post) => <ExploreCard key={post._id} post={post} />)
        )}
      </Box>
      <PostModal></PostModal>
    </Box>
  );
}

export default Explore;
