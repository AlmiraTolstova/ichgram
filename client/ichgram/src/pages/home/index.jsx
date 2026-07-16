import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../redux/slices/postsSlice";
import { Status } from "../../utils/Status";
import FeedCard from "../../components/feedCard";
import PostModal from "../../components/postModal";
import FeedEnd from "../../components/feedEnd";
function Home() {
  const dispatch = useDispatch();
  const { feed, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
  return (
    <Box
      sx={{
        p: {
          xs: "1rem 1rem 1rem 1rem",
          sm: "1rem 1rem 1rem 1rem",
          md: "1rem 1rem 1rem 1rem",
          lg: "3.625rem 16.875rem 0.75rem 4.8125rem",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: " 1fr",
            lg: "repeat(2, 1fr)",
          },
          columnGap: "2.5rem",
          rowGap: "0.25",
        }}
      >
        {status.feed === Status.LOADING ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          feed.map((post) => <FeedCard key={post._id} post={post} />)
        )}
      </Box>
      <FeedEnd></FeedEnd>
      <PostModal></PostModal>
    </Box>
  );
}

export default Home;
