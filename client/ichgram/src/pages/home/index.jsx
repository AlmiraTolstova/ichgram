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
import FeedEnd from "../../components/feedEnd";
function Home() {
  const dispatch = useDispatch();
  const { feed, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
  return (
    <Box sx={{ border: "2px solid red", p: "58px 270px 12px 77px" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: "40px", // расстояние между колонками
          rowGap: "4px", // расстояние между строками
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
    // </Box>
  );
}

export default Home;
