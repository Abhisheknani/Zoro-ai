import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../../assets/Images/Notfound.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Fullscreen background image */}
      <Box
        component="img"
        src={NotFoundImage}
        alt="404 Not Found"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Overlay content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff", // white text overlay
          textAlign: "center",
          backdropFilter: "brightness(0.9)", // optional slight dim
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          404 - Page Not Found
        </Typography>

        <Typography variant="h6" sx={{ mb: 4 }}>
          Oops! It looks like you've wandered off the path.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            textTransform: "none",
            px: 4,
            py: 1,
            fontSize: "1rem",
            bgcolor: "#ff9800",
            "&:hover": { bgcolor: "#fb8c00" },
          }}
        >
          Go Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
