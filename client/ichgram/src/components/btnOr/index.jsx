import { Stack, Divider, Box } from "@mui/material";

export default function BtnOr() {
  return (
    <Stack
      sx={{
        display: "flex",
        alignText: "center",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ flexGrow: 1, marginBottom: "14px" }}
      />

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

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ flexGrow: 1, marginBottom: "14px" }}
      />
    </Stack>
  );
}
