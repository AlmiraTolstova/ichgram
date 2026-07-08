import { Box, CircularProgress, Typography } from "@mui/material";
import Img from "../../assets/404.png";

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
        border: "2px solid red",
        p: "89px 117px 91px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: "4px",
          rowGap: "0px",
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
