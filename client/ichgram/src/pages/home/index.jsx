import { Box, CircularProgress, Typography } from "@mui/material";
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
        border: "2px solid red",

        p: {
          xs: "1rem 1rem 1rem 1rem", // мобильные устройства
          sm: "3rem 3rem 0.75rem 4rem", // планшеты (при желании тоже 1 колонка)
          md: "3.625rem 16.875rem 0.75rem 4.8125rem", // от 900px и выше — 2 колонки
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          // gridTemplateColumns: "repeat(2, 1fr)",

          gridTemplateColumns: {
            xs: "1fr", // мобильные устройства
            sm: "1fr", // планшеты (при желании тоже 1 колонка)
            md: "repeat(2, 1fr)", // от 900px и выше — 2 колонки
          },
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
  );
}

export default Home;
