import { Card, CardMedia } from "@mui/material";
import { BASE_URL } from "../../api/api";
import { useDispatch } from "react-redux";
import { openExistPostModal } from "../../redux/slices/postsSlice";

export default function ExploreCard({ post }) {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        maxWidth: 470,
        mx: "auto",
        mb: 1,
        borderRadius: 2,
      }}
    >
      {/* Image */}

      <CardMedia
        onClick={() => dispatch(openExistPostModal(post))}
        component="img"
        image={`${BASE_URL}${post.image}`}
        alt={post.description}
        sx={{
          aspectRatio: "1 / 1",
          objectFit: "cover",
        }}
      />
    </Card>
  );
}
