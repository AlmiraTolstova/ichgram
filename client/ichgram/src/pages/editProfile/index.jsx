import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";

function EditProfile() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar></Sidebar>
        <Box
          sx={{
            flexDirection: "column",
            border: "1px solid red",
            display: "flex",
            p: "94px 106px 185px 118px",
            gap: "2.75rem",
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={4}>
            Edit profile
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "#f5f5f5",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 5,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src="/logo.png"
                sx={{
                  width: 70,
                  height: 70,
                }}
              />

              <Box>
                <Typography fontWeight={700} fontSize={30} lineHeight={1}>
                  ichschool
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    maxWidth: 330,
                  }}
                >
                  • Гарантия помощи с трудоустройством в ведущие IT-компании
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              sx={{
                px: 4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              New photo
            </Button>
          </Paper>

          <Stack spacing={4}>
            <Box>
              <Typography fontWeight={700} mb={1}>
                Username
              </Typography>

              <TextField
                fullWidth
                defaultValue="ichschool"
                variant="outlined"
              />
            </Box>

            <Box>
              <Typography fontWeight={700} mb={1}>
                Website
              </Typography>

              <TextField
                fullWidth
                defaultValue="bit.ly/3rpilbh"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography fontWeight={700} mb={1}>
                About
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                defaultValue={`• Гарантия помощи с трудоустройством в ведущие IT-компании
• Выпускники зарабатывают от 45к евро
БЕСПЛАТНАЯ`}
                helperText="136 / 150"
                FormHelperTextProps={{
                  sx: {
                    textAlign: "right",
                    m: 1,
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                width: 330,
                height: 48,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
export default EditProfile;
