import { Stack, Divider, Box } from "@mui/material";

export default function BtnOr() {
  return (
    <Stack sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
      <Divider sx={{ flex: 1 }} />

      <Box
        sx={{
          padding: 1,
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "15px",

          alignItems: "center",
          textTransform: "uppercase",
          color: "#737373",
        }}
      >
        OR
      </Box>

      <Divider sx={{ flex: 1 }} />
    </Stack>
  );
}
