import { Box, CircularProgress, Typography } from "@mui/material";
import Img from "../../assets/404.png";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
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
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
        }}
      >
        {status.feed === Status.LOADING ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          feed.map((post) => <ExploreCard key={post._id} post={post} />)
        )}
      </Box>
      <PostModal></PostModal>
    </Box>
    // </Box>
  );
}

export default Explore;
