import { Box, Typography } from "@mui/material";
import Img from "../../assets/feedEnd.png";

function FeedEnd() {
  return (
    <Box
      sx={{
        // border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={Img}
        alt="Seen all updates"
        sx={{
          width: "5.125rem",
          mb: "10px",
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          fontSize: "17px",
          lineHeight: "22px",
          alignItems: "center",
          textAlign: "center",
          color: "#000000",
          mb: 1,
        }}
      >
        You've seen all the updates
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#737373",
        }}
      >
        You have viewed all new publications
      </Typography>
    </Box>
  );
}
export default FeedEnd;
